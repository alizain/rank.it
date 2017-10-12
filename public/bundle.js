var something = (function (exports) {
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

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

return exports;

}({}));
//# sourceMappingURL=bundle.js.map
