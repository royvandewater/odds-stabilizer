
const sumCost = bets => bets.reduce((total, bet) => total + bet.amount, 0)

export default sumCost