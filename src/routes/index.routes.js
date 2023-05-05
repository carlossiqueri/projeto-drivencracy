import { Router } from "express";
import pollRouter from "./poll.routes.js";
import choicesRouter from "./choices.routes.js";

const route = Router();

route.use(pollRouter);
route.use(choicesRouter);

export default route;
