import React from "react";
import { Container, Flex, Box } from "../parts";
import { GAP } from "../style";

function _({ children }) {
	return (
		<Box
			xs={{
				margin: "1rem 0",
			}}
		>
			<Flex
				xs={{
					flexDirection: "column",
					flexWrap: "wrap",
					gap: GAP.Large_4,
				}}
				md={{
					gap: GAP.Large_6,
				}}
			>
				{children}
			</Flex>
		</Box>
	);
}

_.Wrap = function ({ children }) {
	return (
		<Container
			xs={{
				padding: "0 1rem",
			}}
			lg={{
				padding: 0,
			}}
		>
			<Flex
				xs={{
					flexDirection: "column",
					gap: GAP.Large_7,
				}}
				md={{
					gap: GAP.Large_9,
				}}
			>
				{children}
			</Flex>
		</Container>
	);
};

export default _;
