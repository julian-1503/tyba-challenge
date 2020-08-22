const GetNearRestaurants = require("../../application/use_cases/GetNearRestaurants");

module.exports = {
  async findNear(req, res) {
    const { city, pageSize, page } = req.query;
    const serviceLocator = req.serviceLocator;

    try {
      const nearRestaurants = await GetNearRestaurants(
        city,
        pageSize,
        page,
        serviceLocator
      );

      if (nearRestaurants.error) {
        return res
          .status(nearRestaurants.status)
          .json({ error: nearRestaurants.error });
      }

      res.status(200).json(nearRestaurants);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
};
