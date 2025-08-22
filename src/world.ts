export class World {
	areas = { ...initialAreas };
	edges: Edge[] = [];

	addEdge(edge: Edge) {
		this.edges.push(edge);
	}

	getOutgoingEdges(area: AreaID) {
		return this.edges.filter(
			(edge) =>
				edge.from === area ||
				(edge.opts.bidirectional && edge.to === area),
		);
	}

	getOutGoingDestinationsWithWeigt(area: AreaID): OutgoingEdge[] {
		let edges = this.getOutgoingEdges(area);
		let outgoingEdges: OutgoingEdge[] = [];
		for (let edge of edges) {
			console.log(edge.to);
			outgoingEdges.push(
				edge.to === area
					? {
							area: edge.from,
							weight: edge.opts.reverseWeight || edge.opts.weight,
						}
					: { area: edge.to, weight: edge.opts.weight },
			);
		}

		return outgoingEdges;
	}
}

class Area {
	id: string;
	description: string;
	name?: string;

	constructor(id: string, description: string, name: string = id) {
		this.id = id;
		this.description = description;
		this.name = name;
	}
}

export interface EdgeOptions {
	weight: number;
	bidirectional: boolean;
	reverseWeight?: number;
}
const DEFAULT_EDGE_OPTIONS: EdgeOptions = {
	weight: 1,
	bidirectional: true,
};

export class EdgeSaveData {}
const DEFAULT_EDGE_SAVE_DATA: EdgeSaveData = {};

export class Edge {
	from: AreaID;
	to: AreaID;
	opts: EdgeOptions;
	saveData: EdgeSaveData;

	constructor(
		from: AreaID,
		to: AreaID,
		opts: Partial<EdgeOptions> = {},
		saveData: Partial<EdgeSaveData> = {},
	) {
		this.from = from;
		this.to = to;
		this.opts = { ...DEFAULT_EDGE_OPTIONS, ...opts };
		this.saveData = { ...DEFAULT_EDGE_SAVE_DATA, ...saveData };
	}
}

export type OutgoingEdge = {
	area: AreaID;
	weight: number;
};

let initialAreas = {
	startingLocation: new Area(
		"startingLocation",
		"first location",
		"Starting Location",
	),
	secondLocation: new Area(
		"secordLocation",
		"Second location",
		"Second Location",
	),
} as const;

export type AreaID = keyof typeof initialAreas;

export const world = new World();

world.areas = initialAreas;
world.addEdge(
	new Edge("startingLocation", "secondLocation", {
		weight: 3,
		reverseWeight: 2,
	}),
);
