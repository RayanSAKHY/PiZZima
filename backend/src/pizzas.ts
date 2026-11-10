import { createStore } from "./store.js";

export type Pizza = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const store = createStore<Pizza>("pizzas.json");

export function findAllPizzas(): Pizza[] {
  return store.all();
}

export function findPizzaById(id : number): Pizza {
  let pizza = store.all().find(pizza => pizza.id === id)
  if (pizza === undefined ) throw Error; 
  return pizza;
}

export function findPizzaByName(name:string): Pizza {
  let pizza = store.all().find(pizza => pizza.name.includes(name))
  if (pizza === undefined ) throw Error; 
  return pizza;
}

// 👉 Étape 2 : createPizza / updatePizza / deletePizza
//    Pensez à appeler store.save(...) pour persister vos changements.
