const getNumbers = (res, digits) => {
  const d = parseInt(digits)
  const getNumber = () => String(parseInt(Math.random() / Math.pow(10, -d)));

  return [getNumber(), getNumber()];
};

const solve = (trainingType, number1, number2) => {
  const n1 = parseInt(number1)
  const n2 = parseInt(number2)

  switch (trainingType) {
    case "addition":
      return n1 + n2;
    case "subtraction":
      return n1 - n2;
    case "multiplication":
      return n1 * n2;
    case "division":
      return n1 / n2;
  }
};

module.exports = { getNumbers, solve };
