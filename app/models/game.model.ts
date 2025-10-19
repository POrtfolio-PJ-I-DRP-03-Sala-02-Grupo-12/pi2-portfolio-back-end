import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import IGame from "../interfaces/IGame";
import connection from "./connection";

const findAll = async (): Promise<IGame[]> => {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      `
      SELECT
	      g.id,
        g.title,
        g.description,
        g.link_name,
        g.link_url,
	      i.id AS image_id,
        i.title AS image_title,
        i.description AS image_description,
        i.url AS image_url,
	      GROUP_CONCAT(DISTINCT t.title) AS tags
      FROM games AS g
      LEFT JOIN games_tags AS gt ON g.id = gt.game_id
      LEFT JOIN tags AS t ON gt.tag_id = t.id
      LEFT JOIN game_images AS i ON g.id = i.game_id
      GROUP BY
	      g.id,
        g.title,
        g.description,
        g.link_name,
        g.link_url,
        i.id,
        i.title,
        i.description,
        i.url;
      `,
    );

    return rows as IGame[];
};

const findById = async (idToSearch: number): Promise<IGame | null> => {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      `
        SELECT
          g.id, g.title, g.description, g.link_name, g.link_url,
          i.id, i.title, i.description, i.url,
          GROUP_CONCAT(DISTINCT t.title) AS tags
        FROM games AS g
        WHERE g.id = ?
        LEFT JOIN game_images AS i
        ON g.id = i.game_id
        LEFT JOIN games_tags as gt
        ON g.id = gt.game_id
        LEFT JOIN tags AS t
        ON gt.tag_id = t.id;
      `,
      [idToSearch]
    );
  
    if (!rows[0] || rows.length === 0) return null;
  
    return rows[0] as IGame;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const createNewGame = async (game: IGame): Promise<IGame | null> => {
  try {
    const { title, description, linkName, linkUrl } = game;

    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `INSERT INTO games (title, description, link_name, link_url)
        VALUES (?, ?, ?, ?);
      `,
      [title, description, linkName, linkUrl]
    );

    if (!result) return null

    return {
      id: result.insertId,
      ...game,
    }
  } catch (error) {
    throw new Error((error as Error).message)
  }
};

const updateGame = async (gameToUpdate: IGame, id: number): Promise<ResultSetHeader | null> => {
  try {
    const { title, description, linkName, linkUrl } = gameToUpdate;

    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `
        UPDATE games
        SET title = ?, description = ?, link_name = ?, link_url = ?
        WHERE id = ?;
      `,
      [title, description, linkName, linkUrl, id]
    );

    if (!result) return null;

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const deleteGame = async (id: number): Promise<ResultSetHeader | null> => {
  try {
    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
      `
        DELETE FROM games
        WHERE id = ?;
      `,
      [id]
    );

    if (!result) return null;

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export {
    findAll,
    findById,
    createNewGame,
    updateGame,
    deleteGame,
}
