import { db } from "../database/database.config.js";
import { ObjectId } from "mongodb";

export const getResult = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(id) });
    if (!poll) return res.sendStatus(404);

    const choices = await db
      .collection("choices")
      .find({ pollId: new ObjectId(id) })
      .toArray();
    let totalVotes = 0;
    let resultTitle = "Não há votos registrados nessa enquete!";
    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i];
      const votes = await db
        .collection("votes")
        .find({ choiceId: choice._id })
        .toArray();
      if (votes.length > totalVotes) {
        totalVotes = votes.length;
        resultTitle = choice.title;
      }
    }

    const result = {
      poll,
      result: { title: resultTitle, votes: totalVotes },
    };

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
