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
exports.deleteTag = exports.updateTag = exports.createNewTag = exports.findTagByTitle = exports.findTagById = exports.findAllTags = void 0;
const connection_1 = __importDefault(require("./connection"));
const findAllTags = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query(`
    SELECT
      t.id,
      t.title,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', g.id,
            'title', g.title,
            'description', g.description,
            'linkName', g.link_name,
            'linkUrl', g.link_url,
            'images', (
              SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id', gi.id,
                  'title', gi.title,
                  'description', gi.description,
                  'url', gi.url
                )
              )
              FROM game_images AS gi
              WHERE gi.game_id = g.id
            )
          )
        )
        FROM games AS g
        INNER JOIN games_tags AS gt ON g.id = gt.game_id
        WHERE gt.tag_id = t.id
      ) AS games
    FROM tags AS t;
    `);
    return rows;
});
exports.findAllTags = findAllTags;
const findTagByTitle = (titleToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield connection_1.default.query(`
      SELECT
      t.id,
      t.title,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', g.id,
            'title', g.title,
            'description', g.description,
            'linkName', g.link_name,
            'linkUrl', g.link_url,
            'images', (
              SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id', gi.id,
                  'title', gi.title,
                  'description', gi.description,
                  'url', gi.url
                )
              )
              FROM game_images AS gi
              WHERE gi.game_id = g.id
            )
          )
        )
        FROM games AS g
        INNER JOIN games_tags AS gt ON g.id = gt.game_id
        WHERE gt.tag_id = t.id
      ) AS games
      FROM tags AS t
      WHERE t.title = ?;
      `, [titleToSearch]);
        if (!rows[0] || rows.length === 0)
            return null;
        return rows[0];
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.findTagByTitle = findTagByTitle;
const findTagById = (idToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield connection_1.default.query(`
      SELECT
      t.id,
      t.title,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', g.id,
            'title', g.title,
            'description', g.description,
            'linkName', g.link_name,
            'linkUrl', g.link_url,
            'images', (
              SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id', gi.id,
                  'title', gi.title,
                  'description', gi.description,
                  'url', gi.url
                )
              )
              FROM game_images AS gi
              WHERE gi.game_id = g.id
            )
          )
        )
        FROM games AS g
        INNER JOIN games_tags AS gt ON g.id = gt.game_id
        WHERE gt.tag_id = t.id
      ) AS games
      FROM tags AS t
      WHERE t.id = ?;
      `, [idToSearch]);
        if (!rows[0] || rows.length === 0)
            return null;
        return rows[0];
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.findTagById = findTagById;
const createNewTag = (tag) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = tag;
        const [result] = yield connection_1.default.query(`
      INSERT INTO tags (title)
      VALUES (?);
      `, [title]);
        if (!result)
            return null;
        return Object.assign({ id: result.insertId }, tag);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createNewTag = createNewTag;
const updateTag = (idToSearch, tag) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = tag;
        const [result] = yield connection_1.default.query(`
      UPDATE tags
      SET title = ?
      WHERE id = ?;
      `, [title, idToSearch]);
        if (!result)
            return null;
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateTag = updateTag;
const deleteTag = (idToDelete) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_1.default.query('DELETE FROM tags WHERE id = ?;', [idToDelete]);
        if (!result)
            return null;
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deleteTag = deleteTag;
