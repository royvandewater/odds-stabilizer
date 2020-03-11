import React from 'react'
import './App.css'
import calculateOdds from './calculateOdds'

const calculateWinAmount = bets => (
  bets.reduce((acc, cur) => (
    acc + cur.amount * (cur.odds.numerator / cur.odds.denominator)
  ), 0)
)

const sumAmount = bets => bets.reduce((total, bet) => total + bet.amount, 0)

const houseWinningsForA = book => -1 * (calculateWinAmount(book.a) - sumAmount(book.b))
const houseWinningsForB = book => -1 * (calculateWinAmount(book.b) - sumAmount(book.a))

function App() {
  const [book, setBook] = React.useState({ a: [], b: [] })
  const [odds, setOdds] = React.useState({
    a: { numerator: 1, denominator: 1 }, 
    b: { numerator: 1, denominator: 1 },
  })

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
            <p>{odds.a.numerator}:{odds.a.denominator}</p>
            <p>{odds.b.numerator}:{odds.b.denominator}</p>
            <button className="App-button" onClick={betOnA}>A</button>
            <button className="App-button" onClick={betOnB}>B</button>
            <p>${sumAmount(book.a)}</p>
            <p>${sumAmount(book.b)}</p>
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
      </main>
    </div>
  )
}

export default App
