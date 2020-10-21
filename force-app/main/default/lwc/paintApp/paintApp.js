import { LightningElement } from "lwc";
import PaintTool from "./paintTool.js";

export default class PaintApp extends LightningElement {
	TOOL_LINE_ICON = PaintTool.TOOL_LINE_ICON;
	TOOL_RECTANGLE_ICON = PaintTool.TOOL_RECTANGLE_ICON;
	TOOL_CIRCLE_ICON = PaintTool.TOOL_CIRCLE_ICON;
	TOOL_TRIANGLE_ICON = PaintTool.TOOL_TRIANGLE_ICON;

	TOOL_LINE = PaintTool.TOOL_LINE;
	TOOL_RECTANGLE = PaintTool.TOOL_RECTANGLE;
	TOOL_CIRCLE = PaintTool.TOOL_CIRCLE;
	TOOL_TRIANGLE = PaintTool.TOOL_TRIANGLE;

	renderedCallback() {
		this.template.querySelectorAll("[data-tool]").forEach((el) => {
			el.addEventListener("click", (e) => {
				console.log(e.target.alt);
			});
		});
	}
}
