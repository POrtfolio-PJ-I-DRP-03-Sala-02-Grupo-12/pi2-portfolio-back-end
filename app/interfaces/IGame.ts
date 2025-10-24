import IGameImage from "./IGameImage";
import ITag from "./ITag";

export default interface IGame {
  id?: number;
  title: string;
  description: string;
  linkName: string;
  linkUrl: string;
  tags?: ITag[];
  images?: IGameImage[];
}