import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/nuvitta-logo.png'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'
import { links } from '../vars/links'
import CartIcon from './CartIcon'
import { useSidebarContext } from '../functionality/SidebarContext'

export default function Nav() {
  const { openSidebar } = useSidebarContext()
  return (
    <NavbarContainer>
      <div className='nav-bar'>
        <div className='nav-bar-main'>
          <Link to='/'>
            <img src={logo} alt='nuvitta logo' />
          </Link>
          <button type='button' className='hamburger-btn' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul>
          {links.map((link) => {
            const { id, text, url } = link
            return (
              <li className='hover-underline-animation' key={id}>
                <NavLink end to={url}>
                  {text}
                </NavLink>
              </li>
            )
          })}
        </ul>
        <CartIcon />
      </div>
    </NavbarContainer>
  )
}

/* nav bar styling */
const NavbarContainer = styled.nav`
  height: var(--navbar-height);
  display: flex;
  align-items: center;
  justify-content: center;
  /* change the background color maybe? */
  /* navbar background-color ideas: cbdac8, c8ddc5 */

  .nav-bar {
    width: 90%;
    margin: 0 auto;
    max-width: var(--max-width);
    margin: 1rem;
  }

  .nav-bar-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      max-width: 10rem;
    }
  }
  /* hamburger button for mobile */
  .hamburger-btn {
    background: transparent;
    border: transparent;
    cursor: pointer;
    color: var(--brand-color);
    svg {
      font-size: 2rem;
    }
  }

  /* hide laptop/desktop navbar links */
  ul {
    display: none;
  }

  .shopping-cart {
    display: none;
  }

  /* laptop/desktop media query */
  @media (min-width: 1024px) {
    /* hide hamburger button */
    .hamburger-btn {
      display: none;
    }

    .shopping-cart {
      display: grid;
    }

    .nav-bar {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }

    ul {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.75rem;
        .active {
          color: var(--brand-color);
        }
      }
      a {
        color: var(--heading-color);
        font-size: 1.25rem;
        letter-spacing: 0.1rem;
        padding: 0.5rem;
        text-transform: capitalize;
      }
    }
  }
`
/* &:hover {
          border-bottom: 2px solid var(--brand-color);
          transition: 0.5s;
        } */
