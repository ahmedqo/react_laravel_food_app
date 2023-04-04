import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Grid, Title, Flex, Box, Image } from "../../parts";
import { FONT, SIZE, GAP } from "../../style";
import { TextField } from "../../components/Feilds";
import { Wrapper, Button, Loader } from "../../components";
import { resetPassword } from "../../actions/UserAction";

export default function () {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const params = useParams();
	const [load, setLoad] = useState(false);
	const [password, setPassword] = useState({ old: "", new: "" });

	const send = (e) => {
		e.preventDefault();

		if (password.old.length < 8) {
			enqueueSnackbar("La longueur du mot de passe doit être d'au moins 8 caractères", { variant: "warning" });
			return;
		}
		if (password.old !== password.new) {
			enqueueSnackbar("Le mot de passe ne correspond pas", { variant: "error" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await resetPassword({ token: params.token, password: password.new });
			setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
			if (type) navigate("/sign-in");
		})();
	};

	return (
		<Wrapper.Wrap>
			<Grid
				xs={{
					alignItems: "center",
				}}
				md={{
					gap: GAP.Large_5,
				}}
			>
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
							src={process.env.PUBLIC_URL + "/asset/reset.png"}
							md={{
								width: "100%",
							}}
						/>
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
							Réinitialiser mot de passe
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
							<TextField
								type="password"
								label="Mot de passe"
								value={password.old}
								changed={(e) => setPassword({ ...password, old: e.target.value })}
							/>
							<TextField
								type="password"
								label="Confirme mot de passe"
								value={password.new}
								changed={(e) => setPassword({ ...password, new: e.target.value })}
							/>
							<Flex
								xs={{
									alignItems: "center",
									justifyContent: "flex-end",
									gap: GAP.Large,
								}}
							>
								<Button onClick={send}>Réinitialiser</Button>
							</Flex>
						</Flex>
					)}
				</Grid.Item>
			</Grid>
		</Wrapper.Wrap>
	);
}
