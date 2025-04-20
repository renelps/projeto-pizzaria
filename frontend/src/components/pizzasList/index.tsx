import { useContext } from "react";
import styled from "styled-components"
import { PizzasContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { FormatIngredientes } from "../../utils/formatIngredientes";
import { FormatPrice } from "../../utils/formatPrice";
import { StarIcon } from "../icons/starIcon";


const PizzasSection = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  width: 100%;
  padding: 20px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 12px;
  width: 100%;
  justify-content: center;

  a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    outline: none;
  }
  @media ${({theme}) => theme.media.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${({theme}) => theme.media.sm} {
    grid-template-columns: repeat(2, 1fr); 
  }
`;

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  color: #FF9C00;
  font-weight: 400;
  font-style: italic;
  text-align: center;
  margin-bottom: 10px;

  @media ${({theme}) => theme.media.md} {
    font-size: 18px;
  }

`
const Card = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  max-width: 400px;
  max-height: 400px;
  height: 100%;
  padding: 10px 8px;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
`
const CardImage = styled.img`
  max-width: 100%;
  border-radius: 8px;

`
const CardName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #3b3b3b;
  font-size: 17px;
  padding: 10px 0 3px 0;

  @media ${({theme}) => theme.media.md} {
    font-size: 13px;
  }

`
const CardIngredientes = styled.p`
  font-family: "Lato", sans-serif;
  color: #808080;
  font-style: italic;
  margin-bottom: 13px;
  text-align: center;
  padding: 0 3px;
  font-size: 15px;

  @media ${({theme}) => theme.media.md} {
    font-size: 12px;
    margin-bottom: 3px;
  }

`
const CardFooter = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 10px;
  font-size: 16px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #696969;
  margin-top: auto;

  @media ${({theme}) => theme.media.md} {
    font-size: 12px;
    padding: 2px 10px;
  }
`

const PriceText = styled.span``


const PopularityWrapper = styled.span`
  display: flex;
  align-items: center;
`


export function PizzaList() {

  const {pizzas} = useContext(PizzasContext)
  const navigate = useNavigate()




  return (
    <PizzasSection>
      <Title>Conheça nossos Cardápios</Title>
      <Grid>
        {pizzas.length > 0 && pizzas.map((item) => (
          <Card key={item._id} onClick={() => navigate(`/detail/${item._id}`)}>
            <CardImage src={item.imagem} alt={item.nome} />
            <CardName>{item.nome}</CardName>
            <CardIngredientes>{FormatIngredientes(item.ingredientes, 10)}</CardIngredientes>
              <CardFooter>
                <PriceText>{FormatPrice(item.preco)}</PriceText>
                <PopularityWrapper>{item.popularidade}<StarIcon/></PopularityWrapper>
              </CardFooter>
          </Card>
      ))}
      </Grid>
  </PizzasSection>
  )
}