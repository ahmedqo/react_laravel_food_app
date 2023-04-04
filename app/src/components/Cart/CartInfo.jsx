import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RADIUS, COLOR, GAP } from "../../style";
import { TextField, SelectField, AreaField } from "../Feilds";
import { createOrder } from "../../actions/OrderAction";
import { createReserve } from "../../actions/ReserveAction";
import { clearCart, saveInfo } from "../../actions/CartAction";
import { Arrow } from "../../icons";
import { Flex } from "../../parts";
import { Button, Loader } from "..";

export default function ({ info, items, total }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [type, setType] = useState(0);
	const [shipping, setShipping] = useState({ address: "", type: { value: null, text: "" }, comment: "", ...info?.shipping });
	const [reservation, setReservation] = useState({ date: "", time: "", count: 1, comment: "", ...info?.reservation });
	const [load, setLoad] = useState(false);

	const order = () => {
		if (!shipping?.address?.length || shipping?.type?.value === null) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await createOrder({
				shipping: JSON.stringify({ ...shipping, type: shipping.type.text }),
				items: items,
				total: total,
			});
			setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
			if (type) {
				dispatch(saveInfo({ shipping, reservation }));
				dispatch(clearCart());
				navigate("/orders");
			}
		})();
	};

	const reserve = () => {
		if (!reservation?.date?.length || !reservation?.time?.length || !reservation?.count?.length) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await createReserve({
				date: reservation.date,
				time: reservation.time,
				count: reservation.count,
				comment: reservation.comment,
				items: items,
				total: total,
			});
			setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
			if (type) {
				dispatch(saveInfo({ shipping, reservation }));
				dispatch(clearCart());
				navigate("/reserves");
			}
		})();
	};

	return load ? (
		<Loader />
	) : (
		<Flex
			xs={{
				flexDirection: "column",
				alignItems: "center",
				gap: GAP.Base,
				borderRadius: RADIUS.Large,
			}}
			md={{
				gap: GAP.Large,
				borderRadius: RADIUS.Large_2,
			}}
		>
			<SelectField
				label="Type"
				value={shipping.type}
				options={[
					{
						value: 0,
						text: "Emporter",
					},
					{
						value: 1,
						text: "Livrer",
					},
					{
						value: 3,
						text: "Reserver",
					},
				]}
				changed={(e) => {
					e.value > 0 ? setType(1) : setType(0);
					setShipping({ ...shipping, type: e });
				}}
				suffix={<Arrow color={COLOR.Primary} />}
			/>
			{type === 0 ? (
				<>
					<TextField
						type="text"
						label="Adresse"
						value={shipping.address}
						changed={(e) => setShipping({ ...shipping, address: e.target.value })}
					/>
					<AreaField
						type="text"
						label="Commentaire"
						value={shipping.comment}
						changed={(e) => setShipping({ ...shipping, comment: e.target.value })}
					/>
					<Button md={{ width: "100%" }} onClick={order}>
						Commander
					</Button>
				</>
			) : (
				<>
					<TextField
						type="date"
						label="Date"
						value={reservation.date}
						changed={(e) => setReservation({ ...reservation, date: e.target.value })}
					/>
					<TextField
						type="time"
						label="Heure"
						value={reservation.time}
						changed={(e) => setReservation({ ...reservation, time: e.target.value })}
					/>
					<TextField
						type="number"
						label="Personnes"
						value={reservation.count}
						changed={(e) => setReservation({ ...reservation, count: e.target.value })}
					/>
					<AreaField
						type="text"
						label="Commentaire"
						value={reservation.comment}
						changed={(e) => setReservation({ ...reservation, comment: e.target.value })}
					/>
					<Button md={{ width: "100%" }} onClick={reserve}>
						Reserver
					</Button>
				</>
			)}
		</Flex>
	);
}
