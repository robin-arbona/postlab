import express from 'express';
import bodyParser from "body-parser"
import fetch from 'node-fetch';

const app = express();


var port = "8085";
var host = "127.0.0.1";

//Secret key

// Configure express json
app.use(bodyParser.json());

// Add default route
app.post("/webhook", function(req, res) {

  var command = req.headers["x-github-event"];

  console.log(req.body)

  console.log(Object.keys(req.body))

  const resp = fetch('https://hooks.slack.com/services/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',{
    method: 'POST',
    body: JSON.stringify({text: command}),
	  headers: {'Content-Type': 'application/json'}
  })


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
      // in req.body :
      // [
      //   'ref',         'before',
      //   'after',       'repository',
      //   'pusher',      'sender',
      //   'created',     'deleted',
      //   'forced',      'base_ref',
      //   'compare',     'commits',
      //   'head_commit'
      // ]
      console.log("push Event");
      break;

    //Event Push (Repository published in a repository)
    case "repository":
      // in req.body
      // [ 'action', 'changes', 'repository', 'sender' ]
      console.log("Repository Event");
      break;

    default:
      console.log("Event not supported : " + req.headers["X-Github-Event"]);
    }

    res.status(200).send()
});

// Main : Start the express http server
var server = app.listen(port, host, function() {
    console.log(
      "App listening at http://%s:%s",
      server.address().address,
      server.address().port,
    );
  });