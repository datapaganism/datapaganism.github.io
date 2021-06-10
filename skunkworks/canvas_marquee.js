
class Point {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	mul(a) {
		this.x *= a.x;
		this.y *= a.y;
		return this;
	}
	muls(a) {
		this.x *= a;
		this.y *= a;
		return this;
	}
	add(a) {
		this.x += a.x;
		this.y += a.y;
		return this;
	}
}

function pMul(a, b) {
	return new Point(a.x * b.x, a.y * b.y);
}
function pMuls(a, b) {
	return new Point(a.x * b, a.y * b);
}
function pSub(a, b) {
	return new Point(a.x - b.x, a.y - b.y);
}

class BezierControls {
	constructor(a, b) {
		this.a = a;
		this.b = b;
	}
}

class BezierPath {
	constructor() {
		this.points = [];
		this.controls = [];
	}
}


class CanvasMarquee {
	constructor(canvas, dimensions, bezierPath, bezierColorStr, bezierThickness, fontSize, fontFamilyStr, fontColorStr, text, speed, breakpoints) {
		this.handleVisibility = this._handleVisibility.bind(this);
		this.handleResize = this._handleResize.bind(this);
		this.update = this._update.bind(this);

		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		this.dimensions = new Point(dimensions[0], dimensions[1]);
		this.fontColorStr = fontColorStr;
		this.fontSize = fontSize;
		this.fontFamilyStr = fontFamilyStr;
		this.renderScale = 1.0;
		this.breakpoints = breakpoints;

		this.ctx.fillStyle = this.fontColorStr;

		this.text = text + ' ';

		this.bezierPath = bezierPath;
		this.bezierColor = bezierColorStr;
		this.bezierThickness = bezierThickness;
		this.handleResize();

		this.theta = 0;
		this.speed = speed;

		this.observer = new IntersectionObserver(this.handleVisibility, {rootMargin: '10px', threshold: 0});
		this.observer.observe(this.canvas);

		window.addEventListener('resize', this.handleResize);
	}

	startAnimation() {
		this.animHandle = window.requestAnimationFrame(this.update);
	}

	stopAnimation() {
		window.cancelAnimationFrame(this.animHandle);
		this.animHandle = null;
	}

	_handleVisibility(entries, observer) {
		for(const entry of entries) {
			if(entry.isIntersecting) this.startAnimation();
			else this.stopAnimation();
		}
	}

	_handleResize() {
		const rect = this.canvas.parentElement.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;
		this.canvas.width = rect.width * dpr;
		this.canvas.height = rect.height * dpr;
		let breakpoint;
		for(let i = this.breakpoints.length - 1; i >= 0; i--) {
			breakpoint = this.breakpoints[i];
			if(rect.width >= breakpoint.width) break;
		}

		// NOTE: this would be the real aspect ratio, but we want it to always be 100% width, so we use the below
		// const ratio = Math.min(this.canvas.width / this.dimensions.x, this.canvas.height / this.dimensions.y);
		let ratio;
		if(breakpoint.aspectHeight) {
			ratio = this.canvas.height / this.dimensions.y;
		} else {
			ratio = this.canvas.width / this.dimensions.x;
		}
		this.renderScale = ratio + breakpoint.additionalScale;
		const finalSize = pMuls(this.dimensions, ratio);

		const marqueeAnchorAbsolute = pMul(finalSize, new Point(breakpoint.marqueeAnchor[0], breakpoint.marqueeAnchor[1]));
		const canvasAnchorAbsolute = pMul(new Point(this.canvas.width, this.canvas.height), new Point(breakpoint.containerAnchor[0], breakpoint.containerAnchor[1]));
		const marqueeTranslation = pSub(canvasAnchorAbsolute, marqueeAnchorAbsolute);
		this.scaledBezierPath = this.computeScaledBezier(this.bezierPath, finalSize, marqueeTranslation);
		this.curves = this.computeCurves(this.scaledBezierPath, 350);

		// Recompute text size
		this.ctx.font = `${this.fontSize * this.renderScale}px '${this.fontFamilyStr}'`;
		this.textCharWidths = [];
		for(let i = 0; i < this.text.length; i++) {
			this.textCharWidths.push(this.ctx.measureText(this.text[i]).width);
		}
		this.letterPadding = this.ctx.measureText(' ').width / 8.0;
		this.letterCapHeight = this.ctx.measureText('M').width; // NOTE: just an approximation until browsers give us advanced text metrics!
		this.letterNormalOffset = this.letterCapHeight / 2; // / 2.0 is technically correct, but this font is wonky
		this.totalTextLength = this.textCharWidths.reduce((acc, cur) => acc + cur) + this.letterPadding * this.text.length;
	}

	_update(timestamp) {
		this.theta = -timestamp / 1000 * this.speed;
		this.draw();
		this.animHandle = window.requestAnimationFrame(this.update);
	}

	computeScaledBezier(bez, finalSize, scaledTranslation) {
		const path = new BezierPath();
		for(let point of bez.points) {
			const pt = pMul(point, finalSize);
			pt.add(scaledTranslation);
			path.points.push(pt);
		}
		for(let control of bez.controls) {
			path.controls.push(new BezierControls(pMul(control.a, finalSize).add(scaledTranslation), pMul(control.b, finalSize).add(scaledTranslation)));
		}
		return path;
	}

	computeCurves(bez, samples) {
		const curves = [];
		let x = 0;
		for(let i = 0; i < bez.controls.length; i++) {
			const curveSamples = [];
			for(let j = 0; j < samples; j++) {
				const a = bezier2(j / samples, bez.points[i], bez.controls[i].a, bez.controls[i].b, bez.points[i+1]);
				const b = bezier2((j + 1) / samples, bez.points[i], bez.controls[i].a, bez.controls[i].b, bez.points[i+1]);
				const c = bezier(a, b);
				x += c.dist;
				curveSamples.push({bezier: a, curve: c, totalDist: x});
			}
			curves.push(curveSamples);
		}
		return curves;
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawBezier(this.scaledBezierPath, this.bezierThickness * this.renderScale, this.bezierColor);
		this.drawText(this.theta);
	}

	drawBezier(bez, width, color) {
		this.ctx.save();
		this.ctx.lineWidth = width;
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(bez.points[0].x, bez.points[0].y);
		for(let i = 0; i < bez.controls.length; i++) {
			this.ctx.bezierCurveTo(bez.controls[i].a.x, bez.controls[i].a.y, bez.controls[i].b.x, bez.controls[i].b.y, bez.points[i+1].x, bez.points[i+1].y);
			this.ctx.stroke();
		}
		this.ctx.restore();
	}

	drawText(offset) {
		let xDist = 0;
		let charDist = offset % this.totalTextLength;
		let iChar = 0;
		let prevXDist = 0;
		let prevSample = this.curves[0][0];

		while (charDist < 0) {
			charDist += this.textCharWidths[iChar] + this.letterPadding;
			iChar = (iChar + 1) % this.text.length;
		}

		for(let curve of this.curves) {
			for(let sample of curve) {
				if(xDist - charDist >= 0) {
					this.ctx.save();
					/*
					// LERP
					let factor = (charDist - prevXDist) / (xDist - prevXDist);
					if(isNaN(factor)) factor = 0;
					this.ctx.translate(
						lerp(prevSample.bezier.x, sample.bezier.x, factor),
						lerp(prevSample.bezier.y, sample.bezier.y, factor)
					);
					this.ctx.rotate(lerp(prevSample.curve.rad, sample.curve.rad, factor));
					*/
					this.ctx.translate(sample.bezier.x, sample.bezier.y);
					this.ctx.rotate(sample.curve.rad);
					this.ctx.translate(0, this.letterNormalOffset);
					this.ctx.fillStyle = this.fontColorStr;
					// this.ctx.font = `${this.fontSizeStr * this.renderScale}px '${this.fontFamilyStr}'`;
					this.ctx.fillText(this.text[iChar], 0, 0);
					this.ctx.restore();

					charDist += this.textCharWidths[iChar] + this.letterPadding;
					iChar = (iChar + 1) % this.text.length;
				} 

				prevXDist = xDist;
				prevSample = sample;
				xDist += sample.curve.dist;
			}
		}
	}
}

function lerp(a, b, factor) {
	return a + (factor * (b - a));
}

// final stage which takes p, p+1 and calculates the rotation, distance on the path
function bezier(b1, b2) {
	return {
		rad: Math.atan2(b1.my, b1.mx),
		dist: Math.sqrt(((b2.x - b1.x) * (b2.x - b1.x)) + ((b2.y - b1.y) * (b2.y - b1.y))),
	};
}

// calculates the tangent line to a point in the curve; later used to calculate the degrees of rotation at this point.
function bezierT(t, start, control1, control2, end) {
	return new Point(
		(3*(1-t)*(1-t) * (control1.x - start.x)) + ((6 * (1-t) * t) * (control2.x - control1.x)) + (3 * t * t * (end.x - control2.x)),
		(3*(1-t)*(1-t) * (control1.y - start.y)) + ((6 * (1-t) * t) * (control2.y - control1.y)) + (3 * t * t * (end.y - control2.y))
	);
}

// quadratic bezier curve plotter
function bezier2(t, start, control1, control2, end) {
	const b1 = bezier1(t, start, control1, control2);
	const b2 = bezier1(t, control1, control2, end);
	const slope = bezierT(t, start, control1, control2, end);
	return {
		x: ((1 - t) * b1.x) + (t * b2.x),
		y: ((1 - t) * b1.y) + (t * b2.y),
		mx: slope.x,
		my: slope.y,
	};
}

// linear bezier curve plotter; used recursivly in the quadratic bezier curve calculation
function bezier1(t, start, control1, control2) {
	return new Point(
		(( 1 - t) * (1 - t) * start.x) + (2 * (1 - t) * t * control1.x) + (t * t * control2.x),
		(( 1 - t) * (1 - t) * start.y) + (2 * (1 - t) * t * control1.y) + (t * t * control2.y)
	);
}