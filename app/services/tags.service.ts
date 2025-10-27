import { ResultSetHeader } from "mysql2/promise";
import ITag, { ITagUpdateResult } from "../interfaces/ITag";
import { tagModel } from "../models/index.model";

const findAllTags = async ():Promise<ITag[] | string> => {
  try{ 
    const tagsList: ITag[] | null = await tagModel.findAllTags();

    if (!tagsList) return 'Não encontramos categorias cadastradas.';

    return tagsList;
  } catch (error) {
    return `Erro ao buscar categorias: ${(error as Error).message}`;
  }
};

const findTagById = async (idToSearch: number): Promise<ITag | string> => {
  try {
    const tag: ITag | null = await tagModel.findTagById(idToSearch);

    if (!tag || tag === null) {
      return `Não conseguimos encontrar a categoria pelo id ${idToSearch}`;
    }

    return tag;
  } catch (error) {
    return `Ocorreu um erro na busca: ${(error as Error).message}`;
  }
};

const findTagByTitle = async (titleToSearch: string): Promise<ITag | string> => {
  try {
    const tag: ITag | null = await tagModel.findTagByTitle(titleToSearch);
    
    if (!tag || tag === null) {
      return `Não conseguimos encontrar a categoria pelo título ${titleToSearch}`;
    }
    
    return tag;
  } catch (error) {
    return `Ocorreu um erro na busca: ${(error as Error).message}`;
  }
};

const createNewTag = async (tag: ITag): Promise<ITag | string> => {
  try {
    const newTag: ITag | null = await tagModel.createNewTag(tag);

    if (!newTag || !newTag.id || newTag === null) {
      return 'Não foi possível cadastrar a categoria com o título ${tag.title}';
    }

    return newTag;
  } catch (error) {
    return `Ocorreu um erro no registro de nova categoria: ${(error as Error).message}`;
  }
};

const updateTag = async (idToSearch: number, tagToUpdate: ITag):      Promise<ITagUpdateResult | string> => {
  try {
    const tagFoundToUpdate: ITag | null = await tagModel.findTagById(idToSearch);

    if (!tagFoundToUpdate) {
      return `Categoria, com o id ${idToSearch}, não encontrada para atualização.`;
    }
    
    const mergedTagData: ITag = {
      ...tagFoundToUpdate,
      ...tagToUpdate,
    };
    delete mergedTagData.id;

    const updateResult: ResultSetHeader | null = await tagModel
    .updateTag(idToSearch, mergedTagData);

    if (!updateResult) return `Não foi possível alterar os dados da categoria com o id ${idToSearch}`;

    const updatedTag: ITag | null = await tagModel
      .findTagById(idToSearch);

    if (!updatedTag) {
      return `Categoria, com o id ${idToSearch}, não encontrada.`;
    }
    
    return { updateResult, updatedTag } as ITagUpdateResult;
  } catch (error) {
    return `Ocorreu um erro na alteração de dados da categoria. ${(error as Error).message}`;
  }
};

const deleteTag = async (id: number): Promise<ResultSetHeader | string> => {
  try {
    const excludedTag: ResultSetHeader | null = await tagModel.deleteTag(id);

    if (!excludedTag) {
      return `Não foi possível excluir dados da categoria com o id ${id}`;
    }

    return excludedTag;
  } catch (error) {
    return `Ocorreu um erro na exclusão da categoria. ${(error as Error).message}`;
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