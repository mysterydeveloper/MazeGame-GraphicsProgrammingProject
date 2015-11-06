////////////////////////music played ina loop \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var win = new Audio('music/bgmusic.wav');
win.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
win.play();

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
playerleft1.src='res/player/playerleft1.png';
playerleft2.src='res/player/playerleft2.png';
playerRight1.src='res/player/playerRight1.png';
playerRight2.src='res/player/playerRight2.png';
playerUp1.src='res/player/playerUp1.png';
playerUp2.src='res/player/playerUp2.png';
playerDown1.src='res/player/playerDown1.png';
playerDown2.src='res/player/playerDown2.png';


////////////////////////Boolean variables for different sprites \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var upSB=false;
var leftSB= false;
var rightSB= true;
var downSB=false;


////////////////////////Boolean variables for collisions \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var upB=true;
var downB=true;
var leftB=true;
var rightB=true;
var count=0;

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
		
		////////////////////////draw the up images if the player has pressed the up arrow \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		if(upSB==true){
			if(count%2==0){
				context.drawImage(playerUp1,playerobj.x-offsetX, playerobj.y-offsetY, 20, 20);//draws up image1 if count%2==0
				count++;//increment count so it displays the second version of the image next time
			}
			else{
				context.drawImage(playerUp2,playerobj.x-offsetX, playerobj.y-offsetY, 20, 20);//draws up image2 if count%2!=0
				count++;//increment count so it displays the first version of the image next time
			}
		}
		////////////////////////draw the left images if the player has pressed the left arrow \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		if(leftSB==true){
			if(count%2==0){
				context.drawImage(playerleft1,playerobj.x-offsetX, playerobj.y-offsetY, 20, 20);//draws left image1 if count%2==0
				count++;//increment count so it displays the second version of the image next time
			}
			else{
				context.drawImage(playerleft2,playerobj.x-offsetX, playerobj.y-offsetY, 20, 20);//draws left image2 if count%2!=0
				count++;//increment count so it displays the first version of the image next time
			}
		}
		////////////////////////draw the right images if the player has pressed the right arrow \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		if(rightSB==true){
			if(count%2==0){
				context.drawImage(playerRight1,playerobj.x-offsetX, playerobj.y-offsetY, 20, 20);//draws right image1 if count%2==0
				count++;//increment count so it displays the second version of the image next time
			}
			else{
				context.drawImage(playerRight2,playerobj.x-offsetX, playerobj.y-offsetY, 20, 20);//draws right image2 if count%2!=0
				count++;//increment count so it displays the first version of the image next time
			}
		}
		////////////////////////draw the down images if the player has pressed the down arrow \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		if(downSB==true){
			if(count%2==0){
				context.drawImage(playerDown1,playerobj.x-offsetX, playerobj.y-offsetY, 20, 20);//draws down image1 if count%2==0
				count++;//increment count so it displays the second version of the image next time
			}
			else{
				context.drawImage(playerDown2,playerobj.x-offsetX, playerobj.y-offsetY, 20, 20);//draws down image2 if count%2!=0
				count++;//increment count so it displays the first version of the image next time
			}
		}	
	
	},
////////////////////////Collision function to see whre the player is and dectect if he is able to move or not \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	collision: function(){
		////////////////////////up function the sees if the player can move up or not \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		function up(){
			var above=maps[(playerobj.y/30)-1][((playerobj.x)/30)];//gets the position of playerobj in maps array-1y to get the above value
			if(above=='0'){upB=true;}//if its a 0 you can move up
			else if(above=='1'){upB=false;}//if its a 1 you cant move up
			else if(above=='2'){upB=false;}//if its a 2 you cant move up
			//console.log(above);
		}
		////////////////////////down function the sees if the player can move down or not \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		function down(){
			
			var below=maps[(playerobj.y/30)+1][(playerobj.x/30)];//gets the position of playerobj in maps array+1y to get the below value
			if(below=='0'){downB=true;}//if its a 0 you can move down
			else if(below=='1'){downB=true;}//if its a 1 you can move down
			else if(below=='2'){downB=false;}//if its a 2 you cant move down
			//console.log(below);
		}
		////////////////////////left function the sees if the player can move left or not \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		function left(){
			var lefty=maps[(playerobj.y/30)][(playerobj.x/30)-1];//gets the position of playerobj in maps array-1x to get the left value
			if(lefty=='0'){leftB=true;}//if its a 0 you can move left
			else if(lefty=='1'){leftB=true;}//if its a 1 you can move left
			else if(lefty=='2'){leftB=false;}//if its a 2 you cant move left
			//console.log(lefty);
		}
		////////////////////////right function the sees if the player can move right or not \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		function right(){
			var righty=maps[(playerobj.y/30)][(playerobj.x/30)+1];//gets the position of playerobj in maps array+1x to get the right value
			if(righty=='0'){rightB=true;}//if its a 0 you can move right
			else if(righty=='1'){rightB=true;}//if its a 1 you can move right
			else if(righty=='2'){rightB=false;}//if its a 2 you cant move right
			//console.log(righty);
		}
		////////////////////////current function the sees if the player can move down or not if player is on a half block\\\\\\\\\\
		function current(){
			var currenty=maps[(playerobj.y/30)][(playerobj.x/30)];//gets the position of playerobj in maps array
			if(currenty=='1'){downB=false;}//if its a 1 you can move down
			//console.log(currenty);
		}

		right();//call function right to see what is right of player
		left();//call function left to see what is left of player
		down();//call function down to see what is down of player
		up();//call function up to see what is up of player
		current();//call function current to see where player is
	}
}
////////////////////////Maze function for designing the maze which is all done by the computer when the game runs \\\\\\\\\\\\\\\\\\\\\\
function maze() {
	////////////////////////mazeMaker OBject for the maze generation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   var mazeMaker = {
        map    : [],//create an array to hold the maze
        WIDTH  : 50,//set the width of the maze
        HEIGHT : 30,//set the height of the maze
 
        DIRECTIONS : {//create an object called directions to store the directions the maze can move  N-E-S-W
           'N' : { dy: -1, opposite: 'S' },//create an object call 'N' Which is north, it has two values dy to move the maze that way -1(up) and opposite to set its polar opposite 'S'
            'S' : { dy:  1, opposite: 'N' },//create an object call 'S' Which is south, it has two values dy to move the maze that way +1(down) and opposite to set its polar opposite 'N'	  
            'E' : { dx:  1, opposite: 'W' },//create an object call 'E' Which is east, it has two values dx to move the maze that way +1(right) and opposite to set its polar opposite 'W'		  
            'W' : { dx: -1, opposite: 'E' }//create an object call 'W' Which is east, it has two values dx to move the maze that way -1(left) and opposite to set its polar opposite 'E'
        },
 
        prefill : function () {//Prefill function that fills the array 
		for (var x = 0; x < this.WIDTH; x++) {
                this.map[x] = [];//creating a 2d array(as far as i know this is the only wat to create a 2d arry)
                for (var y = 0; y < this.HEIGHT; y++) {
                    this.map[x][y] = {};//create and object for each element in the array
                }
            }
        },
 
        shuffle : function (o) {//shuffle fucntin that basically randomises the maze so a random output is done everytime
 		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);//randomises the maze
            return o;//return the randomised maze
        },
 
        carve : function (x0, y0, direction) {//carve function this carves a way throught the grid to make it to the end
 		//console.log('[%d, %d, "%s"]', x0, y0, direction);
 
            var x1 = x0 + (this.DIRECTIONS[direction].dx || 0);//
            var y1 = y0 + (this.DIRECTIONS[direction].dy || 0);
 
            if (x1 == 0 || x1 == this.WIDTH || y1 == 0 || y1 == this.HEIGHT) {
                return;//return if the value of x1 is 0 || x1 == width || y1 is 0 || y1 == height so it makes so it doesnt try to carve after or before the starting value
            }
 
            if ( this.map[x1][y1].seen ) {
                return;//return if the element is  has already been carved through so it doesnt end up with nothing in the maze 
            }
 
            this.map[x0][y0][ direction ] = true;//if it has made it this far set it to true to make it available to be shuffed then carved
            this.map[x1][y1][ this.DIRECTIONS[direction].opposite ] = true;//if it has made it this far set it to true to make it available to be shuffed then carved
            this.map[x1][y1].seen = true;////if it has made it this far set it to true so it cant be seen again
		//console.log(this.map[x1][y1]);
		  
 
            var directions = this.shuffle([ 'N', 'S', 'E', 'W' ]);//shuffle the directions to make it carve a different root every time
            for (var i = 0; i < directions.length; i++) {
                this.carve(x1, y1, directions[i]);//carve through the maze
            }
        },
 
        output : function () {
 		var output = ' ';//init output to nothing 
            for (var y = 0; y < this.HEIGHT; y++) {
                for (var x = 0; x < this.WIDTH; x++) {
                    output += ( this.map[x][y].S ? ' ' : '_' );//ouput a ' ' or a '_'
                    output += ( this.map[x][y].E ? ' ' : '|' );//ouput a ' ' or a '|'
                }
                output += '\n';//everytime it has exceed the width return to a new line to make tha maze look proper
            }
            output = output.replace(/_ /g, '__');//replace '_ ' with '__' so that the maze doesnt look like its missing parts
		  //console.log(output);
		  mapArray=output;//set mapArray to the value of output so that mapArray can be passed to draw to the screen 
            
        }
    };
 
    mazeMaker.prefill();// call the prefill function
    mazeMaker.carve(mazeMaker.WIDTH/2, mazeMaker.HEIGHT/2, 'N');//call the carve function to carve a way to the end 
    mazeMaker.output();//call the output function
	res=mapArray.split("");//split the mapArray into an array cal res 
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
	setTimeout(function() {
		startb=false;
		var cpop=maps[(playerobj.y/30)][(playerobj.x/30)];
		if(cpop=='3'){
			if(tick<best){best=tick;localStorage.setItem("besttime",best);}
			window.requestAnimationFrame(end);
			return;
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
	}, 1000/10);
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
		  rightSB=true;
		  leftSB=false;
		  upSB=false;
		  downSB=false;
          //console.log(event);
	  }
        if (event.keyCode == 37 && leftB==true )//left
	  {
		  playerobj.x-=30;
		  offsetX-=30;
		  rightSB=false;
		  leftSB=true;
		  upSB=false;
		  downSB=false;
           //console.log(event);
	  }
        if (event.keyCode == 40 && downB==true )//down
	  {
		playerobj.y+=30;
		offsetY+=30;
 		  rightSB=false;
		  leftSB=false;
		  upSB=false;
		  downSB=true;
		  //console.log(event);
	  }
        if (event.keyCode == 38 && upB==true )//up
	  {
		playerobj.y-=30;
		  offsetY-=30;
		  rightSB=false;
		  leftSB=false;
		  upSB=true;
		  downSB=false;
           //console.log(event);
	  }
	if (event.keyCode == 13 )//enter
	  {
		startb=true;
           //console.log(event);
	  }
        
});