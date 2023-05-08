import { db } from "../database/database.config.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export const createChoice = async (req, res) => {
  const { title, pollId } = req.body;
  try {
    const poll = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(pollId) });
    const choice = await db.collection("choices").findOne({ title: title });
    const date = poll.expireAt;
    const newDate = dayjs(date);

    // Validações
    if (!poll) return res.sendStatus(404);
    if (newDate.isBefore(dayjs())) return res.sendStatus(403);
    if (choice) return res.sendStatus(409);

    // Cria a choice
    await db
      .collection("choices")
      .insertOne({ title, pollId: new ObjectId(pollId) });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getChoice = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await db
      .collection("choices")
      .find({ pollId: new ObjectId(id) })
      .toArray();

    if (poll.length === 0) return res.sendStatus(404);

    res.status(200).send(poll);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const creatVote = async (req, res) => {
  const { id } = req.params;
  try {
    const choiceOfVote = await db
      .collection("choices")
      .findOne({ _id: new ObjectId(id) });

    if (choiceOfVote == null) return res.sendStatus(404);
    const choiceId = choiceOfVote._id;
    const votingPoll = await db
      .collection("polls")
      .findOne({ _id: choiceOfVote.pollId });

    const createdAt = dayjs().format("YYYY-MM-DD HH:mm");

    if (!dayjs(createdAt).isBefore(dayjs(votingPoll.expireAt)))
      return res.sendStatus(403);

    const vote = await db
      .collection("votes")
      .insertOne({ createdAt, choiceId });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
