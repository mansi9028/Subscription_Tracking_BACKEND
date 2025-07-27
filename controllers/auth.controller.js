import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import {jwt} from "jsonwebtoken";
import { JWT_EXPIRES_IN } from "../config/env.js";


export const signUp = async (req, res, next) => {
    const session = await mongo.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create([{ name, email, password: hashedPassword }], {session});

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "User created successfully",
            userId: user._id,
            token: token
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return next(error);
    }
}

export const signIn = async (req, res, next) => {}

export const signOut = async (req, res, next) => {}