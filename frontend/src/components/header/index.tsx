import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartIconSvg } from '../icons/cartIconSvg';
import { useContext } from 'react';
import { PizzasContext } from '../../context';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;

  a {
    outline: none;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-focus-ring-color: transparent;
    outline: none;
    border: none;
    color: none;
    color: black;

    &:focus,
    &:active {
      outline: none;
      box-shadow: none;
      background: transparent;
    }

    span {
      color: red;
    }

    h2 {
      font-size: 24px;
      color: white;

      @media ${({ theme }) => theme.media.md} {
        font-size: 18px;
      }
    }
  }
`;

const ContainerCart = styled.div`
  position: relative;
  padding: 2px 0;
  p {
    position: absolute;
    text-align: center;
    color: white;
    font-size: 10px;
    height: 12px;
    width: 12px;
    background-color: red;
    top: 1px;
    right: -3px;
    border-radius: 50%;
  }
`;

export function Header() {
  const { qtdCart } = useContext(PizzasContext);

  return (
    <Container>
      <div>
        <Link to="/">
          <h2>
            Pizzaria <span>Oliveiras</span>
          </h2>
        </Link>
      </div>

      <ContainerCart>
        <Link to="/cart">
          <CartIconSvg />
          {qtdCart !== 0 && <p>{qtdCart}</p>}
        </Link>
      </ContainerCart>
    </Container>
  );
}
