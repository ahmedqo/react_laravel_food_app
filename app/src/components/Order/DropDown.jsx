import React, { useState } from "react";
import styled from "styled-components";
import { useSnackbar } from "notistack";
import { COLOR, SIZE, RADIUS } from "../../style";
import { Flex, Box } from "../../parts";
import { Arrow } from "../../icons";
import { Button } from "..";
import { updateOrder } from "../../actions/OrderAction";

var Btn = styled.button`
	all: unset;
	width: 100;
	display: block;
	box-sizing: border-box;
	color: ${COLOR.Black};
	cursor: pointer;
	padding: 4px 6px;
	font-size: ${SIZE.Large};
	border-radius: ${RADIUS.Large};
	&.active {
		color: ${COLOR.White};
		background: ${COLOR.Primary};
	}
	&:hover {
		color: ${COLOR.Black};
		background: ${COLOR.Primary}50;
	}
`;

export default function ({ order, setLoad }) {
	const { enqueueSnackbar } = useSnackbar();
	const [show, setShow] = useState(false);
	const actions = [
		{ value: -1, text: "Anuller" },
		{ value: 0, text: "En attente" },
		{ value: 1, text: "Confirmer" },
		{ value: 2, text: "Préparer" },
		{ value: 3, text: "Terminer" },
	];

	const update = (status) => {
		(async () => {
			(async () => {
				setLoad(true);
				const [type, data] = await updateOrder({ ...order, status });
				if (type && data) {
					enqueueSnackbar("Enregistré avec succès", { variant: "success" });
				} else {
					enqueueSnackbar(data, { variant: "error" });
				}
				setLoad(false);
			})();
		})();
	};

	return (
		<Box xs={{ position: "relative" }}>
			<Button
				xs={{
					width: 14,
					height: 14,
					padding: 0,
					background: "transparent",
				}}
				md={{ width: 14, height: 14 }}
				onClick={() => setShow(!show)}
			>
				<Arrow color={COLOR.Success} size={"14px"} />
			</Button>
			{show && (
				<Flex
					xs={{
						flexDirection: "column",
						background: COLOR.Light,
						position: "absolute",
						top: "100%",
						right: "0",
						padding: 10,
						borderRadius: RADIUS.Large,
						boxShadow: `0 4px 4px ${COLOR.Black}50`,
						width: 160,
					}}
					md={{
						borderRadius: RADIUS.Large_2,
						padding: 4,
					}}
				>
					{actions.map(({ value, text }, i) => (
						<Btn
							key={i}
							onClick={() => {
								setShow(false);
								update(value);
							}}
						>
							{text}
						</Btn>
					))}
				</Flex>
			)}
		</Box>
	);
}
