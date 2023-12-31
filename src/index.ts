import express, { Express, Request, Response } from 'express';
import {createProxyMiddleware} from "http-proxy-middleware";
import dotenv from 'dotenv';
import {SocksProxyAgent} from 'socks-proxy-agent';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
//const WARP_PROXY = process.env.WARP_PROXY;
const CHATGPT_URL = "https://chat.openai.com/"
// Create a SOCKS5 proxy agent
  //const SockAgent = new SocksProxyAgent(WARP_PROXY!);

// Middleware to modify CSP headers
function modifyCSPHeaders(proxyRes: any, req: Request, res: Response) {
    if (proxyRes.headers['content-security-policy']) {
      proxyRes.headers['content-security-policy'] = proxyRes.headers['content-security-policy'].replace(
        "'self'",
        "'self' 'unsafe-inline'"
      );
    }
  }

app.get('/', (req: Request, res: Response) => {
    res.send('GPT Proxy');
});



app.use('/chat', createProxyMiddleware({
  target: CHATGPT_URL,
  changeOrigin: true,
   // agent: SockAgent,
    pathRewrite: {
        [`^/chat`]: '',
    },
    onProxyRes: modifyCSPHeaders,
}));

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
