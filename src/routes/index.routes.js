import { Router } from "express";
import pollRouter from "./poll.routes.js";

const route = Router();

route.use(pollRouter);

export default route;
