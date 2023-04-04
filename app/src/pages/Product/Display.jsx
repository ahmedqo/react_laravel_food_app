import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Image, Flex, Link } from "../../parts";
import { Loader, Table, Button } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { getProducts } from "../../actions/ProductAction";
import { COLOR, FONT, GAP, SIZE, RADIUS } from "../../style";
import { Times, Pen } from "../../icons";
import { deleteProduct } from "../../actions/ProductAction";

export default function () {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [products, setProducts] = useState(null);
	const [load, setLoad] = useState(false);

	const remove = (id) => {
		(async () => {
			setLoad(true);
			const [type, data] = await deleteProduct(id);
			enqueueSnackbar(data.message, { variant: data.type });
			setLoad(false);
		})();
	};

	useEffect(() => {
		(async () => {
			setProducts(null);
			const [type, data] = await getProducts();
			if (type) setProducts(data);
			else navigate("/admin/products");
		})();
	}, [load]);

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
				textAlign: "center",
				padding: "5px 20px",
			},
		},
		{
			field: "name",
			label: "Titre",
			xs: {
				minWidth: 200,
			},
		},
		{
			field: "price",
			label: "Prix",
			render: (prop) => prop.price + " MAD",
			xs: {
				textAlign: "center",

				minWidth: 100,
			},
		},
		{
			field: "action",
			label: "",
			render: (prop) => (
				<Flex xs={{ gap: GAP.Small }}>
					<Button
						xs={{
							width: 14,
							height: 14,
							padding: 0,
							background: "transparent",
						}}
						md={{ width: 14, height: 14 }}
						onClick={() => {
							remove(prop.id);
						}}
					>
						<Times color={COLOR.Error} size={"14px"} />
					</Button>
					<Button
						xs={{
							width: 14,
							height: 14,
							padding: 0,
							background: "transparent",
						}}
						md={{ width: 14, height: 14 }}
						onClick={() => {
							navigate("/admin/product/detail/" + prop.id);
						}}
					>
						<Pen color={COLOR.Success} size={"14px"} />
					</Button>
				</Flex>
			),
			xs: {
				width: 40,
				textAlign: "center",
			},
		},
	];

	return (
		<UserSideBar>
			<Flex
				xs={{
					marginBottom: 20,
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Title
					xs={{
						fontWeight: FONT.Large_5,
						fontSize: SIZE.Large_3,
					}}
					md={{
						fontSize: SIZE.Large_4,
					}}
				>
					Liste De Produits
				</Title>
				<Link to="/admin/product/new" xs={{ color: COLOR.Primary, fontWeight: FONT.Large_5 }}>
					Nouveau
				</Link>
			</Flex>
			{!products || load ? (
				<Loader />
			) : products.length === 0 ? (
				<Image src={"/asset/none.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
			) : (
				<Table columns={columns} data={products} />
			)}
		</UserSideBar>
	);
}
