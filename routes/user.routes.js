import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller';
import { getUser } from '../controllers/user.controller';
import { createUser } from '../controllers/user.controller';
import { updateUser } from '../controllers/user.controller';
import { deleteUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

userRouter.get('/:id', (req, res) => res.send( {title: 'GET user details'}));

userRouter.post('/', (req, res) => res.send( {title: 'CREATE new user'}));

userRouter.put('/:id', (req, res) => res.send( {title: 'UPDATE user'}));

userRouter.delete('/:id', (req, res) => res.send( {title: 'DELETE user'}));


export default userRouter;