import { Router } from 'express';
import { signUp } from '../controllers/auth.controller';
import { signIn } from '../controllers/auth.controller';
import { signOut } from '../controllers/auth.controller';


const authRouter = Router();


authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);



export default authRouter;
