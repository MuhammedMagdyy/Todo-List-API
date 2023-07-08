import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) {
      res.status(404).json({ success: false });
      return;
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content, completed } = req.body;
    if (!title) {
      res.status(400).json({ success: false });
      return;
    }
    const todo = await prisma.todo.create({
      data: {
        title,
        content,
        completed,
      },
    });
    if (!todo) {
      res.status(404).json({ success: false });
      return;
    }
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { title, content, completed } = req.body;
    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        completed,
      },
    });
    if (!todo) {
      res.status(404).json({ success: false });
      return;
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const todo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    if (!todo) {
      res.status(404).json({ success: false });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
