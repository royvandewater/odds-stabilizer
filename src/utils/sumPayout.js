import calculatePayout from './calculatePayout'

const addPayoutToTotal = (total, bet) => total + calculatePayout(bet)

const sumPayout = bets => bets.reduce(addPayoutToTotal, 0)

export default sumPayout