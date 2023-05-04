import { Router } from "express";
import choiceRouter from "./choice.routes.js";
import pollRouter from "./poll.routes.js";

const routes = Router();

routes.use(choiceRouter);
routes.use(pollRouter);

export default routes;