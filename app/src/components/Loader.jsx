import React from "react";
import { Flex, Box } from "../parts";
import { RADIUS, COLOR } from "../style";
import styled, { keyframes } from "styled-components";

var spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

var Loader = styled.span`
	display: block;
	width: 100px;
	height: 100px;
	position: relative;
	&::before,
	&::after {
		content: "";
		position: absolute;
		inset: 0;
		border-radius: 50px;
		border: 20px solid ${COLOR.Primary}50;
		border-bottom: unset;
		border-top: unset;
		animation: ${spin} 500ms linear infinite;
	}
	&::after {
		animation: ${spin} 500ms linear infinite reverse;
	}
`;

export default function () {
	return (
		<Box
			xs={{
				margin: "1rem 0",
				overflow: "unset",
			}}
		>
			<Flex
				xs={{
					alignItems: "center",
					justifyContent: "center",
					margin: "1rem 0",
				}}
				md={{
					margin: "2rem 0",
				}}
			>
				<Loader />
			</Flex>
		</Box>
	);
}
