import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSnackbar } from "notistack";
import { Grid, Title, Flex, Box, Image, Link } from "../../parts";
import { RADIUS, FONT, SIZE, GAP, COLOR } from "../../style";
import { addToCart } from "../../actions/CartAction";
import { CartPlus } from "../../icons";
import { Button } from "..";

var LinkCard = styled(Link)`
	width: 100%;
`;

export default function ({ id, image, name, price }) {
	const img = useRef();
	const [height, setHeight] = useState(160);
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const _addToCart = (e) => {
		dispatch(addToCart(id));
		enqueueSnackbar("Plat ajoutée au panier", { variant: "success" });
	};

	const resize = () => {
		setHeight(img?.current?.clientWidth);
	};

	useEffect(() => {
		setHeight(img?.current?.clientWidth);
		window.addEventListener("resize", resize);
	}, [img.current]);

	return (
		<Grid.Item
			xs={{
				cols: 6,
			}}
			md={{
				cols: 4,
			}}
		>
			<Box>
				<Flex
					xs={{
						flexDirection: "column",
						gap: GAP.Small_2,
						alignItems: "center",
					}}
				>
					<LinkCard to={"/menu/details/" + id}>
						<Image
							ref={img}
							src={image}
							xs={{
								height: height,
								borderRadius: RADIUS.Large,
							}}
							md={{
								borderRadius: RADIUS.Large_2,
							}}
						/>
					</LinkCard>
					<Flex
						xs={{
							gap: GAP.Small_3,
							alignItems: "center",
							width: "100%",
						}}
					>
						<LinkCard to={"/menu/details/" + id}>
							<Flex
								xs={{
									flexDirection: "column",
									gap: GAP.Small_3,
									alignItems: "center",
								}}
							>
								<Title
									xs={{
										fontSize: SIZE.Base,
										fontWeight: FONT.Large_2,
										textAlign: "left",
									}}
									md={{
										fontSize: SIZE.Large,
										fontWeight: FONT.Large_3,
									}}
								>
									{name}
								</Title>
								<Title
									xs={{
										fontSize: SIZE.Large,
										fontWeight: FONT.Large_5,
										color: COLOR.Primary,
										textAlign: "left",
									}}
									md={{
										fontSize: SIZE.Large_2,
									}}
								>
									{price} MAD
								</Title>
							</Flex>
						</LinkCard>
						<Button
							xs={{
								width: "max-content",
								background: "transparent",
								padding: 0,
							}}
							md={{
								width: "max-content",
							}}
							onClick={_addToCart}
						>
							<CartPlus color={COLOR.Primary} />
						</Button>
					</Flex>
				</Flex>
			</Box>
		</Grid.Item>
	);
}
