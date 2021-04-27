/* eslint-disable max-classes-per-file */
export type TRepeat = 'everyday' | 'weekdays' | 'weekends' | false;

export interface ITodoItem {
  title: string;
  description: string;
  done: boolean;
  repeat: TRepeat;
  createTime: number;
  editTime: number;
}

export class TodoItem implements ITodoItem {
  title: string;

  description: string;

  done: boolean;

  repeat: TRepeat;

  createTime: number;

  editTime: number;

  constructor({ title, description }: Partial<ITodoItem>) {
    this.title = title ?? 'Empty title';
    this.description = description ?? '';
    this.done = false;
    this.repeat = false;
    this.createTime = Date.now();
    this.editTime = Date.now();
  }
}

export interface ITodoList {
  title: string;
  description: string;
  items: TodoItem[];
}

export class TodoList implements ITodoList {
  title: string;

  description: string;

  items: TodoItem[];

  constructor({ title, description }: Partial<ITodoList>) {
    this.title = title ?? 'Empty title';
    this.description = description ?? '';
    this.items = [];
  }
}

export interface ITab {
  id: string;
  title: string;
  description?: string;
}
