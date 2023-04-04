import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../actions/UserAction";
import { Container, Flex, Link } from "../../parts";
import { Account, Cart, Menu, Dashboard, Profile, Users, Cuisine, Product, Order, Reserve, Logout } from "../../icons";
import { NavLink, DropDown } from ".";
import { GAP } from "../../style";
import { Logo } from "..";

const Navbar = () => {
	const { cartItems } = useSelector((state) => state.cart);
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

	return (
		<header>
			<Container
				xs={{
					padding: "0 1rem",
				}}
				lg={{
					padding: 0,
				}}
			>
				<Flex
					xs={{
						alignItems: "center",
						justifyContent: "space-between",
						flexWrap: "wrap",
						gap: GAP.Large_2,
					}}
				>
					<Link to="/">
						<Logo type="row" />
					</Link>
					<Flex
						xs={{
							alignItems: "center",
							width: "max-content",
							flexWrap: "wrap",
							gap: GAP.Small_2,
						}}
						md={{
							gap: GAP.Large_2,
						}}
					>
						{role !== "admin" && (
							<NavLink to="/menu" label="Menu">
								<Menu />
							</NavLink>
						)}
						{role ? (
							<DropDown links={links} />
						) : (
							<NavLink to="/sign-in" label="Connexion">
								<Account />
							</NavLink>
						)}
						{role !== "admin" && (
							<NavLink to="/cart" label="Panier">
								<Cart items={cartItems.length} />
							</NavLink>
						)}
					</Flex>
				</Flex>
			</Container>
		</header>
	);
};

export default Navbar;
