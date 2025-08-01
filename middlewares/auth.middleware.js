import { JWT_SECRET } from "../config/env"; 
import JWT from "jsonwebtoken";

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId) ;
        if(!user) return res.status(401).json({ message: 'Not authorized, user not found' });

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }