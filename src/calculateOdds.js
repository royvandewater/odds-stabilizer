
const calculateOdds = bets => ({
  a: { numerator: bets.a.length + 1, denominator: bets.b.length + 1 },
  b: { numerator: bets.b.length + 1, denominator: bets.a.length + 1 },
})

export default calculateOdds