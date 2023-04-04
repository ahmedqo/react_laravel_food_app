import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Image, Flex } from "../../parts";
import { Loader, Table, Button } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { deleteReserve, getReserves, updateReserve } from "../../actions/ReserveAction";
import { COLOR, RADIUS, SIZE, GAP, FONT } from "../../style";
import { Pen, Times } from "../../icons";

function setColor(type) {
	let color;
	switch (type) {
		case -1:
			color = "#EF4444";
			break;
		case 0:
			color = "#FACF85";
			break;
		case 3:
			color = "#9DC1FB";
			break;
		default:
			color = "#1D1D1D";
			break;
	}
	return color;
}

function setStatus(type) {
	let status;
	switch (type) {
		case -1:
			status = "Annulé";
			break;
		case 0:
			status = "En attente";
			break;
		case 3:
			status = "Confirmé";
			break;
		default:
			status = "En attente";
			break;
	}
	return status;
}

export default function () {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [reserves, setReserves] = useState(null);
	const [load, setLoad] = useState(false);

	const remove = (id) => {
		(async () => {
			setLoad(true);
			const [type, data] = await deleteReserve(id);
			setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
		})();
	};

	const update = (id, status) => {
		(async () => {
			setLoad(true);
			const [type, data] = await updateReserve({ id, status });
			setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
		})();
	};

	useEffect(() => {
		(async () => {
			setReserves(null);
			const [type, data] = await getReserves();
			if (type) {
				setReserves(data);
			}
		})();
	}, [load]);

	const columns = [
		{
			field: "id",
			label: "#ID",
			render: (prop) => <Title xs={{ fontSize: SIZE.Small, width: "max-content", margin: "auto" }}>#{prop.id}</Title>,
			xs: {
				textAlign: "center",
			},
		},
		{
			field: "username",
			label: "Utilisateur",
			render: (prop) => prop.user.username,
			xs: {
				textAlign: "center",
			},
		},
		{
			field: "total",
			label: "Total",
			render: (prop) => prop.total + " MAD",
			xs: {
				textAlign: "center",
			},
		},
		{
			field: "date",
			label: "Date Heure",
			render: (prop) => prop.date + " @ " + prop.time,
			xs: {
				textAlign: "center",
			},
		},
		{
			field: "count",
			label: "Personnes",
			xs: {
				textAlign: "center",
			},
		},
		{
			field: "status",
			label: "Status",
			render: (prop) => (
				<Title
					xs={{
						background: setColor(prop.status),
						borderRadius: RADIUS.Large,
						width: "max-content",
						fontSize: SIZE.Small,
						color: COLOR.White,
						padding: "4px 10px",
						pointerEvent: "none",
						margin: "auto",
					}}
					md={{
						borderRadius: RADIUS.Large_2,
					}}
				>
					<span
						onClick={() => {
							update(prop.id, prop.status > 0 ? -1 : 3);
						}}
						style={{
							cursor: "pointer",
						}}
					>
						{setStatus(prop.status)}
					</span>
				</Title>
			),
			xs: {
				textAlign: "center",
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
							navigate("/admin/reserve/detail/" + prop.id);
						}}
					>
						<Pen size={"14px"} color={COLOR.Primary} />
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
					Liste De Reservations
				</Title>
			</Flex>
			{!reserves || load ? (
				<Loader />
			) : reserves.length === 0 ? (
				<Image src={"/asset/none.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
			) : (
				<Table columns={columns} data={reserves} />
			)}
		</UserSideBar>
	);
}
