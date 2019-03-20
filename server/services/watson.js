const express = require('express')
const router = express.Router()

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-11-16',
});

router.post('/', (req, res, next) => {
  // REVIEW: probably ought to remove the try/catch,
  //         I believe that it shouldn't be here
  // try {
    const parameters = {
      'text': 'Hello World!',
      'features': {
        'categories': {
          'limit': 3
        }
      }
    }
    naturalLanguageUnderstanding.analyze(parameters, function(err, response) {
      if (err) {
        console.log('error:', err);
        // REVIEW: discuss return here
        return next(err)
      }
      else {
        console.log(JSON.stringify(response, null, 2));
        return res.json(JSON.stringify(response, null, 2))
      }
    });
  // } catch (err) {
  //   next(err)
  // }
})

module.exports = router
