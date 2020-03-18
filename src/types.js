import PropTypes from 'prop-types'

export const OddType = PropTypes.shape({
  cost: PropTypes.number.isRequired,
  payout: PropTypes.number.isRequired,
})

export const OddsType = PropTypes.shape({
  a: OddType,
  b: OddType,
})

export const BetType = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  odds: OddType,
})

export const BookType = PropTypes.shape({
  a: PropTypes.arrayOf(BetType).isRequired,
  b: PropTypes.arrayOf(BetType).isRequired,
})