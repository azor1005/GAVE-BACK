import userService from "../services/user.service.js";


const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).send({ message: "Preencha todos os campos para completar o cadastro." })
        }

        const user = await userService.createService(req.body);

        if (!user) {
            return res.status(400).send({ message: "Erro ao criar o Usuario." });
        }


        res.status(201).send({
            user: {
                id: user._id,
                name,
                email,
                password
            },
            message: "O usuario foi criado com sucesso!"
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService();

        if (users.lenght === 0) {
            return res.status(400).send({ message: "Nao ha usuarios cadastrados." });
        }

        res.send(users)
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const findById = async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const update = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name && !email && !password) {
            res.status(400).send({ message: "Preencha pelo menos um campo para completar a alteracao." });
        }

        const { id, user } = req;

        await userService.updateService(
            id,
            name,
            email,
            password
        )

        res.send({ message: "Usuario atualizado com sucesso!" })
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
};

export default { create, findAll, findById, update }; 