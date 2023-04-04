import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Title, Image, Flex } from "../../parts";
import { Loader, Table, Button } from "../../components";
import { UserSideBar } from "../../components/SideBar";
import { updateUser, deleteUser, getUsers } from "../../actions/UserAction";
import { COLOR, SIZE, GAP, FONT } from "../../style";
import { Times } from "../../icons";

export default function () {
	const { enqueueSnackbar } = useSnackbar();
	const [users, setUsers] = useState(null);
	const [load, setLoad] = useState(false);

	const update = (role, user) => {
		(async () => {
			(async () => {
				setLoad(true);
				const [type, data] = await updateUser({ ...user, role });
				setLoad(false);
				enqueueSnackbar(data.message, { variant: data.type });
			})();
		})();
	};

	const remove = (id) => {
		(async () => {
			setLoad(true);
			const [type, data] = await deleteUser(id);
			setLoad(false);
			enqueueSnackbar(data.message, { variant: data.type });
		})();
	};

	useEffect(() => {
		(async () => {
			setUsers(null);
			const [type, data] = await getUsers();
			if (type) setUsers(data);
		})();
	}, [load]);

	const columns = [
		{
			field: "username",
			label: "Nom Utilisateur",
			xs: {
				textAlign: "center",
				minWidth: "max-content",
			},
		},
		{
			field: "email",
			label: "Email",
			xs: {
				textAlign: "center",
				minWidth: "max-content",
			},
		},
		{
			field: "phone",
			label: "Telephone",
			xs: {
				textAlign: "center",
				minWidth: "max-content",
			},
		},
		{
			field: "role",
			label: "Type",
			render: (prop) => (
				<Button
					xs={{
						padding: 0,
						background: "transparent",
						width: "max-content",
						margin: "auto",
						color: COLOR.Black,
						fontSize: SIZE.Base,
						fontWeight: FONT.Base,
					}}
					md={{
						width: "max-content",
						fontSize: SIZE.Base,
						fontWeight: FONT.Base,
					}}
					onClick={() => {
						if (prop.role === "user") update("admin", prop);
						else update("user", prop);
					}}
				>
					{(prop.role === "user" && "Utilisateur") || (prop.role === "admin" && "Administrateur")}
				</Button>
			),
			xs: {
				textAlign: "center",
				minWidth: "max-content",
			},
		},
		{
			field: "action",
			label: "",
			render: (prop) => (
				<Flex xs={{ gap: GAP.Small }}>
					<Button
						xs={{
							width: 14,
							height: 14,
							padding: 0,
							background: "transparent",
						}}
						md={{ width: 14, height: 14 }}
						onClick={() => {
							remove(prop.id);
						}}
					>
						<Times color={COLOR.Error} size={"14px"} />
					</Button>
				</Flex>
			),
			xs: {
				width: 14,
				textAlign: "center",
			},
		},
	];

	return (
		<UserSideBar>
			<Flex
				xs={{
					marginBottom: 20,
					alignItems: "center",
					justifyContent: "space-between",
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
					Liste d'Utilisateurs
				</Title>
			</Flex>
			{!users || load ? (
				<Loader />
			) : users.length === 0 ? (
				<Image src={"/asset/none.png"} xs={{ width: "260px" }} md={{ width: "400px" }} />
			) : (
				<Table columns={columns} data={users} />
			)}
		</UserSideBar>
	);
}
