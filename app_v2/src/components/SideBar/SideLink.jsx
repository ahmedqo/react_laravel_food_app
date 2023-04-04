import React from "react";
import styled from "styled-components";
import { COLOR, SIZE, FONT, GAP, RADIUS } from "../../style";
import { Flex, Link as Alink } from "../../parts";

var Link = styled(Alink)`
	font-size: ${SIZE.Large_2};
	font-weight: ${FONT.Large};
	color: ${COLOR.Black};
	&.active {
		color: ${COLOR.White};
		svg {
			fill: ${COLOR.White};
		}
		> div {
			background: ${COLOR.Primary};
		}
	}
	&:hover {
		color: ${COLOR.Black};
		svg {
			fill: ${COLOR.Black};
		}
		> div {
			background: ${COLOR.Primary}50;
		}
	}
`;

export default function ({ to, children, ...prop }) {
	return (
		<Link to={to} {...prop}>
			<Flex
				xs={{
					alignItems: "center",
					flexWrap: "wrap",
					gap: GAP.Small_2,
					padding: 10,
					borderRadius: RADIUS.Large,
				}}
			>
				{children}
			</Flex>
		</Link>
	);
}
