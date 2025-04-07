import styled from "styled-components"
import Image from '../../assets/images/mahsa-shamshiri-fard-32XPRn5hWX0-unsplash.jpg';
import { useEffect, useState } from "react";
import { StarIcon } from "../../components/icons/starIcon";
import axios from "axios";

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;


`

const ImageSection = styled.section`
  width: 100%;
  height: 400px;
  background-image: url(${Image});
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

`

const PizzasSection = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  width: 100%;
  padding: 20px;

  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

`

const PizzaCard = styled.div`
 display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;

  img {
    max-width: 100%;
    border-radius: 8px;
  }

  > p {
    font-size: 20px;
    padding: 10px 0;
  }

  p:nth-of-type(2) { 
    color: #808080;
    text-align: center;
    padding: 0 10px;
    font-size: 17px;
  }

  div {
    display: flex;
    width: 100%;
    padding: 5px 10px;
    font-size: 16px;
    align-items: center;
    justify-content: space-between;

    p:nth-of-type(2) { 
      display: flex;
      align-items: center;
  }
  }

  
`


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px;
  width: 100%;
  justify-content: center;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr); 
  }
`;


interface PizzasProps {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  popularidade: number;
  imagem: string;
  ingredientes: string;
}

export function Home() {
  const [pizzas, setPizzas] = useState<PizzasProps[]>([])


  useEffect(() => {
    axios.get("http://localhost:5000/api/pizzas")
    .then((response) => setPizzas(response.data))
    .catch((error) => console.error("Error ao buscar pizzas", error))
  }, [])


  return (
    <Container>
      <ImageSection>

      </ImageSection>

      <PizzasSection>
        <h2>Pizzas</h2>

          <Grid>

            {pizzas.length > 0 && pizzas.map((item) => (
              <PizzaCard key={item._id}>
                <img src={`http://localhost:5000${item.imagem}`} alt={""} />
                <p>{item.nome}</p>
                <p>{item.ingredientes.slice(0, 5)}{item.ingredientes.length > 20 && '...'}</p>
                  <div>
                    <p>Preco: {item.preco}</p>
                    <p>{item.popularidade}<StarIcon/></p>
                  </div>
              </PizzaCard>
            ))}

          </Grid>
      </PizzasSection>

      <section>
      </section>
    </Container>
  )
}