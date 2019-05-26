const getNumbers = (res, digits) => {
  const getNumber = () => Math.floor(Math.random() / Math.pow(10, -digits));

  return [getNumber(), getNumber()];
};

const solve = (trainingType, number1, number2) => {
  switch (trainingType) {
    case "addition":
      return number1 + number2;
    case "subtraction":
      return number1 - number2;
    case "multiplication":
      return number1 * number2;
    case "division":
      return number1 / number2;
  }
};

module.exports = { getNumbers, solve };
