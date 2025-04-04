import styled from "styled-components"
import { CartIconSvg } from "../icons/cartIconSvg"
import { Link } from "react-router-dom"


const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  color: #626262;
  font-weight: bold;
  width: 100%;
  border-bottom: 1px solid #b1b0b1;
  cursor: pointer;

  a {
    border: none;
    text-decoration: none;
    color: inherit;
    border: none;
    outline: none;
  }
`

const Logo = styled.div`

  h2 {
    span {
      color: red;
    }
  }

`

const CartIcon = styled.div`
  padding-right: 10px;
  position: relative;
  cursor: pointer;
  p {
    position: absolute;
    top: -2px;
    right: -0.2px;
    background-color: red;
    color: white;
    padding: 0 4px;
    font-size: 12px;
    border-radius: 50%; 
  }
`
export function Header() {
  return (
    <Container>
      <Link to="/">
        <Logo>
          <h2>Pizzaria <span>Oliveiras</span></h2>
        </Logo>
      </Link>
      
      <Link to="/cart">
        <CartIcon>
          <CartIconSvg />
          <p>1</p>
        </CartIcon>
      </Link>
    </Container>
  )
}