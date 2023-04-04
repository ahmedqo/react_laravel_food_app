import React from "react";
import Wrap from "./Wrap";
import { COLOR } from "../style";

export default function () {
	return (
		<Wrap color={COLOR.Primary}>
			<svg viewBox="0 0 40 40">
				<path d="M0 10C0 4.47715 4.47715 0 10 0H20C31.0457 0 40 8.95431 40 20V20C40 31.0457 31.0457 40 20 40H10C4.47715 40 0 35.5228 0 30V10Z" />
				<rect y="17" width="24" height="6" rx="3" x="6" fill={COLOR.White}></rect>
				<rect x="15" y="8" width="6" height="24" rx="3" fill={COLOR.White}></rect>
			</svg>
		</Wrap>
	);
}
