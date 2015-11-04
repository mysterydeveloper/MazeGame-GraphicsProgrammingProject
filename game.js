
////////////////////////Canvas \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var canvas = document.getElementById("canvas");
window.innerWidth=300;
window.innerHeight=400;
canvas.width=window.innerWidth;
canvas.height=window.innerHeight
var context = canvas.getContext("2d");

////////////////////////Variables For Array to display \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var mapArray="   ";
var res=[];
var mazeheight=30;
var mazewidth=50;

////////////////////////Image variables \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var grass = new Image();
var tree = new Image();
var bush = new Image();
var playerleft1 = new Image();
var playerleft2 = new Image();
var playerRight1 = new Image();
var playerRight2 = new Image();
var playerUp1 = new Image();
var playerUp2 = new Image();
var playerDown1 = new Image();
var playerDown2 = new Image();

////////////////////////Image sources \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
grass.src= 'res/grass.png';
tree.src = 'res/tree.png';
bush.src = 'res/bush.png';
playerleft.src='res/player/playerleft1.png';
playerleft2.src='res/player/playerleft2.png';
playerRight1.src='res/player/playerRight1.png';
playerRight2.src='res/player/playerRight1.png';
playerUp1.src='res/player/playerUp1.png';
playerUp2.src='res/player/playerUp2.png';
playerDown1.src='res/player/playerDown1.png';
playerDown2.src='res/player/playerDown2.png';

////////////////////////Boolean variables for collisions \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var upB=true;
var downB=true;
var leftB=true;
var rightB=true;

////////////////////////Misc variables for game \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var posX=0;
var posY = 0;
var k=1;
var time=0;
var offsetX=0;
var offsetY=0;
var tick=0;
var maps=[];
var startb=false;
var best = localStorage.getItem("besttime") || 100000;


////////////////////////Making maps[] a 2d array by looping over \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
for (var y = 0; y < 31; y++) {
               maps[y] = [];
}

////////////////////////Function for disabling scroll bars \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}
unloadScrollBars();

////////////////////////Player Object \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var playerobj = {
	/////////////Player x and y positions\\\\\\\\\\\\\\\\\
	x: 60,
	y: 30,
	////////////////////////Draw Function for drawing the player to the screen \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	draw: function() {
			context.clearRect(playerobj.x-offsetX,playerobj.y-offsetY,20,20);

		context.drawImage(player,playerobj.x-offsetX, playerobj.y-offsetY, 20, 20);
		
	
	},
	////////////////////////Collision function to see whre the player is and dectect if he is able to move or not \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	collision: function(){
		////////////////////////up function the sees if the player can move up or not \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		function up(){
			var above=maps[(playerobj.y/30)-1][((playerobj.x)/30)];
			if(above=='0'){upB=true;}
			else if(above=='1'){upB=false;}
			else if(above=='2'){upB=false;}
			//console.log(above);
		}
		////////////////////////down function the sees if the player can move down or not \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		function down(){
			
			var below=maps[(playerobj.y/30)+1][(playerobj.x/30)];
			if(below=='0'){downB=true;}
			else if(below=='1'){downB=true;}
			else if(below=='2'){downB=false;}
			//console.log(below);
		}
		////////////////////////left function the sees if the player can move left or not \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		function left(){
			var lefty=maps[(playerobj.y/30)][(playerobj.x/30)-1];
			if(lefty=='0'){leftB=true;}
			else if(lefty=='1'){leftB=true;}
			else if(lefty=='2'){leftB=false;}
			//console.log(lefty);
		}
		////////////////////////right function the sees if the player can move right or not \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		function right(){
			var righty=maps[(playerobj.y/30)][((playerobj.x)/30)+1];
			if(righty=='0'){rightB=true;}
			else if(righty=='1'){rightB=true;}
			else if(righty=='2'){rightB=false;}
			//console.log(righty);
		}
		////////////////////////current function the sees if the player can move down or not if player is on a half block\\\\\\\\\\
		function current(){
			var currenty=maps[(playerobj.y/30)][(playerobj.x/30)];
			if(currenty=='1'){downB=false;}
			//console.log(currenty);
		}

		right();
		left();
		down();
		up();
		current();
	}
}
////////////////////////Maze function for designing the maze which is all done by the computer when the game runs \\\\\\\\\\\\\\\\\\\\\\
function maze() {
	////////////////////////mazeMaker OBject for the maze generation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   var mazeMaker = {
        map    : [],
        WIDTH  : 50,
        HEIGHT : 30,
 
        DIRECTIONS : {
           'N' : { dy: -1, opposite: 'S' },
            'S' : { dy:  1, opposite: 'N' },
            'E' : { dx:  1, opposite: 'W' },
            'W' : { dx: -1, opposite: 'E' }
        },
 
        prefill : function () {
		for (var x = 0; x < this.WIDTH; x++) {
                this.map[x] = [];
                for (var y = 0; y < this.HEIGHT; y++) {
                    this.map[x][y] = {};
                }
            }
        },
 
        shuffle : function (o) {
 		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },
 
        carve : function (x0, y0, direction) {
 		//console.log('[%d, %d, "%s"]', x0, y0, direction);
 
            var x1 = x0 + (this.DIRECTIONS[direction].dx || 0);
            var y1 = y0 + (this.DIRECTIONS[direction].dy || 0);
 
            if (x1 == 0 || x1 == this.WIDTH || y1 == 0 || y1 == this.HEIGHT) {
                return;
            }
 
            if ( this.map[x1][y1].seen ) {
                return;
            }
 
            this.map[x0][y0][ direction ] = true;
            this.map[x1][y1][ this.DIRECTIONS[direction].opposite ] = true;
            this.map[x1][y1].seen = true;
		//console.log(this.map[x1][y1]);
		  
 
            var directions = this.shuffle([ 'N', 'S', 'E', 'W' ]);
            for (var i = 0; i < directions.length; i++) {
                this.carve(x1, y1, directions[i]);
            }
        },
 
        output : function () {
 		var output = ' ';
            for (var y = 0; y < this.HEIGHT; y++) {
                for (var x = 0; x < this.WIDTH; x++) {
                    output += ( this.map[x][y].S ? ' ' : '_' );    
                    output += ( this.map[x][y].E ? ' ' : '|' );
                }
                output += '\n';
            }
            output = output.replace(/_ /g, '__');
		  console.log(output);
		  mapArray=output;
            
        }
    };
 
    mazeMaker.prefill();
    mazeMaker.carve(mazeMaker.WIDTH/2, mazeMaker.HEIGHT/2, 'N');
    mazeMaker.output();
	res=mapArray.split("");
}
maze();

function mazedraw(){
	k=1;
	posX=0-offsetX;
	posY=0-offsetY;
	for(var i=0; i < 30; i++){
		for(var j=0; j < 99; j++){

			if(res[k]==' ' ){
				context.drawImage(grass,posX, posY, 30, 30);
				maps[i][j]='0';
			}
			if(res[k]=='_' ){
				context.drawImage(bush,posX, posY, 30, 30);
				maps[i][j]='1';
			}
			if( res[k]=='|' ){
				context.drawImage(tree,posX,posY,30,30);
				maps[i][j]='2';
			}
			k++;
			posX+=30;
		}
		if(i<29){
			context.drawImage(tree,posX,posY,30,30);
			maps[i][j]='2';
		}
		k+=2;
		posY+=30;
		posX=0-offsetX;
	}
	if(i==30){
		posY-=30;
		for(off=0;off<10;off++){
		posY+=30;
		posX=0-offsetX;
			for(var j=0; j < 98; j++){
				context.drawImage(tree,posX,posY,30,30);
				maps[i][j]='2';
				posX+=30;

			}
		}
		
	}
	maps[29][98]='3';
}
function end(){
	context.clearRect(0,0,1000,1000);
	context.fillStyle= "black";
	context.fillRect(0,0,1000,1000);
	context.fillStyle= "red";
	if(startb==true){window.requestAnimationFrame(main);}
	context.font="30px Verdana";
	context.fillText(" TRAPPED ",10,30);
	context.font="10px Verdana";
	context.fillText(" You Win !!!!!!! ",10,60);
	context.fillText(" You have defeated the evil mastermind",10,80);
	context.fillText(" and foiled his evil plan !!! ",10,100);
	context.fillText(" the world is is in your death ",10,120);
	context.fillText(" would u like to try again? ",10,140);
	context.font="30px Verdana";
	context.fillText(" If so Press ENTER NOW!! ",10,190);	
	window.requestAnimationFrame(end);
}
function main(){
	startb=false;
	var cpop=maps[(playerobj.y/30)][(playerobj.x/30)];
	if(cpop=='3'){
		if(tick<best){best=tick;}
		window.requestAnimationFrame(end);
	}
	else{
		
		context.clearRect(0,0,2000,2000);
		context.fillRect(0,0,2000,2000);
	if(time>0){mazedraw();}
	grass.onload = function (){
		tree.onload = function (){
			bush.onload = function(){
				mazedraw();
			} 
		}

	}
	time++;	
	playerobj.draw();
	//console.log(tick);
	context.font="30px Verdana";
	context.fillText("time:"+tick,window.innerWidth/2/2,window.innerHeight);
	context.fillStyle = "#ff0000"; 
		
	window.requestAnimationFrame(main);
	}
}
function start(){
	if(startb==true){window.requestAnimationFrame(main);}
	context.clearRect(0,0,2000,2000);
	if(startb==false){
	context.fillStyle= "black";
	context.fillRect(0,0,2000,2000);
	context.fillStyle= "red";
	context.font="30px Verdana";
	context.fillText(" TRAPPED ",10,30);
	context.font="10px Verdana";
	context.fillText(" You have been trapped by an evil mastermind ",10,60);
	context.fillText(" Can you escape his clutches and warn the world",10,80);
	context.fillText(" of his evil plan !!! ",10,100);
	context.fillText(" the world is depending on you... ",10,120);
	context.fillText(" are you up to the challenge? ",10,140);
	context.font="30px Verdana";
	context.fillText(" If so Press ENTER NOW!! ",10,190);
	if(best==100000) best="NEVER FINSISHED ";
	context.fillText(" Best time: ",10,230);
	context.fillText(" "+best,10,260);
	window.requestAnimationFrame(start);
	}
}
window.requestAnimationFrame(start);

setInterval(function add(){tick++;},1000);

window.addEventListener("keydown", function(event) { 

        playerobj.collision();
        if (event.keyCode == 39 && rightB==true )//right
	  {
		playerobj.x+=30;		  
		offsetX+=30;	
          //console.log(event);
	  }
        if (event.keyCode == 37 && leftB==true )//left
	  {
		  playerobj.x-=30;
		  offsetX-=30;
           //console.log(event);
	  }
        if (event.keyCode == 40 && downB==true )//down
	  {
		playerobj.y+=30;
		offsetY+=30;
 		//console.log(event);
	  }
        if (event.keyCode == 38 && upB==true )//up
	  {
		playerobj.y-=30;
		  offsetY-=30;
           //console.log(event);
	  }
	if (event.keyCode == 13 )//enter
	  {
		startb=true;
           //console.log(event);
	  }
        
});