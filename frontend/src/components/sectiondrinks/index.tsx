import styled from "styled-components"
import ImageDrinks from "../../assets/images/james-yarema-wQFmDhrvVSs-unsplash.jpg"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`

const ContainerImg = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${ImageDrinks});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  &::after {
    content: "";
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
`


export function SectionDrinks() {




  return (
    <Container> 
      <ContainerImg/>



    </Container>
  )
}