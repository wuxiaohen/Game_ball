var rects = new Array();//save the rectangles
var startTime = Date.now();//note the start time
var context;//note the canvas context
var ball;//the ball user control
var ifOnRect = true;// if the ball is on the rect
var ifBounce = false;// if the ball is in the state of bouncing
//user can only bounce once or twice.Every click will add 1 to the value.(cannot beyond 2)
var bounceCount = 0; 

// --------------- not used -----------------------
// the tag of the rect which the ball is on .
//var numberBallInRect = 0;//at beginning it is on the first one.
							
var requestAnimationFrame = window.requestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.msRequestAnimationFrame;
/*
*	Name:main
*	Input:void
*	Output:void
*	Function: This function is main logic (kernel) of the program.
*			  It finish the all process:
*			  start time contrller -> update the coordinates of all objects ->
*			  check collision and game rules -> render again then recicle  
*/							
var main = function(){
	var now = Date.now();
	var delta = now - startTime;
	update(delta/800);
	check();
	render();
	startTime = now;
	requestAnimationFrame(main);
}
/*
*	Name:update
*	Input:interval -- the time interval,we use the value to calculate coordinates.
*	Output:void
*	Function: this function aims to update the coordinates of all objects include 
*			  the ball and the rectangles.
*/
function update(interval){
	updateRectsCentersByTime(interval);
	updateBallCenterByGravity(interval);
	runBall(interval);
}
/**
*	Name:check
*	Input:void
*	Output:void
*	Function: this function is used to check whether the ball is out of the border include 
*			  the left border and the down border. If out of border,go to excute "gameover"
*			  function.If not,do nothing.
*	Note: according to the frame ,I should carry through collision detection in this function.
*		  But I have worked on collision detection in "utils.js" ,this is not a good idea.
*/
function check(){
	if(checkBorder()){
		gameover();
	}
}
/*
*	Name:render
*	Input:void
*	Output:void
*	Function: I use this function to re-render the all screen. Before that all coordinates have 
*			  been calculated in function "update" and all detects have been moved. 
*
*/
function render(){
	context.clearRect(0,wallStartY + wallHeight,width,height-wallStartY - triangleHeight - wallHeight);//clear primitive screen.
	for(var i=0;i<rects.length;i++){//draw the rectangles
		rects[i].draw(context);
	}
	ball.draw(context);//draw the ball
}

/**
*	Name:gameover
*	Input:void
*	Output:void
*	Function:this function is written to inform the user that the game is over with a prompt dialog
*			 and when the user click "yes" the game will restart.
*	Note:I think there is a bug in here - always many prompt dialogs will show so you should click 
*		 "yes" button many times then the game will restart.To some extent it will impact the gameplay
*		 experience. Now I have not drive the bug away. ----------------when use the function "reset" 
* 		 It will be all right when reload the webview.
*/
function gameover(){
	/*if(confirm("Game over! Start Again?")){
		//reset();
		location.reload();
	}else{
		window.close();
	}*/
	location.reload();
	//alert("Game Over!");
}
/**
*	Name:reset
*	Input:void
*	Output:void
*	Function: to reset the values of variables and initial the game.
*	Note: no used
*/
function reset(){
	rects = new Array();//save the rectangles
	startTime = Date.now();
	context = null;
	ball = null;
	ifOnRect = true;
	ifBounce = false;
	bounceCount = 0;
	cout = 0;
	//numberBallInRect = 0;//at beginning it is on the first one.
	init();
}
/*
*	Name:click
*	Input:void
*	Output:void
*	Function: this is an import function because the properties of interaction with users.
*			  It is responsible for monitor the mouse click events.
*/
function click(){
		if(event.screenX < width /2){//echange color of the ball 
			if(ball.color == colors[0]){//diverse color
				ball.color = colors[1];
			}else{
				ball.color = colors[0];
			}
		}else{
			//we should limit the counts of the click - the user can only click right button twice at most
			if(bounceCount < 3){
				bounceCount++;
			}else{
				return;
			}
			//if the user click the right of the screen,then change the "ifBounce" into true
			//and so the program can start the running of the ball in the utils.js accoding to
			//the value of the "ifBounce"
			ifBounce = true;
			ifOnRect = false;
		}
}

document.onmousedown = click;