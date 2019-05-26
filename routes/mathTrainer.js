var express = require("express");
var get = require("lodash.get");
var { solveAddition } = require("../functions/addition");
var { getNumbers } = require("../functions/numbers");
var router = express.Router();

/* GET home page. */
router.post("/", function(req, res, next) {
  const queryResult = get(req, ["body", "queryResult"], {});
  const displayName = get(queryResult, ["intent", "displayName"], "");

  console.log(queryResult);
  if (displayName === "math_training_get_numbers") {
    const { trainingType, digits } = get(
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
      payload: {},
      followupEventInput: {
        name: trainingTypeMap[trainingType],
        parameters: {
          number1: numbers[0],
          number2: numbers[1]
        },
        languageCode: "en"
      }
    });
  } else {
    res.status(404).json({ error: "Invalid Intent name!" });
  }
});

module.exports = router;
