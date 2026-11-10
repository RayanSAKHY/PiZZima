import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import { findAllPizzas, findPizzaById, findPizzaByName } from "./pizzas.js";

const PORT = 8080;

const app = express();

// Le front tourne sur un autre port (5173) : sans CORS, le navigateur
// bloquerait les appels. On en reparle dans la séance sécurité.
app.use(cors());
app.use(express.json());

app.get("/api/pizzas", (request, response) => {
  response.json(findAllPizzas());
});

app.get("/api/pizzas/:id", (request, response) => {
  try {
    let pizza = findPizzaById(Number(request.params.id));
    response.json(pizza);
  }
  catch (e) {
    response.status(404).json({ error: `Route inconnue : ${request.originalUrl}` });
  }
})

app.get("/api/pizzas", (request, response) => {
  try {
    let pizza = findPizzaByName(String(request.query.search));
    response.status(400).json(pizza);
  }
  catch (e) {
    response.status(404).json({ error: `Route inconnue : ${request.originalUrl}` });
  }
})

// 👉 Étape 2 : POST, PUT et DELETE sur /api/pizzas
// 👉 Étape 4 : POST /api/orders

// Aucune route n'a répondu : c'est un 404.
app.use((request, response) => {
  response.status(404).json({ error: `Route inconnue : ${request.originalUrl}` });
});

// Express 5 attrape aussi les erreurs des handlers async et les envoie ici.
const handleError: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error);
  response.status(500).json({ error: "Erreur serveur" });
};
app.use(handleError);

app.listen(PORT, () => {
  console.log(`🍕 API Pizzima sur http://localhost:${PORT}/api/pizzas`);
});
