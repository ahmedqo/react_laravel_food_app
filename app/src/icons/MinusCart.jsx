import React from "react";
import Wrap from "./Wrap";
import { COLOR } from "../style";

export default function () {
	return (
		<Wrap color={COLOR.Primary}>
			<svg viewBox="0 0 40 40">
				<path d="M0 20C0 8.95431 8.95431 0 20 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H20C8.95431 40 0 31.0457 0 20V20Z" />
				<rect y="17" width="24" height="6" rx="3" x="10" fill={COLOR.White}></rect>
			</svg>
		</Wrap>
	);
}
