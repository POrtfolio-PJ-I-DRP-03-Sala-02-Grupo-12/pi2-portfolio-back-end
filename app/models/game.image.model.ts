import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import IGameImage from "../interfaces/IGameImage";
import connection from "./connection";

const findAllImages = async (): Promise<IGameImage[]> => {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection
    .query(
      `SELECT
        i.id,
        i.title,
        i.description,
        i.url,
        JSON_OBJECT(
          'id', g.id,
          'title', g.title,
          'tags', JSON_ARRAYAGG(DISTINCT t.title)
        ) AS game,
      FROM game_images AS i
      LEFT JOIN games AS g ON i.game_id = g.id
      LEFT JOIN game_tags AS gt ON g.id = gt.game_id
      LEFT JOIN tags AS t ON gt.tag_id = t.id
      GROUP BY i.id;
      `
    );

    return rows as IGameImage[];
};

const findImageById = async (idToSearch: number): Promise<IGameImage | null> => {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      `SELECT
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
      `,
      [idToSearch]
    );
    
    if (!rows) {
      return null;
    }    

    return rows[0] as IGameImage;
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
    findAllImages,
    findImageById,
    createNewImage,
    updateImage,
    deleteImage,
}
