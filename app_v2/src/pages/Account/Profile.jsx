import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Flex, Box } from "../../parts";
import { FONT, SIZE, GAP } from "../../style";
import { TextField } from "../../components/Feilds";
import { Button, Loader } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { updateProfile, updatePassword, loadUser } from "../../actions/UserAction";

export default function () {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const [user, setUser] = useState({ username: "", email: "", phone: "" });
	const [password, setPassword] = useState({ old: "", new: "" });
	const [load, setLoad] = useState(false);
	const [_load, _setLoad] = useState(false);

	const update = () => {
		if (!user.username.length || !user.email.length || !user.phone.length) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await updateProfile(user);
			setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
		})();
	};

	const change = () => {
		if (password.old.length < 8 || password.new.length < 8) {
			enqueueSnackbar("La longueur du mot de passe doit être d'au moins 8 caractères", { variant: "warning" });
			return;
		}
		(async () => {
			_setLoad(true);
			const [type, data] = await updatePassword(password);
			_setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
		})();
	};

	useEffect(() => {
		(async () => {
			setLoad(true);
			const [type, data] = await loadUser();
			if (type) setUser(data);
			else navigate("/me");
			setLoad(false);
		})();
	}, []);

	return (
		<UserSideBar>
			<Flex
				xs={{
					gap: GAP.Large_3,
					flexDirection: "column",
				}}
				md={{
					gap: GAP.Large_5,
				}}
			>
				<Flex
					xs={{
						flexDirection: "column",
						gap: GAP.Base,
					}}
				>
					<Box
						xs={{
							paddingBottom: 10,
						}}
						md={{
							paddingBottom: 20,
						}}
					>
						<Title
							xs={{
								fontWeight: FONT.Large_5,
								fontSize: SIZE.Large_3,
							}}
							md={{
								fontSize: SIZE.Large_4,
							}}
						>
							Info du profile
						</Title>
					</Box>
					{load ? (
						<Loader />
					) : (
						<>
							<TextField
								type="text"
								label="Nom d'utilisateur"
								value={user.username}
								changed={(e) => setUser({ ...user, username: e.target.value })}
							/>
							<TextField type="text" label="Email" value={user.email} changed={(e) => setUser({ ...user, email: e.target.value })} />
							<TextField type="text" label="Telephone" value={user.phone} changed={(e) => setUser({ ...user, phone: e.target.value })} />
							<Flex
								xs={{
									alignItems: "flex-end",
									flexDirection: "column",
									flexWrap: "wrap",
								}}
							>
								<Button onClick={update}>Enregistrer</Button>
							</Flex>
						</>
					)}
				</Flex>
				<Flex
					xs={{
						flexDirection: "column",
						gap: GAP.Base,
					}}
				>
					<Box
						xs={{
							paddingBottom: 16,
						}}
						md={{
							paddingBottom: 32,
						}}
					>
						<Title
							xs={{
								fontWeight: FONT.Large_5,
								fontSize: SIZE.Large_3,
							}}
							md={{
								fontSize: SIZE.Large_4,
							}}
						>
							Mot de passe
						</Title>
					</Box>
					{_load ? (
						<Loader />
					) : (
						<>
							<TextField
								type="password"
								label="Ancien mot de passe"
								value={password.old}
								changed={(e) => setPassword({ ...password, old: e.target.value })}
							/>
							<TextField
								type="password"
								label="Nouveau mot de passe"
								value={password.new}
								changed={(e) => setPassword({ ...password, new: e.target.value })}
							/>
							<Flex
								xs={{
									alignItems: "flex-end",
									flexDirection: "column",
									flexWrap: "wrap",
								}}
							>
								<Button onClick={change}>Enregistrer</Button>
							</Flex>
						</>
					)}
				</Flex>
			</Flex>
		</UserSideBar>
	);
}
