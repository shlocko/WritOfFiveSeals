import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { Template } from "./components/Template";
import { HashRouter, Route } from "@solidjs/router";
import { Main } from "./components/Main";

const App: Component = () => {
	return (
		<HashRouter root={Template} base="/">
			<Route path="/" component={Main} />
		</HashRouter>
	);
};

export default App;
