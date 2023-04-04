import React, { Profiler, useEffect } from "react";
import WebFont from "webfontloader";
import { Route, Routes, useLocation } from "react-router-dom";
import { Wrapper } from "./components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Page, { Home, Account, Dashboard, Menu, User, Cuisine, Product, Order, Reserve, NotFound } from "./pages";
import "./App.css";

const App = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto:100,200,300,400,500,600,700,800,900"],
			},
		});
	});

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, [pathname]);

	return (
		<Wrapper>
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<Page title="Accuiel">
							<Home />
						</Page>
					}
					exact
				/>
				<Route
					path="/menu"
					element={
						<Page title="Menu">
							<Menu />
						</Page>
					}
					exact
				/>
				<Route
					path="/menu/:keyword"
					element={
						<Page title="Menu">
							<Menu />
						</Page>
					}
					exact
				/>
				<Route
					path="/menu/details/:_id"
					element={
						<Page title="Menu">
							<Menu.Detail />
						</Page>
					}
					exact
				/>
				<Route
					path="/sign-in"
					element={
						<Page title="S'identifier">
							<Account.Login />
						</Page>
					}
					exact
				/>
				<Route
					path="/sign-up"
					element={
						<Page title="S'inscrire">
							<Account.Register />
						</Page>
					}
					exact
				/>
				<Route
					path="/forgot-password"
					element={
						<Page title="Mot de passe oublie">
							<Account.Forgot />
						</Page>
					}
					exact
				/>
				<Route
					path="/reset-password/:token"
					element={
						<Page title="Réinitialiser mot de passe">
							<Account.Reset />
						</Page>
					}
					exact
				/>
				<Route
					path="/cart"
					element={
						<Page title="Panier">
							<Account.Cart />
						</Page>
					}
					exact
				/>
				<Route
					path="/me"
					element={
						<Page title="Profile" isProtected={true}>
							<Account.Profile />
						</Page>
					}
					exact
				/>
				<Route
					path="/orders"
					element={
						<Page title="Liste De Commandes" isProtected={true}>
							<Account.Orders />
						</Page>
					}
					exact
				/>
				<Route
					path="/order/:_id"
					element={
						<Page title="Commande" isProtected={true}>
							<Account.Order />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/dashboard"
					element={
						<Page title="Dashboard" isProtected={true} isAdmin={true}>
							<Dashboard />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/users"
					element={
						<Page title="Liste d'Utilisateurs" isProtected={true} isAdmin={true}>
							<User />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/cuisines"
					element={
						<Page title="Liste De Cuisines" isProtected={true} isAdmin={true}>
							<Cuisine />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/cuisine/new"
					element={
						<Page title="Nouveau Cuisine" isProtected={true} isAdmin={true}>
							<Cuisine.Create />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/cuisine/detail/:_id"
					element={
						<Page title="Modifier Cuisine" isProtected={true} isAdmin={true}>
							<Cuisine.Update />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/products"
					element={
						<Page title="Liste De Produits" isProtected={true} isAdmin={true}>
							<Product />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/product/new"
					element={
						<Page title="Nouveau Produit" isProtected={true} isAdmin={true}>
							<Product.Create />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/product/detail/:_id"
					element={
						<Page title="Modifier Produit" isProtected={true} isAdmin={true}>
							<Product.Update />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/orders"
					element={
						<Page title="Commandes" isProtected={true} isAdmin={true}>
							<Order />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/order/detail/:_id"
					element={
						<Page title="Commande" isProtected={true} isAdmin={true}>
							<Order.Detail />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/reserves"
					element={
						<Page title="Reservations" isProtected={true} isAdmin={true}>
							<Reserve />
						</Page>
					}
					exact
				/>
				<Route
					path="/admin/reserve/detail/:_id"
					element={
						<Page title="Commande" isProtected={true} isAdmin={true}>
							<Reserve.Detail />
						</Page>
					}
					exact
				/>
				<Route
					path="*"
					element={
						<Page title="404">
							<NotFound />
						</Page>
					}
				/>
			</Routes>
			<Footer />
		</Wrapper>
	);
};

export default App;
