import { Item, MatchCreator } from './interfaces'


export class RatingSystem {
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
