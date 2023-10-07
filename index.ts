import express, { Express, Request, Response } from 'express';
import {createProxyMiddleware} from "http-proxy-middleware";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const CHATGPT_URL = "https://chat.openai.com/"
app.get('/', (req: Request, res: Response) => {
    res.send('GPT Proxy');
});

app.use('/chat', createProxyMiddleware({
  target: CHATGPT_URL,
  changeOrigin: true,
    pathRewrite: {
        [`^/chat`]: '',
    }
}));

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
