export default interface IGameImage {
  id?: number;
  title?: string;
  description?: string;
  url: string;
  gameId?: number;
  game?: {
    id: number;
    title?: string;
    tags?: string[];
  };
};