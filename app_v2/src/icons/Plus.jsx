import React from "react";
import Wrap from "./Wrap";

export default function ({ rotate, color, size }) {
	return (
		<Wrap color={color} rotate={rotate} size={size}>
			<svg viewBox="0 0 30 30">
				<rect y="12" width="24" height="6" rx="3" x="3"></rect>
				<rect x="12" y="3" width="6" height="24" rx="3"></rect>
			</svg>
		</Wrap>
	);
}
