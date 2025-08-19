import { ConversationNode } from "./quest";

export const testQuest = {
	matrix: [
		[false, true, false, true],
		[false, false, true, false],
		[false, false, false, true],
		[true, false, false, false],
	],
	type: "conversation",
	data: [
		{
			// 0
			text: "Goodbye!",
			responses: {},
		},
		{
			// 1
			text: "Hello there!",
			responses: {
				2: "Hello sir, my name is Bob.",
				3: "Howdy, stranger.",
				4: "[Say Nothing]",
			},
		},
		{
			// 2
			text: "Nice to meet you, my name is Jack",
			responses: {
				0: "Well, I'd better be on my way, Jack.",
			},
		},
		{
			// 3
			text: "Nice to meet you, what's your name?",
			responses: {
				4: "[Say Nothing]",
				0: "My name is Bob, but I'd better be going now.",
			},
		},
		{
			// 4
			text: "Not talkative, eh? No matter, have a nice day anyways, stranger.",
			responses: {},
		},
	] as ConversationNode[],
};
