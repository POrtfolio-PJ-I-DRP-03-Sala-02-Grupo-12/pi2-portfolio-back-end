import { Request, Response } from "express";
import ITag, { ITagUpdateResult } from "../interfaces/ITag"
import { tagsService } from "../services/index.services"
import { ResultSetHeader } from "mysql2/promise";

const findAllTags = async (_req: Request, res: Response) => {
  try {
    const tagsList: ITag[] | string = await tagsService.findAllTags();

    if (typeof tagsList === 'string') {
      return res.status(404).json({ message: tagsList });
    }

    return res.status(200).json(tagsList);
  } catch (error) {
    return res.status(500)
    .json({
      message: `Erro ao buscar categorias: ${(error as Error).message}`
    });
  }
};

const findTagById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const tag: ITag | string = await tagsService.findTagById(Number(id));
    
    if (typeof tag === 'string') {
      return  res.status(404).json({ message: tag });
    }

    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500)
    .json({
      message: `Ocorreu um erro na busca: ${(error as Error).message}`
    });
  }
};

const findTagByTitle = async (req: Request, res: Response) => {
  const { title } = req.query;
  
  try {
    const tag: ITag | string = await tagsService.findTagByTitle(String(title));
    
    if (typeof tag === 'string') {
      return  res.status(404).json({ message: tag });
    }

    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500)
    .json({
      message: `Ocorreu um erro na busca: ${(error as Error).message}`
    });
  }
};

const createNewTag = async (req: Request, res: Response) => {
  const tag: ITag = req.body;

  try {
    const newTag: ITag | string = await tagsService.createNewTag(tag);

    if (typeof newTag === 'string') {
      return res.status(400).json({ message: newTag });
    }

    return res.status(201).json(newTag);
  } catch (error) {
    return res.status(500)
    .json({
      message: `Ocorreu um erro no registro de nova categoria: ${(error as Error).message}`
    });
  }
};

const updateTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tagToUpdate: ITag = req.body;

    const updatedTag: ITagUpdateResult | string = await tagsService
    .updateTag(Number(id), tagToUpdate);

    if (typeof updatedTag === 'string') {
      return res.status(400).json({ message: updatedTag });
    }

    return res.status(202).json(updatedTag);
  } catch (error) {
    return res.status(500)
    .json({
      message: `Ocorreu um erro na alteração de dados da categoria. ${(error as Error).message}`
    });
  }
};

const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTag: ResultSetHeader | string = await tagsService.deleteTag(Number(id));

    if (typeof deletedTag === 'string') {
      return res.status(400).json({ message: deletedTag });
    }

    return res.status(202).json({
      result: deletedTag,
      message: `Categoria, com o id ${id}, deletada com sucesso.`
    });
  } catch (error) {
    return res.status(500)
    .json({
      message: `Ocorreu um erro na exclusão da categoria. ${(error as Error).message}`
    });
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