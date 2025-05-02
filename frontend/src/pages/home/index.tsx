import styled from 'styled-components';
import Image from '../../assets/images/mahsa-shamshiri-fard-32XPRn5hWX0-unsplash.jpg';
import { PizzaList } from '../../components/pizzasList';

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ImageSection = styled.section`
  width: 100%;
  height: 400px;
  background-image: url(${Image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media (min-width: 1200px) {
    height: 500px;
  }
`;

export function Home() {
  return (
    <Container>
      <ImageSection />
      <PizzaList />
    </Container>
  );
}
