import React from "react";
import { Container, Grid, Title, Text, Flex, Box, Link } from "../../parts";
import { RADIUS, COLOR, FONT, SIZE, GAP } from "../../style";
import { Marker, Phone, At, Instagram, Linkedin, Facebook } from "../../icons";
import { Logo } from "..";
import styled from "styled-components";

var Hr = styled.hr`
	background: ${COLOR.White};
	width: 100%;
`;

const Footer = () => {
	return (
		<footer>
			<Container
				xs={{
					padding: "0 1rem",
				}}
				lg={{
					padding: 0,
				}}
			>
				<Box
					xs={{
						padding: "32px",
						borderRadius: RADIUS.Large,
						background: "#65746B",
					}}
					md={{
						borderRadius: RADIUS.Large_2,
					}}
				>
					<Flex
						xs={{
							flexDirection: "column",
							gap: "16px",
						}}
					>
						<Grid
							xs={{
								gap: GAP.Large_2,
							}}
						>
							<Grid.Item
								xs={{
									cols: 12,
								}}
								md={{
									cols: 6,
								}}
							>
								<Flex
									xs={{
										gap: GAP.Large_2,
										flexDirection: "column",
									}}
									md={{
										gap: GAP.Large_3,
									}}
								>
									<Title
										xs={{
											fontWeight: FONT.Large_5,
											fontSize: SIZE.Large_5,
											textAlign: "left",
											color: COLOR.White,
										}}
										md={{
											fontSize: SIZE.Large_6,
										}}
									>
										Plus d'info
									</Title>
									<Flex
										xs={{
											gap: GAP.Small_2,
											flexDirection: "column",
										}}
										md={{
											gap: GAP.Base,
										}}
									>
										<Flex
											xs={{
												gap: GAP.Small,
												alignItems: "center",
											}}
										>
											<Marker />
											<Text
												xs={{
													color: COLOR.White,
													fontSize: SIZE.Base,
												}}
												md={{
													fontSize: SIZE.Large_2,
												}}
											>
												Lotissement Communal, 1050, sidi Maarouf Casablanca
											</Text>
										</Flex>
										<Flex
											xs={{
												gap: GAP.Small,
												alignItems: "center",
											}}
										>
											<At />
											<Text
												xs={{
													color: COLOR.White,
													fontSize: SIZE.Base,
												}}
												md={{
													fontSize: SIZE.Large_2,
												}}
											>
												contact.kingfood@gmail.com
											</Text>
										</Flex>
										<Flex
											xs={{
												gap: GAP.Small,
												alignItems: "center",
											}}
										>
											<Phone />
											<Text
												xs={{
													color: COLOR.White,
													fontSize: SIZE.Base,
												}}
												md={{
													fontSize: SIZE.Large_2,
												}}
											>
												067-495-3685
											</Text>
										</Flex>
									</Flex>
								</Flex>
							</Grid.Item>
							<Grid.Item
								xs={{
									cols: 12,
								}}
								md={{
									cols: 6,
								}}
							>
								<Flex
									xs={{
										gap: GAP.Large_2,
										flexDirection: "column",
										alignItems: "center",
									}}
									md={{
										gap: GAP.Large_4,
									}}
								>
									<Link to="/">
										<Logo type="column" />
									</Link>
									<Flex
										xs={{
											gap: GAP.Large_2,
											flexDirection: "column",
										}}
									>
										<Text
											xs={{
												color: COLOR.White,
												fontSize: SIZE.Base,
												textAlign: "justify",
											}}
											md={{
												fontSize: SIZE.Large_2,
											}}
										>
											Nous recherchons toujours le meilleur rapport qualité/prix pour vous permettre de déguster un bon repas,
											du plus petit au plus grand, dans les meilleures conditions de goût et de prix.
										</Text>
									</Flex>
								</Flex>
							</Grid.Item>
						</Grid>
						<Hr />
						<Flex
							xs={{
								width: "100%",
								justifyContent: "space-between",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							<Box
								xs={{
									width: "max-content",
									margin: "0",
								}}
							>
								<Title
									xs={{
										color: COLOR.White,
										fontSize: SIZE.Base,
									}}
								>
									&copy; 2022
								</Title>
							</Box>
							<Box
								xs={{
									width: "max-content",
									margin: "0",
								}}
							>
								<Flex
									xs={{
										gap: GAP.Small_2,
										alignItems: "center",
									}}
									md={{
										gap: GAP.Large_2,
									}}
								>
									<Instagram />
									<Linkedin />
									<Facebook />
								</Flex>
							</Box>
						</Flex>
					</Flex>
				</Box>
			</Container>
		</footer>
	);
};

export default Footer;
