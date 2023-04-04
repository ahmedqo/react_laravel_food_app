import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { Grid, Title, Flex, Box, Image, Text } from "../../parts";
import { FONT, SIZE, GAP } from "../../style";
import { TextField } from "../../components/Feilds";
import { Wrapper, Loader, Button } from "../../components";
import { forgotPassword } from "../../actions/UserAction";

export default function () {
	const { enqueueSnackbar } = useSnackbar();
	const [load, setLoad] = useState(false);
	const [email, setEmail] = useState("");

	const send = () => {
		if (!email.length) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await forgotPassword({ email: email });
			setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
		})();
		setEmail("");
	};

	return (
		<Wrapper.Wrap>
			<Grid
				xs={{
					alignItems: "center",
				}}
				md={{
					gap: "48px",
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
					<Box
						xs={{
							paddingBottom: 32,
						}}
						md={{
							paddingBottom: 64,
						}}
					>
						<Title
							xs={{
								fontWeight: FONT.Large_5,
								fontSize: SIZE.Large_4,
								textAlign: "center",
							}}
							md={{
								fontSize: SIZE.Large_6,
							}}
						>
							Mot de passe oublie?
						</Title>
					</Box>
					{load ? (
						<Box>
							<Loader />
						</Box>
					) : (
						<Flex
							xs={{
								flexDirection: "column",
								gap: GAP.Base,
							}}
						>
							<Text xs={{ textAlign: "justify" }} md={{ fontSize: SIZE.Large_2 }}>
								Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
							</Text>
							<TextField type="email" label="Email" value={email} changed={(e) => setEmail(e.target.value)} />
							<Flex
								xs={{
									alignItems: "flex-end",
									flexDirection: "column",
									flexWrap: "wrap",
								}}
							>
								<Button onClick={send}>Envoyer</Button>
							</Flex>
						</Flex>
					)}
				</Grid.Item>
				<Grid.Item
					xs={{
						cols: 12,
						display: "none",
					}}
					md={{
						cols: 6,
						display: "block",
					}}
				>
					<Flex
						xs={{
							justifyContent: "center",
						}}
					>
						<Image
							src={process.env.PUBLIC_URL + "/asset/forgot.png"}
							md={{
								width: "100%",
							}}
						/>
					</Flex>
				</Grid.Item>
			</Grid>
		</Wrapper.Wrap>
	);
}
