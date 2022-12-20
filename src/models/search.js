import mongoose from "mongoose";

const SearchSchema = new mongoose.Schema({
    name: {
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
    }
});

const Search = mongoose.model("Search", SearchSchema);

export default Search;