
var canvas = document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight
var context = canvas.getContext("2d");

var mapArray="   ";
var res=[];
var mazeheight=30;
var mazewidth=50;

var grass = new Image();
var tree = new Image();
var bush = new Image();
var player = new Image();

grass.src= 'grass.png';
tree.src = 'tree.png';
bush.src = 'bush.png';
player.src='player.png';

var upB=true;
var downB=true;
var leftB=true;
var rightB=true;


function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}
unloadScrollBars();
var playerobj = {
	
}
 
function maze() {
  
}
maze();

function mazedraw(){
	
}

function main(){

	window.requestAnimationFrame(main);
}


window.requestAnimationFrame(main);

window.addEventListener("keydown", function(event) { 



});
