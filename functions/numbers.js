const getNumbers = (digits, trainingType) => {
  const d = parseInt(digits);
  const getNumber = () => String(parseInt(Math.random() / Math.pow(10, -d)));

  const n1 = getNumber();
  const n2 = getNumber();

  const highNumber = n1 > n2 ? n1 : n2;
  const lowNumber = n2 >= n1 ? n2 : n1;

  if (["subtraction", "division"].includes(trainingType)) {
    return {
      number1: highNumber,
      number2: lowNumber
    };
  }

  return { number1: n1, number2: n2 };
};

const solve = (trainingType, number1, number2) => {
  const n1 = parseInt(number1);
  const n2 = parseInt(number2);

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
