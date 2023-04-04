import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Title, Box, Flex } from "../../parts";
import { Loader, Table } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { getReserve } from "../../actions/ReserveAction";
import { OrderTable } from "../../components/Order";
import { COLOR, SIZE, GAP } from "../../style";

export default function () {
	const params = useParams();
	const [reserve, setReserve] = useState(null);
	const _id = params._id;

	useEffect(() => {
		(async () => {
			const [type, data] = await getReserve(_id);
			if (type) setReserve(data);
		})();
	}, []);

	const columns = {
		user: [
			{
				field: "username",
				label: "Utilisateur",
				xs: {
					textAlign: "center",
					width: "33.33%",
				},
			},
			{
				field: "email",
				label: "Email",
				xs: {
					textAlign: "center",
					width: "33.33%",
				},
			},
			{
				field: "phone",
				label: "Tele",
				xs: {
					textAlign: "center",
					width: "33.33%",
				},
			},
		],
		resreve: [
			{
				field: "date",
				label: "Date",
				xs: {
					textAlign: "center",
					width: resreve?.comment ? "25%" : "33.33%",
				},
			},
			{
				field: "time",
				label: "Heure",
				xs: {
					textAlign: "center",
					width: resreve?.comment ? "25%" : "33.33%",
				},
			},
			{
				field: "count",
				label: "Personnes",
				xs: {
					textAlign: "center",
					width: resreve?.comment ? "25%" : "33.33%",
				},
			},
			...(resreve?.comment
				? [
						{
							field: "comment",
							label: "Commentaire",
							xs: {
								textAlign: "center",
								width: "25%",
							},
						},
				  ]
				: []),
		],
	};

	return (
		<UserSideBar>
			{!resreve ? (
				<Loader />
			) : (
				Object.keys(resreve).length > 0 && (
					<Flex
						xs={{
							flexDirection: "column",
							width: "100%",
							gap: GAP.Base,
						}}
					>
						<Flex
							xs={{
								flexDirection: "column",
								width: "100%",
								gap: GAP.Large,
							}}
						>
							<Box>
								<Flex
									xs={{
										alignItems: "center",
										justifyContent: "space-between",
										gap: GAP.Base,
									}}
								>
									<Title
										xs={{
											fontSize: SIZE.Large,
											textAlign: "left",
										}}
										md={{
											fontSize: SIZE.Large_2,
										}}
									>
										#{resreve.id}
									</Title>
									<Title
										xs={{
											fontSize: SIZE.Large_3,
											color: COLOR.Primary,
											textAlign: "right",
										}}
										md={{
											fontSize: SIZE.Large_5,
										}}
									>
										{reserve.total} MAD
									</Title>
								</Flex>
							</Box>
							<Box>
								{reserve && <Table columns={columns.user} data={[reserve.user]} />}
								{reserve && <Table columns={columns.reserve} data={[reserve]} />}
							</Box>
						</Flex>
						<OrderTable items={reserve.items} />
					</Flex>
				)
			)}
		</UserSideBar>
	);
}
