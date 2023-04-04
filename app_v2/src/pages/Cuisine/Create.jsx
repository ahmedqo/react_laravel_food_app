import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Flex, Box } from "../../parts";
import { FONT, SIZE, GAP } from "../../style";
import { TextField } from "../../components/Feilds";
import { Button, Loader } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { createCuisine } from "../../actions/CuisineAction";

export default function () {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [label, setLabel] = useState("");
	const [load, setLoad] = useState(false);

	const create = () => {
		if (!label.length) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await createCuisine({ label });
			enqueueSnackbar(data.message, { variant: data.type });
			setLoad(false);
			if (type) navigate("/admin/cuisines");
		})();
	};

	return (
		<UserSideBar>
			<Flex
				xs={{
					flexDirection: "column",
					gap: GAP.Base,
				}}
			>
				<Box
					xs={{
						marginBottom: 20,
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
						Nouveau Cuisine
					</Title>
				</Box>
				{load ? (
					<Loader />
				) : (
					<>
						<TextField type="text" label="Label" value={label} changed={(e) => setLabel(e.target.value)} />
						<Flex
							xs={{
								alignItems: "flex-end",
								flexDirection: "column",
								flexWrap: "wrap",
							}}
						>
							<Button onClick={create}>Créer</Button>
						</Flex>
					</>
				)}
			</Flex>
		</UserSideBar>
	);
}
