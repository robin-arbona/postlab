const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
const functions = require('firebase-functions');
const cors = require('cors');
require('dotenv').config();


app.use(cors({ origin: true }));

app.get("/",(req,res)=>{
  res.status(200).send('hey')
})

app.use(bodyParser.json());

// Add default route
app.post("/webhook", async function(req, res) {

  const eventType = req.headers["x-github-event"];

  let text = '';

  switch (eventType) {
    //Event create (Branch, or tag created)
    case "create":
      console.log("Create event");
      break;

    //Event release (Release published in a repository)
    case "release":
      console.log("Release Event");
      break;

    //Event push (Push in a repository)
    case "push":
      console.log("push Event");
      text = `on repo ${req.body.repository.name}, new push from ${req.body.pusher.name}. Head commit message was ${req.body.head_commit.message}`;
      break;

    //Event Push (Repository published in a repository)
    case "repository":
      text = `on repo ${req.body.repository.name}, following changes have been made ${JSON.stringify(req.body.changes)}`;
      console.log("Repository Event");
      break;

    default:
      console.log("Event not supported : " + req.headers["X-Github-Event"]);
    }

  await fetch(process.env.WEBHOOK_ENDPOINT,{
    method: 'POST',
    body: JSON.stringify({text}),
    headers: {'Content-Type': 'application/json'}
  })
  

    res.status(200).send()
});


exports.app = functions.https.onRequest(app);


