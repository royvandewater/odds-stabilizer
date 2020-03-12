import calculateOdds from './calculateOdds'

describe('calculateOdds', () => {
  describe('when given empty bets', () => {
    let odds

    beforeEach(() => {
      odds = calculateOdds({ a: [], b: [] })
    })

    it('should return even odds', () => {
      expect(odds).toEqual({ 
        a: { cost: 1, payout: 1 },
        b: { cost: 1, payout: 1 }, 
      })
    })
  })

  describe('when someone has bet on a', () => {
    let odds

    beforeEach(() => {
      odds = calculateOdds({ 
        a: [{ amount: 1, odds: { cost: 1, payout: 1 } }], 
        b: [], 
      })
    })

    it('should give a 2:1 odds and b 1:1 odds', () => {
      expect(odds).toEqual({ 
        a: { cost: 2, payout: 1 },
        b: { cost: 1, payout: 1 }, 
      })
    })
  })

  describe('when someone has bet on a w/1:1 & b w/1:2', () => {
    let odds

    beforeEach(() => {
      odds = calculateOdds({ 
        a: [{ amount: 1, odds: { cost: 1, payout: 1 } }], // payout $1
        b: [{ amount: 1, odds: { cost: 1, payout: 2 } }], // payout $1.50
      })
    })

    xit('should give a ?:? odds and b ?:? odds', () => {
      expect(odds).toEqual({ 
        a: { cost: 2, payout: 1 },
        b: { cost: 1, payout: 2 }, 
      })
    })
  })
})