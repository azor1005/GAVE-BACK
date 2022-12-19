import Game from "../models/game.js"
import Search from "../models/search.js";
import User from "../models/user.js";

const createService = (body) => Game.create(body);

const findAllService = (offset, limit) => Game.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countGame = () => Game.countDocuments();

const findByIdGame = (id) => Game.findById(id);

const findUserName = (id) => User.findById(id);

const createSearchService = (body) => Search.create(body);

const searchAllService = () => Search.find({});

const topTreeService = (plataform) => Game.find({plataform}).sort({score: -1}).limit(3);

const createReviewService = async (
    id,
    text,
    score,
    userId,
    userName
) => {
    const games = await Game.findOne({ _id: id });
    const user = games.reviews.find((el) => el.userId === userId)
    if (user) {
        throw new Error("O usuario ja criou um review")
    }
    games.reviews.push({ text, score, userId, userName });
    const scoreAvg = games.reviews.reduce((total, next) => total + next.score, 0) / games.reviews.length;
    await Game.findOneAndUpdate(
        { _id: id },
        { reviews: games.reviews , score: scoreAvg.toFixed(2) }
    );
}

export { createService, findAllService, countGame, topTreeService, createReviewService, createSearchService, searchAllService, findByIdGame, findUserName };
