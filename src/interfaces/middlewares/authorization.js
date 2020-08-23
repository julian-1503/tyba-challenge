const VerifyAccessToken = require("../../application/use_cases/VerifyAccessToken");

module.exports = (req, res, next) => {
  const serviceLocator = req.serviceLocator;

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const accessToken = authorizationHeader
    .replace(/Bearer/gi, "")
    .replace(/ /g, "");

  try {
    const { uid } = VerifyAccessToken(accessToken, serviceLocator);

    if (uid) {
      req.authenticatedUser = uid;
      return next();
    }

    res.sendStatus(401);
  } catch (err) {
    return res.sendStatus(401);
  }
};
