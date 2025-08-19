import { Component } from "solid-js";
import styles from "../styles/Template.module.css";
import { RouteSectionProps } from "@solidjs/router";

export const Template: Component<RouteSectionProps> = (props) => {
	return (
		<div
			classList={{
				[styles.container]: true,
			}}
		>
			<div
				classList={{
					[styles.sidebar]: true,
				}}
			>
				<p>Sidebar</p>
			</div>
			<div
				classList={{
					[styles.main]: true,
				}}
			>
				{props.children}
			</div>
		</div>
	);
};
