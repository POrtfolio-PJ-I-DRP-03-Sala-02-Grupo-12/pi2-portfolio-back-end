import { ResultSetHeader } from "mysql2/promise";

export default interface IGameImage {
  id?: number;
  title?: string;
  description?: string;
  url: string;
  gameId: number;
  game?: {
    id: number;
    title?: string;
    tags?: string[];
  };
};

export interface IGameImageUpdateResult {
  updateResult: ResultSetHeader;
  updatedGameImage: IGameImage;
};