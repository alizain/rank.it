import { Item, MatchCreator } from './interfaces'


function randomZeroToInclusive(max: number, scale: number) {
	return Math.floor(Math.random() * max * scale)
}

export function randomMatchupScale(scale: number = 1): MatchCreator {
	return function create(items: Item[]): [Item, Item] {
		items.sort((a, b) => a.played - b.played)
		console.log(items[0].title)
		const firstIndex = randomZeroToInclusive(items.length, scale)
		const first = items[firstIndex]
		items.splice(firstIndex, 1)
		const second = items[randomZeroToInclusive(items.length, scale)]
		return [first, second]
	}
}
