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
exports.deleteImage = exports.updateImage = exports.createNewImage = exports.findImageById = exports.findAllImages = void 0;
const connection_1 = __importDefault(require("./connection"));
const findAllImages = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default
        .query(`SELECT
        i.id,
        i.title,
        i.description,
        i.url,
        JSON_OBJECT(
          'id', g.id,
          'title', g.title,
          'tags', JSON_ARRAYAGG(t.title)
        ) AS game
      FROM game_images AS i
      LEFT JOIN games AS g ON i.game_id = g.id
      LEFT JOIN games_tags AS gt ON g.id = gt.game_id
      LEFT JOIN tags AS t ON gt.tag_id = t.id
      GROUP BY
        i.id,
        i.title,
        i.description,
        i.url,
        g.id,
        g.title;
      `);
    return rows;
});
exports.findAllImages = findAllImages;
const findImageById = (idToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield connection_1.default.query(`SELECT
        i.id,
        i.title,
        i.description,
        i.url,
        JSON_OBJECT(
          'id', g.id,
          'title', g.title,
          'tags', JSON_ARRAYAGG(DISTINCT t.title)
        ) AS game,
        GROUP_CONCAT(DISTINCT t.title) AS tags,
      FROM game_images AS i
      LEFT JOIN games AS g ON i.game_id = g.id
      LEFT JOIN game_tags AS gt ON g.id = gt.game_id
      LEFT JOIN tags AS t ON gt.tag_id = t.id
      GROUP BY i.id
      WHERE id = ?;
      `, [idToSearch]);
        if (!rows) {
            return null;
        }
        return rows[0];
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.findImageById = findImageById;
const createNewImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, url, gameId } = image;
        const [result] = yield connection_1.default.query(`INSERT INTO game_images (title, description, url, game_id)
        VALUES (?, ?, ?, ?);
      `, [title, description, url, gameId]);
        if (!result)
            return null;
        return Object.assign({ id: result.insertId }, image);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createNewImage = createNewImage;
const updateImage = (imageToUpdate, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, url, gameId } = imageToUpdate;
        const [result] = yield connection_1.default.query(`
        UPDATE game_images
        SET title = ?, description = ?, url = ?, game_id = ?
        WHERE id = ?;
      `, [title, description, url, gameId, id]);
        if (!result)
            return null;
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateImage = updateImage;
const deleteImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_1.default.query(`
        DELETE FROM game_images
        WHERE id = ?;
      `, [id]);
        if (!result)
            return null;
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deleteImage = deleteImage;
