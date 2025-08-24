import { Component, createMemo, For, Show } from "solid-js";
import styles from "../styles/Main.module.css";
import { globalState, routes, setGlobalState } from "../global";
import { world } from "../world";
import { dialogue, moveDialogue, setDialogue } from "../story";

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
						each={world.getOutgoingDestinationsWithWeight(
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
									<Show when={edge.name || edge.route}>
										{edge.name
											? edge.name
											: routes[edge.route!]}{" "}
										to{" "}
									</Show>
									{world.areas[edge.area].name}: {edge.weight}
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
					<p>Conversation</p>
					<hr />
					<p>{dialogue.nodes[dialogue.state.current].text}</p>
					<div class="flex flex-col">
						<For
							each={dialogue.edges.filter(
								(edge) =>
									edge.from ===
									dialogue.nodes[dialogue.state.current].id,
							)}
						>
							{(edge) => {
								return (
									<button
										class="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
										onClick={() => {
											setDialogue(
												"state",
												"current",
												edge.to,
											);
											setDialogue("history", (h) => {
												let arr = h.slice();
												arr.push(edge.to);
												return arr;
											});
										}}
									>
										- {edge.response}
									</button>
								);
							}}
						</For>
					</div>
					<hr />
					<p>History</p>
					<p>{dialogue.history}</p>
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
