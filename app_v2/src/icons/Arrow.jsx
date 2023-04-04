import React from "react";
import Wrap from "./Wrap";

export default function ({ rotate, color, size }) {
	return (
		<Wrap color={color} rotate={rotate} size={size}>
			<svg viewBox="0 0 48 48">
				<path d="M24 31.8 10.9 18.7 14.2 15.45 24 25.35 33.85 15.5 37.1 18.75Z" />
			</svg>
		</Wrap>
	);
}
