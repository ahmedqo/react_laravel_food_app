import React from "react";
import { Grid, Title, Flex, Box, Image } from "../../parts";
import { RADIUS, FONT, SIZE, GAP, COLOR } from "../../style";

export default function ({ src, title }) {
	return (
		<Grid.Item
			xs={{
				cols: 6,
			}}
			md={{
				cols: 3,
			}}
		>
			<Box
				xs={{
					padding: "16px 0",
					borderRadius: RADIUS.Large,
					background: COLOR.Light,
				}}
				md={{
					borderRadius: RADIUS.Large_2,
				}}
			>
				<Flex
					xs={{
						flexDirection: "column",
						gap: GAP.Large_2,
						alignItems: "center",
					}}
				>
					<Image src={process.env.PUBLIC_URL + src} xs={{ width: "160px", padding: "0 10px" }} md={{ width: "200px" }} />
					<Title
						xs={{
							fontWeight: FONT.Large_3,
							fontSize: SIZE.Large_2,
							textAlign: "center",
						}}
						md={{
							fontSize: SIZE.Large_3,
							fontWeight: FONT.Large_5,
						}}
					>
						{title}
					</Title>
				</Flex>
			</Box>
		</Grid.Item>
	);
}
