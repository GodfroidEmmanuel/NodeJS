module.exports = function (app) {
  const jsonfile = require("jsonfile");
  app.get("/users", (req, res) => {
    console.log("fetching all users");

    // jsonfile reading
    jsonfile.readFile("./DB/users.json", function (err, content) {
      // send file contents back to sender
      res.send(content);
    });
  });

  /* post*/
  /*app.post("/users/new", (req, res) => {
      
      let email = req.body.email
      let username = req.body.username

      jsonfile.readFile("./DB/users.json", function (err, content) {

          content.push({ email: email, username: username });

          console.log("added " + email + "to DB");

          jsonfile.writeFile("./DB/users.json", content, function (err) {
              console.log(err);
          });

          res.sendStatus(200);
      });
  });*/

  /*ES6 post*/
  const file_path = "./DB/users.json";

  app.post("/users/new", (req, res) => {

    let { email, username } = req.body;

    jsonfile.readFile(file_path, function (err, content) {

      content.push({ email, username });

      console.log("added " + email + "to DB");

      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  /* delete dans json*/
  app.delete("/users/destroy", (req, res) => {

    let email = req.body.email;


    jsonfile.readFile(file_path, function (err, content) {

      for (let i = content.length - 1; i >= 0; i--) {

        if (content[i].email === email) {
          console.log("removing " + content[i].email + "from DB");
          content.pop(i);
        }

      }

      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  /*PUT changer une donnée d'une base*/
  /*tant que je n'avais pas mis if(err) throw err, ne marchait pas */
  app.put("/user", (req, res) => {

    let user;
    let username = req.body.username;
    let email = req.query.email;



    jsonfile.readFile(file_path, (err, content) => {
      if (err) throw err
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log("update user" + email + " have changed the username" + username)
          user = content[i];
          user.username = username
        }
      }
      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });
    });
    res.send(user);
  });

  app.get("/user", (req, res) => {
    let user;
    let email = req.query.email;
  
    jsonfile.readFile(file_path, function(err, content) {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log("found user" + content[i].email);
          console.log(content[i]);
          user = content[i];
        }
      }
  
      res.send(user);
    });
  });
  /*get un user en particulier*/
  /*version de corentin mais préfère celle trouvée par moi meme par la suite*/
  /*
  app.get("/user", (req, res) => {
    let email = req.query.email;
    jsonfile.readFile(file_path, function (err, content) {
      if (err) {
        res.end();
        throw err;
      };
      for (var i = 0; i < content.length; i++) {
        console.log(content[i])
        if (content[i].email === email) {

          console.log("voici les informations pour l'adresse mail" + content[i]);
          res.status(200).json(content[i])
        }
      }
    });
  });*/
}