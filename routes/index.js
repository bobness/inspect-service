var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { getUserData, getSourceData } = require("../middleware/functions");

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { username, email, password } = req.body;

    // Validate user input
    if (!(email && password && username)) {
      return res
        .status(200)
        .send({ message: "All input is required", code: 400 });
    }

    // check if user already exist
    // Validate if user exist in our database
    const result = await req.client.query(
      "SELECT * FROM users WHERE email='" + email + "'"
    );
    const oldUser = result.rows;
    if (oldUser && oldUser.length > 0) {
      return res
        .status(200)
        .send({ message: "User Already Exist. Please Login", code: 400 });
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    await req.client.query(
      "INSERT INTO users (id, username, email, password) VALUES (" +
        (oldUser ? oldUser.length + 1 : 1) +
        ", '" +
        username +
        "', '" +
        email.toLowerCase() +
        "', '" +
        encryptedPassword +
        "')"
    );
    const user = result[0];
    // Create token
    const token = jwt.sign(
      { user_id: user.id, email, username: user.username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res
        .status(200)
        .send({ message: "All input is required", code: 400 });
    }
    // Validate if user exist in our database
    const result = await req.client.query(
      "SELECT * FROM users WHERE email='" + email + "'"
    );
    if (!result.rows) {
      return res
        .status(200)
        .send({ message: "User does not Exist. Please register", code: 400 });
    }
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.id, email, username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    res.status(200).send({ message: "Invalid Credentials", code: 400 });
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
});

router.get("/search", auth, async (req, res) => {
  const keywordLowerCase = req.query.keyword.toLocaleLowerCase();
  const result1 = await req.client.query(
    `SELECT * FROM users WHERE 
        (LOWER(email) = '${keywordLowerCase}' 
        OR 
        LOWER(username) = '${keywordLowerCase}')`
  );
  const users = result1.rows;
  const result2 = await req.client.query(
    `SELECT * FROM summaries WHERE 
        (LOWER(url) LIKE '%${keywordLowerCase}%' 
        OR 
        LOWER(title) LIKE '%${keywordLowerCase}%')`
  );
  const summaries = result2.rows;
  await Promise.all(
    summaries.map((summary) =>
      getUserData(req, summary.user_id, "avatar_uri").then(([avatar_uri]) => {
        summary.avatar_uri = avatar_uri;
      })
    )
  );
  await Promise.all(
    summaries.map((summary) =>
      getSourceData(req, summary.source_id, "logo_uri").then(([logo_uri]) => {
        summary.logo_uri = logo_uri;
      })
    )
  );
  res.status(200).json({ users, summaries });
});

module.exports = router;
