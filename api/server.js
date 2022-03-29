var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var xhub = require("express-x-hub");

//Const
var xhubSecret = "SHA256:mjr+czigDZoIilGDd+ors1feZO1eg6L6h6/fhj+14HY";
var port = "8085";
var host = "127.0.0.1";

//Secret key
app.use(xhub({ algorithm: "sha1", secret: xhubSecret }));

// Configure express json
app.use(bodyParser.json());

// Add default route
app.post("/webhook", function(req, res) {
  if (!req.isXHubValid()) {
    res.status(400).send("Invalid X-Hub Request");
    console.log("Secret key is invalid");
    return;
  }

  var command = req.headers["x-github-event"];
  console.log(res)

  switch (command) {
    //Event create (Branch, or tag created)
    case "create":
      res.send("Event create trigger");
      console.log("Create event");
      break;

    //Event release (Release published in a repository)
    case "release":
      res.send("Event release trigger");
      console.log("Release Event");
      break;

    //Event push (Push in a repository)
    case "push":
      res.send(res.body);
      console.log("push Event");
      break;

    //Event Push (Repository published in a repository)
    case "repository":
      res.send("Event repository trigger");
      console.log("Repository Event");
      break;

    default:
      res.status(400).send("Event not supported : " + command);
      console.log("Event not supported : " + req.headers["X-Github-Event"]);
    }
});

// Main : Start the express http server
var server = app.listen(port, host, function() {
    console.log(
      "App listening at http://%s:%s",
      server.address().address,
      server.address().port,
    );
  });