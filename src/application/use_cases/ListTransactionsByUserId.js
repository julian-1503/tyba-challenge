"use strict";

module.exports = async (userId, { transactionRepository }) => {
  const result = await transactionRepository.findByUserId(userId);
  return result;
};
