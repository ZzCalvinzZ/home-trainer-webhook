var express = require("express");
var get = require("lodash.get");
var { getNumbers, solve } = require("../functions/numbers");
var router = express.Router();

/* GET home page. */
router.post("/", function(req, res, next) {
  const queryResult = get(req, ["body", "queryResult"], {});
  const displayName = get(queryResult, ["intent", "displayName"], "");

  console.log(queryResult);
  if (displayName === "math_training_get_numbers") {
    const { digits } = get(queryResult, ["parameters"], {});
    const { trainingType } = get(
      queryResult,
      ["outputContexts", "0", "parameters"],
      {}
    );
    const numbers = getNumbers(res, digits);

    const trainingTypeMap = {
      addition: "math_training_say_add_numbers",
      subtraction: "math_training_say_subtract_numbers",
      multiplication: "math_training_say_multiply_numbers",
      division: "math_training_say_divide_numbers"
    };

    res.json({
      followupEventInput: {
        payload: {
          google: {
            userStorage: {
              number1: numbers[0],
              number2: numbers[1]
            }
          }
        },
        name: trainingTypeMap[trainingType],
        parameters: {
          number1: numbers[0],
          number2: numbers[1]
        },
        languageCode: "en"
      }
    });
  } else if (displayName === "math_training_say_solution") {
    const { trainingType, number1, number2, userSolution } = get(
      queryResult,
      ["outputContexts", "0", "parameters"],
      {}
    );
    const solution = solve(trainingType, number1, number2);
    const correct = solution === userSolution;

    res.json({
      followupEventInput: {
        name: correct
          ? "math_training_correct_solution"
          : "math_training_incorrect_solution",
        parameters: {
          solution: solution
        },
        languageCode: "en"
      }
    });
  } else {
    res.status(404).json({ error: "Invalid Intent name!" });
  }
});

module.exports = router;
