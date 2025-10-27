import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import ITag from "../interfaces/ITag";
import connection from "./connection";

const findAllTags = async ():Promise<ITag[]> => {
  const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
    `
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
    `
  );

  return rows as ITag[];
};

const findTagByTitle = async (titleToSearch: string):Promise<ITag | null> => {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      `
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
      `,
      [titleToSearch]
    );

    if (!rows[0] || rows.length === 0) return null;

    return rows[0] as ITag;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const findTagById = async (idToSearch: number): Promise<ITag | null> => {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      `
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
      `,
      [idToSearch]
    );

    if (!rows[0] || rows.length === 0) return null;

    return rows[0] as ITag;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const createNewTag = async (tag: ITag): Promise<ITag | null> => {
  try {
    const { title } = tag;

    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `
      INSERT INTO tags (title)
      VALUES (?);
      `,
      [title]
    );

    if (!result) return null;

    return {
      id: result.insertId,
      ...tag,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const updateTag = async (idToSearch: number, tag: ITag): Promise<ResultSetHeader | null> => {
  try {
    const { title } = tag;

    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `
      UPDATE tags
      SET title = ?
      WHERE id = ?;
      `,
      [title, idToSearch]
    );

    if (!result) return null;

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const deleteTag = async (idToDelete: number): Promise<ResultSetHeader | null> => {
try {
    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      'DELETE FROM tags WHERE id = ?;',
      [idToDelete]
    );

    if (!result) return null;

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export {
  findAllTags,
  findTagById,
  findTagByTitle,
  createNewTag,
  updateTag,
  deleteTag,
};