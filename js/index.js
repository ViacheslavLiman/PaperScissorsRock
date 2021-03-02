let countBlock = document.getElementsByClassName('header__score-count')[0], count
//Setting count function
function SetCount() {
    count = localStorage.getItem('count')
    if(count == null)
      count = 0
    countBlock.innerText = count
}
SetCount()

//Binding an event handler to a rule button
let rulesBlock = document.getElementsByClassName('rules__img-block')[0]
let rulesBg = document.getElementsByClassName('rules__bg')[0]
let html = document.getElementsByTagName('html')[0]
let btns = document.getElementsByClassName('rules__btn')
for (let btn of btns){
  btn.addEventListener('click', function(e) {
    rulesBlock.style.display = 'block'
    rulesBg.style.display = 'block'
    html.style.overflow = 'hidden'
  })
}

//Binding an event handler to a rule close button
let closeBtns = document.getElementsByClassName('close-rules')
for (let closeBtn of closeBtns){
    closeBtn.addEventListener('click', e => {
    rulesBlock.style.display = 'none'
    rulesBg.style.display = 'none'
    html.style.overflow = 'auto'
  })
}

//Binding an event handler to picked element
let gameBlock = document.getElementsByClassName('game')[0]
let yourPickBlock = document.getElementsByClassName('game__your-pick')[0]
let housePickBlock = document.getElementsByClassName('game__house-pick')[0]
let pickBlock = document.getElementsByClassName('pick')[0]
let gameResultBlock = document.getElementsByClassName('game__result')[0]
let picks = document.getElementsByClassName('pick__item')
for(let pick of picks) {
  pick.addEventListener('click', event => {
    let pickName = event.target.classList[0].split('__')[0]
    let insertedElement = event.target.closest('.'+pickName+'__wrapper').cloneNode(true)
    yourPickBlock.append(insertedElement)
    pickBlock.style.display = 'none'
    gameBlock.style.display = 'flex'
    let loadingBlock = document.createElement('div')
    loadingBlock.classList.add('loading-block')
    housePickBlock.append(loadingBlock)

    //The process of selecting an element by a house
    setTimeout(()=>{
      let housePickNumber = Math.floor(Math.random()*5)
      let housePickImg = document.getElementsByClassName('pick__item')[housePickNumber]
      let housePick = housePickImg.closest('.'+housePickImg.classList[0].split('__')[0]+'__wrapper').cloneNode(true)
      loadingBlock.remove()
      housePickBlock.append(housePick)
      gameBlock.style.width = '100%'
      gameResultBlock.style.display = 'block'
      let result = Winner(pickName, housePickNumber)
      if(result === 'win')
      {
        yourPickBlock.getElementsByTagName('div')[0].classList.add('win')
        count++
      }
      else if(result === 'lose')
      {
        housePickBlock.getElementsByTagName('div')[0].classList.add('win')
        if(count > 0)
          count--
      }
      if(result != 'draw')
        result = 'you ' + result
      document.getElementsByClassName('game__result-title')[0].innerText = result
      document.getElementsByClassName('header__score-count')[0].innerText = count
      localStorage.setItem('count',count)
    }, 1500)
  })
}

//Binding an event handler to play again buttons
let playAgainBtns = document.getElementsByClassName('game__btn')
for(let playBtn of playAgainBtns) {
  playBtn.addEventListener('click', event => {
    housePickBlock.getElementsByTagName('div')[0].remove()
    yourPickBlock.getElementsByTagName('div')[0].remove()
    pickBlock.style.display = 'grid'
    gameBlock.style.display = 'none'
    gameBlock.style.width = '500px'
    gameResultBlock.style.display = 'none'
  })
}

//Define the winner function
function Winner(you, house) {
  switch(you) {
    case 'paper':
      switch(house) {
        case 0:
        case 3:
          return 'lose'
          break
        case 2:
          return 'draw';
          break;
        case 1:
        case 4:
          return 'win'
          break
      }
      break
    case 'spock':
      switch(house) {
        case 0:
        case 4:
          return 'win'
        break
        case 1:
          return 'draw';
          break;
        case 2:
        case 3:
          return 'lose'
        break
      }
      break;
      case 'scissors':
        switch(house) {
          case 0:
            return 'draw';
          break;
          case 2:
          case 3:
            return 'win'
          break
          case 1:
          case 4:
            return 'lose'
          break
        }
      break;
      case 'lizard':
        switch(house) {
          case 1:
          case 2:
            return 'win'
          break
          case 3:
            return 'draw';
          break;
          case 0:
          case 4:
            return 'lose'
          break
        }
        break;
      case 'rock':
        switch(house) {
          case 0:
          case 3:
            return 'win'
          break
          case 1:
          case 2:
            return 'lose'
          break
          case 4:
            return 'draw';
          break;
          }
      break;
  }
}
