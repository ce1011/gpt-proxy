"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
//const WARP_PROXY = process.env.WARP_PROXY;
const CHATGPT_URL = "https://chat.openai.com/";
// Create a SOCKS5 proxy agent
//const SockAgent = new SocksProxyAgent(WARP_PROXY!);
app.get('/', (req, res) => {
    res.send('GPT Proxy');
});
app.use('/chat', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: CHATGPT_URL,
    changeOrigin: true,
    // agent: SockAgent,
    pathRewrite: {
        [`^/chat`]: '',
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map