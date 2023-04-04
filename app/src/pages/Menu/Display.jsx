import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Title, Flex, Image, Fixed } from "../../parts";
import { FONT, SIZE, COLOR, GAP, RADIUS } from "../../style";
import { TextField, RadioField } from "../../components/Feilds";
import { MenuCard } from "../../components/Menu";
import { Wrapper, Button, Loader } from "../../components";
import Slider from "@mui/material/Slider";
import { Filter } from "../../icons";
import { getProducts } from "../../actions/ProductAction";
import { getCuisines } from "../../actions/CuisineAction";

export default function () {
	const params = useParams();
	const [hide, setHide] = useState(true);
	const [price, setPrice] = useState([0, 500]);
	const [cuisine, setCuisine] = useState("0");
	const [keyword, setKeyword] = useState(params.keyword);
	const [cuisines, setCuisines] = useState(null);
	const [products, setProducts] = useState(null);
	const [load, setLoad] = useState(false);

	const priceHandler = (e, newPrice) => {
		setPrice(newPrice);
	};

	const cuisineHandler = (e) => {
		setCuisine(e.target.value);
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		(async () => {
			const [type, data] = await getCuisines();
			if (type) setCuisines(data);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			setLoad(true);
			const [type, data] = await getProducts(keyword, cuisine, price);
			if (type) setProducts(data);
			setLoad(false);
		})();
	}, [keyword, price, cuisine]);

	return (
		<Wrapper.Wrap>
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
						cols: 3,
					}}
				>
					<Fixed>
						<Flex
							xs={{
								flexDirection: "column",
								gap: GAP.Large,
							}}
						>
							<Flex
								xs={{
									gap: GAP.Small_2,
									alignItems: "center",
									width: "100%",
								}}
							>
								<TextField
									type="text"
									label="Rechercher..."
									showLabel={false}
									value={keyword}
									changed={(e) => setKeyword(e.target.value)}
									suffix={
										<Button
											xs={{
												width: "max-content",
												padding: 4,
											}}
											md={{
												width: "max-content",
												display: "none",
											}}
											onClick={() => {
												setHide(!hide);
											}}
										>
											<Filter color={COLOR.White} size={20 + "px !important"} />
										</Button>
									}
									xsPadding={"8px 8px 8px 14px"}
								/>
							</Flex>
							<Flex
								xs={{
									flexDirection: "column",
									gap: GAP.Large,
									padding: "16px",
									borderRadius: RADIUS.Large,
									background: COLOR.Light,
									display: hide ? "none" : null,
								}}
								md={{
									borderRadius: RADIUS.Large_2,
									display: "flex",
								}}
							>
								<Flex
									xs={{
										flexDirection: "column",
										gap: GAP.Small_2,
									}}
								>
									<Title xs={{ fontWeight: FONT.Large_5, fontSize: SIZE.Large_2, textAlign: "left" }}>Prix</Title>
									<Slider
										sx={{
											color: COLOR.Primary,
											margin: "auto",
											padding: "5px 0",
										}}
										valueLabelDisplay="auto"
										onChange={priceHandler}
										min={0.0}
										max={500}
										value={price}
										size="small"
									/>
								</Flex>
								<Flex
									xs={{
										flexDirection: "column",
										gap: GAP.Small_2,
									}}
								>
									<Title xs={{ fontWeight: FONT.Large_5, fontSize: SIZE.Large_2, textAlign: "left" }}>Cuisines</Title>
									{!cuisines ? (
										<Loader />
									) : (
										<>
											<RadioField
												key={0}
												checked={cuisine === "0"}
												onChange={cuisineHandler}
												value={"0"}
												name="cuisines-btns"
												inputProps={{ "aria-label": "0" }}
											>
												All
											</RadioField>
											{cuisines?.map((el) => (
												<RadioField
													key={el.id}
													checked={cuisine === String(el.id)}
													onChange={cuisineHandler}
													value={el.id}
													name="cuisines-btns"
													inputProps={{ "aria-label": el.id }}
												>
													{el.label}
												</RadioField>
											))}
										</>
									)}
								</Flex>
							</Flex>
						</Flex>
					</Fixed>
				</Grid.Item>
				<Grid.Item
					xs={{
						cols: 12,
					}}
					md={{
						cols: 9,
					}}
				>
					{!products || load ? (
						<Loader />
					) : products.length === 0 ? (
						<Image src={"/asset/none.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
					) : (
						<Grid
							xs={{
								alignItems: "flex-start",
								gap: GAP.Large,
							}}
						>
							{products?.map((el) => (
								<MenuCard key={el.id} {...el} />
							))}
						</Grid>
					)}
				</Grid.Item>
			</Grid>
		</Wrapper.Wrap>
	);
}
