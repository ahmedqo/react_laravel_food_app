import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Title, Flex, Box } from "../../parts";
import { RADIUS, FONT, SIZE, GAP, COLOR } from "../../style";
import CartInfo from "./CartInfo";
import { Button, Loader } from "..";

export default function ({ total = 0, items = [] }) {
	const [expand, setExpnad] = useState(false);
	const navigate = useNavigate();
	const user = localStorage.getItem("food_token");
	const { shippingInfo } = useSelector((state) => state.cart);

	const show = () => {
		user ? setExpnad(true) : setExpnad(false);
		!user && navigate("/sign-in");
	};

	return (
		<Flex
			xs={{
				flexDirection: "column",
				gap: GAP.Base,
			}}
			md={{
				gap: GAP.Large,
			}}
		>
			<Flex
				xs={{
					flexDirection: "column",
					alignItems: "center",
					gap: GAP.Base,
					background: COLOR.Light,
					padding: "10px",
					borderRadius: RADIUS.Large,
				}}
				md={{
					gap: GAP.Large,
					borderRadius: RADIUS.Large_2,
				}}
			>
				<Flex
					xs={{
						width: "100%",
						alignItems: "center",
						justifyContent: "space-between",
						gap: GAP.Base,
					}}
					md={{
						gap: GAP.Large,
					}}
				>
					<Box xs={{ width: "max-content", margin: "0" }}>
						<Title
							xs={{
								fontSize: SIZE.Large_3,
								fontWeight: FONT.Base,
								textAlign: "left",
							}}
							md={{
								fontSize: SIZE.Large_4,
							}}
						>
							Total:
						</Title>
					</Box>
					<Box xs={{ width: "max-content", margin: "0" }}>
						<Title
							xs={{
								fontSize: SIZE.Large_4,
								fontWeight: FONT.Large_5,
								color: COLOR.Primary,
								textAlign: "right",
							}}
						>
							{total} MAD
						</Title>
					</Box>
				</Flex>
				{!expand && (
					<Button onClick={show} md={{ width: "100%" }}>
						Commander
					</Button>
				)}
			</Flex>
			{expand && (!user ? <Loader /> : <CartInfo info={shippingInfo} items={items} total={total} />)}
		</Flex>
	);
}
