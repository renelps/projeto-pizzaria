import styled from 'styled-components';
import Qrcode from '../../assets/images/qr-code.png';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 300px;
  }

  p {
    color: white;
    padding: 12px 0;
  }

  span {
    color: white;
    max-width: 300px;
    text-align: center;
  }
`;

export function PixPaymentForm() {
  return (
    <Container>
      <img src={Qrcode} alt="pix" />
      <p>Aproxime a Camera do celular</p>
      <span>QR Code de demonstração – ao escanear, você será redirecionado ao meu perfil no LinkedIn.</span>
    </Container>
  );
}
