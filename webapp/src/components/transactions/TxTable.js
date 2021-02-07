import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'

const styles = css`
 .header {
   font-weight: bold;
 }
 
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable ({ data }) {
  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td className='row' >ID</td>
          <td >User ID</td>
          <td >Description</td>
          <td >Merchant ID</td>
          <td >Debit</td>
          <td >Credit</td>
          <td >Amount</td>
        </tr>
        {
          data.map(tx => {
            const { _id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
            return (
              <tr data-testid={`transaction-${_id}`} key={`transaction-${_id}`}>
                <td data-testid={makeDataTestId(_id, '_id')}>{_id}</td>
                <td data-testid={makeDataTestId(_id, 'userId')}>{userId}</td>
                <td data-testid={makeDataTestId(_id, 'description')}>{description}</td>
                <td data-testid={makeDataTestId(_id, 'merchant')}>{merchantId}</td>
                <td data-testid={makeDataTestId(_id, 'debit')}>{debit ? 'Yes' : 'No'}</td>
                <td data-testid={makeDataTestId(_id, 'credit')}>{credit ? 'Yes' : 'No'}</td>
                <td data-testid={makeDataTestId(_id, 'amount')}>${amount}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

  )
}

TxTable.propTypes = {
  data: arrayOf(shape({
    _id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}
