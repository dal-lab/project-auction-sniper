require('dotenv').config();

const APP_ID = process.env.PUSHER_APP_ID || '';
const KEY = process.env.PUSHER_KEY || '';
const SECRET = process.env.PUSHER_SECRET || '';
const CLUSTER = process.env.PUSHER_CLUSTER || '';

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: APP_ID,
  key: KEY,
  secret: SECRET,
  cluster: CLUSTER,
  useTLS: true,
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/pusher/auth', (req, res) => {
  const { socket_id: socketId, channel_name: channel } = req.body;
  const data = {
    user_id: `user-${new Date().toISOString()}`,
    user_info: {},
  };
  console.log(socketId, channel, data);
  const auth = pusher.authenticate(socketId, channel, data);
  res.send(auth);
});

app.listen(process.env.PORT || 5000);
