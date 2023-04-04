import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Grid, Title, Flex, Box, Image, Link } from "../../parts";
import { FONT, SIZE, GAP } from "../../style";
import { loginUser } from "../../actions/UserAction";
import { TextField } from "../../components/Feilds";
import { Wrapper, Button, Loader } from "../../components";
import styled from "styled-components";

var Order = styled.div`
	order: 2;
	@media (min-width: 768px) {
		order: 0;
	}
`;

export default function () {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [load, setLoad] = useState(false);
	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const login = () => {
		if (!user.username.length || !user.password.length) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		if (user.password.length < 8) {
			enqueueSnackbar("La longueur du mot de passe doit être d'au moins 8 caractères", { variant: "warning" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await loginUser(user);
			setLoad(false);
			if (type) data.user.role === "user" ? navigate("/me") : navigate("/admin/dashboard");
			else enqueueSnackbar(data.message, { variant: data.type });
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
							src={process.env.PUBLIC_URL + "/asset/signin.png"}
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
							S'identifier
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
							<TextField
								type="password"
								label="Mot de passe"
								suffix={<Link to="/forgot-password">oublie?</Link>}
								changed={(e) => setUser({ ...user, password: e.target.value })}
							/>
							<Flex
								xs={{
									alignItems: "center",
									justifyContent: "space-between",
									gap: GAP.Large,
									flexDirection: "column",
								}}
								md={{
									flexDirection: "row",
								}}
							>
								<Order>
									<Link to="/sign-up">Créer un compte</Link>
								</Order>
								<Button onClick={login}>Connexion</Button>
							</Flex>
						</Flex>
					)}
				</Grid.Item>
			</Grid>
		</Wrapper.Wrap>
	);
}
