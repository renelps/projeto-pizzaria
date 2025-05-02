import { useContext } from 'react';
import { PizzasContext } from '../../context';
import styled from 'styled-components';
import { FormatPrice } from '../../utils/formatPrice';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
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
`;

const TotalPrice = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const TotalCart = styled.div`
  margin-top: 10px;
  span {
    color: #eee;
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
      <TotalCart>{handleAddToCart.length > 0 && <span>Total a pagar {FormatPrice(total)}</span>}</TotalCart>
    </CartContainer>
  );
}
