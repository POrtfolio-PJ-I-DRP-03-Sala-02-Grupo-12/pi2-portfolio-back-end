import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import IGameImage from "../interfaces/IGameImage";
import connection from "./connection";

const findAll = async (): Promise<IGameImage[]> => {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection
    .query(`SELECT id, title, description, url, game_id FROM game_images;`);

    console.log("ROWS: ", rows);

    return rows as IGameImage[];
};

const findById = async (idToSearch: number): Promise<IGameImage | null> => {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      `SELECT
        id,
        title,
        description,
        url,
        game_id AS gameId
      FROM game_images
      WHERE id = ?;
      `,
      [idToSearch]
    );
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
    }

    const imageData = rows[0];

    const gameImage: IGameImage = {
      id: imageData.id,
      title: imageData.title,
      description: imageData.description,
      url: imageData.url,
      gameId: imageData.gameId,
    };

    return gameImage;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const createNewImage = async (image: IGameImage): Promise<IGameImage | null> => {
  try {
    const { title, description, url, gameId } = image;

    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `INSERT INTO game_images (title, description, url, game_id)
        VALUES (?, ?, ?, ?);
      `,
      [title, description, url, gameId]
    );

    if (!result) return null

    return {
      id: result.insertId,
      ...image,
    }
  } catch (error) {
    throw new Error((error as Error).message)
  }
};

const updateImage = async (imageToUpdate: IGameImage, id: number): Promise<ResultSetHeader | null> => {
  try {
    const { title, description, url, gameId } = imageToUpdate;

    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `
        UPDATE game_images
        SET title = ?, description = ?, url = ?, game_id = ?
        WHERE id = ?;
      `,
      [title, description, url, gameId, id]
    );

    if (!result) return null;

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const deleteImage = async (id: number): Promise<ResultSetHeader | null> => {
  try {
    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `
        DELETE FROM game_images
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
    createNewImage,
    updateImage,
    deleteImage,
}
