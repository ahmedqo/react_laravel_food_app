import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Image, Flex, Link } from "../../parts";
import { Loader, Table, Button } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { getCuisines, deleteCuisine } from "../../actions/CuisineAction";
import { COLOR, FONT, GAP, SIZE } from "../../style";
import { Times, Pen } from "../../icons";

export default function () {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [cuisines, setCuisines] = useState(null);
	const [load, setLoad] = useState(false);

	const remove = (id) => {
		(async () => {
			setLoad(true);
			const [type, data] = await deleteCuisine(id);
			enqueueSnackbar(data.message, { variant: data.type });
			setLoad(false);
		})();
	};

	useEffect(() => {
		(async () => {
			setCuisines(null);
			const [type, data] = await getCuisines();
			if (type) setCuisines(data);
		})();
	}, [load]);

	const columns = [
		{
			field: "label",
			label: "Label",
			xs: { minWidth: 200 },
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
							navigate("/admin/cuisine/detail/" + prop.id);
						}}
					>
						<Pen color={COLOR.Success} size={"14px"} />
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
							remove(prop.id);
						}}
					>
						<Times color={COLOR.Error} size={"14px"} />
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
					Liste De Cuisines
				</Title>
				<Link to="/admin/cuisine/new" xs={{ color: COLOR.Primary, fontWeight: FONT.Large_5 }}>
					Nouveau
				</Link>
			</Flex>
			{!cuisines || load ? (
				<Loader />
			) : cuisines.length === 0 ? (
				<Image src={"/asset/none.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
			) : (
				<Table columns={columns} data={cuisines} />
			)}
		</UserSideBar>
	);
}
