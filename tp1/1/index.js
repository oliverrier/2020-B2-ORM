const datasets = require("./datasets.json")
const reset = '\x1b[0m'
const bright = '\x1b[1m'

exports = module.exports = {
  name: "Marathon",
  datasets,
  algo: function (input) {
    // YOUR CODE BETWEEN HERE
      let finishingPlace = input[0]
      for (let index = 1; index < input.length; index++) {
        let splitedElement = input[index].split(" ")
        let placesLost = parseInt(splitedElement[0])
        let placesWon = parseInt(splitedElement[1])
        finishingPlace += placesLost - placesWon
      }
      let winnings = 0
      if (finishingPlace < 101){
        winnings = 1000
      } else if (finishingPlace < 10001){
        winnings = 100
      } else {
        return "KO"
      }
      return winnings

    
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