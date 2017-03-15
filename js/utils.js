
/*
*	Name:getInitRectsCenters
*	Input:void
*	Output:centers - the values of the centers of the rects (firsr wo donnot think about y so just return centerX)
*	Function:calculate the coordinates of rects in initial view 
*/
function getInitRectsCenters(){
	var width = screen.width;
	var height = screen.height;
	var dividePan = 5; // we need three nodes so divide the screen into four parts
	var centers = new Array();
	for(var i=1;i < dividePan;i++){
		centers.push(width / dividePan * i + gap * (i-1));
	}
	return centers;
}
/*
*	Name:updateRectsCentersByTime
*	Input:interval -- the time interval,we use the value to calculate coordinates.
*	Output:void
*	Function:calculate the coordinates of rects by time 
*/
function updateRectsCentersByTime(interval){
	for(var i=0;i<rects.length;i++){
		rects[i].centerX -= (speed * interval);
	}

	if(rects[0].centerX < -rectWidth/2){
		cout ++;
		var fenshu = document.getElementById("fenshu");
		var score = document.getElementById("score");
		var text=document.createTextNode("分数:"+cout);
		fenshu.replaceChild(text,fenshu.childNodes[0]);
		var rectTemp = rects.shift();
		rectTemp.centerX = width ;
		rectTemp.color = colors[randomFrom(0,1)];
		rectTemp.centerY = randomFrom(width/3,width/2);
		rects.push(rectTemp);
	}
}
/*
*	Name:updateBallCenterByGravity
*	Input:interval -- the time interval,we use the value to calculate coordinates.
*	Output:void
*	Function:calculate the coordinates of ball by time when the ball is in the state of being down
*/
function updateBallCenterByGravity(interval){
	//if the ball is not on the ranctangle and int the same time not on bouncing state ,
	//then we can infer thar the ball is on falling.
	if(!ifOnRect && !ifBounce){
		ball.centerY += speedBallDown * interval;
		var number = checkCollide();//check if the ball is collided with rectangles
		if(number != -1){
			if(!checkColor(number)){
				gameover();
			}
			bounceCount = 0;
		 	ifOnRect = true;
		}
	}
}
/*
*	Name:runBall
*	Input:interval -- the time interval,we use the value to calculate coordinates.
*	Output:void
*	Function:calculate the coordinates of ball by time
*
*/
function runBall(interval){
	if(!ifOnRect){// if the ball is on the ract then it will run according with the rect.
		ball.centerX += speedBallRight * interval;
	}else{// if not the ball will run towards right with the speed of himself
		ball.centerX -= speed * interval;
	}
	if(ifBounce){
		ball.centerY -= (speedBallUp * interval);
		if(ball.centerY <= bounceHeight){
			ifBounce = false;
		}
	}
}
/*
*	Name:randomFrom
*	Input:lowerValue -- the left boundary
*		  upperValue -- the right boundary
*	Output:the int type number between lowerValue and upperValue
*		   (include lowerValue and upperValue)
*	Function: return a random int type number between lowerValue 
*			  and upperValue(include lowerValue and upperValue)
*/
function randomFrom(lowerValue,upperValue){
	var choises = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * choises + lowerValue);
}
/*
*	Name:checkBorder
*	Input:void
*	Output:true -- the ball is out of left border or down border.
*		   false -- the ball isn't out of left border or down border.
*	Function:check whether the ball is out of left border or down border.
*/
function checkBorder(){
	if(ball.centerX <= 0 || ball.centerX > width 
			|| ball.centerY > height){
		return true;
	}else{
		return false;
	}
}
/*
*	Name:checkCollide
*	Input:void
*	Output:number -- -1 or value in [0,1,2,...,rects.length-1] (the index of the ranctangle)
*	Function:check whether the ball is collided with one of the rectangles.
*/
function checkCollide(){
	var number = -1;
	for(var i=0;i<rects.length;i++){
		if(rects[i].centerX < 0){
			continue;
		}
		if(ball.centerX > (rects[i].centerX - rectWidth / 2 )
			&& ball.centerX < (rects[i].centerX + rectWidth / 2)
			&& ball.centerY > (rects[i].centerY - rectHeight / 2 - ball.radius)
			&& ball.centerY < (rects[i].centerY + rectHeight /2 + ball.radius)){
			number = i;
			break;
		}
	}
	return number;
}
/*
*	Name:checkColor
*	Input:index -- the index of the rectangles
*	Output:true -- the ball's color is in accord with some rectangle's.
*		   false -- the ball's color isnot in accord with some rectangle's.
*	Function:check whether the ball's color is in accord with some rectangle's.
*/
function checkColor(index){
	if(ball.color == rects[index].color){
		return true;
	}else{
		return false;
	}
}