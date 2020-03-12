import React from 'react'
import styled from '@emotion/styled'

import './App.css'
import Bets from './Bets'
import calculateOdds from './calculateOdds'
import sumCost from './sumCost'
import sumPayout from './sumPayout'

const houseWinningsForA = book => sumCost(book.b) - sumPayout(book.a)
const houseWinningsForB = book => sumCost(book.a) - sumPayout(book.b)

const BetButton = styled.button`
  background-color: transparent;
  border: solid 1px #282c34;
  font-size: 24px;
  padding: 8px 32px;
  margin: 16px;
`

const SectionBets = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BetsGrid = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-column-gap: 8px;

  @media (max-width: 400px) {
    grid-template-columns: max-content;
    grid-row-gap: 8px;
  }
`

const App = () => {
  const [book, setBook] = React.useState({ a: [], b: [] })
  const [odds, setOdds] = React.useState(calculateOdds(book))

  React.useEffect(() => {
    setOdds(calculateOdds(book))
  }, [book])

  const betOnA = () => setBook({ ...book, a: [...book.a, { amount: 1, odds: odds.a }] })
  const betOnB = () => setBook({ ...book, b: [...book.b, { amount: 1, odds: odds.b }] })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Odds Stabilizer</h1>
      </header>
      <main>
        <section className="App-bet-section">
          <h2>Bet</h2>
          <div className="App-bet-grid">
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

          </div>
        </section>
        <section className="App-outcome-section">
          <h2>Outcomes</h2>
          <dl className="App-outcome-grid">
            <dt>If A wins the house wins:</dt>
            <dd>${houseWinningsForA(book).toFixed(2)}</dd>

            <dt>If B wins the house has:</dt>
            <dd>${houseWinningsForB(book).toFixed(2)}</dd>
          </dl>
        </section>
        <SectionBets>
          <BetsGrid>
            <Bets name="A" bets={book.a} />
            <Bets name="B" bets={book.b} />
          </BetsGrid>
        </SectionBets>
      </main>
    </div>
  )
}

export default App
