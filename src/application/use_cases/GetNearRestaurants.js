"use strict";

module.exports = async (
  { lat, lang, cityId, pageNumber, pageSize },
  CitiesRepository
) => {
  const result = CitiesRepository.getNear({
    lat,
    lang,
    cityId,
    pageNumber,
    pageSize
  });
  return result;
};
