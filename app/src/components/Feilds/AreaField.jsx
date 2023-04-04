import { RADIUS, COLOR, FONT, SIZE, GAP } from "../../style";
import { Flex, Box, Title } from "../../parts";
import styled from "styled-components";

var Input = styled.textarea`
	all: unset;
	font-size: ${SIZE.Large};
	flex: 1;
	width: 0;
	text-align: ${(prop) => (prop.center ? "center" : null)};
	@media (min-width: 1024px) {
		font-size: ${SIZE.Large_2};
	}
`;

export default function ({
	value,
	label,
	showLabel = true,
	prefix,
	suffix,
	xsPadding = "10px 10px 10px 16px",
	lgPadding = "10px 10px 10px 20px",
	type = "text",
	center = false,
	changed = () => {},
	...prop
}) {
	return (
		<Flex xs={{ width: "100%", flexDirection: "column", gap: GAP.Small_2 }}>
			{showLabel && (
				<Title xs={{ fontWeight: FONT.Large, fontSize: SIZE.Large, textAlign: "left" }} md={{ fontSize: SIZE.Large_2 }}>
					{label}
				</Title>
			)}
			<Box
				xs={{
					padding: xsPadding,
					borderRadius: RADIUS.Large,
					background: COLOR.Light,
				}}
				md={{
					padding: lgPadding,
					borderRadius: RADIUS.Large_2,
				}}
			>
				<Flex xs={{ gap: GAP.Small_2, alignItems: "center" }}>
					{prefix}
					<Input center={center} type={type} value={value} placeholder={label} onChange={changed} {...prop} />
					{suffix}
				</Flex>
			</Box>
		</Flex>
	);
}
