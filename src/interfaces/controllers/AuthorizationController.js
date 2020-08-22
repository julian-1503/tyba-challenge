const GetAccessToken = require("../../application/use_cases/GetAccessToken");

module.exports = {
  async getAccessToken(req, res) {
    const serviceLocator = req.serviceLocator;

    const { email, password } = req.body;

    try {
      const accessToken = await GetAccessToken(email, password, serviceLocator);

      res.status(200).json({ token: accessToken });
    } catch (err) {
      console.error(err);
      res.sendStatus(401);
    }
  }
};
