import React from "react";
import { FONT, SIZE, COLOR, RADIUS } from "../style";
import { Button } from "../parts";

export default function ({ xs = {}, sm = {}, md = {}, lg = {}, xl = {}, children, ...props }) {
	return (
		<Button
			xs={{
				fontSize: SIZE.Large,
				borderRadius: RADIUS.Large,
				fontWeight: FONT.Large,
				color: COLOR.White,
				background: COLOR.Primary,
				padding: "10px 0",
				width: "100%",
				textAlign: "center",
				cursor: "pointer",
				...xs,
			}}
			sm={sm}
			md={{
				fontSize: SIZE.Large_2,
				borderRadius: RADIUS.Large_2,
				fontWeight: FONT.Large_2,
				width: 160,
				...md,
			}}
			lg={lg}
			xl={xl}
			{...props}
		>
			{children}
		</Button>
	);
}
