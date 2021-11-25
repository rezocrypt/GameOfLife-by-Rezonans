// Makeing some important variables
var cwidth = window.screen.width*80/100
var cheight = 400
var count = 150
var cagesize = cwidth/count
var mwidth = cwidth/cagesize
var mheight = cheight/cagesize
var colors = ["white,","black"]
var playing = -1
var bordersize = 1
var shape = "Random"
var steps = 0
var lng = [["Game Of Life","Игра Жизни","Կյանքի խաղ"],["Cage Border","Граница клетки","Վանդակի սահման"],["Cages Rarity","Количество клеток","Վանդակների Նոսրություն"],["Game Width","Ширина игры:","Խաղի լայնությունը"],["Game Height","Высота игры","Խաղի բարձրությունը"],["Dead color","Мертвый цвет","Մահացած գույն"],["Alive color","Живой цвет:","Կենդանի գույն"],["Use Settings","Использовать настройки","Օգտագործել Կարգավորումները"],["Start Game","Начать игру","Սկսել խաղը"],["Help","Помощь","Օգնություն"],["Step Count","Количество шагов","Քայլերի Քանակ"],["Description","Описание","Նկարագրություն"],["The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.","Игра Жизни, также известная просто как Жизнь, представляет собой клеточный автомат, изобретенный британским математиком Джоном Хортоном Конвеем в 1970 году. Это игра без игроков, то есть ее эволюция определяется ее начальным состоянием и не требует дополнительных действий. Человек взаимодействует с Игрой Жизни, создавая начальную конфигурацию и наблюдая, как она развивается. Он является полным по Тьюрингу и может моделировать универсальный конструктор или любую другую машину Тьюринга.","Կյանքի խաղը, որը նաև հայտնի է պարզապես որպես Կյանք, բջջային ավտոմատ է, որը մշակվել է բրիտանացի մաթեմատիկոս Ջոն Հորթոն Քոնուեյի կողմից 1970 թվականին: Դա զրոյական խաղացողի խաղ է, ինչը նշանակում է, որ դրա էվոլյուցիան որոշվում է սկզբնական վիճակով և չի պահանջում լրացուցիչ մուտքագրում: Մարդը փոխազդում է Կյանքի խաղի հետ՝ ստեղծելով նախնական կոնֆիգուրացիա և դիտարկելով, թե ինչպես է այն զարգանում: Այն Թյուրինգի ամբողջական է և կարող է նմանակել ունիվերսալ կոնստրուկտոր կամ Թյուրինգի ցանկացած այլ մեքենա:"],["Stop Game","Остановить игру","Դադարեցնել խաղը"]]
var leng = 0
// Function for changeing border size of small cage
function changebordersize(value){
  bordersize=value
}

// Function for configuring language
function configureLanguage(value) {
  if(value=="english") leng=0
  if(value=="russian") leng=1
  if(value=="armenian") leng=2
  document.getElementById("gameoflife").textContent = lng[0][leng]
  document.getElementById("cb").textContent = lng[1][leng]
  document.getElementById("cr").textContent = lng[2][leng]
  document.getElementById("gw").textContent = lng[3][leng]
  document.getElementById("gh").textContent = lng[4][leng]
  document.getElementById("dc").textContent = lng[5][leng]
  document.getElementById("lc").textContent = lng[6][leng]
  document.getElementById("us").value = lng[7][leng]
  document.getElementById("stt").value = lng[8][leng]
  document.getElementById("hp").value = lng[9][leng]
  document.getElementById("steptext").textContent = lng[10][leng]
  document.getElementById("ds").textContent = lng[11][leng]
  document.getElementById("bds").textContent = lng[12][leng]
} 

// Function for reseting the game
function reset() {
  document.getElementById("stepcount").textContent = 0
  steps = 0
  if (+document.getElementById("gamewidth").value<20 || +document.getElementById("gamewidth").value>5000 ) {
    document.getElementById("errortext").textContent = "[ERROR] Game width must be natural number which is bigger than 20 and smaller than 5000 [ERROR]"
    return
  }
  if (+document.getElementById("gameheight").value<20 || +document.getElementById("gameheight").value>5000) {
    document.getElementById("errortext").textContent = "[ERROR] Game height must be bigger than 100 and smaller than 5000 [ERROR]"
    return
  }
  if (+document.getElementById("cagecount").value<=0) {
    document.getElementById("errortext").textContent = "[ERROR] Cage rarity must be bigger than 0 [ERROR]"
    return
  }
  if (+document.getElementById("bordersize").value<=0) {
    document.getElementById("errortext").textContent = "[ERROR] Border size must be bigger than 0 [ERROR]"
    return
  }
  cwidth = document.getElementById("gamewidth").value
  cheight = document.getElementById("gameheight").value
  bordersize = +document.getElementById("bordersize").value

  count = document.getElementById("cagecount").value
  cagesize = cwidth/count
  mwidth = cwidth/cagesize
  mheight = cheight/cagesize
  shape = document.getElementById("shape").value
  colors[1]= document.getElementById("diecolor").value
  colors[0]= document.getElementById("livecolor").value

  document.getElementById("errortext").textContent = ""
  
  mx = makeWorld(shape)
  drawWorld(mx)
  
}


// Function for makeing world
function makeWorld(setting) {
  
  let cnv = createCanvas(cwidth,cheight);
  cnv.background('#acacac');
  cnv.parent("cnv");
  let matrix = []
  let color

  if (setting=="Random") {
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        rval>0.8?color=1:color=0;
        matrix[i][j] = color
      }
    }
  }
  

  else if(setting=="Pentadecathlon"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
  
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery][centerx] = 1
    matrix[centery][centerx+1] = 1
    matrix[centery+1][centerx+2] = 1
    matrix[centery-1][centerx+2] = 1
    matrix[centery][centerx+3] = 1
    matrix[centery][centerx+4] = 1
    matrix[centery][centerx+5] = 1
    matrix[centery][centerx+6] = 1
    matrix[centery+1][centerx+7] = 1
    matrix[centery-1][centerx+7] = 1
    matrix[centery][centerx+8] = 1
    matrix[centery][centerx+9] = 1
  }
  else if(setting=="Small Spaceship"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
  
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery][centerx] = 1
    matrix[centery][centerx+1] = 1
    matrix[centery][centerx+2] = 1
    matrix[centery][centerx+3] = 1
    matrix[centery][centerx+4] = 1
    matrix[centery][centerx+5] = 1
    matrix[centery+1][centerx+5] = 1
    matrix[centery+2][centerx+5] = 1
    matrix[centery+3][centerx+4] = 1
    matrix[centery+4][centerx+2] = 1
    matrix[centery+4][centerx+1] = 1
    matrix[centery+4][centerx-1] = 1
    matrix[centery+1][centerx-1] = 1
  }
  else if(setting=="Wikiwand"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
  
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery][centerx] = 1
    matrix[centery][centerx+2] = 1
    matrix[centery-1][centerx+2] = 1
    matrix[centery-2][centerx+4] = 1
    matrix[centery-3][centerx+4] = 1
    matrix[centery-4][centerx+4] = 1
    matrix[centery-3][centerx+6] = 1
    matrix[centery-4][centerx+6] = 1
    matrix[centery-5][centerx+6] = 1
    matrix[centery-4][centerx+7] = 1

  }
  else if(setting=="Cross and Square"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
  
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery][centerx] = 1
    matrix[centery-1][centerx] = 1
    matrix[centery][centerx-1] = 1
    matrix[centery][centerx+1] = 1

  }
  else if(setting=="Chess Small"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
  
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery][centerx] = 1
    matrix[centery][centerx+2] = 1
    matrix[centery][centerx+4] = 1
    matrix[centery][centerx+6] = 1
    matrix[centery][centerx+8] = 1
    matrix[centery+1][centerx+1] = 1
    matrix[centery+1][centerx+3] = 1
    matrix[centery+1][centerx+5] = 1
    matrix[centery+1][centerx+7] = 1
    matrix[centery+1][centerx+9] = 1
    
  }
  else if(setting=="Chess Middle"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery][centerx] = 1
    matrix[centery][centerx+2] = 1
    matrix[centery][centerx+4] = 1
    matrix[centery][centerx+6] = 1
    matrix[centery][centerx+8] = 1
    matrix[centery+1][centerx+1] = 1
    matrix[centery+1][centerx+3] = 1
    matrix[centery+1][centerx+5] = 1
    matrix[centery+1][centerx+7] = 1
    matrix[centery+1][centerx+9] = 1
    matrix[centery+2][centerx] = 1
    matrix[centery+2][centerx+2] = 1
    matrix[centery+2][centerx+4] = 1
    matrix[centery+2][centerx+6] = 1
    matrix[centery+2][centerx+8] = 1
  }
  else if(setting=="Chess Big"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery][centerx] = 1
    matrix[centery][centerx+2] = 1
    matrix[centery][centerx+4] = 1
    matrix[centery][centerx+6] = 1
    matrix[centery][centerx+8] = 1
    matrix[centery+1][centerx+1] = 1
    matrix[centery+1][centerx+3] = 1
    matrix[centery+1][centerx+5] = 1
    matrix[centery+1][centerx+7] = 1
    matrix[centery+1][centerx+9] = 1
    matrix[centery+2][centerx] = 1
    matrix[centery+2][centerx+2] = 1
    matrix[centery+2][centerx+4] = 1
    matrix[centery+2][centerx+6] = 1
    matrix[centery+2][centerx+8] = 1
    matrix[centery+3][centerx+1] = 1
    matrix[centery+3][centerx+3] = 1
    matrix[centery+3][centerx+5] = 1
    matrix[centery+3][centerx+7] = 1
    matrix[centery+3][centerx+9] = 1
    matrix[centery+4][centerx] = 1
    matrix[centery+4][centerx+2] = 1
    matrix[centery+4][centerx+4] = 1
    matrix[centery+4][centerx+6] = 1
    matrix[centery+4][centerx+8] = 1
  }
  else if(setting=="Camoe"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery][centerx] = 1
    matrix[centery+1][centerx] = 1
    matrix[centery+1][centerx+1] = 1
    matrix[centery][centerx+2] = 1
    matrix[centery-1][centerx+3] = 1
    matrix[centery-2][centerx+4] = 1
    matrix[centery-3][centerx+4] = 1
    matrix[centery-3][centerx+3] = 1
  }
  else if(setting=="Two Lines"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery-1][centerx-2] = 1
    matrix[centery-1][centerx-3] = 1
    matrix[centery-1][centerx-4] = 1
    matrix[centery-2][centerx-6] = 1
    matrix[centery-3][centerx-6] = 1
    matrix[centery-4][centerx-6] = 1
  }
  else if(setting=="Pulsar"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery-1][centerx-2] = 1
    matrix[centery-1][centerx-3] = 1
    matrix[centery-1][centerx-4] = 1
    matrix[centery-2][centerx-6] = 1
    matrix[centery-3][centerx-6] = 1
    matrix[centery-4][centerx-6] = 1
    matrix[centery-6][centerx-4] = 1
    matrix[centery-6][centerx-3] = 1
    matrix[centery-6][centerx-2] = 1
    matrix[centery-2][centerx-1] = 1
    matrix[centery-3][centerx-1] = 1
    matrix[centery-4][centerx-1] = 1

    matrix[centery-1][centerx+2] = 1
    matrix[centery-1][centerx+3] = 1
    matrix[centery-1][centerx+4] = 1
    matrix[centery-2][centerx+6] = 1
    matrix[centery-3][centerx+6] = 1
    matrix[centery-4][centerx+6] = 1
    matrix[centery-6][centerx+4] = 1
    matrix[centery-6][centerx+3] = 1
    matrix[centery-6][centerx+2] = 1
    matrix[centery-2][centerx+1] = 1
    matrix[centery-3][centerx+1] = 1
    matrix[centery-4][centerx+1] = 1

    matrix[centery+1][centerx-2] = 1
    matrix[centery+1][centerx-3] = 1
    matrix[centery+1][centerx-4] = 1
    matrix[centery+2][centerx-6] = 1
    matrix[centery+3][centerx-6] = 1
    matrix[centery+4][centerx-6] = 1
    matrix[centery+6][centerx-4] = 1
    matrix[centery+6][centerx-3] = 1
    matrix[centery+6][centerx-2] = 1
    matrix[centery+2][centerx-1] = 1
    matrix[centery+3][centerx-1] = 1
    matrix[centery+4][centerx-1] = 1

    matrix[centery+1][centerx+2] = 1
    matrix[centery+1][centerx+3] = 1
    matrix[centery+1][centerx+4] = 1
    matrix[centery+2][centerx+6] = 1
    matrix[centery+3][centerx+6] = 1
    matrix[centery+4][centerx+6] = 1
    matrix[centery+6][centerx+4] = 1
    matrix[centery+6][centerx+3] = 1
    matrix[centery+6][centerx+2] = 1
    matrix[centery+2][centerx+1] = 1
    matrix[centery+3][centerx+1] = 1
    matrix[centery+4][centerx+1] = 1
  }
  
  
  else if(setting=="Engine 01"){
    for (let i = 0; i < mheight; i++) {
      matrix[i] = []
      for (let j = 0; j < mwidth; j++) {
        let rval = Math.random()
        matrix[i][j] = 0
      }
    }
    let centerx = Math.round(mwidth/2)
    let centery = Math.round(mheight/2)
    matrix[centery+1][centerx] = 1
    matrix[centery+1][centerx-1] = 1
    matrix[centery+1][centerx-2] = 1
    matrix[centery][centerx-1] = 1
    matrix[centery][centerx-3] = 1
    matrix[centery][centerx-5] = 1
    matrix[centery+1][centerx-5] = 1
    matrix[centery+2][centerx-5] = 1
    matrix[centery+2][centerx-4] = 1
    matrix[centery+3][centerx-5] = 1
    matrix[centery+4][centerx-5] = 1
    matrix[centery+5][centerx-4] = 1
    matrix[centery+5][centerx-3] = 1
    matrix[centery+4][centerx-3] = 1
    matrix[centery+1][centerx-7] = 1
    matrix[centery+1][centerx-8] = 1
    matrix[centery+2][centerx-7] = 1
    matrix[centery+2][centerx-8] = 1
    
    matrix[centery-2][centerx] = 1
    matrix[centery-2][centerx-1] = 1
    matrix[centery-2][centerx-2] = 1
    matrix[centery-1][centerx-1] = 1
    matrix[centery-1][centerx-3] = 1
    matrix[centery-1][centerx-5] = 1
    matrix[centery-2][centerx-5] = 1
    matrix[centery-3][centerx-5] = 1
    matrix[centery-3][centerx-4] = 1
    matrix[centery-4][centerx-5] = 1
    matrix[centery-5][centerx-5] = 1
    matrix[centery-6][centerx-4] = 1
    matrix[centery-6][centerx-3] = 1
    matrix[centery-5][centerx-3] = 1
    matrix[centery-2][centerx-7] = 1
    matrix[centery-2][centerx-8] = 1
    matrix[centery-3][centerx-7] = 1
    matrix[centery-3][centerx-8] = 1

    matrix[centery+1][centerx+1] = 1
    matrix[centery+1][centerx+2] = 1
    matrix[centery+1][centerx+3] = 1
    matrix[centery][centerx+2] = 1
    matrix[centery][centerx+4] = 1
    matrix[centery][centerx+6] = 1
    matrix[centery+1][centerx+6] = 1
    matrix[centery+2][centerx+6] = 1
    matrix[centery+2][centerx+5] = 1
    matrix[centery+3][centerx+6] = 1
    matrix[centery+4][centerx+6] = 1
    matrix[centery+5][centerx+5] = 1
    matrix[centery+5][centerx+4] = 1
    matrix[centery+4][centerx+4] = 1
    matrix[centery+1][centerx+8] = 1
    matrix[centery+1][centerx+9] = 1
    matrix[centery+2][centerx+8] = 1
    matrix[centery+2][centerx+9] = 1
    
    matrix[centery-2][centerx+1] = 1
    matrix[centery-2][centerx+2] = 1
    matrix[centery-2][centerx+3] = 1
    matrix[centery-1][centerx+2] = 1
    matrix[centery-1][centerx+4] = 1
    matrix[centery-1][centerx+6] = 1
    matrix[centery-2][centerx+6] = 1
    matrix[centery-3][centerx+6] = 1
    matrix[centery-3][centerx+5] = 1
    matrix[centery-4][centerx+6] = 1
    matrix[centery-5][centerx+6] = 1
    matrix[centery-6][centerx+5] = 1
    matrix[centery-6][centerx+4] = 1
    matrix[centery-5][centerx+4] = 1
    matrix[centery-2][centerx+8] = 1
    matrix[centery-2][centerx+9] = 1
    matrix[centery-3][centerx+8] = 1
    matrix[centery-3][centerx+9] = 1
  }

  return matrix
}

// Function for drawing word every time
function drawWorld(matrix){
  document.getElementById("defaultCanvas0").style.backgroundColor = colors[1]
  strokeWeight(+bordersize);
  clear()
  for (let i = 0; i < mheight; i++) {
    for (let j = 0; j < mwidth; j++) {
      if (matrix[i][j]==1){
        fill(colors[0])
        rect(j*cagesize, i*cagesize, cagesize, cagesize);
      }
      
    }
  }
}

// Function for calculating new matrix from old one
function calcMatrix(mx){
  let matrix = []
  for (let i = 0; i < mheight; i++) {
    matrix[i] = []
    for (let j = 0; j < mwidth; j++){matrix[i][j] = mx[i][j]}
  }
  let color
  for (let i = 0; i < mheight; i++) {
    for (let j = 0; j < mwidth; j++) {
      let sum = 0
      try {if (mx[i-1][j-1]==1){sum++}} catch (error) {}
      try {if (mx[i-1][j]==1){sum++}} catch (error) {}
      try {if (mx[i-1][j+1]==1){sum++}} catch (error) {}
      try {if (mx[i][j+1]==1){sum++}} catch (error) {}
      try {if (mx[i+1][j+1]==1){sum++}} catch (error) {}
      try {if (mx[i+1][j]==1){sum++}} catch (error) {}
      try {if (mx[i+1][j-1]==1){sum++}} catch (error) {}
      try {if (mx[i][j-1]==1){sum++}} catch (error) {}
      
      if (sum<2){
        matrix[i][j]=0
      }
      else if (sum==3){
        matrix[i][j]=1
      }
      else if (sum>3){
        matrix[i][j]=0
      }

    }
  }





  return matrix
}


function pause() {
  playing *= -1
  if(playing==-1){
    document.getElementById("stt").value = lng[8][leng]

  }
  else if (playing==1) {
    document.getElementById("stt").value = lng[13][leng]
  }
  
  
}




// Function for setup
function setup() {
  cwidth = document.getElementById("gamewidth").value=window.screen.width*80/100
  cheight = document.getElementById("gameheight").value=400 
  mx = makeWorld(shape)
  drawWorld(mx)
  
}




// Function for draw
function draw() {
  if (playing==1) {
    mx = calcMatrix(mx)
    drawWorld(mx)
    steps = +document.getElementById("stepcount").textContent
    document.getElementById("stepcount").textContent = steps+1
  }
  
}



if (window.screen.width<500) {
  lng[12][0]=""
  lng[12][1]=""
  lng[12][2]=""
}