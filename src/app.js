import expresss from "express";
import cors from "cors";
import route from "./routes/index.routes.js";

// Criação do servidor
const app = expresss();

// Configurações do servidor
app.use(expresss.json());
app.use(cors());
app.use(route);

// Configuração da porta do servidor
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
