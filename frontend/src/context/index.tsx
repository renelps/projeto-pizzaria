import { createContext, ReactNode, useEffect, useState } from "react"
import axios from "axios"

export interface PizzaProps {
  _id: string;
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
  popularidade: string;
  ingredientes: string[];
  qtd: number;
  total: number;
}

interface PizzasContextData {
  pizzas: PizzaProps[]
  loadingPizzas: boolean
  addToCart: (pizza: PizzaProps) => void;
  handleAddToCart: PizzaProps[];
  qtdCart: number;
}

interface PizzasProviderProps {
  children: ReactNode
}

export const PizzasContext = createContext({} as PizzasContextData)

function PizzasProvider({ children }: PizzasProviderProps) {
  const [pizzas, setPizzas] = useState<PizzaProps[]>([])
  const [loadingPizzas, setLoadingPizzas] = useState(true)
  const [handleAddToCart, setHandleAddToCart] = useState<PizzaProps[]>([])
  useEffect(() => {
    async function loadPizzas() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pizzas`)
        setPizzas(response.data)
      } catch (err) {
        console.log("Erro ao buscar pizzas:", err)
      } finally {
        setLoadingPizzas(false)
      }
    }

    loadPizzas()
  }, [])


  function addToCart(pizza: PizzaProps) {
    const indexRef = handleAddToCart.findIndex(item => item._id === pizza._id)
    if(indexRef !== -1) return;

    setHandleAddToCart(pizzas => [...pizzas, pizza])
  }

  return (
    <PizzasContext.Provider value={{ 
      pizzas,
      loadingPizzas,
      addToCart,
      handleAddToCart,
      qtdCart: handleAddToCart.length

    }}>
      {children}
    </PizzasContext.Provider>
  )
}

export default PizzasProvider