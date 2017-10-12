import { Item, MatchCreator } from './interfaces'
import { RatingSystem } from './ratingSystem'
import { randomMatchup } from './matchCreator'


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
