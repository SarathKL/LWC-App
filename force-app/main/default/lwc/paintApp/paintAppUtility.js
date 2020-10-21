import Point from "./point.js";
export default class PaintAppUtility {
	static getMouseCoordsOnCanvas(canvas, e) {
		let rect = canvas.getBoundingClientRect();
		let x = e.clientX - rect.left;
		let y = e.clientY - rect.top;
		return new Point(x, y);
	}

	static calcHypotenuse(startPos, endPos) {
		return Math.sqrt(Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2));
	}
}
