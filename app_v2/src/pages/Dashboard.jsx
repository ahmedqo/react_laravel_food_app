import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { UserSideBar } from "../components/SideBar";
import { getInfo } from "../actions/UserAction";
import { Image, Title, Flex } from "../parts";
import { COLOR, SIZE, GAP, RADIUS, FONT } from "../style";
import { getTops } from "../actions/ProductAction";
import { Table, Loader } from "../components";

function getDays() {
	var curr = new Date();
	var first = curr.getDate() - curr.getDay();
	var days = [];
	for (var i = 0; i < 7; i++) {
		var next = new Date(curr.getTime());
		next.setDate(first + i);
		days.push(next.toString().slice(0, 10));
	}
	return days;
}

export default function () {
	const [info, setInfo] = useState(null);
	const [products, setProducts] = useState(null);
	const days = getDays();
	const termine = days
		.map((m, i) =>
			info?.filter((od) => new Date(od.created_at).toString().slice(0, 10) === m && od.status === 3).reduce((total, od) => total + od.total, 0)
		)
		.reduce((a, e) => a + e, 0);
	const prepare = days
		.map((m, i) =>
			info?.filter((od) => new Date(od.created_at).toString().slice(0, 10) === m && od.status === 2).reduce((total, od) => total + od.total, 0)
		)
		.reduce((a, e) => a + e, 0);
	const confirm = days
		.map((m, i) =>
			info?.filter((od) => new Date(od.created_at).toString().slice(0, 10) === m && od.status === 1).reduce((total, od) => total + od.total, 0)
		)
		.reduce((a, e) => a + e, 0);
	const attente = days
		.map((m, i) =>
			info?.filter((od) => new Date(od.created_at).toString().slice(0, 10) === m && od.status === 0).reduce((total, od) => total + od.total, 0)
		)
		.reduce((a, e) => a + e, 0);
	const annulee = days
		.map((m, i) =>
			info?.filter((od) => new Date(od.created_at).toString().slice(0, 10) === m && od.status === -1).reduce((total, od) => total + od.total, 0)
		)
		.reduce((a, e) => a + e, 0);

	const Total = {
		cash: info?.reduce((t, e) => {
			if (e.status === 3) return t + e.total;
			else return t;
		}, 0),
		pendding: info?.reduce((t, e) => {
			if (e.status !== 3 && e.status !== -1) return t + e.total;
			else return t;
		}, 0),
		cancel: info?.reduce((t, e) => {
			if (e.status === -1) return t + e.total;
			else return t;
		}, 0),
	};

	const lineState = {
		labels: days,
		datasets: [
			...(!isNaN(termine) && termine > 0
				? [
						{
							label: "Terminé",
							borderColor: "#88DCC0",
							backgroundColor: "#88DCC0",
							data: days.map((m, i) =>
								info
									?.filter((od) => new Date(od.created_at).toString().slice(0, 10) === m && od.status === 3)
									.reduce((total, od) => total + od.total, 0)
							),
						},
				  ]
				: []),
			...(!isNaN(prepare) && prepare > 0
				? [
						{
							label: "Préparé",
							borderColor: "#8B93BD",
							backgroundColor: "#8B93BD",
							data: days.map((m, i) =>
								info
									?.filter((od) => new Date(od.created_at).toString().slice(0, 10) === m && od.status === 2)
									.reduce((total, od) => total + od.total, 0)
							),
						},
				  ]
				: []),
			...(!isNaN(confirm) && confirm > 0
				? [
						{
							label: "Confirmé",
							borderColor: "#9DC1FB",
							backgroundColor: "#9DC1FB",
							data: days.map((m, i) =>
								info
									?.filter((od) => new Date(od.created_at).toString().slice(0, 10) === m && od.status === 1)
									.reduce((total, od) => total + od.total, 0)
							),
						},
				  ]
				: []),
			...(!isNaN(attente) && attente > 0
				? [
						{
							label: "En attente",
							borderColor: "#FACF85",
							backgroundColor: "#FACF85",
							data: days.map((m, i) =>
								info
									?.filter((od) => new Date(od.created_at).toString().slice(0, 10) === m && od.status === 0)
									.reduce((total, od) => total + od.total, 0)
							),
						},
				  ]
				: []),
			...(!isNaN(annulee) && annulee > 0
				? [
						{
							label: "Annulé",
							borderColor: "#EF4444",
							backgroundColor: "#EF4444",
							data: days.map((m, i) =>
								info
									?.filter((od) => new Date(od.created_at).toString().slice(0, 10) === m && od.status === -1)
									.reduce((total, od) => total + od.total, 0)
							),
						},
				  ]
				: []),
		],
	};

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
	];

	useEffect(() => {
		(async () => {
			const [type, data] = await getInfo();
			if (type) {
				setInfo(data);
			}
		})();
		(async () => {
			const [type, data] = await getTops();
			if (type) {
				setProducts(data);
			}
		})();
	}, []);

	return (
		<UserSideBar>
			{info ? (
				<Flex xs={{ gap: GAP.Large_2, flexDirection: "column" }}>
					<Flex
						xs={{
							alignItems: "center",
							justifyContent: "space-between",
							gap: GAP.Base,
							flexDirection: "column",
						}}
						md={{
							flexDirection: "row",
						}}
					>
						<Flex
							xs={{
								alignItems: "center",
								padding: "20px",
								backgroundColor: "#88DCC0",
								borderRadius: RADIUS.Large_2,
								justifyContent: "space-between",
								width: "100%",
							}}
							md={{
								flex: 1,
							}}
						>
							<svg viewBox="0 0 48 48" fill="white" width="80" height="80">
								<path d="M5.6 41q-1.85 0-3.2-1.35t-1.35-3.2V14.2H5.6v22.25h34.2V41Zm7.2-7.15q-1.9 0-3.25-1.325T8.2 29.25V10.5q0-1.85 1.35-3.225T12.8 5.9h29.6q1.85 0 3.2 1.375t1.35 3.225v18.75q0 1.95-1.35 3.275t-3.2 1.325Zm-.6-4h4.95q0-2.05-1.45-3.475-1.45-1.425-3.5-1.425v4.9Zm25.8 0h4.95v-4.9q-2.1 0-3.525 1.425Q38 27.8 38 29.85Zm-10.4-4q2.45 0 4.2-1.725t1.75-4.225q0-2.45-1.75-4.25-1.75-1.8-4.25-1.8t-4.25 1.775Q21.55 17.4 21.55 19.9q0 2.45 1.775 4.2t4.275 1.75Zm-15.4-11q2.05 0 3.5-1.475Q17.15 11.9 17.15 9.9H12.2Zm30.75 0V9.9H38q0 2 1.425 3.475t3.525 1.475Z" />
							</svg>
							<Title
								xs={{
									fontSize: SIZE.Large_4,
									color: COLOR.White,
									width: "max-content",
								}}
							>
								{Total.cash} MAD
							</Title>
						</Flex>
						<Flex
							xs={{
								alignItems: "center",
								padding: "20px",
								backgroundColor: "#FACF85",
								borderRadius: RADIUS.Large_2,
								justifyContent: "space-between",
								width: "100%",
								flex: "unset",
							}}
							md={{
								flex: 1,
							}}
						>
							<svg viewBox="0 0 48 48" fill="white" width="80" height="80">
								<path d="M23.95 46.95q-5.5 0-10.65-3.125T5 36.7v6.4H1.05V29.6h13.5v3.95H7.7q2.5 3.55 7.05 6.475t9.2 2.925q3.85 0 7.225-1.475 3.375-1.475 5.95-3.95t4.175-5.85q1.6-3.375 1.65-7.375h4q-.05 4.8-1.9 8.925-1.85 4.125-5.025 7.2-3.175 3.075-7.3 4.8Q28.6 46.95 23.95 46.95Zm-1.65-8.7V35.8q-2.05-.55-3.7-1.95-1.65-1.4-2.65-3.95l3-1q.55 1.95 2 3.075 1.45 1.125 3.4 1.125 2 0 3.2-.9 1.2-.9 1.2-2.4 0-1.55-1.125-2.6t-3.975-2.25q-3.45-1.3-5.1-2.875Q16.9 20.5 16.9 17.9q0-2.2 1.4-3.825t4.1-2.025V9.8h3.25v2.25q1.9.35 3.225 1.275Q30.2 14.25 31.2 16.4l-2.85 1.3q-.75-1.55-1.85-2.225t-2.6-.675q-1.75 0-2.75.825t-1 2.075q0 1.55 1.225 2.5t4.075 2.15q3.5 1.4 5.025 3.175Q32 27.3 32 29.8q0 1.4-.475 2.45-.475 1.05-1.325 1.8t-2 1.2q-1.15.45-2.65.65v2.35ZM1.05 23.7q0-4.6 1.8-8.75t4.9-7.225q3.1-3.075 7.3-4.875 4.2-1.8 8.95-1.8 5.55 0 10.75 3.125T43 11.3V4.85h4v13.5H33.5V14.4h6.85q-2.7-3.7-7.3-6.525T24 5.05q-3.85 0-7.25 1.475t-5.975 3.95q-2.575 2.475-4.15 5.85Q5.05 19.7 5 23.7Z" />
							</svg>
							<Title
								xs={{
									fontSize: SIZE.Large_4,
									color: COLOR.White,
									width: "max-content",
								}}
							>
								{Total.pendding} MAD
							</Title>
						</Flex>
						<Flex
							xs={{
								alignItems: "center",
								padding: "20px",
								backgroundColor: "#EF4444",
								borderRadius: RADIUS.Large_2,
								justifyContent: "space-between",
								width: "100%",
								flex: "unset",
							}}
							md={{
								flex: 1,
							}}
						>
							<svg viewBox="0 0 48 48" fill="white" width="80" height="80">
								<path d="M28.45 17q-.7-1.55-1.925-2.4-1.225-.85-2.875-.85-1.3 0-2.225.45t-1.675 1.2l-3.2-3.2q1.05-1.2 2.275-1.85 1.225-.65 2.875-.9v-4.3h3.95v4.3q1.85-.05 4 1.65t3.1 4.1Zm11.6 28.6-9-9q-1.1.95-2.475 1.475-1.375.525-2.925.675v4.2H21.7V38.7q-2.65-.3-4.875-2.45Q14.6 34.1 13.8 31.2l4.25-1.45q.7 2.4 2.2 3.525 1.5 1.125 3.7 1.125 1.05 0 2.05-.275 1-.275 1.65-.925L2.45 8l2.4-2.45L42.5 43.2Z" />
							</svg>
							<Title
								xs={{
									fontSize: SIZE.Large_4,
									color: COLOR.White,
									width: "max-content",
								}}
							>
								{Total.cancel} MAD
							</Title>
						</Flex>
					</Flex>
					{products ? (
						<Flex
							xs={{
								flexDirection: "column",
								gap: GAP.Base,
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
								Top Produits
							</Title>
							<Table columns={columns} data={products} />
						</Flex>
					) : (
						<Loader />
					)}
					{lineState.datasets.length > 0 && <Line data={lineState} />}
				</Flex>
			) : (
				<Loader />
			)}
		</UserSideBar>
	);
}
