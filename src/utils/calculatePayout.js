import round from './round'
const calculatePayout = bet => round((bet.amount * (bet.odds.payout  / bet.odds.cost)), 2)

export default calculatePayout