import React from 'react'
import styled from '@emotion/styled'
import fraction from 'fraction-calculator'

import Bets from 'components/Bets'
import Button from 'components/Button'
import Layout from 'components/Layout'
import ManualBet from 'components/ManualBet'
import SettingsHeader from 'components/SettingsHeader'
import sumCost from 'utils/sumCost'
import sumPayout from 'utils/sumPayout'

const houseWinningsForA = book => sumCost(book.b) - sumPayout(book.a)
const houseWinningsForB = book => sumCost(book.a) - sumPayout(book.b)

const H2 = styled.h2`
  font-size: 24px;
  margin: 0;
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

const ToggleButton = styled(Button)`
  ${({ value }) => value && `
    background-color: #282c34;
    color: white;
  `}
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
  const [autoBet, setAutoBet] = React.useState(false)

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
          <ToggleButton 
            value={autoBet}
            onClick={() => setAutoBet(!autoBet)} >
              Auto Bet
          </ToggleButton>
          {autoBet 
            ? <h2>Auto Bet coming soon™</h2>
            : <ManualBet betOnA={betOnA} betOnB={betOnB} book={book} odds={odds} />}
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
