import { useContext } from "react"

import { useParams } from "react-router-dom"
import styled from "styled-components"
import { StarIcon } from "../../components/icons/starIcon"
import { FormatPrice } from "../../utils/formatPrice"
import { CartIcon } from "../../components/icons/cart-icon"
import { PizzaProps, PizzasContext } from "../../context"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 40px);
  overflow-y: auto;

`

const SubContainer = styled.div`
  display: flex;
  border: 1px solid black;
  padding: 10px;
  border-radius: 3px;
  justify-content: space-between;
  > img {
    max-width: 700px;
    border-radius: 3px;
  }


  @media ${({theme}) => theme.media.md} {
    > img {
      width: 100%;
    }


    flex-direction: column;
  }


  @media ${({theme}) => theme.media.xl} {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 100%;

    flex-direction: column

  }

`

const ContainerDetail = styled.div`
  max-width: 340px;

  padding: 30px 3px 0 3px;


  @media ${({theme}) => theme.media.xl} {
    max-width: 700px;
    width: 100%;
  }
`;

const PizzaName = styled.p`
padding: 2px 15px;
font-size: 20px;
font-family: "Poppins", sans-serif;
color: #FF9C00;
font-weight: 400;
font-style: italic;
text-align: center;
margin-bottom: 10px;
`;
const PizzaIngredients = styled.p`
  text-align: center;
  color: #525252;
  font-size: 15px;
  font-style: italic; 
  padding: 10px 0;
  font-family: "Poppins", sans-serif;;

`;


const PizzaDescription = styled.p`
  font-family: "Lato", sans-serif;
  color: #808080;
  font-style: italic;
  margin-bottom: 13px;
  text-align: justify;
  padding: 0 3px;
  font-size: 15px;
`;

const ContainerFooterCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  gap: 5px;
  padding-bottom: 20px;
  margin-top: auto;

  > button {
    display: flex;
    cursor: pointer;
    gap: 2px;
    font-weight: 700px;
    align-items: center;
    justify-content: center;
    border: 1px solid #717171;
    font-size: 15px;
    width: 100%;
    border: none;
    border-radius: 3px;
    padding: 5px 0;
  }
`

const ContainerPriceAndPopularity = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const PizzaPrice = styled.p``

const PizzaPopularity = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
`

export function Detail() {
  const { id } = useParams()

  const { pizzas, addToCart } = useContext(PizzasContext);

  const pizza = pizzas.find(p => p._id === id)

  if (!pizza) {
    return <p>Pizza não encontrada.</p>;
  }
  
  function handleAddCart(pizza: PizzaProps) {
    addToCart(pizza)
  } 

  return (
    <Container>
      <SubContainer>
        <img src={pizza?.imagem} alt="" />

        <ContainerDetail>
          <PizzaName>{pizza?.nome}</PizzaName>
          <PizzaIngredients>Ingredientes: {pizza?.ingredientes}</PizzaIngredients>
          <PizzaDescription>{pizza?.descricao}</PizzaDescription>
          <ContainerFooterCard>
            <ContainerPriceAndPopularity>
              <PizzaPrice>{pizza?.preco ? FormatPrice(pizza?.preco) : ""}</PizzaPrice>
              <PizzaPopularity>{pizza?.popularidade} <StarIcon /></PizzaPopularity>
            </ContainerPriceAndPopularity>
            <button onClick={ () => handleAddCart(pizza)}>
              <CartIcon />
              Adicionar a sacola
            </button>
          </ContainerFooterCard>

        </ContainerDetail>

      </SubContainer>
    </Container>
  )
}