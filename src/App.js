import React from 'react';
import './App.css';

const houseWinningsForA = bets => bets.b - bets.a
const houseWinningsForB = bets => bets.a - bets.b

function App() {
  const [bets, setBets] = React.useState({a: 0, b: 0})

  const betOnA = () => setBets({...bets, a: bets.a + 1})
  const betOnB = () => setBets({...bets, b: bets.b + 1})

  return (
    <div className="App">
      <header className="App-header">
        <h1>Odds Stabilizer</h1>
      </header>
      <main>
        <section className="App-bet-section">
          <h2>Bet</h2>
          <div className="App-bet-grid">
            <button className="App-button" onClick={betOnA}>A</button>
            <button className="App-button" onClick={betOnB}>B</button>
            <p>${bets.a}</p>
            <p>${bets.b}</p>
          </div>
        </section>
        <section>
          <h2>Outcomes</h2>
          <dl>
            <dt>If A wins the house wins:</dt>
            <dd>${houseWinningsForA(bets)}</dd>

            <dt>If B wins the house has:</dt>
            <dd>${houseWinningsForB(bets)}</dd>
          </dl>
        </section>
      </main>
    </div>
  );
}

export default App;
