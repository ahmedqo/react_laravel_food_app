import React from "react";
import { Flex, Box, Image } from "../parts";
import { RADIUS } from "../style";
import { Wrapper } from "../components";

export default function () {
	return (
		<Wrapper.Wrap>
			<Box
				xs={{
					borderRadius: RADIUS.Large,
					margin: "2rem auto",
				}}
				md={{
					borderRadius: RADIUS.Large_4,
					margin: "4rem auto",
				}}
			>
				<Flex xs={{ justifyContent: "center" }}>
					<Image src={"/asset/404.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
				</Flex>
			</Box>
		</Wrapper.Wrap>
	);
}
