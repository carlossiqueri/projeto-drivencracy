import { Router } from "express";
import { validateChoicesSchema } from "../middlewares/choices.middleware.js";
import { choicesSchema } from "../schemas/choices.schemas.js";
import { createChoice } from "../controllers/choices.controllers.js";

const choicesRouter = Router();

choicesRouter.post(
  "/choice",
  validateChoicesSchema(choicesSchema),
  createChoice
);

export default choicesRouter;
