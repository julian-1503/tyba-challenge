"use strict";

module.exports = async (city, page, pageSize, { RestaurantsRepository }) => {
  const result = await RestaurantsRepository.findNear(city, page, pageSize);
  return result;
};
