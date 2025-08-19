import { Component, For, Show } from "solid-js";
import styles from "../styles/Main.module.css";
import { globalState, setGlobalState } from "../global";
import { testMatrix } from "../testQuest";

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
				></div>
				<div
					classList={{
						[styles.context]: true,
					}}
				>
					<p>
						{
							globalState.quest.quest.data[
								globalState.quest.position
							].text
						}
					</p>
					<hr />
					<For
						each={Object.entries(
							globalState.quest.quest.data[
								globalState.quest.position
							].responses,
						)}
					>
						{(entry, i) => {
							let [key, value] = entry;
							return (
								<div>
									<button
										onClick={() => {
											setGlobalState(
												"quest",
												"history",
												(h) => [...h, Number(key)],
											);
											setGlobalState(
												"quest",
												"position",
												Number(key),
											);
										}}
									>
										{" "}
										{value}{" "}
									</button>
								</div>
							);
						}}
					</For>
					<hr />
					<p>{globalState.quest.history}</p>
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
