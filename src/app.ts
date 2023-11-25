import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/uesr.route';
const app = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to our database',
  });
});

export default app;
