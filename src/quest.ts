export type Quest = {
	name: QuestName;
	type: "conversation";
	history: number[];
	position: number;
	matrix: boolean[][];
};

export type ConversationNode = {
	text: string;
	responses: Record<number, string>;
};
