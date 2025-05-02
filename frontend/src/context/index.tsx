import { createContext, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';

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
  pizzas: PizzaProps[];
  loadingPizzas: boolean;
  // eslint-disable-next-line no-unused-vars
  addToCart: (pizza: PizzaProps) => void;
  handleAddToCart: PizzaProps[];
  qtdCart: number;
  // eslint-disable-next-line no-unused-vars
  incrementPizza: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  decrementPizza: (id: string) => void;
  total: number;
}

interface PizzasProviderProps {
  children: ReactNode;
}

export const PizzasContext = createContext({} as PizzasContextData);

function PizzasProvider({ children }: PizzasProviderProps) {
  const [pizzas, setPizzas] = useState<PizzaProps[]>([]);
  const [loadingPizzas, setLoadingPizzas] = useState(true);
  const [handleAddToCart, setHandleAddToCart] = useState<PizzaProps[]>([]);
  const [total, setTotal] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function loadPizzas() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pizzas`);
        setPizzas(response.data);
      } catch (err) {
        console.log('Erro ao buscar pizzas:', err);
      } finally {
        setLoadingPizzas(false);
      }
    }

    loadPizzas();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    const total = handleAddToCart.reduce((acc, item) => {
      return acc + item.preco * item.qtd;
    }, 0);

    setTotal(total);

    localStorage.setItem('@pizzaria:cart', JSON.stringify(handleAddToCart));
  }, [handleAddToCart, isInitialized]);

  useEffect(() => {
    const cart = localStorage.getItem('@pizzaria:cart');

    if (cart) {
      setHandleAddToCart(JSON.parse(cart));
    }

    setIsInitialized(true);
  }, []);

  function addToCart(pizza: PizzaProps) {
    setHandleAddToCart((prevState) => {
      const pizzaAlreadyInCart = prevState.find((item) => item._id === pizza._id);

      if (pizzaAlreadyInCart) {
        return prevState.map((item) =>
          item._id === pizza._id ? { ...item, qtd: item.qtd + 1, total: (item.qtd + 1) * item.preco } : item,
        );
      } else {
        return [...prevState, { ...pizza, qtd: 1, total: pizza.preco }];
      }
    });
  }

  function incrementPizza(id: string) {
    setHandleAddToCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, qtd: item.qtd + 1, total: (item.qtd + 1) * item.preco } : item,
      ),
    );
  }

  function decrementPizza(id: string) {
    setHandleAddToCart((prevState) =>
      prevState
        .map((item) => (item._id === id ? { ...item, qtd: item.qtd - 1, total: (item.qtd - 1) * item.preco } : item))
        .filter((item) => item.qtd > 0),
    );
  }

  return (
    <PizzasContext.Provider
      value={{
        pizzas,
        loadingPizzas,
        addToCart,
        handleAddToCart,
        qtdCart: handleAddToCart.length,
        incrementPizza,
        decrementPizza,
        total,
      }}
    >
      {children}
    </PizzasContext.Provider>
  );
}

export default PizzasProvider;
