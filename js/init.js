
/*
*	Name:init
*	Input:void
*	Output:void
*	Function:the function is used to initial the view before the beginning of the game circle.
*			 You should call it first when the game starts.
*			 It includes four parts - draw rectangles ,draw ball , draw wall upward and draw triangles bottom.	
*/
function init(){
	var canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	
	canvas.width = width;
    canvas.height = height;

	var centerXs = getInitRectsCenters();
	for(var i=0;i<centerXs.length;i++){
		var rect = new Rect(centerXs[i],randomFrom(width/3,width/2),Math.round(Math.random()*150)+50,rectHeight,colors[randomFrom(0,1)]);
		rects.push(rect);
		rect.draw(context);
	}
	ball = new Ball(rects[0].centerX,rects[0].centerY-rectHeight/2-radius,radius,0,2*Math.PI,rects[0].color);
	ball.draw(context);

	initWall(context,"black","brown");
	initTriangles(context);
}
/*
*	Name:initWall
*	Input:ctx -- the canvas context
*		  colorStart -- the start color of the wall
*		  colorEnd -- the end color of the wall
*	Output:void
*	Function:the function is used to initial the wall before the beginning of the game circle.
*			 It will be called in the function "init()".In this funciton we draw a rectangle as a wall
*			 and the color of the wall is linear-gradient.So I give it two colors - colorStart and 
*			 colorEnd.
*/
function initWall(ctx,colorStart,colorEnd){
	
	ctx.beginPath();
	var grd = ctx.createLinearGradient(0,0,width,0);
	grd.addColorStop(0,colorStart);
	grd.addColorStop(1,colorEnd);
	ctx.fillStyle = grd;
	ctx.fillRect(0,wallStartY,width,wallHeight);
}
/*
*	Name:initTriangles
*	Input:ctx -- the canvas context
*	Output:void
*	Function:the function is used to initial the triangle before the beginning of the game circle.
*			 It will be called in the function "init()".In this funciton we draw a serial of triangles
*		     at the bottom of the canvas.You can clearly understand it after playing the game first.
*/
function initTriangles(ctx){
	var count = width / triangleWidth;
	for(var i=0;i<count;i++){
		triangle(ctx,i * triangleWidth , triangleWidth , triangleHeight);
	}
}
/*
*	Name:triangle
*	Input:ctx -- the canvas context
*		  leftX -- the left node of a triangle.
*		  tWidth -- the width of the triangle.
*		  tHeight -- the height of the triangle.
*	Output:void
*	Function: Maybe this function should be placed in the file "graphy.js" because what it can do is
*			  to draw trangle after you call it with four parameters ,of course,inlcude the coordinates 
*			  of points.
*/
function triangle(ctx,leftX,tWidth,tHeight){

	ctx.beginPath();
	ctx.moveTo(leftX,height);
	ctx.lineTo(leftX + tWidth / 2 , height - tHeight);
	ctx.lineTo(leftX + tWidth , height);
	var grd = ctx.createLinearGradient(0,0,200,0);
	grd.addColorStop(0,"#4CE8B2");
	grd.addColorStop(1,"#EFD458");
	ctx.fillStyle = grd;
	ctx.closePath();
	ctx.fill();
}