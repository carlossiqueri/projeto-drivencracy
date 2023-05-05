import joi from "joi";

export const choicesSchema = joi.object({
  title: joi.string().required(),
  pollId: joi.string().required(),
});

