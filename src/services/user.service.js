import User from "../models/user.js";

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
    id,
    name,
    email,
    password
) => User.findOneAndUpdate(
    { _id: id },
    { name, email, password }
);


export default {
    createService,
    findAllService,
    findByIdService,
    
};