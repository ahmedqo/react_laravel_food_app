import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Grid, Title, Flex, Box, List, Text, Fixed, Image } from "../../parts";
import { FONT, SIZE, COLOR, GAP, RADIUS } from "../../style";
import { TextField } from "../../components/Feilds";
import { Wrapper, Button, Loader } from "../../components";
import { getProduct } from "../../actions/ProductAction";
import { addToCart } from "../../actions/CartAction";
import { Arrow } from "../../icons";

export default function () {
	const dispatch = useDispatch();
	const params = useParams();
	const { enqueueSnackbar } = useSnackbar();
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const _id = params._id;

	const _addToCart = () => {
		dispatch(addToCart(_id, quantity));
		enqueueSnackbar("Plat ajoutée au panier", { variant: "success" });
	};

	useEffect(() => {
		(async () => {
			const [type, data] = await getProduct(_id);
			if (type) {
				setProduct(data);
				document.title = data.name;
			}
		})();
	}, [_id]);

	return !product ? (
		<Loader />
	) : (
		Object.keys(product).length > 0 && (
			<Wrapper.Wrap>
				<Grid
					xs={{
						gap: GAP.Large,
					}}
					md={{
						gap: GAP.Large_4,
					}}
				>
					<Grid.Item
						xs={{
							cols: 12,
						}}
						md={{
							cols: 5,
						}}
					>
						<Fixed>
							<Image
								src={product.image}
								xs={{
									width: "100%",
									borderRadius: RADIUS.Large,
								}}
								md={{
									borderRadius: RADIUS.Large_2,
								}}
							/>
						</Fixed>
					</Grid.Item>
					<Grid.Item
						xs={{
							cols: 12,
						}}
						md={{
							cols: 7,
						}}
					>
						<Flex
							xs={{
								gap: GAP.Large_4,
								flexDirection: "column",
							}}
						>
							<Flex
								xs={{
									gap: GAP.Large,
									flexDirection: "column",
								}}
							>
								<Title
									xs={{
										fontSize: SIZE.Large_4,
										fontWeight: FONT.Large_5,
										textAlign: "left",
									}}
									md={{
										fontSize: SIZE.Large_6,
									}}
								>
									{product.name}
								</Title>
								<Title
									xs={{
										fontSize: SIZE.Large_5,
										fontWeight: FONT.Large_5,
										color: COLOR.Primary,
										textAlign: "left",
									}}
									md={{
										fontSize: SIZE.Large_6,
									}}
								>
									{product.price} MAD
								</Title>
							</Flex>
							<Flex
								xs={{
									gap: GAP.Large,
									flexDirection: "column",
								}}
							>
								<Box
									xs={{ width: "100%" }}
									md={{
										width: "50%",
									}}
								>
									<TextField
										label="Quantity"
										value={quantity}
										changed={(e) => setQuantity(parseInt(e.target.value) || 1)}
										prefix={
											<Button
												xs={{
													width: "max-content",
													padding: "0",
													background: "transparent",
												}}
												md={{
													width: "max-content",
												}}
												onClick={() => setQuantity(quantity - 1 || 1)}
											>
												<Arrow rotate={90} color={COLOR.Primary} />
											</Button>
										}
										suffix={
											<Button
												xs={{
													width: "max-content",
													padding: "0",
													background: "transparent",
												}}
												md={{
													width: "max-content",
												}}
												onClick={() => setQuantity(quantity + 1)}
											>
												<Arrow rotate={-90} color={COLOR.Primary} />
											</Button>
										}
										xsPadding={"10px"}
										lgPadding={"10px"}
										center={true}
									/>
								</Box>
								<Button
									xs={{
										width: "100%",
									}}
									md={{
										width: "50%",
									}}
									onClick={_addToCart}
								>
									Ajouter au panier
								</Button>
							</Flex>
							<Flex
								xs={{
									gap: GAP.Small_2,
									flexDirection: "column",
								}}
							>
								<Title
									xs={{
										fontWeight: FONT.Large_5,
										fontSize: SIZE.Large,
										textAlign: "left",
									}}
									md={{ fontSize: SIZE.Large_2 }}
								>
									Ingridients:
								</Title>
								<List
									xs={{
										gap: GAP.Small_2,
										alignItems: "center",
									}}
								>
									{product.ingridients.map((el, i) => (
										<List.Item key={i} xs={{ cols: 6, gap: GAP.Base }} lg={{ cols: 4 }}>
											<Text
												xs={{
													fontSize: SIZE.Base,
													textAlign: "left",
												}}
												md={{
													fontSize: SIZE.Large,
												}}
											>
												{el}
											</Text>
										</List.Item>
									))}
								</List>
							</Flex>
							<Flex
								xs={{
									gap: GAP.Small_2,
									flexDirection: "column",
								}}
							>
								<Title
									xs={{
										fontWeight: FONT.Large_5,
										fontSize: SIZE.Large,
										textAlign: "left",
									}}
									md={{ fontSize: SIZE.Large_2 }}
								>
									Description:
								</Title>
								<Text xs={{ textAlign: "justify" }} md={{ fontSize: SIZE.Large_2 }}>
									{product.description}
								</Text>
							</Flex>
						</Flex>
					</Grid.Item>
				</Grid>
			</Wrapper.Wrap>
		)
	);
}
