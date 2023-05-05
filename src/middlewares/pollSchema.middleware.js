import dayjs from "dayjs";

export const validateSchema = (schema) => {
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

    next();
  };
};
