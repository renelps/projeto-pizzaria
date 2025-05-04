import { useContext } from 'react';
import { PizzasContext } from '../../context';
import styled from 'styled-components';
import { FormatPrice } from '../../utils/formatPrice';
import { Link } from 'react-router-dom';

const CartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  > p {
    margin-top: 10px;
    color: white;
    text-align: center;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  color: #eee;

  img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
  }

  @media ${({ theme }) => theme.media.md} {
    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const ItemInfo = styled.div`
  flex: 1;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 4px 0;
    font-size: 14px;
    color: #eee;
  }

  @media ${({ theme }) => theme.media.md} {
    h3 {
      font-size: 12px;
    }

    p {
      font-size: 10px;
    }
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    color: #eee;
    background-color: #317d24;

    &:last-child {
      background-color: #d0342c;
    }
  }

  span {
    font-size: 16px;
    min-width: 20px;
    text-align: center;
  }

  @media ${({ theme }) => theme.media.md} {
    gap: 1px;
    button {
      width: 18px;
      height: 18px;
    }

    span {
      font-size: 12px;
    }
  }
`;

const TotalPrice = styled.div`
  font-weight: bold;
  font-size: 16px;

  @media ${({ theme }) => theme.media.md} {
    font-size: 12px;
  }
`;

const CheckoutSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  span {
    color: #eee;
  }

  @media ${({ theme }) => theme.media.md} {
    span {
      font-size: 14px;
    }
  }

  button {
    border: none;
    background: transparent;
    color: #eee;
    border: 1px solid rgba(255, 102, 0, 0.3);
    padding: 4px 6px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 15px;
  }
`;
export function Cart() {
  const { handleAddToCart, incrementPizza, decrementPizza, total } = useContext(PizzasContext);

  return (
    <CartContainer>
      {handleAddToCart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        handleAddToCart.map((pizza) => (
          <CartItem key={pizza._id}>
            <img src={pizza.imagem} alt={pizza.nome} />
            <ItemInfo>
              <h3>{pizza.nome}</h3>
              <p>Preço: R$ {pizza.preco.toFixed(2)}</p>
            </ItemInfo>
            <QuantityControls>
              <button onClick={() => decrementPizza(pizza._id)}>-</button>
              <span>{pizza.qtd}</span>
              <button onClick={() => incrementPizza(pizza._id)}>+</button>
            </QuantityControls>
            <TotalPrice>R$ {(pizza.preco * pizza.qtd).toFixed(2)}</TotalPrice>
          </CartItem>
        ))
      )}
      <CheckoutSection>
        {handleAddToCart.length > 0 && <span>Total a pagar {FormatPrice(total)}</span>}
        {handleAddToCart.length > 0 && (
          <Link to="/payment">
            <button>Finalizar Pedido</button>
          </Link>
        )}
      </CheckoutSection>
    </CartContainer>
  );
}
