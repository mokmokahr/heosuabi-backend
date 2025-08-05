import express from 'express';

const userRouter = express.Router();

userRouter.post('/about', (req, res) => {
    res.json({ message: 'About page' });
});

export default userRouter;