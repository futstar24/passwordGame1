maxRuleNumber = 18;
currentRule = 1;
sacrificed = false
submitButton = document.createElement("div")
sacrificedLetters = [];
inputBox = document.getElementById("inputBox");
inputLength = document.getElementById("inputLength")
inputBox.style.height = "0px"
inputBox.style.height = inputBox.scrollHeight + "px"
inputLength.innerHTML = inputBox.value.length
ruleList = ["Your password must be at least 5 characters.", "Your password must include a number.", "Your password must include an uppercase letter.", "Your password must include a special character.", "The digits in your password must add up to 40.", "Your password must include a month of the year.", "Your password must include a roman numeral.", "Your password must include one of our sponsors: Target Citi Fanta", "The roman numerals in your password should multiply to 35.", "Your password must include a two letter symbol from the periodic table.", "paul", "elements add to 300", "can't use 3 letters", "stronger!!!", "paul hatched", "best chess move","type the national holiday from month","Quick! Click this button ten times!"];
ruleElementList = []
perTable = { "hi": 0, "his": 1, "herllo": 2 }
ruleHiddenList = []
monthly = ["january", "february", "march", "april", "may", "june", "july", "august", "spetember", "october", "noveber", "december"]
sponsors = ["citi", "fanta", "target"]
thirtyFive = ["XXXV", "VII" && "V", "XXXV" && "I"]
chessImages = [""]
chessAnswers = ["Ne5"]
nationalHolidays = [["martin luther king junior day","new year's day"],["valentine's day","president's day"],["saint patrick's day","easter"],["easter","APRIL FOOLS"],["memorial day","mother's day"],["father's day","CREATOR'S BIRTHDAY","juneteenth"],["independence day"],["jack"],["nine-eleven","labour day"],["halloween","colombus day","indigenous peeople's day"],["thanksgiving","election day","veteran's day"],["christmas","new year's EEE"]]
for (i = 1; i <= maxRuleNumber; i++) {
  ruleDiv = document.createElement("div");
  ruleDiv.classList.add("ruleDiv");
  ruleNumber = document.createElement("p");
  ruleNumber.classList.add("ruleNumber");
  ruleDiv.id = "rule" + i;
  ruleNumber.innerHTML = "Rule " + i;
  ruleDescript = document.createElement("p");
  ruleDescript.classList.add("ruleDescript");
  ruleDescript.innerHTML = ruleList[i - 1];
  ruleDiv.appendChild(ruleNumber);
  ruleDiv.appendChild(ruleDescript);
  if (i == 8) {
    logoDiv = document.createElement("div")
    logoDiv.id = "logos"
    imgs = ["cete.png", "fent.png", "targee.png"]
    imgs.forEach(img => {
      logo = document.createElement("img")
      logo.classList.add("logos")
      logo.src = img
      logoDiv.appendChild(logo)
    })
    ruleDiv.appendChild(logoDiv)
  }
  if (i == 13) {
    letterSacrificeDiv = document.createElement("div")
    letterSacrificeDiv.id = "letterSacrificeDiv"
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    rowDiv = document.createElement("div")
    rowDiv.classList.add("letterRowDiv")
    letters.forEach(letter => {
      if (letter == "K" || letter == "T") {
        letterSacrificeDiv.appendChild(rowDiv)
        rowDiv = document.createElement("div")
        rowDiv.classList.add("letterRowDiv")
      }
      letterDiv = document.createElement("div")
      letterDiv.innerHTML = letter
      letterDiv.classList.add("letters")
      letterDiv.id = letter
      letterDiv.addEventListener("click", function (evt) {
        if (!sacrificed) {
          if (evt.target.style.backgroundColor == "gray") {
            evt.target.style.backgroundColor = "lightgray"
            index = sacrificedLetters.indexOf(evt.target.id)
            sacrificedLetters.splice(index, 1)
            if (sacrificedLetters.length == 2) {
              submitButton.parentElement.removeChild(submitButton)
            }
          } else if (sacrificedLetters.length < 3) {
            sacrificedLetters.push(evt.target.id)
            evt.target.style.backgroundColor = "gray"
            if (sacrificedLetters.length == 3) {
              letterSacrificeDiv.appendChild(submitButton)
            }
          }
        }
      })
      rowDiv.appendChild(letterDiv)
    })
    rowDiv.id = "bottomRow"
    letterSacrificeDiv.appendChild(rowDiv)
    submitButton.id = "sacrificeButton"
    submitButton.innerHTML = "Sacrifice"
    submitButton.addEventListener("click", function () {
      sacrificed = true
      submitButton.parentElement.removeChild(submitButton)
      update()
    })
    ruleDiv.appendChild(letterSacrificeDiv)
  }
  if (i == 16) {
    randomNumber = Math.floor(Math.random()*chessImages.length)
    chessImage = chessImages[randomNumber]
    chessAnswer = chessAnswers[randomNumber]
    chessImageImage = document.createElement("img")
    chessImageImage.src = chessImage
    chessImageImage.id = "chessImageImage"
    ruleDiv.appendChild(chessImageImage)
  }
  ruleElementList.push(ruleDiv);
  ruleHiddenList.push("hidden");
}
function showRules(currentRule) {
  for (i = 0; i < currentRule; i++) {
    if (ruleHiddenList[i] == "hidden") {
      ruleHiddenList[i] = "shown";
      document.body.appendChild(ruleElementList[i]);
    }
  }
}
showRules(currentRule);
function rule1() {
  return (inputBox.value.length >= 5)
}
function rule2() {
  return /\d/.test(inputBox.value)
}
function rule3() {
  return /[A-Z]/.test(inputBox.value)
}
function rule4() {
  return /[!-\/;-@[-`{-~`]/.test(inputBox.value)
}
function rule5() {
  total = 0
  textList = inputBox.value.split("")
  textList.forEach(letter => {
    if (/\d/.test(letter)) {
      total += parseInt(letter)
    }
  })
  return total == 40
}
function rule6() {
  hasMonth = false
  monthly.forEach(month => {
    if (inputBox.value.toLowerCase().includes(month.toString())) {
      hasMonth = true
    }
  })
  return hasMonth
}
function rule7() {
  return /[IVXLCDM]/.test(inputBox.value)
}
function rule8() {
  hasSpons = false
  sponsors.forEach(sponsor => {
    if (inputBox.value.toLowerCase().includes(sponsor.toString())) {
      hasSpons = true
    }
  })
  return hasSpons
}
function rule9() {
  rome = true
  myRoman = []
  tempNumeral = ""
  pwList = inputBox.value.split("")
  pwList.forEach(character => {
    if (/[IVXLCDM]/.test(character)) {
      tempNumeral += character
    }
    else {
      if (tempNumeral.length > 0) {
        myRoman.push(tempNumeral)
        tempNumeral = ""
      }
    }
  })
  if (tempNumeral.length > 0) {
    myRoman.push(tempNumeral)
    tempNumeral = ""
  }
  if (myRoman.includes("XXXV")) {
    index = myRoman.indexOf("XXXV")
    myRoman.splice(index, 1)
    myRoman.forEach(romanNumeral => {
      if (romanNumeral != "I") {
        rome = false
      }
    })
  }
  else if (myRoman.includes("V") && myRoman.includes("VII")) {
    index = myRoman.indexOf("V")
    myRoman.splice(index, 1)
    index = myRoman.indexOf("VII")
    myRoman.splice(index, 1)
    myRoman.forEach(romanNumeral => {
      if (romanNumeral != "I") {
        rome = false
      }
    })
  }
  else {
    rome = false
  }
  return rome
}
function rule10() {
  hasElement = false
  Object.keys(perTable).forEach(element => {
    if (inputBox.value.includes(element)) {
      hasElement = true
    }
  })
  return hasElement
}
paulPlaced = false
function rule11() {
  if (currentRule >= 15) {
    return true
  } else if (paulPlaced && !inputBox.value.includes("egg")) {
    gameOver = true
  } else if (inputBox.value.includes("egg")) {
    paulPlaced = true
    return true
  }
  return false
}

function rule12() {
  total = 0
  text = inputBox.value
  tempText = text
  j = 0
  while (j < Object.keys(perTable).length) {
    currentElement = Object.keys(perTable)[j]
    if (tempText.includes(currentElement)) {
      total += perTable[currentElement]
      tempText = tempText.replace(currentElement, " ")
    } else {
      j += 1
    }
  }
  return total == 0
}

function rule13() {
  allGood = true
  text = inputBox.value.toUpperCase()
  if (sacrificed) {
    sacrificedLetters.forEach(letter => {
      if (text.includes(letter)) {
        allGood = false
      }
    })
  }
  return allGood && sacrificed
}

function rule14() {
  return inputBox.value.split("strong").length - 1 >= 3
}

firstTime = true
function rule15() {
  if (firstTime) {
    firstTime = false
    setInterval(removeWorm, 10000)
  }
  inputBox.value = inputBox.value.replace("egg", "dino")
  if (!inputBox.value.includes("dino")) {
    gameOver = true
  }
  if (inputBox.value.includes("worm")) {
    return true
  }
}

function removeWorm() {
  if (inputBox.value.includes("worm")) {
    inputBox.value = inputBox.value.replace("worm", "")
    if (inputBox.value.split("worm").length - 1 > 5) {
      gameOver = true
    }
  } else {
    gameOver = true
  }
}

function rule16() {
  if (inputBox.value.includes(chessAnswer)) {
    return true
  }
  return false
}

function rule17() {
  myMonth = ""
  monthly.forEach(month => {
    if (inputBox.value.toLowerCase().includes(month.toString())) {
      myMonth = month
    }
  })
  if (!myMonth == "") {
    monthHolidays = nationalHolidays[monthly.indexOf(myMonth)]
    hasHoliday = false
    monthHolidays.forEach(holiday => {
      if (inputBox.value.includes(holiday.toString())) {
        hasHoliday = true
      }
    })
    return hasHoliday
  }
  return false
}

function rule18() {
  button = document.createElement("div")
  button.id = "movingButton"
  document.body.appendChild(button)
  clicksSoFar = 0
  deleteInterval = setInterval(deletePassword, 7000)
  button.innerHTML = 10-clicksSoFar
  button.addEventListener("click", function() {
    clicksSoFar += 1
    button.innerHTML = 10-clicksSoFar
    if (clicksSoFar < 1) { //make 10
      marginLeft = Math.floor(Math.random()*(window.screen.width-50))
      marginTop = Math.floor(Math.random()*(window.screen.height-50))
      button.style.marginLeft = marginLeft+"px"
      button.style.marginTop = marginTop+"px"
    } else {
      button.parentElement.removeChild(button)
      clearInterval(deleteInterval)
      return true
    }
  })
}

function deletePassword() {
  inputBox.value = ""
  clearInterval(deleteInterval)
  gameOver = true
}

ruleFunctions = [rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9, rule10, rule11, rule12, rule13, rule14, rule15, rule16, rule17, rule18]

gameOver = false
inputBox.addEventListener("input", function () {
  update()
  inputBox.style.height = "0px"
  console.log(inputBox.scrollHeight)
  inputBox.style.height = inputBox.scrollHeight + "px"
  inputLength.innerHTML = inputBox.value.length
});

function update() {
  if (!gameOver) {
    correctRules = 1
    incorrectRules = []
    order = 1

    for (i = 1; i <= currentRule; i++) {
      if (!ruleFunctions[i - 1]()) {
        ruleElementList[i - 1].style.backgroundImage = "url('PNG WRONG.png')";
        ruleElementList[i - 1].style.border = "1px solid red";
        document.getElementById("rule" + i).style.order = order
        order += 1
      }
    }

    for (i = 0; i < maxRuleNumber; i++) {
      if (ruleFunctions[i]()) {
        correctRules += 1;
        ruleElementList[i].style.backgroundImage = "url('BRUH2.png')";
        ruleElementList[i].style.border = "1px solid green";
        ruleHiddenList[i] = "shown";
        document.body.appendChild(ruleElementList[i]);
        document.getElementById("rule" + (i + 1)).style.order = order
        order += 1
      }
      else if ((i + 1) >= currentRule) {
        break
      }
    }

    if (correctRules > currentRule) {
      currentRule = correctRules;
      showRules(currentRule)
    }

    if (currentRule > maxRuleNumber) {
      gameOver = true
    }
  }
}
