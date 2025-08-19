import { Item } from "./items";
import { Skill } from "./skills";
import { Stat } from "./stats";

export type Player = {
	skills: Record<Skill, number>;
	stats: Record<Stat, number>;
	inventory: Item[];
};
