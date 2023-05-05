import dayjs from "dayjs";

export const validatePollSchema = (schema) => {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    if (req.body.expireAt == null || req.body.expireAt == "") {
      const date = dayjs().add(30, "day");
      const newDate = date.format("YYYY-MM-DD");
      req.body.expireAt = newDate;
    }

    if (req.body.title == null || req.body.title == "")
      return res.sendStatus(422);
    next();
  };
};
