//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2;

//velocidades da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete 
let xRaquete = 8;
let yRaquete = 140;
let larguraRaquete = 12;
let alturaRaquete = 120;


//variáveis do Oponente
let xOponente = 580;
let yOponente = 140;
let velocidadeYOponente;
let colidiu = false;

//placar
let meusPontos = 0;
let pontosOponente = 0;
let tamanho = 0;

//sons de jogo
let raquetada;
let ponto;
let trilha;

function preload (){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound ("raquetada.mp3");
  ponto = loadSound ("ponto.mp3");
}

function setup() {
  trilha.loop();
  createCanvas(600, 400);
}

function draw() {
  background(20);
  mostrarBolinha();
  velocidadeBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xOponente, yOponente);
  movimentarRaquete();
  //verificarColisaoBolinhaRaquete ();
  movimentaRaqueteOponente ();
  colisaoRaquetesBiblioteca (xRaquete,yRaquete);
  colisaoRaquetesBiblioteca (xOponente,yOponente);
  incluirPlacar();
  marcarPonto();
  vencedor();
  zerarPlacar ();
  
}

function mostrarBolinha (){
  stroke (color(250,20,147))
  fill (color(250,20,147))
  circle(xBolinha,yBolinha,diametro);
}

function velocidadeBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function mostrarRaquete(x,y){
  stroke(255)
  fill (255)
  rect(x,y,larguraRaquete,alturaRaquete)
}


function movimentarRaquete (){
  if (keyIsDown(87)){
      yRaquete -= 10;
      }
   if (keyIsDown(83)){
      yRaquete += 10;
      }
      
  }


function verificaColisaoBorda (){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  }
  if (yBolinha +raio > height || 
     yBolinha - raio <0){
    velocidadeYBolinha *= -1
  }
}

function verificarColisaoBolinhaRaquete (){
if (xBolinha - raio < xRaquete + larguraRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete)
  {  
raquetada.play();
velocidadeXBolinha *= -1;
  }
}

function colisaoRaquetesBiblioteca (x,y){
  colidiu =
    collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    raquetada.play();
    velocidadeXBolinha *= -1;
  }
  
}

function movimentaRaqueteOponente (){
  if (keyIsDown(UP_ARROW)){
      yOponente -= 10;
      }
   if (keyIsDown(DOWN_ARROW)){
      yOponente += 10;
      }
      
}

function incluirPlacar(){
  //textAlign (CENTER)
  stroke (255)
  textSize (30)
  fill (color(250,20,147))
  rect(253,11, 30,30)
  rect(303, 11, 30, 30)
  fill (255)
  text(meusPontos, 260, 36)
  text("-", 288, 36)
  text(pontosOponente, 310, 36)
  textSize (12)
  text ("JOGADOR 1", 170,30)
  text ("OPONENTE", 350,30)
}

function marcarPonto(){
  if (xBolinha > 585){
    ponto.play();
    meusPontos += 1;
  }
  
  if (xBolinha < 15){
    ponto.play();
    pontosOponente += 1;
  }
}

function vencedor() {
  if (meusPontos == 5){
    fill (255)
  textSize (25)
  text ("JOGADOR 1 VENCEU!!", 120,100)
  }
  
  if (pontosOponente == 5){
    fill (255)
  textSize (25)
  text ("JOGADOR OPONENTE VENCEU!!", 120,100)
  }  
}

function zerarPlacar () {
  if (meusPontos == 5 && xBolinha < 200){
    meusPontos = 0
  pontosOponente = 0
  }
  if (pontosOponente == 5 && xBolinha > 400){
    meusPontos = 0
  pontosOponente = 0
  }
}