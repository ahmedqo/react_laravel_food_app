import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Title, Box, Flex, Text } from "../../parts";
import { Loader, Table } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { getReserve } from "../../actions/ReserveAction";
import { COLOR, SIZE, GAP } from "../../style";
import { OrderTable } from "../../components/Order";

export default function () {
	const params = useParams();
	const [reserve, setReserve] = useState(null);
	const _id = params._id;

	useEffect(() => {
		(async () => {
			const [type, data] = await getReserve(_id);
			if (type) setReserve(data);
		})();
	}, [_id]);

	const columns = [
		{
			field: "date",
			label: "Date Heure",
			render: (prop) => prop.date + " @ " + prop.time,
			xs: {
				textAlign: "center",
				width: reserve?.comment ? "33.33%" : "50%",
			},
		},
		{
			field: "count",
			label: "Personnes",
			xs: {
				textAlign: "center",
				width: reserve?.comment ? "33.33%" : "50%",
			},
		},
		...(reserve?.comment
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
	];

	return (
		<UserSideBar>
			{!reserve ? (
				<Loader />
			) : (
				Object.keys(reserve).length > 0 && (
					<Flex xs={{ flexDirection: "column", width: "100%", gap: GAP.Base }}>
						<Flex xs={{ flexDirection: "column", width: "100%", gap: GAP.Large }}>
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
										#{reserve.id}
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
								<Table columns={columns} data={[reserve]} />
							</Box>
						</Flex>
						<OrderTable items={reserve.items} />
					</Flex>
				)
			)}
		</UserSideBar>
	);
}
