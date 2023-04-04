import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ({ title, isProtected = false, isAdmin = false, children }) {
	const user = localStorage.getItem("food_token");
	const role = localStorage.getItem("food_role");

	useEffect(() => {
		document.title = title;
	}, [title]);

	return <>{isProtected ? !user ? <Navigate to="/sign-in" /> : isAdmin ? role !== "admin" ? <Navigate to="/sign-in" /> : children : children : children}</>;
}
