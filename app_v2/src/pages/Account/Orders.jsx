import React, { useState, useEffect } from "react";
import { Title, Image } from "../../parts";
import { Loader, Table, View } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { myOrders } from "../../actions/OrderAction";
import { COLOR, RADIUS, SIZE } from "../../style";

function setColor(type) {
	let color;
	switch (type) {
		case -1:
			color = "#EF4444";
			break;
		case 0:
			color = "#FACF85";
			break;
		case 1:
			color = "#9DC1FB";
			break;
		case 2:
			color = "#8B93BD";
			break;
		case 3:
			color = "#88DCC0";
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
		case 1:
			status = "Confirmé";
			break;
		case 2:
			status = "Préparé";
			break;
		case 3:
			status = "Terminé";
			break;
		default:
			status = "En attente";
			break;
	}
	return status;
}

export default function () {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		(async () => {
			const [type, data] = await myOrders();
			if (type) setOrders(data);
		})();
	}, []);

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
			field: "total",
			label: "Total",
			render: (prop) => prop.total + " MAD",
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
						margin: "auto",
					}}
					md={{
						borderRadius: RADIUS.Large_2,
					}}
				>
					{setStatus(prop.status)}
				</Title>
			),
			xs: {
				textAlign: "center",
			},
		},
		{
			field: "action",
			label: "",
			render: (prop) => <View to={"/order/" + prop.id} />,
			xs: {
				width: 100,
				textAlign: "center",
			},
		},
	];

	return (
		<UserSideBar>
			{!orders ? (
				<Loader />
			) : orders.length === 0 ? (
				<Image src={"/asset/none.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
			) : (
				<Table columns={columns} data={orders} />
			)}
		</UserSideBar>
	);
}
