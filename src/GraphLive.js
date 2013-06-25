var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
if (CP && CP.lineTo) CP.dashedLine = function(x, y, x2, y2, dashArray) {
	if (!dashArray) dashArray = [10, 5];
	var dashCount = dashArray.length;
	var dx = (x2 - x);
	var dy = (y2 - y);
	var xSlope = (Math.abs(dx) > Math.abs(dy));
	var slope = (xSlope) ? dy / dx : dx / dy;

	this.moveTo(x, y);
	var distRemaining = Math.sqrt(dx * dx + dy * dy);
	var dashIndex = 0;
	while (distRemaining >= 0.1) {
		var dashLength = Math.min(distRemaining, dashArray[dashIndex % dashCount]);
		var step = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
		if (xSlope) {
			if (dx < 0) step = -step;
			x += step
			y += slope * step;
		} else {
			if (dy < 0) step = -step;
			x += slope * step;
			y += step;
		}
		this[(dashIndex % 2 == 0) ? 'lineTo' : 'moveTo'](x, y);
		distRemaining -= dashLength;
		dashIndex++;
	}
}

window.onload = function() {
	var HORIZONTAL_SPACING = 20, //水平间隔
		HORIZONTAL_SCALE = 10, //水平刻度
		VERTICAL_SPACING = 20, //垂直间隔
		VERTICAL_SCALE = 40; //垂直刻度
	var glCanvas = document.getElementById('glCanvas'),
		context = glCanvas.getContext("2d"),
		w = document.body.clientWidth,
		h = HORIZONTAL_SPACING * HORIZONTAL_SCALE + 1;
	//初始化画布大小
	glCanvas.width = w;
	glCanvas.height = h;
	//绘制画布边框
	context.moveTo(0, 0);
	context.lineTo(w, 0);
	context.moveTo(0, 0);
	context.lineTo(0, h);
	context.moveTo(w, 0);
	context.lineTo(w, h);
	context.moveTo(0, h);
	context.lineTo(w, h);
	//绘制水平刻度线
	for (var i = 1; i <= HORIZONTAL_SCALE; i++) {
		//context.moveTo(0, 20 * i + 0.5);
		//context.lineTo(w, 20 * i + 0.5);
		context.dashedLine(0, 20 * i + 0.5, w, 20 * i + 0.5, [1, 1]);
	}
	//绘制纵向刻度线
	for (var i = 1; i <= VERTICAL_SCALE; i++) {
		// context.moveTo(20 * i + 0.5, 0);
		// context.lineTo(20 * i + 0.5, h);
		context.dashedLine(20 * i + 0.5, 0, 20 * i + 0.5, h, [1, 1]);
	}
	context.stroke();
}