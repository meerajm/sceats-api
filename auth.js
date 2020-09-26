const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";

/**
 * This will make an authentication call and validate token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
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
