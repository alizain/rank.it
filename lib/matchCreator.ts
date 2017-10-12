import { Item, MatchCreator } from './interfaces'


function randomFromArray(arr: any[]) {
	return arr[Math.floor(Math.random() * arr.length)]
}

export function randomMatchup(items: Item[]): [Item, Item] {
	return [randomFromArray(items), randomFromArray(items)]
}
