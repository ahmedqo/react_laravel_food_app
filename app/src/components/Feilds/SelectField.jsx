import { RADIUS, COLOR, FONT, SIZE, GAP } from "../../style";
import { Flex, Box, Title, Text } from "../../parts";
import styled from "styled-components";
import { useState } from "react";

var Input = styled.input`
	all: unset;
	font-size: ${SIZE.Large};
	flex: 1;
	width: 0;
	text-align: ${(prop) => (prop.center ? "center" : null)};
	pointer-events: none;
	@media (min-width: 1024px) {
		font-size: ${SIZE.Large_2};
	}
`;

var BBox = styled.div`
	background: ${({ xs: { background } }) => (background ? background : null)};
	padding: ${({ xs: { padding } }) => (padding ? padding : null)};
	width: ${({ xs: { width } }) => (width ? width : "100%")};
	border-radius: ${({ xs: { borderRadius } }) => (borderRadius ? borderRadius : null)};
	position: relative;
	@media (min-width: 768px) {
		background: ${({ md: { background } }) => (background ? background : null)};
		padding: ${({ md: { padding } }) => (padding ? padding : null)};
		width: ${({ md: { width } }) => (width ? width : null)};
		border-radius: ${({ md: { borderRadius } }) => (borderRadius ? borderRadius : null)};
	}
`;

var FBox = styled.div`
	position: fixed;
	top: 50%;
	left: 1rem;
	width: calc(100% - 2rem);
	box-shadow: 0 4px 4px ${COLOR.Black}50;
	background: ${COLOR.White};
	border-radius: ${RADIUS.Large};
	z-index: 1;
	transform: translateY(-50%);
	overflow: hidden;
	@media (min-width: 768px) {
		border-radius: ${RADIUS.Large_2};
		position: absolute;
		transform: unset;
		width: 100%;
		top: 0;
		left: 0;
	}
`;

var Overlay = styled.div`
	position: fixed;
	inset: 0;
	background: ${COLOR.Black}50;
	@media (min-width: 768px) {
		display: none;
	}
`;

var Option = styled.div`
	background: ${(prop) => prop.active && COLOR.Primary};
	padding: 10px 10px 10px 16px;
	cursor: pointer;
	&:hover {
		background: ${COLOR.Primary}50;
		& * {
			color: ${COLOR.Black} !important;
		}
	}
`;

var Btn = styled.a`
	all: unset;
	width: 100%;
	cursor: pointer;
`;

var Close = styled.button`
	all: unset;
	padding: 10px 0;
	font-size: 14px;
	cursor: pointer;
	text-align: center;
	color: ${COLOR.Primary};
	display: block;
	box-shadow: 0 -4px 4px ${COLOR.Black}24;
	width: 100%;
`;

export default function ({
	value = { value: "", text: "" },
	label,
	suffix,
	prefix,
	options = [],
	changed = () => {},
	xsPadding = "10px 10px 10px 16px",
	lgPadding = "10px 10px 10px 20px",
	showLabel = true,
	center = false,
}) {
	const [val, setVal] = useState(value);
	const [expand, setExpand] = useState(false);

	return (
		<Flex xs={{ width: "100%", flexDirection: "column", gap: GAP.Small_2 }}>
			{showLabel && (
				<Title xs={{ fontWeight: FONT.Large, fontSize: SIZE.Large, textAlign: "left" }} md={{ fontSize: SIZE.Large_2 }}>
					{label}
				</Title>
			)}

			<BBox
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
				<Btn onClick={() => setExpand(!expand)}>
					<Flex
						xs={{
							gap: GAP.Small_2,
							alignItems: "center",
						}}
					>
						{prefix}
						<Input center={center} type="text" value={val.text || ""} placeholder={label} disabled />
						{suffix}
					</Flex>
				</Btn>
				{expand && (
					<>
						<Overlay />
						<FBox>
							<Flex
								xs={{
									flexDirection: "column",
									maxHeight: 300,
									overflow: "auto",
									paddingTop: 10,
								}}
								md={{
									maxHeight: 180,
								}}
							>
								{options.map((el, i) => (
									<Option
										key={i}
										active={val?.value === el.value}
										onClick={() => {
											setVal(el);
											changed(el);
											setExpand(!expand);
										}}
									>
										<Text
											xs={{
												fontSize: SIZE.Base,
												color: val?.value === el.value && COLOR.White,
											}}
										>
											{el.text}
										</Text>
									</Option>
								))}
							</Flex>
							<Close onClick={() => setExpand(!expand)}>close</Close>
						</FBox>
					</>
				)}
			</BBox>
		</Flex>
	);
}
