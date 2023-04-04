import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Box, Flex } from "../../parts";
import { Loader, Table } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { getOrder, updateOrder } from "../../actions/OrderAction";
import { OrderTable, Stepper } from "../../components/Order";
import { COLOR, SIZE, GAP } from "../../style";

export default function () {
	const params = useParams();
	const { enqueueSnackbar } = useSnackbar();
	const [order, setOrder] = useState(null);
	const [load, setLoad] = useState(false);
	const _id = params._id;

	const update = (status) => {
		(async () => {
			setLoad(true);
			const [type, data] = await updateOrder({ id: order.id, status });
			setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
		})();
	};

	useEffect(() => {
		(async () => {
			const [type, data] = await getOrder(_id);
			if (type) setOrder(data);
		})();
	}, [load]);

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
		order: [
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
		],
	};

	return (
		<UserSideBar>
			{!order || load ? (
				<Loader />
			) : (
				Object.keys(order).length > 0 && (
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
								{order && <Table columns={columns.user} data={[order.user]} />}
								{order && <Table columns={columns.order} data={[order.shipping]} />}
							</Box>
						</Flex>
						<Stepper status={order.status} onClick={update} />
						<OrderTable items={order.items} />
					</Flex>
				)
			)}
		</UserSideBar>
	);
}
