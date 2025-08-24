import { globalState, Route } from "./global";

export class World {
	areas = { ...initialAreas };
	edges: Edge[] = [];

	addEdge(
		from: AreaID,
		to: AreaID,
		opts: Partial<EdgeOptions> = {},
		saveData: Partial<EdgeSaveData> = {},
	) {
		this.edges.push({
			from: from,
			to: to,
			opts: { ...DEFAULT_EDGE_OPTIONS, ...opts },
			saveData: { ...DEFAULT_EDGE_SAVE_DATA, ...saveData },
		});
	}

	getOutgoingEdges(area: AreaID) {
		return this.edges.filter(
			(edge) =>
				(!edge.opts.route || globalState.routes[edge.opts.route]) &&
				(edge.from === area ||
					(edge.opts.bidirectional && edge.to === area)),
		);
	}

	getOutgoingDestinationsWithWeight(area: AreaID): OutgoingEdge[] {
		let edges = this.getOutgoingEdges(area);
		let outgoingEdges: OutgoingEdge[] = [];
		for (let edge of edges) {
			outgoingEdges.push(
				edge.to === area
					? {
							area: edge.from,
							weight: edge.opts.reverseWeight || edge.opts.weight,
							name: edge.opts.name,
							route: edge.opts.route,
						}
					: {
							area: edge.to,
							weight: edge.opts.weight,
							name: edge.opts.name,
							route: edge.opts.route,
						},
			);
		}

		return outgoingEdges;
	}
}

export type Area = {
	id: string;
	description: string;
	name?: string;
};

export interface EdgeOptions {
	weight: number;
	bidirectional: boolean;
	reverseWeight?: number;
	name?: string;
	route?: Route;
}
const DEFAULT_EDGE_OPTIONS: EdgeOptions = {
	weight: 1,
	bidirectional: true,
};

export class EdgeSaveData {}
const DEFAULT_EDGE_SAVE_DATA: EdgeSaveData = {};

export type Edge = {
	from: AreaID;
	to: AreaID;
	opts: EdgeOptions;
	saveData: EdgeSaveData;
};

export type OutgoingEdge = {
	area: AreaID;
	weight: number;
	name?: string;
	route?: Route;
};

let initialAreas = {
	startingLocation: {
		id: "startingLocation",
		description: "first location",
		name: "Starting Location",
	},
	secondLocation: {
		id: "secondLocation",
		description: "Second location",
		name: "Second Location",
	},
	theTown: { id: "theTown", description: "The Town", name: "The Town" },
	distantArea: {
		id: "distantArea",
		description: "A distant land of wonder",
		name: "A Distant Area",
	},
} as const satisfies Record<string, Area>;

export type AreaID = keyof typeof initialAreas;

export const world = new World();

world.areas = initialAreas;
world.addEdge("startingLocation", "secondLocation", {
	weight: 3,
	reverseWeight: 2,
});
world.addEdge("secondLocation", "theTown", {
	weight: 0,
});
world.addEdge("startingLocation", "theTown", {
	weight: 2,
	bidirectional: false,
});
world.addEdge("theTown", "distantArea", {
	weight: 15,
	route: "theNorthRoad",
});
