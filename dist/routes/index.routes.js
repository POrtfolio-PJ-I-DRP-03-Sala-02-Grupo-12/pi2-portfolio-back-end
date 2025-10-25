"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesTagsRouter = exports.tagsRouter = exports.gameImagesRouter = exports.gamesRouter = void 0;
const games_routes_1 = __importDefault(require("./games.routes"));
exports.gamesRouter = games_routes_1.default;
const game_images_routes_1 = __importDefault(require("./game.images.routes"));
exports.gameImagesRouter = game_images_routes_1.default;
const tags_routes_1 = __importDefault(require("./tags.routes"));
exports.tagsRouter = tags_routes_1.default;
const games_tags_routes_1 = __importDefault(require("./games.tags.routes"));
exports.gamesTagsRouter = games_tags_routes_1.default;
