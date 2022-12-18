import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    resume: {
        type: String,
        require: true,
    },
    developed: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    plataform: {
        type: Array,
        require: true,
    },
    score: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reviews: {
        type: Array,
    }
});

const Game = mongoose.model("Game", GameSchema);

export default Game;