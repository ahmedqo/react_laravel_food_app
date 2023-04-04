import React, { useState, useEffect } from "react";
import { Title, Image } from "../../parts";
import { Loader, Table, View } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { myReserves } from "../../actions/ReserveAction";
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
	const [reserves, setReserves] = useState(null);

	useEffect(() => {
		(async () => {
			const [type, data] = await myReserves();
			if (type) setReserves(data);
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
			render: (prop) => <View to={"/reserve/" + prop.id} />,
			xs: {
				width: 100,
				textAlign: "center",
			},
		},
	];

	return (
		<UserSideBar>
			{!reserves ? (
				<Loader />
			) : reserves.length === 0 ? (
				<Image src={"/asset/none.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
			) : (
				<Table columns={columns} data={reserves} />
			)}
		</UserSideBar>
	);
}
