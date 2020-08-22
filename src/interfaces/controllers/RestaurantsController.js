const GetNearRestaurants = require("../../application/use_cases/GetNearRestaurants");

module.exports = {
  async getAccessToken(req, res) {
    const { lat, lang, cityId, pageSize, pageNumber } = req.body;

    try {
      const accessToken = await GetNearRestaurants({
        lat,
        lang,
        cityId,
        pageSize,
        pageNumber
      });

      res.status(200).json({ token: accessToken });
    } catch (err) {
      console.error(err);
      res.sendStatus(401);
    }
  }
};
