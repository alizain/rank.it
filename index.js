"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomMatchup(items) {
    return [randomFromArray(items), randomFromArray(items)];
}
var Ranking = /** @class */ (function () {
    function Ranking(ratingSystem, matchCreator) {
        if (matchCreator === void 0) { matchCreator = randomMatchup; }
        this.ratingSystem = ratingSystem;
        this.matchCreator = matchCreator;
        this.items = [];
    }
    Ranking.prototype.newItem = function (title) {
        return __assign({ played: 0, points: 0 }, this.ratingSystem.newItemDefaults(), { title: title });
    };
    Ranking.prototype.addItem = function (title) {
        this.items.push(this.newItem(title));
    };
    Ranking.prototype.getItem = function (title) {
        return this.items.find(function (i) { return i.title === title; });
    };
    Ranking.prototype.createMatchup = function () {
        var selected = this.matchCreator(this.items);
        return [selected[0].title, selected[1].title];
    };
    Ranking.prototype.declareResult = function (winnerTitle, loserTitle) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var winner = this.getItem(winnerTitle);
        var loser = this.getItem(loserTitle);
        (_a = this.ratingSystem).declareResult.apply(_a, [winner, loser].concat(args));
        winner.played += 1;
        loser.played += 1;
        var _a;
    };
    return Ranking;
}());
exports.Ranking = Ranking;
var RatingSystem = /** @class */ (function () {
    function RatingSystem() {
    }
    RatingSystem.prototype.newItemDefaults = function () {
        throw new Error();
    };
    RatingSystem.prototype.declareResult = function (winner, loser) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        throw new Error();
    };
    return RatingSystem;
}());
var Elo = /** @class */ (function (_super) {
    __extends(Elo, _super);
    function Elo(initialPoints, kFactor) {
        if (initialPoints === void 0) { initialPoints = 400; }
        if (kFactor === void 0) { kFactor = 32; }
        var _this = _super.call(this) || this;
        _this.initialPoints = initialPoints;
        _this.kFactor = kFactor;
        return _this;
    }
    Elo.prototype.newItemDefaults = function () {
        return {
            points: this.initialPoints,
        };
    };
    Elo.prototype.calculateQ = function (points) {
        return Math.pow(10, points / 400);
    };
    Elo.prototype.updatePoints = function (points, expected, score) {
        return points + this.kFactor * (score - expected);
    };
    Elo.prototype.declareResult = function (winner, loser, winnerScore, loserScore) {
        if (winnerScore === void 0) { winnerScore = 1; }
        if (loserScore === void 0) { loserScore = 0; }
        var winnerQ = this.calculateQ(winner.points);
        var loserQ = this.calculateQ(loser.points);
        var denominator = winnerQ + loserQ;
        var winnerExpected = winnerQ / denominator;
        var loserExpected = loserQ / denominator;
        winner.points = this.updatePoints(winner.points, winnerExpected, winnerScore);
        loser.points = this.updatePoints(loser.points, loserExpected, loserScore);
    };
    return Elo;
}(RatingSystem));
exports.Elo = Elo;
