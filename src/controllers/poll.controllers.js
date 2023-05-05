import { db } from "../database/database.config.js";

export const createPoll = async (req, res) => {
  const { title, expireAt } = req.body;

  try {
    const poll = await db.collection("polls").insertOne({ title, expireAt })
    
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getPoll = async (req, res) => {
  try {
    const allPolls = await db.collection("polls").find({}).toArray();
    res.send(allPolls);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
