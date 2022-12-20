import { countGame, createReviewService, createSearchService, createService, findAllService, searchAllService, topTreeService, findByIdGame, findUserName, findGameFilter } from "../services/game.service.js";
import { ObjectId } from "mongoose";

const create = async (req, res) => {
    try {
        const { name, resume, developed, genre, image, plataform } = req.body;

        if (!name || !resume || !developed || !genre || !image || !plataform) {
            res.status(400).send({
                message: "Preencha todos os campos para o cadastro do jogo."
            });
        }

        await createService({
            name,
            resume,
            developed,
            genre,
            image,
            plataform,
            user: req.userId,
        });

        await createSearchService({
            name,
            developed,
            genre
        })

        res.send(201);
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }

};

const findAll = async (req, res) => {
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
        limit = null;
    }

    if (!offset) {
        offset = null;
    }

    const game = await findAllService(offset, limit);
    const total = await countGame();
    const currentUrl = req.baseUrl;



    const next = offset + limit;
    const nextUrl =
        next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
        previous != null
            ? `${currentUrl}?limit=${limit}&offset=${previous}`
            : null;

    if (game.lenght === 0) {
        return res.status(400).send({ message: "Nao ha jogos cadastrados." });
    }

    res.send({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,

        results: game.map((item) => ({
            id: item._id,
            name: item.name,
            resume: item.resume,
            developed: item.developed,
            genre: item.genre,
            image: item.image,
            plataform: item.plataform,
            score: item.score,
            reviews: item.reviews,
            user: item.user.name,
        })),
    });
};

const topTree = async (req, res) => {
    try {
        const games = await topTreeService(req.params.plataform)

        res.send({
            games
        })




    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const createReview = async (req, res) => {
    try {
        const { text, score } = req.body;
        if (!req.userId || !text || score === null || score === undefined) {
            return res.status(400).send({
                message: "Preencha todos os campos para o cadastro do review."
            });
        }
        const user = await findUserName(req.userId);
        await createReviewService(
            req.params._id,
            text,
            score,
            req.userId,
            user.name
        );
        res.send(200)
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }

};

const searchAll = async (req, res) => {

    try{const search = await searchAllService();
        const name = search.map(value => value.name)
        const developed = search.map(value=> value.developed)
        const genre = search.map(value => value.genre)
        let result = [] 
        result = result.concat(name, developed, genre)
        const removeDuplicates = (arr) => {
            return arr.filter((item, 
                index) => arr.indexOf(item) === index);
        }
        const newResult = removeDuplicates(result)
        const finalResult = newResult.map(value => {
            return {
                label: value,
            }
        })
        res.send({
        
        finalResult
    })}
    catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findById = async (req, res) => {
    try {
        const game = await findByIdGame(req.params._id);
        const userName = await findUserName (game)
        res.send(game);
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const findByFilter = async (req, res) => {
    try {
        const game = await findGameFilter(req.body.filter);
        res.send(game);
    } catch (error) {
        res.status(500).send({ message: err.message })
    }
}


export { create, findAll, topTree, createReview, searchAll, findById, findByFilter};