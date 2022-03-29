import express from 'express';
import bodyParser from "body-parser";
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();

const port = "8085";
const host = "127.0.0.1";

//Secret key

app.get("/",(req,res)=>{
  res.status(200).send('hey')
})

// Configure express json
app.use(bodyParser.json());

console.log(process.env.WEBHOOK_ENDPOINT)
// Add default route
app.post("/webhook", function(req, res) {

  const command = req.headers["x-github-event"];

  console.log(req.body)

  
  let text = '';

  switch (command) {
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
      // in req.body
      // [ 'action', 'changes', 'repository', 'sender' ]
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

// Main : Start the express http server
const server = app.listen(port, host, function() {
    console.log(
      "App listening at http://%s:%s",
      server.address().address,
      server.address().port,
    );
  });