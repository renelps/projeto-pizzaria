import styled from 'styled-components';
import { PixPaymentForm } from '../../components/pixPaymentForm/index';
import { useContext, useState } from 'react';
import { PizzasContext } from '../../context';
import { CardPaymentForm } from '../../components/cardPaymentForm/index';
import { FormatPrice } from '../../utils/formatPrice';
import { AddressAutocomplete } from '../../components/AddressAutocomplete';

const PaymentPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 40px);
`;

const PaymentContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 500px;
  max-width: 1200px;
`;

const PaymentForm = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;

  > div {
    label {
      color: white;
    }
    > input {
      background: transparent;
      border: none;
      padding: 10px 0;
      margin-bottom: 10px;
      border-bottom: 1px solid white;
      width: 100%;
      color: white;
      font-size: 14px;
    }

    > select {
      padding: 10px;
      background-color: #111;
      width: 100%;
      color: white;
      border: 1px solid white;
      border-radius: 4px;
    }
  }
`;

const ContainerTotal = styled.div`
  margin-bottom: 10px;
  padding: 7px 0;

  p {
    color: #eee;
    font-size: 18px;
  }
`;
const PaymentMethodContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContainerSelect = styled.div`
  margin-top: 10px;
`;
export function Payment() {
  const { total } = useContext(PizzasContext);
  const [method, setMethod] = useState<'pix' | 'cartao'>('pix');
  return (
    <PaymentPageContainer>
      <PaymentContentWrapper>
        <PaymentForm>
          <ContainerTotal>{total > 0 && <p>Total a pagar: {FormatPrice(total)}</p>}</ContainerTotal>
          <div>
            <label>Nome completo</label>
            <input type="text" placeholder="Ex: Gabriel..." />
          </div>
          <AddressAutocomplete />
          <div>
            <label>Bairro</label>
            <input type="text" placeholder="Ex: Prado..." />
          </div>
          <div>
            <label>Rua</label>
            <input type="text" placeholder="Ex: Dr..." />
          </div>
          <div>
            <label>Complemento</label>
            <input type="text" placeholder="Ex: Fica perto..." />
          </div>

          <ContainerSelect>
            <select value={method} onChange={(e) => setMethod(e.target.value as 'pix' | 'cartao')}>
              <option value="pix">Pix</option>
              <option value="cartao">Cartao</option>
            </select>
          </ContainerSelect>
        </PaymentForm>
        <PaymentMethodContainer>
          {method === 'pix' && <PixPaymentForm />}
          {method === 'cartao' && <CardPaymentForm />}
        </PaymentMethodContainer>
      </PaymentContentWrapper>
    </PaymentPageContainer>
  );
}
