function Rect(centerX,centerY,width,height,color){
	this.centerX = centerX;
	this.centerY = centerY;
	this.width = width;
	this.height = height;
	this.color = color;
	
	//abandom function -- though is works well ,it will consume more momery compared with prototype pattern.
	/*this.draw = function(ctx){
		ctx.beginPath();
		ctx.fillStyle = this.color;
    	ctx.fillRect(this.centerX - this.width/2.0,this.centerY - this.height/2.0
    		,this.width,this.height);
	}*/
}
//combine constructor and prototype pattern and we can save more memory
//it seems to be a good job! Enjoy studying!
Rect.prototype = {
	constructor:Rect,
	draw : function(ctx){
		ctx.beginPath();
		ctx.fillStyle = this.color;
    	ctx.fillRect(this.centerX - this.width/2.0,this.centerY - this.height/2.0
    		,this.width,this.height);
	}
}

function Ball(centerX,centerY,radius,startAngle,endAngle,color){
	this.centerX = centerX;
	this.centerY = centerY;
	this.radius = radius;
	this.startAngle = startAngle;
	this.endAngle = endAngle;
	this.color = color;

	this.draw = function(ctx){
		
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.centerX,this.centerY,this.radius
					,this.startAngle,this.endAngle,true);
		ctx.closePath();
		ctx.fill();

	}
}
