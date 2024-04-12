import express from 'express';
import { Response, Request } from "express";
import cors from 'cors';
import { MessageResponse } from 'shared';


const app = express();
app.use(cors())
app.use(express.json())



app.get('/', (req: Request, res: Response<MessageResponse>) => {
  res.json({
    message: 'Bean Bazaar  - 👋🌎🌍🌏',
  });
});


export default app;
