import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Title, Flex, Image } from "../../parts";
import { GAP, COLOR, RADIUS } from "../../style";
import { Button, Table } from "../../components";
import { addToCart, delFromCart } from "../../actions/CartAction";
import { Arrow } from "../../icons";

export default function ({ items }) {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const _addToCart = (id, qte) => {
		dispatch(addToCart(id, qte));
	};

	useEffect(() => {
		items.forEach((itm) => {
			if (itm.quantity < 1) {
				dispatch(delFromCart(itm.product));
				enqueueSnackbar("Plat retirée du panier", { variant: "success" });
			}
		});
	}, [items]);

	const columns = [
		{
			field: "image",
			label: "Image",
			render: (prop) => (
				<Image
					src={prop.image}
					xs={{
						borderRadius: RADIUS.Large,
						margin: "0",
						width: 50,
						height: 50,
					}}
					md={{
						borderRadius: RADIUS.Large_2,
					}}
				/>
			),
			xs: {
				width: 80,
				padding: "5px 20px",
			},
		},
		{
			field: "name",
			label: "Titre",
			render: (prop) => <Title>{prop.name}</Title>,
			xs: {
				minWidth: 200,
			},
		},
		{
			field: "quantity",
			label: "Quantite",
			render: (prop) => (
				<Flex
					xs={{
						gap: GAP.Small_2,
						alignItems: "center",
						width: "max-content",
						margin: "auto",
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
						onClick={() => _addToCart(prop.product, -1)}
					>
						<Arrow size="14px" rotate={90} color={COLOR.Primary} />
					</Button>
					<Title xs={{ width: "max-content" }}>{prop.quantity}</Title>
					<Button
						xs={{
							width: "max-content",
							padding: "0",
							background: "transparent",
						}}
						md={{
							width: "max-content",
						}}
						onClick={() => _addToCart(prop.product, 1)}
					>
						<Arrow size="14px" rotate={-90} color={COLOR.Primary} />
					</Button>
				</Flex>
			),
			xs: {
				textAlign: "center",
				verticalAlign: "middle",
			},
		},
		{
			field: "price",
			label: "Prix",
			render: (prop) => <Title>{prop.price * prop.quantity + " MAD"}</Title>,
			xs: {
				textAlign: "center",

				minWidth: 100,
			},
		},
	];

	return <Table columns={columns} data={items} />;
}
