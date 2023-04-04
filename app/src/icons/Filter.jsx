import React from "react";
import Wrap from "./Wrap";

export default function ({ rotate, color, size }) {
	return (
		<Wrap color={color} rotate={rotate} size={size}>
			<svg style={{ width: "24px", height: "24px", margin: "auto" }} viewBox="0 0 20 20">
				<path d="M0.265947 2.0125C2.80472 5.25 7.49265 11.25 7.49265 11.25V18.75C7.49265 19.4375 8.05822 20 8.74947 20H11.2631C11.9544 20 12.5199 19.4375 12.5199 18.75V11.25C12.5199 11.25 17.1953 5.25 19.7341 2.0125C20.375 1.1875 19.7843 0 18.7412 0H1.25883C0.215675 0 -0.37503 1.1875 0.265947 2.0125Z" />
			</svg>
		</Wrap>
	);
}
