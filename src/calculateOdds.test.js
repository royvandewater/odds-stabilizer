import calculateOdds from './calculateOdds'

describe('calculateOdds', () => {
  describe('when given empty bets', () => {
    let odds

    beforeEach(() => {
      odds = calculateOdds({ a: [], b: [] })
    })

    it('should return even odds', () => {
      expect(odds).toEqual({ 
        a: { numerator: 1, denominator: 1 },
        b: { numerator: 1, denominator: 1 }, 
      })
    })
  })

  describe('when someone has bet on a', () => {
    let odds

    beforeEach(() => {
      odds = calculateOdds({ 
        a: [{ amount: 1, odds: { numerator: 1, denominator: 1 } }], 
        b: [], 
      })
    })

    it('should give a 2:1 odds and b 1:2 odds', () => {
      expect(odds).toEqual({ 
        a: { numerator: 2, denominator: 1 },
        b: { numerator: 1, denominator: 2 }, 
      })
    })
  })

  describe('when someone has bet on a w/1:1 & b w/1:2', () => {
    let odds

    beforeEach(() => {
      odds = calculateOdds({ 
        a: [{ amount: 1, odds: { numerator: 1, denominator: 1 } }], 
        b: [{ amount: 1, odds: { numerator: 1, denominator: 2 } }], 
      })
    })

    xit('should give a ?:? odds and b ?:? odds', () => {
      expect(odds).toEqual({ 
        a: { numerator: 2, denominator: 1 },
        b: { numerator: 1, denominator: 2 }, 
      })
    })
  })
})