import React from "react";
import { Flex, Link as Alink } from "../../parts";
import styled from "styled-components";
import { COLOR, SIZE, FONT, GAP } from "../../style";

var Link = styled(Alink)`
	&.active,
	&:hover {
		label {
			color: ${COLOR.Primary};
		}
		svg {
			fill: ${COLOR.Primary};
			pointer-events: none;
		}
	}
`;

var Label = styled.label`
	display: none;
	font-size: ${SIZE.Large};
	font-weight: ${FONT.Large_3};
	color: ${COLOR.Black};
	cursor: pointer;
	@media (min-width: 768px) {
		display: block;
	}
`;

export default function ({ to, label, children, ...prop }) {
	return (
		<Link to={to} {...prop}>
			<Flex
				xs={{
					alignItems: "center",
					flexWrap: "wrap",
					gap: GAP.Small_2,
				}}
			>
				{children}
				<Label>{label}</Label>
			</Flex>
		</Link>
	);
}
