const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
app.use(express.json())
const db = require('./db');
const port = process.env.PORT||3005;
app.use('/api',require('./router/router'));
app.listen(port,()=>console.log(`server running on port ${port}`));