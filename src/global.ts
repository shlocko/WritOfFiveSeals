import { createStore } from "solid-js/store";
import { Player } from "./player";
import { AreaID } from "./world";

export const [globalState, setGlobalState] = createStore({
	player: {} as Player,
	area: "startingLocation" as AreaID,
});
