interface Item {
	readonly title: string
	played: number
	points: number
}

interface MatchCreator {
	(items: Item[]): [Item, Item]
}

function randomFromArray(arr: any[]) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function randomMatchup(items: Item[]): [Item, Item] {
	return [randomFromArray(items), randomFromArray(items)]
}

export class Ranking {
	public items: Item[]

	constructor(private ratingSystem: RatingSystem, private matchCreator: MatchCreator = randomMatchup) {
		this.items = []
	}

	newItem(title: string): Item {
		return {
			played: 0,
			points: 0,
			...this.ratingSystem.newItemDefaults(),
			title,
		} as Item
	}

	addItem(title: string): void {
		this.items.push(this.newItem(title))
	}

	getItem(title: string): Item {
		return this.items.find(i => i.title === title)
	}

	createMatchup(): [string, string] {
		const selected = this.matchCreator(this.items)
		return [selected[0].title, selected[1].title]
	}

	declareResult(winnerTitle: string, loserTitle: string, ...args): void {
		const winner = this.getItem(winnerTitle)
		const loser = this.getItem(loserTitle)
		this.ratingSystem.declareResult(winner, loser, ...args)
		winner.played += 1
		loser.played += 1
	}
}

class RatingSystem {
	newItemDefaults(): object {
		throw new Error()
	}
	declareResult(winner: Item, loser: Item, ...args) {
		throw new Error()
	}
}

export class Elo extends RatingSystem {
	constructor(public initialPoints: number = 400, public kFactor: number = 32) {
		super()
	}

	newItemDefaults(): object {
		return {
			points: this.initialPoints,
		}
	}

	calculateQ(points: number) {
		return Math.pow(10, points / 400)
	}

	updatePoints(points: number, expected: number, score: number): number {
		return points + this.kFactor * (score - expected)
	}

	declareResult(winner: Item, loser: Item, winnerScore: number = 1, loserScore: number = 0): void {
		const winnerQ = this.calculateQ(winner.points)
		const loserQ = this.calculateQ(loser.points)
		const denominator = winnerQ + loserQ
		const winnerExpected = winnerQ / denominator
		const loserExpected = loserQ / denominator
		winner.points = this.updatePoints(winner.points, winnerExpected, winnerScore)
		loser.points = this.updatePoints(loser.points, loserExpected, loserScore)
	}
}
