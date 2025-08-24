import { createStore } from "solid-js/store";
import { Player } from "./player";
import { AreaID } from "./world";

export const [globalState, setGlobalState] = createStore({
	player: {} as Player,
	area: "startingLocation" as AreaID,
	routes: {
		theNorthRoad: true,
	} as const,
});

export type Route = keyof typeof globalState.routes;

export const routes: Record<Route, string> = {
	theNorthRoad: "The North Road",
};
