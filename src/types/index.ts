export type Todo = {
  id: number;
  name: string;
  status: "completed" | "pending";
};

export type TodoList = Todo[];

export type Option = {
  label: string;
  value: string;
};
