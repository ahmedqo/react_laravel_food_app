import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Title, Box, Flex, Text } from "../../parts";
import { Loader, Table } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { getOrder } from "../../actions/OrderAction";
import { COLOR, SIZE, GAP } from "../../style";
import { OrderTable, Stepper } from "../../components/Order";

export default function () {
	const params = useParams();
	const [order, setOrder] = useState(null);
	const _id = params._id;

	useEffect(() => {
		(async () => {
			const [type, data] = await getOrder(_id);
			if (type) setOrder(data);
		})();
	}, [_id]);

	const columns = [
		{
			field: "address",
			label: "Adresse",
			xs: {
				textAlign: "center",
				width: order?.shipping?.comment ? "33.33%" : "50%",
			},
		},
		{
			field: "type",
			label: "Type",
			xs: {
				textAlign: "center",
				width: order?.shipping?.comment ? "33.33%" : "50%",
			},
		},
		...(order?.shipping?.comment
			? [
					{
						field: "comment",
						label: "Commentaire",
						xs: {
							textAlign: "center",
							width: "33.33%",
						},
					},
			  ]
			: []),
	];

	return (
		<UserSideBar>
			{!order ? (
				<Loader />
			) : (
				Object.keys(order).length > 0 && (
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
										#{order.id}
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
										{order.total} MAD
									</Title>
								</Flex>
							</Box>
							<Box>
								<Table columns={columns} data={[order.shipping]} />
							</Box>
						</Flex>
						<Stepper status={order.status} />
						<OrderTable items={order.items} />
					</Flex>
				)
			)}
		</UserSideBar>
	);
}
