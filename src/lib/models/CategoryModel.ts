import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true,
    }
})

const CategoryModel = mongoose.models.Category || mongoose.model("category", CategorySchema);

export  default CategoryModel