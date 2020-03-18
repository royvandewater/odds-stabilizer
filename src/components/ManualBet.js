import React from 'react'
import PropTypes from 'prop-types'

import { BookType, OddsType } from 'types'
import BetGrid from 'components/BetGrid'
import Button from 'components/Button'
import sumCost from 'utils/sumCost'

const ManualBet = ({ betOnA, betOnB, book, odds }) => (
  <BetGrid>
    <p>{odds.a.cost}:{odds.a.payout}</p>
    <p>{odds.b.cost}:{odds.b.payout}</p>
    <Button onClick={betOnA}>A</Button>
    <Button onClick={betOnB}>B</Button>
    <div>
      <h5>Pot A</h5>
      <p>${sumCost(book.a)}</p>
    </div>

    <div>
      <h5>Pot B</h5>
      <p>${sumCost(book.b)}</p>
    </div>
  </BetGrid>
)

ManualBet.propTypes = {
  betOnA: PropTypes.func.isRequired,
  betOnB: PropTypes.func.isRequired,
  book: BookType.isRequired,
  odds: OddsType.isRequired,
}

export default ManualBet