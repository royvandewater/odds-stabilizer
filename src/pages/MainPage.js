import React from 'react'
import styled from '@emotion/styled'

import Bets from '../Bets'
import calculateOdds from 'utils/calculateOdds'
import sumCost from 'utils/sumCost'
import sumPayout from 'utils/sumPayout'
import { Link } from 'react-router-dom'
import SettingsIcon from '../SettingsIcon'

const houseWinningsForA = book => sumCost(book.b) - sumPayout(book.a)
const houseWinningsForB = book => sumCost(book.a) - sumPayout(book.b)

const Layout = styled.div`
  text-align: center;
`

const H1 = styled.h1`
  margin: 0;
`

const H2 = styled.h2`
  margin: 0;
`

const Header = styled.header`
  background-color: #282c34;
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  position: relative;
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

const SettingsLink = styled(Link)`
  color: white;
  text-decoration: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
`

const MainPage = () => {
  const [book, setBook] = React.useState({ a: [], b: [] })
  const [odds, setOdds] = React.useState(calculateOdds(book))

  React.useEffect(() => {
    setOdds(calculateOdds(book))
  }, [book])

  const betOnA = () => setBook({ ...book, a: [...book.a, { amount: 1, odds: odds.a }] })
  const betOnB = () => setBook({ ...book, b: [...book.b, { amount: 1, odds: odds.b }] })

  return (
    <Layout>
      <Header>
        <SettingsLink to="/settings">
          <SettingsIcon />
        </SettingsLink>
        <H1>Odds Stabilizer</H1>
      </Header>
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
