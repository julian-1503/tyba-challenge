const GetAccessToken = require("../../application/use_cases/GetAccessToken");
const CreateTransaction = require("../../application/use_cases/CreateTransaction");

module.exports = {
  async getAccessToken(req, res) {
    const serviceLocator = req.serviceLocator;

    const { email, password } = req.body;

    try {
      const { accessToken, userId } = await GetAccessToken(
        email,
        password,
        serviceLocator
      );

      await CreateTransaction(req.url, req.method, userId, serviceLocator);

      res.status(200).json({ access_token: accessToken, id: userId });
    } catch (err) {
      console.error(err);
      res.sendStatus(401);
    }
  }
};
