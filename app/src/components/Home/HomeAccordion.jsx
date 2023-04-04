import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Title, Flex, Box, Text } from "../../parts";
import { COLOR, FONT, SIZE, GAP } from "../../style";
import { Arrow } from "../../icons";

var BBox = styled.div`
	border: 1px solid ${COLOR.Primary};
	border-radius: 0.5rem;
	cursor: pointer;
	@media (min-width: 1024px) {
		border-radius: 0.75rem;
		border-width: 2px;
	}
`;

export default function ({ title, children }) {
	const [expand, setExpand] = useState(false);

	function click() {
		setExpand(!expand);
	}

	return (
		<Grid.Item
			xs={{
				cols: 12,
			}}
		>
			<BBox onClick={click}>
				<Box
					xs={{
						padding: "10px 16px",
					}}
					md={{
						padding: "12px 16px",
					}}
				>
					<Flex
						xs={{
							gap: GAP.Large,
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Title
							xs={{
								fontWeight: FONT.Large_3,
								fontSize: SIZE.Large_2,
								color: COLOR.Primary,
								textAlign: "left",
							}}
							md={{
								fontSize: SIZE.Large_3,
								fontWeight: FONT.Large_5,
							}}
						>
							{title}
						</Title>
						<Arrow rotate={expand ? 180 : 0} color={COLOR.Primary} />
					</Flex>
				</Box>
			</BBox>
			{expand && (
				<Box xs={{ padding: "16px" }}>
					<Text xs={{ textAlign: "justify" }} md={{ fontSize: SIZE.Large_2 }}>
						{children}
					</Text>
				</Box>
			)}
		</Grid.Item>
	);
}
