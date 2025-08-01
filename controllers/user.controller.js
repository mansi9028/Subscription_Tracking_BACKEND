import User from "../models/user.model.js";    

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}