import { createStore } from "solid-js/store";
import { Player } from "./player";
import { Quest } from "./quest";
import { testMatrix, testQuest } from "./testQuest";

export const [globalState, setGlobalState] = createStore({
	player: {} as Player,
	quest: {
		quest: testQuest,
		position: 1,
		history: [] as number[],
	},
});

const [quests, setQuests] = createStore<Quest[]>([]);
