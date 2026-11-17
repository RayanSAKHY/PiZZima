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

export function createPizza(pizza: Omit<Pizza, "id">): Pizza {
  let maxId : number;
  if (store.empty()) maxId = 1;
  maxId = store.all().at(-1)!.id +1;

  let newPizza = {id: maxId,...pizza};
  // Générer un id (indice : le plus grand id existant + 1, et 1 si le store est vide)
  // Ajouter la pizza, appeler store.save(...), retourner la pizza créée
  store.all().concat(newPizza)
  store.save(store.all());
  return newPizza;

}

export function updatePizza(id: number, pizza: Omit<Pizza, "id">): Pizza | undefined {
  let newPizzas = store.all().map( (p) => p.id === id ? ({id, ...pizza}) : p);
  store.save(newPizzas)
  return {id: id, ...pizza};
}

export function deletePizza(id: number): boolean {
  // true si quelque chose a été supprimé, false sinon
  let oldPizzas =store.all();
  let newPizzas : Pizza[] = oldPizzas.filter((pizza) => pizza.id === id);
  store.save(newPizzas);
  return oldPizzas.length !== newPizzas.length;
}

export function parsePizzaBody(body: unknown): Omit<Pizza, "id"> | null {
  // Retourner null si ce n'est pas un objet avec :
  //   name: string non vide
  //   description: string
  //   price: number > 0
  //   image: string
  if (typeof body !== "object" || typeof body === null) return null;
  let {name, description, price, image } = body as Record<string, Object>

  if (typeof name !== "string" || name === null) return null;
  if (typeof description !== "string") return null;
  if (typeof price !== "number" || price <= 0 || !isFinite(price)) return null;
  if (typeof image !== "string") return null;
  console.log('&')

  return {name: name.trim(),description,price,image};

}