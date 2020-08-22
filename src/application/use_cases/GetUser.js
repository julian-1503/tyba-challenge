"use strict";

module.exports = async (userId, { userRepository }) => {
  const result = await userRepository.get(userId);
  return result;
};
