import { createPoll } from "../controllers/poll.controllers.js";
import { getPoll } from "../controllers/poll.controllers.js";
import { pollSchema } from "../schemas/poll.schema.js";
import { validateSchema } from "../middlewares/pollSchema.middleware.js";

import { Router } from "express";

const pollRouter = Router();

pollRouter.post("/poll", validateSchema(pollSchema), createPoll);
pollRouter.get("/poll", getPoll);

export default pollRouter;
