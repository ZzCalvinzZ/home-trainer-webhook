const getNumbers = (res, digits) => {
  const getNumber = () => Math.floor(Math.random() / Math.pow(10, -digits));

  return [getNumber(), getNumber()];
};

module.exports = { getNumbers };
