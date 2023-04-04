import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common["Authorization"] = "Bearer " + (localStorage.getItem("food_token") || "");
axios.defaults.headers.common["Content-Type"] = "application/json";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
			>
				<Router>
					<App />
				</Router>
			</SnackbarProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
module.hot.accept();
