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
    const { digits } = get(queryResult, ["parameters"], {});
    const numbers = getNumbers(res, digits);

    res.json({
      followupEventInput: {
        name: "math_training_say_numbers",
        parameters: {
          number1: numbers[0],
          number2: numbers[1]
        },
        languageCode: "en-US"
      }
    });
  } else {
    res.status(404).json({ error: "Invalid Intent name!" });
  }
});

module.exports = router;
