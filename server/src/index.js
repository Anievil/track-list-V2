require('./server/dbMongo/mongoose');
const http = require('http');
const express = require('express');
const router = require('./server/router');
const cors = require('cors');
const handlerError = require('./server/handlerError/handler');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 9633;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '150mb' }));
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);

const server = http.createServer(app);
server.listen(PORT,
  () => console.log(`Example app listening on port ${ PORT }!`));


