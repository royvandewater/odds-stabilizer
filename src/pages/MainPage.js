import React from 'react'
import styled from '@emotion/styled'
import fraction from 'fraction-calculator'

import Bets from 'components/Bets'
import Layout from 'components/Layout'
import SettingsHeader from 'components/SettingsHeader'
import sumCost from 'utils/sumCost'
import sumPayout from 'utils/sumPayout'

const houseWinningsForA = book => sumCost(book.b) - sumPayout(book.a)
const houseWinningsForB = book => sumCost(book.a) - sumPayout(book.b)

const H2 = styled.h2`
  font-size: 24px;
  margin: 0;
`

const BetButton = styled.button`
  background-color: transparent;
  border: solid 1px #282c34;
  font-size: 24px;
  padding: 8px 32px;
  margin: 16px;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 8px;

  h2 {
    margin-bottom: 16px;
  }
`

const SectionOutcome = styled(Section)`
  background-color: #282c34;
  color: white;
`

const SectionError = styled(Section)`
  background-color: #ff0000;
  color: white;

  pre {
    text-align: left;
  }
`

const BetGrid = styled.div`
  max-width: 400px;
  display: grid;
  grid-template-columns: auto auto;
`

const OutcomeGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  max-width: 400px;

  dt {
    text-align: left;
  }

  dd {
    text-align: right;
    font-weight: bold;
  }
`

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-column-gap: 8px;

  @media (max-width: 400px) {
    grid-template-columns: max-content;
    grid-row-gap: 4px;

    > :not(:last-of-type) {
      padding-bottom: 16px;
      border-bottom: solid 1px #000;
    }
  }
`

const defaultOdds = {
  a: { cost: 1, payout: 1 }, 
  b: { cost: 1, payout: 1 }, 
}

const defaultSettings = {
  calculateOdds: () => Object.assign({}, defaultOdds),
}

class OddsFnError extends Error {
  constructor(message, odds) {
    super()
    this.message = message
    this.odds = odds
  }
}

const assertOddsValid = odds => {
  if (!odds.a) throw new OddsFnError('odds calculation function did not return a value for "a"', odds) 
  if (typeof odds.a.cost !== 'number') throw new OddsFnError('odds calculation function did not return a number for "a.cost"', odds) 
  if (typeof odds.a.payout !== 'number') throw new OddsFnError('odds calculation function did not return a number for "a.payout"', odds) 

  if (!odds.b) throw new OddsFnError('odds calculation function did not return a value for "b"', odds) 
  if (typeof odds.b.cost !== 'number') throw new OddsFnError('odds calculation function did not return a number for "b.cost"', odds) 
  if (typeof odds.b.payout !== 'number') throw new OddsFnError('odds calculation function did not return a number for "b.payout"', odds) 
}



const MainPage = () => {
  const [settings, setSettings] = React.useState(defaultSettings)
  const [book, setBook] = React.useState({ a: [], b: [] })
  const [odds, setOdds] = React.useState(defaultOdds)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    try {
      const newOdds = settings.calculateOdds(book, { fraction, sumPayout }) 
      assertOddsValid(newOdds)
      setOdds(newOdds)
      setError(null)
    } catch (e) {
      setError(e)
    }
  }, [book, settings])

  const betOnA = () => setBook({ ...book, a: [...book.a, { amount: 1, odds: odds.a }] })
  const betOnB = () => setBook({ ...book, b: [...book.b, { amount: 1, odds: odds.b }] })

  return (
    <Layout>
      <SettingsHeader settings={settings} setSettings={setSettings} />
      <main>
        {error && (
          <SectionError>
            <h2>Execution Error</h2>
            <p>{error.message}</p>
            {error.odds && <pre>{JSON.stringify(error.odds, null, 2)}</pre>}
          </SectionError>)}
        <Section>
          <H2>Bet</H2>
          <BetGrid>
            <p>{odds.a.cost}:{odds.a.payout}</p>
            <p>{odds.b.cost}:{odds.b.payout}</p>
            <BetButton onClick={betOnA}>A</BetButton>
            <BetButton onClick={betOnB}>B</BetButton>
            <div>
              <h5>Pot A</h5>
              <p>${sumCost(book.a)}</p>
            </div>

            <div>
              <h5>Pot B</h5>
              <p>${sumCost(book.b)}</p>
            </div>

          </BetGrid>
        </Section>
        <SectionOutcome>
          <H2>Outcomes</H2>
          <OutcomeGrid>
            <dt>If A wins the house wins:</dt>
            <dd>${houseWinningsForA(book).toFixed(2)}</dd>

            <dt>If B wins the house has:</dt>
            <dd>${houseWinningsForB(book).toFixed(2)}</dd>
          </OutcomeGrid>
        </SectionOutcome>
        <Section>
          <BookGrid>
            <Bets name="A" bets={book.a} />
            <Bets name="B" bets={book.b} />
          </BookGrid>
        </Section>
      </main>
    </Layout>
  )
}

export default MainPage
