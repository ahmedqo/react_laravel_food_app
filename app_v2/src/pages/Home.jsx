import React from "react";
import { Background, Grid, Title, Text, Flex, Box } from "../parts";
import { COLOR, FONT, SIZE, RADIUS, GAP } from "../style";
import { HomeAccordion, HomeCard, HomeData } from "../components/Home";
import { SearchField } from "../components/Feilds";
import { Wrapper } from "../components";

export default function () {
	return (
		<Wrapper.Wrap>
			<Background
				xs={{
					src: "/asset/splach.png",
					borderRadius: RADIUS.Large,
				}}
				md={{
					borderRadius: RADIUS.Large_2,
				}}
			>
				<Box
					xs={{
						padding: "40px 20px",
					}}
					md={{
						padding: "100px 40px",
					}}
				>
					<Flex
						xs={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							gap: GAP.Large_2,
						}}
						md={{
							gap: GAP.Large_5,
						}}
					>
						<Title
							xs={{
								color: COLOR.White,
								fontWeight: FONT.Large_5,
								fontSize: SIZE.Large_4,
								textAlign: "center",
							}}
							md={{
								fontSize: SIZE.Large_7,
							}}
						>
							Apporter de la bonne alimontation dans votre quotidien
						</Title>
						<Box xs={{ width: "90%" }} md={{ width: "500px" }}>
							<SearchField />
						</Box>
					</Flex>
				</Box>
			</Background>
			<Flex
				xs={{
					flexDirection: "column",
					gap: GAP.Large_4,
				}}
				md={{
					gap: GAP.Large_6,
				}}
			>
				<Title
					xs={{
						fontWeight: FONT.Large_5,
						fontSize: SIZE.Large_5,
						textAlign: "center",
					}}
					md={{
						fontSize: SIZE.Large_6,
					}}
				>
					Comment ca marche
				</Title>
				<Grid
					xs={{
						gap: GAP.Large,
					}}
				>
					<HomeCard src={"/asset/choice.png"} title={"Divers choix"} />
					<HomeCard src={"/asset/delivery.png"} title={"Livraison rapide"} />
					<HomeCard src={"/asset/payment.png"} title={"Paiement facile"} />
					<HomeCard src={"/asset/enjoy.png"} title={"Bon appetit"} />
				</Grid>
				<Background
					xs={{
						src: "/asset/hero.png",
						borderRadius: RADIUS.Large,
					}}
					md={{
						borderRadius: RADIUS.Large_2,
					}}
				>
					<Box
						xs={{
							padding: "40px 20px",
						}}
						md={{
							padding: "80px 40px",
						}}
					>
						<Title
							xs={{
								color: COLOR.White,
								fontWeight: FONT.Large_5,
								fontSize: SIZE.Large_4,
								textAlign: "center",
							}}
							md={{
								fontSize: SIZE.Large_7,
							}}
						>
							Nous avons a coeur d’offrir le meilleur service possible a nos client
						</Title>
					</Box>
				</Background>
			</Flex>
			<Flex
				xs={{
					flexDirection: "column",
					gap: GAP.Large_4,
				}}
				md={{
					gap: GAP.Large_6,
				}}
			>
				<Title
					xs={{
						fontWeight: FONT.Large_5,
						fontSize: SIZE.Large_5,
						textAlign: "center",
					}}
					md={{
						fontSize: SIZE.Large_6,
					}}
				>
					FAQs
				</Title>
				<Flex
					xs={{
						flexDirection: "column",
						gap: GAP.Large_2,
					}}
				>
					<Grid
						xs={{
							gap: GAP.Large_2,
						}}
					>
						<HomeAccordion title={"Qui sommes nous?"}>
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
							ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
							voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
							Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
							tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
							ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
							ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
						</HomeAccordion>
						<HomeAccordion title={"Pourquoi King Food?"}>
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
							ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
							voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
							Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
							tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
							ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
							ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
						</HomeAccordion>
						<HomeAccordion title={"Qui contacter en cas de besoin?"}>
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
							ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
							voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
							Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
							tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
							ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
							ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
						</HomeAccordion>
					</Grid>
				</Flex>
			</Flex>
			<Flex
				xs={{
					flexDirection: "column",
					gap: GAP.Large_4,
				}}
				md={{
					gap: GAP.Large_6,
				}}
			>
				<Title
					xs={{
						fontWeight: FONT.Large_5,
						fontSize: SIZE.Large_5,
						textAlign: "center",
					}}
					md={{
						fontSize: SIZE.Large_6,
					}}
				>
					Objectif
				</Title>
				<Flex
					xs={{
						flexDirection: "column",
						gap: GAP.Large_2,
					}}
				>
					<Grid
						xs={{
							gap: GAP.Large_2,
						}}
					>
						<Grid.Item xs={{ cols: 12 }}>
							<Text xs={{ textAlign: "justify" }} md={{ fontSize: SIZE.Large_2 }}>
								Nous recherchons toujours le meilleur rapport qualité/prix pour vous permettre de déguster un bon repas, du plus petit
								au plus grand, dans les meilleures conditions de goût et de prix.
							</Text>
						</Grid.Item>
						<HomeData number={200} title={"Plats"} />
						<HomeData number={32} title={"Cuisines"} />
						<HomeData number={580} title={"Clients"} />
						<HomeData number={100 + "%"} title={"S’atisfaction"} />
					</Grid>
				</Flex>
			</Flex>
		</Wrapper.Wrap>
	);
}
