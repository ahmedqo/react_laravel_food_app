import React from "react";
import styled from "styled-components";
import { Grid, Title, Flex, Box } from "../../parts";
import { COLOR, FONT, SIZE, GAP } from "../../style";

var BBox = styled.div`
	border: 1px solid ${COLOR.Primary};
	border-radius: 0.5rem;
	@media (min-width: 1024px) {
		border-radius: 0.75rem;
		border-width: 2px;
	}
`;

export default function ({ number, title }) {
	return (
		<Grid.Item
			xs={{
				cols: 6,
			}}
			md={{
				cols: 3,
			}}
		>
			<BBox>
				<Box
					xs={{
						padding: "16px 0",
					}}
				>
					<Flex
						xs={{
							flexDirection: "column",
							gap: GAP.Small_2,
							alignItems: "center",
						}}
					>
						<Title
							xs={{
								fontWeight: FONT.Large_3,
								fontSize: SIZE.Large_6,
								color: COLOR.Primary,
								textAlign: "center",
							}}
							md={{
								fontSize: SIZE.Large_7,
								fontWeight: FONT.Large_5,
							}}
						>
							{number}
						</Title>
						<Title
							xs={{
								fontSize: SIZE.Large_3,
								textAlign: "center",
							}}
							md={{
								fontSize: SIZE.Large_4,
							}}
						>
							{title}
						</Title>
					</Flex>
				</Box>
			</BBox>
		</Grid.Item>
	);
}
