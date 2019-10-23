const datasets = require("./datasets.json")
const reset = '\x1b[0m'
const bright = '\x1b[1m'

exports = module.exports = {
  name: "Salle au trésor",
  datasets,
  algo: function (input) {
    // YOUR CODE BETWEEN HERE
      const sizeOfMatrix = input.shift()
      console.log("sizeOfMatrix = ", sizeOfMatrix)
      // Je récupère ton code pour avoir la matrice, j'espère que c'est autorisé :D
      console.log("input = ", input)
      const inputMatrix = input.map(row => row.split(''))
      console.log("inputMatrix = ", inputMatrix)
      console.log("inputMatrix[0] = ", inputMatrix[0])
      console.log("inputMatrix[0][0] = ", inputMatrix[0][0])
      let isThereStillGoldToPickUp = true
      let isTherStillMultipliersToPickUp = true
      
      let moveInput = ""
      let position = {
        x: 0,
        y: 0
      }
      console.log("position = ", position)
      console.log("position.x = ", position.x)
      console.log("position.y = ", position.y)
      // Tant qu'il y a des pièces d'or à récupérer on descend tout en bas de la carte en allant à droite puis à gauche et ainsi de suite
      while (isThereStillGoldToPickUp){
        while(position.x < sizeOfMatrix - 1){
          while (position.y < sizeOfMatrix - 1){
            console.log("position = ", position)
            console.log("inputMatrix[position.x][position.y] = ", inputMatrix[position.x][position.y])
            switch (inputMatrix[position.x][position.y]){
              case "o":
                moveInput += "x>"
                inputMatrix[position.x][position.y] = "."
                break
              case "*":
                moveInput += ">"
                break
              default:
                moveInput += ">"
            }
            position.y++
          }
          moveInput += "v"
          position.x++
          while (position.y > 0){
            console.log("position = ", position)
            console.log("inputMatrix[position.x][position.y] = ", inputMatrix[position.x][position.y])
            switch (inputMatrix[position.x][position.y]){
              case "o":
                moveInput += "x<"
                break
              case "*":
                moveInput += "<"
                break
              default:
                moveInput += "<"
            }
            position.y--
          }
          moveInput += "v"
          position.x++
          console.log(" =")
        }
        isThereStillGoldToPickUp = false
      }

      // Tant qu'il y a des multiplicateurs à récupérer on monte tout en haut de la carte en allant à droite puis à gauche et ainsi de suite
      while (isTherStillMultipliersToPickUp){
        while(position.x > 0){
          while (position.y < sizeOfMatrix - 1){
            console.log("position = ", position)
            console.log("inputMatrix[position.x][position.y] = ", inputMatrix[position.x][position.y])
            switch (inputMatrix[position.x][position.y]){
              case "*":
                moveInput += "x>"
                inputMatrix[position.x][position.y] = "."
                break
              default:
                moveInput += ">"
            }
            position.y++
          }
          moveInput += "^"
          position.x--
          while (position.y > 0){
            console.log("position = ", position)
            console.log("inputMatrix[position.x][position.y] = ", inputMatrix[position.x][position.y])
            switch (inputMatrix[position.x][position.y]){
              case "*":
                moveInput += "x<"
                inputMatrix[position.x][position.y] = "."
                break
              default:
                moveInput += "<"
            }
            position.y--
          }
          moveInput += "^"
          position.x--
        }
        isTherStillMultipliersToPickUp = false
      }

      return moveInput
    // AND HERE
  },
  verify: function (dataset, output) {
    const outputArray = output.split('')
    const inputMatrix = dataset.input.map(row => row.split(''))
    let score = 0
    let position = {
      x: 0,
      y: 0
    }
    for (const outputChar of outputArray) {
      switch (outputChar) {
        case 'x':
          const currentChar = inputMatrix[position.y][position.x]
          if (currentChar === 'o') {
            score++
          } else if (currentChar === '*') {
            score = score * 2
          } else {
            throw new Error('Invalid move, nothing to grab !')
          }
          break
        case '>':
          if (!inputMatrix[position.y][position.x + 1]) {
            throw new Error('Invalid move, out of matrix !')
          } else {
            position.x++
          }
          break
        case '<':
          if (!inputMatrix[position.y][position.x - 1]) {
            throw new Error('Invalid move, out of matrix !')
          } else {
            position.x--
          }
          break
        case 'v':
          if (!inputMatrix[position.y + 1][position.x]) {
            throw new Error('Invalid move, out of matrix !')
          } else {
            position.y++
          }
          break
        case '^':
          if (!inputMatrix[position.y - 1][position.x]) {
            throw new Error('Invalid move, out of matrix !')
          } else {
            position.y--
          }
          break
        default:
          throw new Error(`Invalid character ${outputChar} !`)
      }
    }
    if (dataset.output !== score) {
      throw new Error(`${bright}Got ${score} but expected ${dataset.output}${reset}`)
    } else {
      return true
    }
  }
}