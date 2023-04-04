import React from "react";
import Wrap from "./Wrap";
import { COLOR } from "../style";

export default function () {
	return (
		<Wrap color={COLOR.Primary}>
			<svg viewBox="0 0 30 31">
				<path d="M15 0.5C6.70714 0.5 0 5.195 0 11C0 18.875 15 30.5 15 30.5C15 30.5 30 18.875 30 11C30 5.195 23.2929 0.5 15 0.5ZM15 14.75C12.0429 14.75 9.64286 13.07 9.64286 11C9.64286 8.93 12.0429 7.25 15 7.25C17.9571 7.25 20.3571 8.93 20.3571 11C20.3571 13.07 17.9571 14.75 15 14.75Z" />
			</svg>
		</Wrap>
	);
}
