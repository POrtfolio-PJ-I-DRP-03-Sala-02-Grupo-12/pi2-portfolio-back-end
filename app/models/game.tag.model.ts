import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "./connection";
import IGameTag from "../interfaces/IGameTag";

const findAllGamesTags = async ():Promise<IGameTag[]> => {
  const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
    `
    SELECT
      gt.game_id AS game_id, gt.tag_titlte AS tag_title
    FROM games_tags AS gt;
    `,
  );

  return rows as IGameTag[];
};

const createNewGameTag = async (gameTag: IGameTag): Promise<IGameTag | null> => {
  try {
    const { gameId, tagId } = gameTag;

    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `
      INSERT INTO games_tags (game_id, tag_id)
      VALUES (?, ?);
      `,
      [gameId, tagId]
    );

    if (!result) return null;

    return {
      ...gameTag,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const deleteGameTag = async (gameTagToDelete: IGameTag): Promise<ResultSetHeader | null> => {
try {
    const { gameId, tagId } = gameTagToDelete;  

    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `
      DELETE FROM games_tags
      WHERE game_id = ?, tag_id = ?;
      `,
      [gameId, tagId]
    );

    if (!result) return null;

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export {
  findAllGamesTags,
  createNewGameTag,
  deleteGameTag,
};