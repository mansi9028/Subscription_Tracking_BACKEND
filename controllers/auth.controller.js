import { mongoose } from "mongoose"

export const signUp = async (req, res, next) => {
    const session = await mongo.startSession();
    session.startTransaction();

    try {
        



        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return next(error);
    }
}

export const signIn = async (req, res, next) => {}

export const signOut = async (req, res, next) => {