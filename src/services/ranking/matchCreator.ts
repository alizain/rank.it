import { Item, MatchCreator } from './interfaces'


function randomZeroToInclusive(max: number, scale: number) {
	return Math.floor(Math.random() * max * scale)
}

export function pureRandom(): MatchCreator {
	return function create(items: Item[]): [Item, Item] {
		items.sort((a, b) => a.played - b.played)
		const firstIndex = randomZeroToInclusive(items.length, 1)
		const first = items[firstIndex]
		items.splice(firstIndex, 1)
		const second = items[randomZeroToInclusive(items.length, 1)]
		return [first, second]
	}
}

export function balancer(scale: number = 1): MatchCreator {
	return function create(items: Item[]): [Item, Item] {
		items.sort((a, b) => a.played - b.played)
		const firstIndex = randomZeroToInclusive(items.length, scale)
		const first = items[firstIndex]
		items.splice(firstIndex, 1)
		const second = items[randomZeroToInclusive(items.length, scale)]
		return [first, second]
	}
}

export function randomRandom(bias: number = 0.4): MatchCreator {
	return function create(items: Item[]): [Item, Item] {
		const scale = (randomZeroToInclusive(1, 1) + bias) / 2
		items.sort((a, b) => a.played - b.played)
		const firstIndex = randomZeroToInclusive(items.length, scale)
		const first = items[firstIndex]
		items.splice(firstIndex, 1)
		const second = items[randomZeroToInclusive(items.length, scale)]
		return [first, second]
	}
}
