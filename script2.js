var contenedor = document.querySelector ("#contenedor");
var canvas= document.querySelector ("#lienzo");
var ampli= document.querySelector ("#ampli");
var ctx= canvas.getContext("2d");
console.log("ctx",ctx);
 
function ampliar(){

contenedor.style.width="100%";
contenedor.style.height="100vh";
contenedor.style.margin="0";
 
lienzo.style.width="100%";
lienzo.style.height="100vh";
lienzo.style.backgroundSize="100% 100%";
lienzo.style.backgroundRepeat="no-repeat";
 
ampli.innerHTML="Txikiagotu";
ampli.style.position="100% 100%";
ampli.style.top="10px";
ampli.style.left="10px";
ampli.style.zIndex="1";
 
ampli.setAttribute("onClick", "reducir()")
}
 
 
function reducir(){

contenedor.style.width = "2000px";
contenedor.style.height = "1000px";
contenedor.style.margin = "5vh auto";
 
lienzo.style.width = "2000px";
lienzo.style.height = "1000px";
 
 
ampli.innerHTML = "Ampliatu";
ampli.style.position = "fixed";
ampli.style.top = "0";
ampli.style.left = "0";
ampli.style.zIndex = "0";
 
ampli.setAttribute("onClick", "ampliar()")
}

ctx.beginPath()
ctx.moveTo(0,1000);
ctx.lineTo(0,425);
ctx.lineTo(200,425);
ctx.bezierCurveTo(500,400,390,810,850,770);
ctx.bezierCurveTo(1100,520,1060,600,1380,770);
ctx.bezierCurveTo(1530,870,1600,570,1730,480);
ctx.lineTo(2000,478);
ctx.lineTo(2000,1000);
ctx.fillStyle = "#924900"
ctx.fill();
ctx.lineWidth=12;
ctx.strokeStyle="#008f39"
ctx.stroke();
