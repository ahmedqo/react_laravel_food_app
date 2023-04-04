import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Flex, Box } from "../../parts";
import { FONT, SIZE, GAP, COLOR } from "../../style";
import { TextField, FileField, AreaField, SelectField } from "../../components/Feilds";
import { Button, Loader } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { getProduct, updateProduct } from "../../actions/ProductAction";
import { getCuisines } from "../../actions/CuisineAction";
import { Tag } from "../../components/Product";
import { Arrow } from "../../icons";

export default function () {
	const navigate = useNavigate();
	const params = useParams();
	const _id = params._id;
	const { enqueueSnackbar } = useSnackbar();
	const [product, setProduct] = useState({ name: "", image: "", price: "", cuisine: "", description: "", ingridients: [] });
	const [image, setImage] = useState([]);
	const [cuisines, setCuisines] = useState(null);
	const [load, setLoad] = useState(false);
	const [tag, setTag] = useState("");

	const update = () => {
		if (!product.name.length || !String(product.price).length || !product.description.length || !product.ingridients.length || !product.cuisine.value) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await updateProduct({
				...product,
				cuisine: product.cuisine.value,
				ingridients: JSON.stringify(product.ingridients),
			});
			setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
			if (type) navigate("/admin/products");
		})();
	};

	const down = (e) => {
		const { key } = e;
		const val = tag.trim();
		if ((key === "," || key === "Enter") && val.length && !product?.ingridients?.includes(val)) {
			e.preventDefault();
			setProduct({ ...product, ingridients: [...product?.ingridients, val] });
			setTag("");
		}
	};

	const remove = (e) => {
		var data = product.ingridients;
		data.splice(e, 1);
		setProduct({ ...product, ingridients: data });
	};

	useEffect(() => {
		(async () => {
			setLoad(true);
			const [type1, data1] = await getCuisines();
			const [type2, data2] = await getProduct(_id);
			if (type1 && type2) {
				setCuisines(data1.map((el) => ({ value: el.id, text: el.label })));
				setProduct({
					...data2,
					cuisine: { value: data2.cuisine.id, text: data2.cuisine.label },
				});
				setImage(data2.image);
			}
			setLoad(false);
		})();
	}, [_id]);

	return (
		<UserSideBar>
			<Flex
				xs={{
					flexDirection: "column",
					gap: GAP.Base,
				}}
			>
				<Box
					xs={{
						marginBottom: 20,
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
						Modifier Produit
					</Title>
				</Box>
				{load ? (
					<Loader />
				) : (
					<>
						<FileField label="Image" holder={image} value={product?.image} changed={(e) => setProduct({ ...product, image: e })} />
						<TextField type="text" label="Titre" value={product?.name} changed={(e) => setProduct({ ...product, name: e.target.value })} />
						<TextField type="text" label="Prix" value={product?.price} changed={(e) => setProduct({ ...product, price: e.target.value })} />
						<SelectField
							label="Cuisine"
							options={cuisines}
							value={product?.cuisine}
							changed={(e) => setProduct({ ...product, cuisine: e })}
							suffix={<Arrow color={COLOR.Primary} />}
						/>
						<Flex xs={{ gap: GAP.Small, flexWrap: "wrap" }}>
							<TextField type="text" label="ingridients " value={tag} onKeyDown={down} changed={(e) => setTag(e.target.value)} />
							{product?.ingridients.map((el, i) => (
								<Tag key={i} clicked={() => remove(i)}>
									{el}
								</Tag>
							))}
						</Flex>
						<AreaField
							type="text"
							label="Description"
							value={product?.description}
							changed={(e) => setProduct({ ...product, description: e.target.value })}
						/>
						<Flex
							xs={{
								alignItems: "flex-end",
								flexDirection: "column",
								flexWrap: "wrap",
							}}
						>
							<Button onClick={update}>Enregistrer</Button>
						</Flex>
					</>
				)}
			</Flex>
		</UserSideBar>
	);
}
