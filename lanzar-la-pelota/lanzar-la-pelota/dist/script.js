var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = 300,
  cx = cw / 2;
var ch = canvas.height = 300,
  cy = ch / 2;

var arrastrar = false;
var lanzar = false;
var gravedad = .5;
var rebote = -.5; // > -1 para frenar la pelota
var dx, dy;
var m = {
  x: cx,
  y: cy
}; // inicializa el ratón

function Pelota(r) {
  this.r = r;
  this.x = 1.2 * this.r;
  this.y = ch - this.r;
  this.inicial_x = this.x;
  this.inicial_y = this.y;
  this.vx = 0;
  this.vy = 0;
  this.color = "#6ab150";
}
Pelota.prototype.dibujar = function() {
  // dibuja la pelota
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  ctx.fill();
  //cambia el estilo del cursor si el ratón esta encima de la pelota
  if (ctx.isPointInPath(m.x, m.y)) {
    canvas.style.cursor = "pointer";
  } else {
    canvas.style.cursor = "default";
  }
}

Pelota.prototype.arrastrar = function(m) {
  // calcula las nuevas coordenadas de la pelota
  this.x = m.x + dx;
  this.y = m.y + dy;
  
  this.colisionParedes();
  // calcula la velocidad (vx y vy) de la pelota mientras la arrastramos
  this.vx = this.x - this.inicial_x;
  this.vy = this.y - this.inicial_y;
  // actualiza el valor inicial
  this.inicial_x = this.x;
  this.inicial_y = this.y;
}

Pelota.prototype.lanzar = function(m) {
  this.vy += gravedad;
  this.x += this.vx;
  this.y += this.vy;

  this.colisionParedes();

}

Pelota.prototype.colisionParedes = function() {
  if (this.x > cw - this.r) {
    this.x = cw - this.r;
    this.vx *= rebote;

  } else if (this.x < this.r) {
    this.x = this.r;
    this.vx *= rebote;
  }
  if (this.y > ch - this.r) {
    this.y = ch - this.r;
    this.vy *= rebote;

  } else if (this.y < this.r) {
    this.y = this.r
    this.vy *= rebote;
  }
}

// dibuja una nueva pelota
var pelota = new Pelota(25);

function Animacion() {
  elId = window.requestAnimationFrame(Animacion);
  if (arrastrar) {
    pelota.arrastrar(m);
  }
  if (lanzar) {
    pelota.lanzar(m);
  }
  // limpia el canvas
  ctx.clearRect(0, 0, cw, ch);
  //dibuja la pelota
  pelota.dibujar();
}
Animacion();

// EVENTOS

canvas.addEventListener("mousedown", function(evt) {
  m = oMousePos(canvas, evt);
  ctx.clearRect(0, 0, cw, ch);
  // porque no hacemos clic en el centro de la pelota
  // tenemos que calcular la distancia entre el centro y el ratón
  dx = pelota.x - m.x;
  dy = pelota.y - m.y;
  pelota.dibujar();
  // Si hemos hecho clic en la pelota, podemos arrastrar
  if (ctx.isPointInPath(m.x, m.y)) {
    arrastrar = true;
    lanzar = false;
  }
}, false);

canvas.addEventListener("mousemove", function(evt) {
  ctx.clearRect(0, 0, cw, ch);
  pelota.dibujar();
  m = oMousePos(canvas, evt);

}, false);

canvas.addEventListener("mouseup", function(evt) {
  arrastrar = false;
  lanzar = true;
}, false);
canvas.addEventListener("mouseout", function(evt) {
  arrastrar = false;
  lanzar = true;
}, false);

window.addEventListener("load", function() {
  pelota.dibujar();
}, false);

function oMousePos(canvas, evt) { // detecta la posición del ratón
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}