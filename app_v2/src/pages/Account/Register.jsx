import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Grid, Title, Flex, Box, Image } from "../../parts";
import { FONT, SIZE, GAP } from "../../style";
import { createUser } from "../../actions/UserAction";
import { TextField } from "../../components/Feilds";
import { Wrapper, Loader, Button } from "../../components";

export default function () {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [load, setLoad] = useState(false);
	const [user, setUser] = useState({
		username: "",
		email: "",
		phone: "",
		password: "",
	});

	const register = () => {
		if (!user.username.length || !user.email.length || !user.phone.length || !user.password.length) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		if (user.password.length < 8) {
			enqueueSnackbar("La longueur du mot de passe doit être d'au moins 8 caractères", { variant: "warning" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await createUser(user);
			enqueueSnackbar(data.message, { variant: data.type });
			setLoad(false);
			if (type) navigate("/me");
		})();
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
							Créer un compte
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
							<TextField type="text" label="Nom d'utilisateur" changed={(e) => setUser({ ...user, username: e.target.value })} />
							<TextField type="text" label="Email" changed={(e) => setUser({ ...user, email: e.target.value })} />
							<TextField type="text" label="Telephone" changed={(e) => setUser({ ...user, phone: e.target.value })} />
							<TextField type="password" label="Mot de passe" changed={(e) => setUser({ ...user, password: e.target.value })} />
							<Flex
								xs={{
									alignItems: "flex-end",
									flexDirection: "column",
									flexWrap: "wrap",
								}}
							>
								<Button onClick={register}>S'inscrire</Button>
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
							src={process.env.PUBLIC_URL + "/asset/signup.png"}
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
