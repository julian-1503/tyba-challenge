"use strict";

module.exports = async ({ userRepository }) => {
  const result = await userRepository.find();
  return result;
};
