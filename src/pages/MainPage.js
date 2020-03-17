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

const defaultSettings = {
  calculateOdds: function() {
    const [book, { fraction, sumPayout }] = arguments
    if (book.a.length === 0 || book.b.length === 0) return { a: { cost: 1, payout: 1 }, b: { cost: 1, payout: 1 } } 

    const sumAPayout = sumPayout(book.a)
    const sumBPayout = sumPayout(book.b)

    const f = fraction(sumAPayout, sumBPayout)

    return ({
      a: { cost: f.fraction.numerator, payout: f.fraction.denominator },
      b: { cost: f.fraction.denominator, payout: f.fraction.numerator },
    })
  },
}

const MainPage = () => {
  const [settings, setSettings] = React.useState(defaultSettings)
  const [book, setBook] = React.useState({ a: [], b: [] })
  const [odds, setOdds] = React.useState(settings.calculateOdds(book, { fraction, sumPayout }))

  React.useEffect(() => {
    setOdds(settings.calculateOdds(book, { fraction, sumPayout }))
  }, [book])

  const betOnA = () => setBook({ ...book, a: [...book.a, { amount: 1, odds: odds.a }] })
  const betOnB = () => setBook({ ...book, b: [...book.b, { amount: 1, odds: odds.b }] })

  return (
    <Layout>
      <SettingsHeader settings={settings} setSettings={setSettings} />
      <main>
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
