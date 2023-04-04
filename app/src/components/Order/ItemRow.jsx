import React, { useEffect, useState } from "react";
import { getProduct } from "../../actions/ProductAction";
import { Title, Flex, Box, Image, Link } from "../../parts";
import { RADIUS, FONT, SIZE, GAP, COLOR } from "../../style";
import Loader from "../Loader";

export default function ({ product, quantity }) {
	const [prod, setProd] = useState(null);

	useEffect(() => {
		(async () => {
			const [type, data] = await getProduct(product);
			console.log(data);
			if (type) setProd(data);
		})();
	}, [product]);

	return (
		<Box
			xs={{
				background: COLOR.Light,
				padding: 10,
				borderRadius: RADIUS.Large,
			}}
			md={{
				borderRadius: RADIUS.Large_2,
			}}
		>
			<Flex
				xs={{
					gap: GAP.Base,
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",
				}}
				md={{
					gap: GAP.Large,
				}}
			>
				{!prod ? (
					<Loader />
				) : (
					Object.keys(prod).length > 0 && (
						<>
							<Box md={{ width: "0", flex: 1 }}>
								<Link to={"/menu/details/" + prod._id}>
									<Flex
										xs={{
											alignItems: "center",
											gap: GAP.Base,
										}}
										md={{
											gap: GAP.Large,
										}}
									>
										<Image
											src={prod.images[0].url}
											xs={{
												borderRadius: RADIUS.Large,
												margin: "0",
												width: 80,
												height: 80,
											}}
											md={{
												width: 100,
												height: 100,
												borderRadius: RADIUS.Large_2,
											}}
										/>
										<Flex
											xs={{
												flexDirection: "column",
												gap: GAP.Small_2,
											}}
										>
											<Title
												xs={{
													fontSize: SIZE.Large,
													fontWeight: FONT.Large_2,
													textAlign: "left",
												}}
												md={{
													fontSize: SIZE.Large_3,
													fontWeight: FONT.Large_3,
												}}
											>
												{prod.name}
											</Title>
											<Title
												xs={{
													fontSize: SIZE.Large,
													fontWeight: FONT.Large_5,
													color: COLOR.Primary,
													textAlign: "left",
												}}
												md={{
													fontSize: SIZE.Large_2,
												}}
											>
												{quantity} x {prod.price} MAD
											</Title>
										</Flex>
									</Flex>
								</Link>
							</Box>
							<Box xs={{ width: "max-content", margin: "auto" }}>
								<Title
									xs={{
										fontSize: SIZE.Large_3,
										fontWeight: FONT.Large_5,
										textAlign: "right",
									}}
								>
									{quantity * prod.price} MAD
								</Title>
							</Box>
						</>
					)
				)}
			</Flex>
		</Box>
	);
}
