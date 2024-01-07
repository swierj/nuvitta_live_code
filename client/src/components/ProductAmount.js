import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

/* add popup that asks user if they want to delete item when amount == 0 */
export default function ProductAmount({ increase, decrease, amount }) {
  return (
    <AmountContainer>
      <button type='button' className='amount-btn' onClick={decrease}>
        <FaMinus />
      </button>
      <h3>{amount}</h3>
      <button type='button' className='amount-btn' onClick={increase}>
        <FaPlus />
      </button>
    </AmountContainer>
  )
}

const AmountContainer = styled.section`
  display: grid;
  width: 100px;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  margin: 2rem 0;
  .amount-btn {
    background: var(--brand-color);
    width: 1.75rem;
    height: 1.75rem;
    border-color: transparent;
    border-radius: 50%;
    cursor: pointer;
    svg {
      color: white;
      font-size: 1rem;
    }
  }
  .amount-btn:hover {
    svg {
      width: 1.3rem;
      height: 1.3rem;
      transition: 0.25s;
    }
  }
`
