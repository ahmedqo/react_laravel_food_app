import React from "react";
import { useSelector } from "react-redux";
import { Grid, Title, Box, Fixed, Image } from "../../parts";
import { FONT, SIZE, GAP } from "../../style";
import { Wrapper } from "../../components";
import { CartTotal, CartTable } from "../../components/Cart";

export default function () {
	const { cartItems } = useSelector((state) => state.cart);
	const total = cartItems.reduce((acc, el) => acc + el.quantity * el.price, 0);

	return (
		<Wrapper.Wrap>
			{cartItems.length === 0 ? (
				<Image src={"/asset/none.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
			) : (
				<Grid
					xs={{
						gap: GAP.Large,
					}}
				>
					<Grid.Item
						xs={{
							cols: 12,
						}}
						md={{
							cols: 8,
						}}
					>
						<Box
							xs={{
								paddingBottom: "32px",
							}}
							md={{
								paddingBottom: "64px",
							}}
						>
							<Title
								xs={{
									fontWeight: FONT.Large_5,
									fontSize: SIZE.Large_4,
									textAlign: "center",
								}}
								md={{
									fontSize: SIZE.Large_6,
								}}
							>
								Panier
							</Title>
						</Box>
					</Grid.Item>
					<Grid.Item
						xs={{
							cols: 12,
						}}
						md={{
							cols: 8,
						}}
					>
						<CartTable items={cartItems} />
					</Grid.Item>
					<Grid.Item
						xs={{
							cols: 12,
						}}
						md={{
							cols: 4,
						}}
					>
						<Fixed>
							<CartTotal total={total} items={cartItems} />
						</Fixed>
					</Grid.Item>
				</Grid>
			)}
		</Wrapper.Wrap>
	);
}
