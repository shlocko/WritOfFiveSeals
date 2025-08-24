import { createStore } from "solid-js/store";
import { AreaID } from "./world";

export type NodeAddress = {
	area: AreaID | "global";
	story: string;
	node: string;
};

export type NodeDepencies = {
	excludedBy?: NodeAddress[][];
	dependsOn?: NodeAddress[][];
};

export type Story = {
	id: string;
	name: string;
	history: string[];
};

export type DialogueStory<Nodes extends Record<string, DialogueNode>> =
	Story & {
		type: "dialogue";
		dependencies: NodeDepencies;
		nodes: Nodes;
		edges: DialogueEdge<keyof Nodes & string>[];
		state: DialogueState<keyof Nodes & string>;
	};

export type DialogueNode = {
	id: string;
	text: string;
};

export type DialogueEdge<NodeID extends string> = {
	from: NodeID;
	to: NodeID;
	response: string;
};

export type DialogueState<NodeID extends string> = {
	current: NodeID;
};

export function makeDialogue<Nodes extends Record<string, DialogueNode>>(
	story: Omit<DialogueStory<Nodes>, "type" | "edges" | "state"> & {
		edges: DialogueEdge<Extract<keyof Nodes, string>>[];
		state: DialogueState<Extract<keyof Nodes, string>>;
	},
): DialogueStory<Nodes> {
	return { ...story, type: "dialogue" };
}

export const [dialogue, setDialogue] = createStore(
	makeDialogue({
		id: "testDialogue",
		name: "Test Dialogue",
		history: [],
		state: {
			current: "entry",
		},
		dependencies: {},
		nodes: {
			entry: {
				id: "entry",
				text: "This is the entry",
			},
			second: {
				id: "second",
				text: "The second text",
			},
			other: {
				id: "other",
				text: "another text",
			},
		},
		edges: [
			{
				from: "entry",
				to: "second",
				response: "Take me to the second",
			},
			{
				from: "entry",
				to: "other",
				response: "Why not something 'other'?",
			},
			{
				from: "second",
				to: "other",
				response: "Take me to another!",
			},
			{
				from: "other",
				to: "entry",
				response: "Lets go back to the beginning",
			},
		],
	}),
);
