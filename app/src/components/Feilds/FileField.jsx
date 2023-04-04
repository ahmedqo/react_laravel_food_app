import React, { useState } from "react";
import { RADIUS, COLOR, FONT, SIZE, GAP } from "../../style";
import { Flex, Box, Title, Image } from "../../parts";
import styled from "styled-components";
import { Times } from "../../icons";
import { Button } from "..";

var Input = styled.input`
	all: unset;
	position: absolute;
	inset: 0;
	opacity: 0;
	cursor: pointer;
`;

export default function ({ value, holder, label, showLabel = true, changed = () => {}, ...prop }) {
	const [image, setImage] = useState(value);
	const imageChange = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setImage(reader.result);
				changed(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};
	return (
		<Flex xs={{ width: "100%", flexDirection: "column", gap: GAP.Small_2 }}>
			{showLabel && (
				<Title xs={{ fontWeight: FONT.Large, fontSize: SIZE.Large, textAlign: "left" }} md={{ fontSize: SIZE.Large_2 }}>
					{label}
				</Title>
			)}
			<Box
				xs={{
					padding: 10,
					borderRadius: RADIUS.Large,
					background: COLOR.Light,
				}}
				md={{
					borderRadius: RADIUS.Large_2,
				}}
			>
				<Flex
					xs={{
						gap: GAP.Small_2,
						alignItems: "center",
						justifyConetent: "center",
						height: 200,
						position: "relative",
					}}
					md={{
						height: 300,
					}}
				>
					<Image
						src={image || holder}
						xs={{
							maxWidth: "100%",
							maxHeight: "100%",
							width: "auto",
							borderRadius: RADIUS.Large,
						}}
						md={{
							borderRadius: RADIUS.Large_2,
						}}
					/>
					<Input type={"file"} onChange={imageChange} {...prop} />
					{image && (
						<Button
							xs={{
								position: "absolute",
								top: 0,
								right: 0,
								width: 20,
								height: 20,
								padding: 0,
								background: "transparent",
							}}
							md={{ width: 20, height: 20 }}
							onClick={() => {
								setImage(null);
							}}
						>
							<Times color={COLOR.Success} size={"20px"} />
						</Button>
					)}
				</Flex>
			</Box>
		</Flex>
	);
}
