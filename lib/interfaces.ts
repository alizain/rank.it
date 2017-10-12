export interface Item {
	readonly title: string
	played: number
	points: number
}

export interface MatchCreator {
	(items: Item[]): [Item, Item]
}
