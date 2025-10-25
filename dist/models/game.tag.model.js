"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGameTag = exports.createNewGameTag = exports.findAllGamesTags = void 0;
const connection_1 = __importDefault(require("./connection"));
const findAllGamesTags = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query(`
    SELECT
      gt.game_id AS game_id, gt.tag_titlte AS tag_title
    FROM games_tags AS gt;
    `);
    return rows;
});
exports.findAllGamesTags = findAllGamesTags;
const createNewGameTag = (gameTag) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameId, tagId } = gameTag;
        const [result] = yield connection_1.default.query(`
      INSERT INTO games_tags (game_id, tag_id)
      VALUES (?, ?);
      `, [gameId, tagId]);
        if (!result)
            return null;
        return Object.assign({}, gameTag);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createNewGameTag = createNewGameTag;
const deleteGameTag = (gameTagToDelete) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameId, tagId } = gameTagToDelete;
        const [result] = yield connection_1.default.query(`
      DELETE FROM games_tags
      WHERE game_id = ?, tag_id = ?;
      `, [gameId, tagId]);
        if (!result)
            return null;
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deleteGameTag = deleteGameTag;
