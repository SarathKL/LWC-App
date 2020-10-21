import { LightningElement } from "lwc";
import {
	TOOL_LINE_ICON,
	TOOL_RECTANGLE_ICON,
	TOOL_CIRCLE_ICON,
	TOOL_TRIANGLE_ICON,
	TOOL_LINE,
	TOOL_RECTANGLE,
	TOOL_CIRCLE,
	TOOL_TRIANGLE
} from "./paintTool.js";

export default class PaintApp extends LightningElement {
	TOOL_LINE_ICON = TOOL_LINE_ICON;
	TOOL_RECTANGLE_ICON = TOOL_RECTANGLE_ICON;
	TOOL_CIRCLE_ICON = TOOL_CIRCLE_ICON;
	TOOL_TRIANGLE_ICON = TOOL_TRIANGLE_ICON;

	TOOL_LINE = TOOL_LINE;
	TOOL_RECTANGLE = TOOL_RECTANGLE;
	TOOL_CIRCLE = TOOL_CIRCLE;
	TOOL_TRIANGLE = TOOL_TRIANGLE;

	renderedCallback() {
		this.template.querySelectorAll("[data-tool]").forEach((el) => {
			el.addEventListener("click", (e) => {
				this.setSelectedItem(el);
				console.log(e.target.alt);
			});
		});
	}

	setSelectedItem(el) {
		this.template.querySelector("[data-tool].active").classList.toggle("active");
		el.classList.toggle("active");
	}
}
