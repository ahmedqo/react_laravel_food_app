import React from "react";
import Wrap from "./Wrap";
import { COLOR } from "../style";

export default function () {
	return (
		<Wrap color={COLOR.White}>
			<svg viewBox="0 0 30 30">
				<rect y="12" width="24" height="6" rx="3" x="3"></rect>
			</svg>
		</Wrap>
	);
}
