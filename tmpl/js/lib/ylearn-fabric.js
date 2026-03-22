
/**
 * The common eLearning library to work with fabricjs, 
 * @author Yane Frenski / http://yane.fr/
 */


/**
 * Class declaration
 */

function YLearnFabric ( canvas ) {
	
	this.canvas = canvas;
	this.frameDuration = 10;

}

YLearnFabric.prototype.scaleToPerc = function (elem, ratio) {
	var targetScale =  (this.canvas.width * ratio) / elem.width;
	elem.scale(targetScale);
}

YLearnFabric.prototype.centerInCanvasH = function (elem) {
	var left = this.canvas.width/2 - elem.width*elem.scaleX/2;
	elem.left = left;
}


YLearnFabric.prototype.animateUpShow = function(elem, targetTop, duration, delay, callback) {
	var canvas = this.canvas;
	setTimeout(function(){
		elem.animate('top', targetTop, {
			duration: 1000,
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease['easeOutQuad'],
			onComplete: function() {
				setTimeout(function(){
					if(typeof callback === 'function') {
						callback();
					}
				}, 100)
			}
		});
	}, delay)

	setTimeout(function(){
		elem.animate('opacity', 1, {
			duration: 1000,
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease['easeOutQuad']
		});
	}, delay)

}


YLearnFabric.prototype.animateDisappearDown = function(elem, targetBottom, duration, delay, callback) {
	var canvas = this.canvas;
	setTimeout(function(){
		elem.animate('top', targetBottom, {
			duration: 1000,
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease['easeOutQuad'],
			onComplete: function() {
				setTimeout(function(){
					if(typeof callback === 'function') {
						callback();
					}
				}, 100)
			}
		});
	}, delay)

	setTimeout(function(){
		elem.animate('opacity', 0, {
			duration: 1000,
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease['easeOutQuad']
		});
	}, delay)

}


YLearnFabric.prototype.animateDropShow = function(elem, targetBottom, duration, delay) {
	var canvas = this.canvas;
	setTimeout(function(){
		elem.animate('top', targetBottom, {
			duration: 1000,
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease['easeOutBounce']
		});
	}, delay)

	setTimeout(function(){
		elem.animate('opacity', 1, {
			duration: 1000,
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease['easeOutQuad']
		});
	}, delay)

}


YLearnFabric.prototype.animateDownInactive = function(elem, targetBottom, duration, delay) {
	var canvas = this.canvas;
	setTimeout(function(){
		elem.animate('top', targetBottom, {
			duration: 1000,
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease['easeOutQuad']
		});
	}, delay)

	setTimeout(function(){
		elem.animate('opacity', 0.3, {
			duration: 1000,
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease['easeOutQuad']
		});
	}, delay)

}


YLearnFabric.prototype.animateUpActivate = function(elem, targetTop, duration, delay) {
	var canvas = this.canvas;
	setTimeout(function(){
		elem.animate('top', targetTop, {
			duration: 1000,
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease['easeOutQuad']
		});
	}, delay)

	setTimeout(function(){
		elem.animate('opacity', 1, {
			duration: 1000,
			onChange: canvas.renderAll.bind(canvas),
			easing: fabric.util.ease['easeOutQuad']
		});
	}, delay)

}


YLearnFabric.prototype.getXbyPerc = function(xPer) {
	return (xPer/100) * this.canvas.width;
}

YLearnFabric.prototype.getYbyPerc = function(xPer) {
	return (xPer/100) * this.canvas.height;
}


YLearnFabric.prototype.positionByPerc = function(elem, x, y) {
	elem.set({left:this.getXbyPerc(x), top: this.getYbyPerc(y)});
}