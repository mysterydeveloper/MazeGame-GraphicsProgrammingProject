////////////////////////music played ina loop \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var win = new Audio('music/bgmusic.wav');
win.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
win.play();

////////////////////////Canvas \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var canvas = document.getElementById("canvas");
window.innerWidth=300;//set the inner width
window.innerHeight=400;//set the inner height
canvas.width=window.innerWidth;//set the canvas width
canvas.height=window.innerHeight//set the canvas height
var context = canvas.getContext("2d");

////////////////////////Variables For Array to display \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var mapArray="   ";
var res=[];
var mazeheight=30;
var mazewidth=50;

////////////////////////Image variables \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var grass = new Image();//init varibale to an image
var tree = new Image();//init varibale to an image
var bush = new Image();//init varibale to an image
var playerleft1 = new Image();//init varibale to an image
var playerleft2 = new Image();//init varibale to an image
var playerRight1 = new Image();//init varibale to an image
var playerRight2 = new Image();//init varibale to an image
var playerUp1 = new Image();//init varibale to an image
var playerUp2 = new Image();//init varibale to an image
var playerDown1 = new Image();//init varibale to an image
var playerDown2 = new Image();//init varibale to an image

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
var starterb=false;

var best = localStorage.getItem("besttime") || 100000;//get the local storage bestime or 100000 if it doesnt exist


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
	
	k=1;//set k=1 so it will draw the maze 
	posX=0-offsetX;//get the offsetX and this is the way i see where the player cause i offset so i have to take that into consideration
	posY=0-offsetY;//get the offsetY and this is the way i see where the player cause i offset so i have to take that into consideration
	for(var i=0; i < 30; i++){//loop over the array
		for(var j=0; j < 99; j++){//loop of the array

			if(res[k]==' ' ){//if res[k] = ' ' draw grass
				context.drawImage(grass,posX, posY, 30, 30);
				maps[i][j]='0';//add 0 to that maps array position for collisions
			}
			if(res[k]=='_' ){//if res[k] = '_' draw bush
				context.drawImage(bush,posX, posY, 30, 30);
				maps[i][j]='1';//add 1 to that maps array position for collisions
			}
			if( res[k]=='|' ){//if res[k] = '|' draw tree
				context.drawImage(tree,posX,posY,30,30);
				maps[i][j]='2';//add 2 to that maps array position for collisions
			}
			k++;//increment k to get the next value in the maze
			posX+=30;//increment posX by 30 so it doesnt draw over the previous image
		}
		if(i<29){//if i<29 draw a tree (border at the end)
			context.drawImage(tree,posX,posY,30,30);
			maps[i][j]='2';//add 2 to that maps array position for collisions
		}
		k+=2;//add 2 to k so that the maze look fine
		posY+=30;//increment posY by 30 so it doesnt draw over the previous image
		posX=0-offsetX;//set posX back to the original value so it can be draw on the next line
	}
	if(i==30){//i==30 draw aload if trees below the maze
		posY-=30;//set this so it doesnt skip a row
		for(off=0;off<20;off++){
		posY+=30;//increment posY by 30 so it doesnt draw over the previous image
		posX=0-offsetX;//set posX back to the original value so it can be draw on the next line
			for(var j=0; j < 98; j++){
				context.drawImage(tree,posX,posY,30,30);//draw tree image
				maps[i][j]='2';//add 2 to that maps array position for collisions
				posX+=30;//increment posX by 30 so it doesnt draw over the previous image

			}
		}
		
	}
	maps[29][98]='3';//set the last position to the finish it 
}
function end(){
	context.clearRect(0,0,1000,1000);//clear canvas
	context.fillStyle= "black";//set the colour to black
	context.fillRect(0,0,1000,1000);//fill the background
	context.fillStyle= "red";//set colour to red
	if(startb==true){
		window.requestAnimationFrame(main);//request Main fucntion the game 
	}
	context.font="30px Verdana";//set the font to be 30px verdana
	context.fillText(" TRAPPED ",10,30);//draw the text onto the screen at a x and y value
	context.font="10px Verdana";//set the font to be 10px verdana
	context.fillText(" You Win !!!!!!! ",10,60);//draw the text onto the screen at a x and y value
	context.fillText(" You have defeated the evil mastermind",10,80);//draw the text onto the screen at a x and y value
	context.fillText(" and foiled his evil plan !!! ",10,100);//draw the text onto the screen at a x and y value
	context.fillText(" the world is is in your death ",10,120);//draw the text onto the screen at a x and y value
	context.fillText(" would u like to try again? ",10,140);//draw the text onto the screen at a x and y value
	context.font="30px Verdana";//set the font to be 30px verdana
	context.fillText(" If so Press ENTER NOW!! ",10,190);	//draw the text onto the screen at a x and y value
	window.requestAnimationFrame(end);//request end fucntion the game 
}
function main(){
	setTimeout(function() {
		startb=false;//set startb= false
		var cpop=maps[(playerobj.y/30)][(playerobj.x/30)];//get the positon of the player
		if(cpop=='3'){//if cpop is 3 end the game and start end game loop
			if(tick<best){//if the time its taken is less than the best time 
				best=tick;//set the best time to the current time
				localStorage.setItem("besttime",best);//set the best time into localstorage
			}
			window.requestAnimationFrame(end);//request end fucntion the game 
			return;//return fromt the main game loop
		}
		else{

			context.clearRect(0,0,2000,2000);//clear canvas
			context.fillRect(0,0,2000,2000);//fill the background
		if(time>0){// if time is greater than 0 draw the maze
			mazedraw();
		}
			//load alll the images and draw the maze
		grass.onload = function (){
			tree.onload = function (){
				bush.onload = function(){
					mazedraw();
				} 
			}

		}
		time++;//increment time	
		playerobj.draw();//draw the playerobj
		//console.log(tick);
		context.font="30px Verdana";//set the font to be 30px verdana
		context.fillText("time:"+tick,window.innerWidth/2/2,window.innerHeight);//draw the text onto the screen at a x and y value
		context.fillStyle = "#ff0000"; //set the colour to black

		window.requestAnimationFrame(main);//request Main fucntion the game 
		}
	}, 1000/10);
}
function start(){
	if(startb==true){
		window.requestAnimationFrame(main);//request Main fucntion the game 
	}
	context.clearRect(0,0,2000,2000);//clear canvas
	if(startb==false){
	context.fillStyle= "black";//set colour to black
	context.fillRect(0,0,2000,2000);//fill the background
	context.fillStyle= "red";//set colour to red
	context.font="30px Verdana";//set the font to be 30px verdana
	context.fillText(" TRAPPED ",10,30);//draw the text onto the screen at a x and y value
	context.font="10px Verdana";//set the font to be 10px verdana
	context.fillText(" You have been trapped by an evil mastermind ",10,60);//draw the text onto the screen at a x and y value
	context.fillText(" Can you escape his clutches and warn the world",10,80);//draw the text onto the screen at a x and y value
	context.fillText(" of his evil plan !!! ",10,100);//draw the text onto the screen at a x and y value
	context.fillText(" the world is depending on you... ",10,120);//draw the text onto the screen at a x and y value
	context.fillText(" are you up to the challenge? ",10,140);//draw the text onto the screen at a x and y value
	context.font="30px Verdana";//set the font to be 30px verdana
	context.fillText(" If so Press ENTER NOW!! ",10,190);//draw the text onto the screen at a x and y value
	if(best==100000) best="NEVER FINSISHED ";
	context.fillText(" Best time: ",10,230);//draw the text onto the screen at a x and y value
	context.fillText(" "+best,10,260);//draw the text onto the screen at a x and y value
	window.requestAnimationFrame(start);//request startfucntion the game 
	}
}
window.requestAnimationFrame(start);//request startfucntion the game 

setInterval(function add(){tick++;},1000);//function to keep track of time

window.addEventListener("keydown", function(event) { 
if(starterb==true){
        playerobj.collision();
        if (event.keyCode == 39 && rightB==true )//right
	  {
		playerobj.x+=30;		  
		offsetX+=30;
		  rightSB=true;//set right = true so it can move 
		  leftSB=false;//set left = false so it cant move 
		  upSB=false;//set up = false so it cant move 
		  downSB=false;//set down = false so it cant move 
          //console.log(event);
	  }
        if (event.keyCode == 37 && leftB==true )//left
	  {
		  playerobj.x-=30;
		  offsetX-=30;
		  rightSB=false;//set right = false so it cant move 
		  leftSB=true;//set left = true so it can move 
		  upSB=false;//set up = false so it cant move 
		  downSB=false;//set down = false so it cant move 
           //console.log(event);
	  }
        if (event.keyCode == 40 && downB==true )//down
	  {
		playerobj.y+=30;
		offsetY+=30;
 		  rightSB=false;//set right = false so it cant move 
		  leftSB=false;//set left = false so it cant move 
		  upSB=false;//set up = false so it cant move 
		  downSB=true;//set down = true so it can move down
		  //console.log(event);
	  }
        if (event.keyCode == 38 && upB==true )//up
	  {
		playerobj.y-=30;
		  offsetY-=30;
		  rightSB=false;//set right = false so it cant move 
		  leftSB=false;//set left = false so it cant move 
		  upSB=true;//set up = true so it can move 
		  downSB=false;//set down = false so it cant move down
           //console.log(event);
	  }
	
}
	if (event.keyCode == 13 )//enter
	  {
		startb=true;//set startb = true to game can play
		  starterb=true;//set starterb = true so the player can move
           //console.log(event);
	  }
        
});