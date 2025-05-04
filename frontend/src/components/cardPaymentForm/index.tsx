import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 700px;

  form {
    width: 100%;
    flex-direction: column;

    div {
      padding: 7px 0;
    }

    label {
      color: #eee;
    }

    input {
      background: transparent;
      border: none;
      border-bottom: 1px solid white;
      width: 100%;
      color: #eee;
      padding: 5px 0;
    }
  }
`;

const CardDetailsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export function CardPaymentForm() {
  return (
    <Container>
      <h2>Cartao</h2>

      <form>
        <div>
          <label>Nome do Cartao</label>
          <input type="text" />
        </div>
        <div>
          <label>Número do Cartao</label>
          <input type="text" />
        </div>

        <CardDetailsRow>
          <div>
            <label>(MM)</label>
            <input type="text" />
          </div>

          <div>
            <label>(CVV)</label>
            <input type="text" />
          </div>
        </CardDetailsRow>
      </form>
    </Container>
  );
}
