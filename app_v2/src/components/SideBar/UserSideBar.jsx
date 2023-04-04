import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../actions/UserAction";
import { SideBar } from ".";
import { Dashboard, Profile, Users, Cuisine, Product, Order, Reserve, Logout } from "../../icons";

export default function ({ children }) {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [role, setRole] = useState(localStorage.getItem("food_role"));

	const logout = () => {
		(async () => {
			await logoutUser();
			enqueueSnackbar("Deconnexion avec success", { variant: "success" });
			setRole(null);
			navigate("/sign-in");
		})();
	};

	useEffect(() => {
		setRole(localStorage.getItem("food_role"));
	});

	const links = [
		...(role === "admin"
			? [
					{
						to: "/admin/dashboard",
						text: "Dashboard",
						icon: <Dashboard />,
					},
			  ]
			: []),
		{
			to: "/me",
			text: "Profile",
			icon: <Profile />,
		},
		...(role === "admin"
			? [
					{
						to: "/admin/users",
						text: "Utilisateurs",
						icon: <Users />,
					},
					{
						to: "/admin/cuisines",
						text: "Cuisines",
						icon: <Cuisine />,
					},
					{
						to: "/admin/products",
						text: "Produits",
						icon: <Product />,
					},
			  ]
			: []),
		{
			to: role === "admin" ? "/admin/reserves" : "/reserves",
			text: "Reservations",
			icon: <Reserve />,
		},
		{
			to: role === "admin" ? "/admin/orders" : "/orders",
			text: "Commandes",
			icon: <Order />,
		},
		{
			to: "/sign-out",
			text: "Deconnexion",
			icon: <Logout />,
			onClick: (e) => {
				e.preventDefault();
				logout();
			},
		},
	];

	return <SideBar links={links}>{children}</SideBar>;
}
