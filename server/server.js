const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => {
  console.log(`MONGOOSE ERROR: ${error}`);
});

const MessageSchema = mongoose.Schema({
  channel: String,
  text: String,
  user: String,
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

const MessageModel = mongoose.model("Message", MessageSchema);

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.get("/channel/:id", (request, response) => {
  const { id } = request.params;

  MessageModel.find({ channel: id })
    .then((messages) => {
      response.status(200).json({ messages });
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post("/channel/:id", (request, response) => {
  const { id } = request.params;
  const { text, user } = request.body;

  if (text && user) {
    MessageModel.create({ user, text, channel: id })
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  } else {
    response.status(400).json({ error: "missing some parameters" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
