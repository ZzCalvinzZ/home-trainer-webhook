var express = require("express");
var get = require("lodash.get");
var { getNumbers, solve } = require("../functions/numbers");
var router = express.Router();

/* GET home page. */
router.post("/", function(req, res, next) {
  console.log(req.body);
  const queryResult = get(req, ["body", "queryResult"], {});
  const action = get(queryResult, ["action"], "");
  const { trainingType, digits, number1, number2, userSolution } = get(
    queryResult,
    ["parameters"],
    {}
  );
  const conjunctionMap = {
    addition: "plus",
    subtraction: "minus",
    multiplication: "times",
    division: "divided by"
  };

  if (action === "math_training_get_numbers") {
    const { number1, number2 } = getNumbers(digits, trainingType);

    res.json({
      followupEventInput: {
        name: "math_training_say_add_numbers",
        parameters: {
          conjunction: conjunctionMap[trainingType],
          number1,
          number2
        },
        languageCode: "en"
      }
    });
  } else if (action === "math_training_say_solution") {
    console.log("blumbo", trainingType, number1, number2, userSolution);
    const solution = solve(trainingType, number1, number2);
    const correct = solution === userSolution;
    const { number1, number2 } = correct
      ? getNumbers(res, digits)
      : { number1, number2 };

    res.json({
      followupEventInput: {
        name: correct
          ? "math_training_correct_solution"
          : "math_training_incorrect_solution",
        parameters: {
          number1: number1,
          number2: number2,
          conjunction: conjunctionMap[trainingType],
          solution: String(solution)
        },
        languageCode: "en"
      }
    });
  } else {
    res.status(404).json({ error: "Invalid Intent name!" });
  }
});

module.exports = router;
