import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Title, Flex, Box } from "../../parts";
import { FONT, SIZE, GAP } from "../../style";
import { TextField } from "../../components/Feilds";
import { Button, Loader } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { getCuisine, updateCuisine } from "../../actions/CuisineAction";

export default function () {
	const navigate = useNavigate();
	const params = useParams();
	const _id = params._id;
	const { enqueueSnackbar } = useSnackbar();
	const [label, setLabel] = useState(null);
	const [load, setLoad] = useState(false);

	const update = () => {
		if (!label.length) {
			enqueueSnackbar("Tous les champs sont requis", { variant: "error" });
			return;
		}
		(async () => {
			setLoad(true);
			const [type, data] = await updateCuisine({ label, id: _id });
			enqueueSnackbar(data.message, { variant: data.type });
			setLoad(false);
			if (type) navigate("/admin/cuisines");
		})();
	};

	useEffect(() => {
		(async () => {
			const [type, data] = await getCuisine(_id);
			if (type) setLabel(data.label);
		})();
	}, [_id]);

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
						Modifier Cuisine
					</Title>
				</Box>
				{!label || load ? (
					<Loader />
				) : (
					<>
						<TextField type="text" label="Label" value={label} changed={(e) => setLabel(e.target.value)} />
						<Flex
							xs={{
								justifyContent: "flex-end",
								gap: GAP.Base,
							}}
						>
							<Button onClick={update}>Enregistrer</Button>
						</Flex>
					</>
				)}
			</Flex>
		</UserSideBar>
	);
}
