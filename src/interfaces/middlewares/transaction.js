const CreateTransaction = require("../../application/use_cases/CreateTransaction");

module.exports = async (req, res, next) => {
  const serviceLocator = req.serviceLocator;

  const { url, method, authenticatedUser } = req;

  try {
    await CreateTransaction(url, method, authenticatedUser, serviceLocator);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
