"use strict";

module.exports = async (userId, { userRepository }) => {
  const result = await userRepository.remove(userId);
  return result;
};
