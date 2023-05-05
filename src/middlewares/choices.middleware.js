export const validateChoicesSchema = (schema) => {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    if (req.body.title == null || req.body.title == "") {
      return res.sendStatus(422);
    }
    next();
  };
};
