import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { links } from '../vars/links'
import ShoppingCart from './CartIcon'
import logo from '../assets/nuvitta-logo.png'
import { useSidebarContext } from '../functionality/SidebarContext'

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebarContext()
  return (
    <SidebarContainer>
      <aside className={`${isSidebarOpen ? 'sidebar active' : 'sidebar'}`}>
        <div className='sidebar-head'>
          <img src={logo} alt='NuVitta Logo' />
          <button className='btn-close' type='button' onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul>
          {links.map((link) => {
            const { id, text, url } = link
            return (
              <li key={id}>
                <Link to={url} onClick={closeSidebar}>
                  {text}
                </Link>
              </li>
            )
          })}
        </ul>
        <ShoppingCart />
      </aside>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.section`
  text-align: center;
  .sidebar-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2.5rem;
    img {
      max-width: 10rem;
    }
  }
  .btn-close {
    font-size: 1.5rem;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: var(--brand-color);
    transition: var(--sidebar-transition);
  }
  ul {
    li {
      padding: 1.5rem;
      text-align: left;
    }
    /* might change links to be centered. have to try on actual phone and see how it looks */
    a {
      color: var(--heading-color);
      font-size: 1.25rem;
      letter-spacing: 0.1rem;
      padding-left: 2rem;
      text-transform: capitalize;
    }
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--background-color);
    transition: var(--sidebar-transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .active {
    transform: translate(0);
    z-index: 999;
  }
  .shopping-cart {
    padding: 1.5rem 3.5rem 1.5rem;
    svg {
      font-size: 2.5rem;
    }
  }
  @media (min-width: 1024px) {
    .sidebar {
      display: none;
    }
  }
`
