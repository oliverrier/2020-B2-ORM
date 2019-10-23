const datasets = require("./datasets.json")
const reset = '\x1b[0m'
const bright = '\x1b[1m'

exports = module.exports = {
  name: "Déménagement",
  datasets,
  algo: function (input) {
    // YOUR CODE BETWEEN HERE
    numberOfBoxes = input[0]
    console.log("numberOfBoxes = ", numberOfBoxes)
    weight = 0
    numberOfAR = 1
      for (let index = 1; index < numberOfBoxes + 1; index++) {
        let boxWeight = input[index];
        weight += boxWeight
        if (weight > 100) {
          weight -= boxWeight
          index --
          numberOfAR ++
          weight = 0
        }
      }
      return numberOfAR;
    // AND HERE
  },
  verify: function (dataset, output) {
    if (dataset.output !== output) {
      throw new Error(`${bright}Got ${output} but expected ${dataset.output}${reset}`)
    } else {
      return true
    }
  }
}