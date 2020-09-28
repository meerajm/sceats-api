const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";

// This will make an authentication call and validate token
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // authHeader has the value like Bearer [JWT_TOKEN] so we need only the JWT part
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports = authenticateJWT;
