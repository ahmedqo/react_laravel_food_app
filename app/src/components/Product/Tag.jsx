import React from "react";
import { Flex, Title } from "../../parts";
import { COLOR, GAP, RADIUS } from "../../style";
import { Times } from "../../icons";
import { Button } from "..";

export default function ({ children, clicked = () => {} }) {
	return (
		<Flex
			xs={{
				gap: GAP.Large,
				background: COLOR.Primary,
				padding: "4px 10px",
				borderRadius: RADIUS.Large,
				alignItems: "center",
			}}
		>
			<Title xs={{ color: COLOR.White }}>{children}</Title>
			<Button
				xs={{
					width: 14,
					height: 14,
					padding: 0,
					background: "transparent",
				}}
				md={{ width: 14, height: 14 }}
				onClick={clicked}
			>
				<Times color={COLOR.White} size={"14px"} />
			</Button>
		</Flex>
	);
}
