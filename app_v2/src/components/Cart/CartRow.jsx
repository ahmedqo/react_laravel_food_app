import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Title, Flex, Box, Image, Link } from "../../parts";
import { RADIUS, FONT, SIZE, GAP, COLOR } from "../../style";
import { addToCart, delFromCart } from "../../actions/CartAction";
import { Arrow } from "../../icons";
import { Button } from "..";

export default function ({ product, image, name, price, quantity }) {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const _addToCart = (qte) => {
		dispatch(addToCart(product, qte));
	};

	useEffect(() => {
		if (quantity < 1) {
			dispatch(delFromCart(product));
			enqueueSnackbar("Plat retirée du panier", { variant: "success" });
		}
	}, [quantity]);

	return (
		<Box
			xs={{
				background: COLOR.Light,
				padding: "10px",
				borderRadius: RADIUS.Large,
			}}
			md={{
				borderRadius: RADIUS.Large_2,
			}}
		>
			<Flex
				xs={{
					flexDirection: "column",
					gap: GAP.Base,
				}}
				md={{
					flexDirection: "row",
					flexWrap: "wrap",
					gap: GAP.Large,
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box md={{ width: "0", flex: 1 }}>
					<Link to={"/menu/details/" + product}>
						<Flex
							xs={{
								alignItems: "center",
								gap: GAP.Base,
							}}
							md={{
								gap: GAP.Large,
							}}
						>
							<Image
								src={image}
								xs={{
									borderRadius: RADIUS.Large,
									margin: "0",
									width: 80,
									height: 80,
								}}
								md={{
									borderRadius: RADIUS.Large_2,
								}}
							/>
							<Flex
								xs={{
									flexDirection: "column",
									gap: GAP.Small_2,
								}}
							>
								<Title
									xs={{
										fontSize: SIZE.Large,
										fontWeight: FONT.Large_2,
										textAlign: "left",
									}}
									md={{
										fontSize: SIZE.Large_3,
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
									{quantity} x {price} MAD
								</Title>
							</Flex>
						</Flex>
					</Link>
				</Box>
				<Box md={{ width: "max-content", margin: "0" }}>
					<Flex
						xs={{
							gap: GAP.Small_2,
							alignItems: "center",
							justifyContent: "space-between",
						}}
						md={{
							flexDirection: "column",
							alignItems: "flex-end",
						}}
					>
						<Box xs={{ width: "max-content", margin: "0" }}>
							<Title
								xs={{
									fontSize: SIZE.Large_3,
									fontWeight: FONT.Large_5,
									textAlign: "right",
								}}
							>
								{quantity * price} MAD
							</Title>
						</Box>
						<Box xs={{ width: "max-content", margin: "0" }}>
							<Flex
								xs={{
									gap: GAP.Small_2,
								}}
							>
								<Button
									xs={{
										width: "max-content",
										padding: "0",
										background: "transparent",
									}}
									md={{
										width: "max-content",
									}}
									onClick={() => _addToCart(-1)}
								>
									<Arrow color={COLOR.Primary} rotate="90" />
								</Button>
								<Button
									xs={{
										width: "max-content",
										padding: "0",
										background: "transparent",
									}}
									md={{
										width: "max-content",
									}}
									onClick={() => _addToCart(1)}
								>
									<Arrow color={COLOR.Primary} rotate="-90" />
								</Button>
							</Flex>
						</Box>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
}
