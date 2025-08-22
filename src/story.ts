export interface Story {
	name: string;
	type: StoryType;
	history: NodeAddress[];
	position: NodeAddress;
};

export type NodeAddress = string;

export type NodeDepencies = {
	excludedBy: NodeAddress[][];
	dependsOn: NodeAddress[][];
};

export type ConversationNode = {
	text: string;
	dependencies: NodeDepencies;
	unlockFunction: Function | undefined;
	responses: Record<NodeAddress, string>;
	entry: boolean;
};

export type StoryType = "conversation" | "quest";

export type ConversationStory
