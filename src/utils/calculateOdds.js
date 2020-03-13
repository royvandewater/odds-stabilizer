import sumPayout from './sumPayout'
import fraction from 'fraction-calculator'

const calculateOdds = bets => {
  if (bets.a.length === 0 || bets.b.length === 0) return { a: { cost: 1, payout: 1 }, b: { cost: 1, payout: 1 } } 

  const sumAPayout = sumPayout(bets.a)
  const sumBPayout = sumPayout(bets.b)

  const f = fraction(sumAPayout, sumBPayout)

  return ({
    a: { cost: f.fraction.numerator, payout: f.fraction.denominator },
    b: { cost: f.fraction.denominator, payout: f.fraction.numerator },
  })
}

export default calculateOdds