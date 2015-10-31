
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

var posX=0;
var posY = 0;
var k=1;
var time=0;
var offsetX=0;
var offsetY=0;
var tick=0;
var maps=[];

for (var y = 0; y < 31; y++) {
               maps[y] = [];
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}
unloadScrollBars();
var playerobj = {
	x: 60,
	y: 30,

	draw: function() {
			context.clearRect(playerobj.x-offsetX,playerobj.y-offsetY,20,20);

		context.drawImage(player,playerobj.x-offsetX, playerobj.y-offsetY, 20, 20);
		
	
	},
	
	collision: function(){

		function up(){
			var above=maps[(playerobj.y/30)-1][((playerobj.x)/30)];
			if(above=='0'){upB=true;}
			else if(above=='1'){upB=false;}
			else if(above=='2'){upB=false;}
			//console.log(above);
		}
		function down(){
			
			var below=maps[(playerobj.y/30)+1][(playerobj.x/30)];
			if(below=='0'){downB=true;}
			else if(below=='1'){downB=true;}
			else if(below=='2'){downB=false;}
			//console.log(below);
		}
		function left(){
			var lefty=maps[(playerobj.y/30)][(playerobj.x/30)-1];
			if(lefty=='0'){leftB=true;}
			else if(lefty=='1'){leftB=true;}
			else if(lefty=='2'){leftB=false;}
			//console.log(lefty);
		}
		function right(){
			var righty=maps[(playerobj.y/30)][((playerobj.x)/30)+1];
			if(righty=='0'){rightB=true;}
			else if(righty=='1'){rightB=true;}
			else if(righty=='2'){rightB=false;}
			//console.log(righty);
		}
		function current(){
			var currenty=maps[(playerobj.y/30)][(playerobj.x/30)];
			if(currenty=='1'){downB=false;}
			//console.log(righty);
		}

		right();
		left();
		down();
		up();
		current();
	}
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
