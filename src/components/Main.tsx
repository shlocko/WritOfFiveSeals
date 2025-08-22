import { Component, For, Show } from "solid-js";
import styles from "../styles/Main.module.css";
import { globalState, setGlobalState } from "../global";
import { world } from "../world";

export const Main: Component = () => {
	return (
		<div
			classList={{
				[styles.container]: true,
			}}
		>
			<div
				classList={{
					[styles.main]: true,
				}}
			>
				<div
					classList={{
						[styles.visual]: true,
					}}
				>
					<p>Travel</p>
					<p>{world.areas[globalState.area].name}</p>
					<For
						each={world.getOutGoingDestinationsWithWeigt(
							globalState.area,
						)}
					>
						{(edge) => (
							<button
								class="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
								onClick={() => {
									setGlobalState("area", edge.area);
								}}
							>
								<p>
									{edge.area}: {edge.weight}
								</p>
							</button>
						)}
					</For>
				</div>
				<div
					classList={{
						[styles.context]: true,
					}}
				>
					<p></p>
					<hr />
				</div>
			</div>
			<div
				classList={{
					[styles.bottom_bar]: true,
				}}
			>
				<p>Bottom Bar</p>
			</div>
		</div>
	);
};
