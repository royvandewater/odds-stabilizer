import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import calculatePayout from 'utils/calculatePayout'
import sumPayout from 'utils/sumPayout'


const TD = styled.td`
  padding: 4px;
`

const TH = TD.withComponent('th')

const Bets = ({ bets, name }) => {
  if (bets.length === 0) return null

  return (
    <div>
      <h3>Bets on {name}</h3>
      <table>
        <thead>
          <tr>
            <TH>Cost</TH>
            <TH>Odds</TH>
            <TH>Payout</TH>
          </tr>
        </thead>
        <tbody>
          {bets.slice().reverse().map((bet, i) => (<tr key={i}>
            <TD>{bet.amount}</TD>
            <TD>{bet.odds.cost}:{bet.odds.payout}</TD>
            <TD>${calculatePayout(bet).toFixed(2)}</TD>
          </tr>))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Total Payout</th>
            <td>${sumPayout(bets).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

Bets.propTypes = {
  name: PropTypes.string.isRequired,
  bets: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    odds: PropTypes.shape({
      cost: PropTypes.number.isRequired,
      payout: PropTypes.number.isRequired,
    }),
  })).isRequired,
}

export default Bets