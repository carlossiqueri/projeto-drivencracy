import { createPoll } from "../controllers/poll.controllers.js";
import { getPoll } from "../controllers/poll.controllers.js";
import { pollSchema } from "../schemas/poll.schema.js";
import { validatePollSchema } from "../middlewares/pollSchema.middleware.js";
import { getChoice } from "../controllers/choices.controllers.js";
import { creatVote } from "../controllers/choices.controllers.js";
import { getResult } from "../controllers/poll-result.controllers.js";

import { Router } from "express";

const pollRouter = Router();

pollRouter.post("/poll", validatePollSchema(pollSchema), createPoll);
pollRouter.get("/poll", getPoll);
pollRouter.get("/poll/:id/choice", getChoice);
pollRouter.post("/choice/:id/vote", creatVote);
pollRouter.get("/poll/:id/result", getResult);

export default pollRouter;
