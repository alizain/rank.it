import { Item, MatchCreator } from './interfaces'
import { RatingSystem } from './ratingSystem'


export class Ranking {
	public items: Item[]

	constructor(private ratingSystem: RatingSystem, private matchCreator: MatchCreator) {
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
		if (this.getItem(title)) {
			throw new Error('already have this item')
		}
		this.items.push(this.newItem(title))
		this.sortItems()
	}

	getItem(title: string): Item {
		return this.items.find(i => i.title === title)
	}

	sortItems(): void {
		this.items.sort((a:Item, b:Item): number => b.points - a.points)
	}

	resetItems(): void {
		const previousItems = this.items
		this.items = []
		previousItems.forEach(item => this.addItem(item.title))
	}

	createMatchup(): [string, string] {
		if (this.items.length < 2) {
			throw new Error('not enough items to create matchup')
		}
		const selected = this.matchCreator(this.items.slice())
		return [selected[0].title, selected[1].title]
	}

	declareResult(winnerTitle: string, loserTitle: string, ...args): void {
		const winner = this.getItem(winnerTitle)
		const loser = this.getItem(loserTitle)
		this.ratingSystem.declareResult(winner, loser, ...args)
		winner.played += 1
		loser.played += 1
		this.sortItems()
	}
}
