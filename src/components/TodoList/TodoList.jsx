import styles from "./styles.module.css";
import { TodoItem } from "./TodoItem";
import { Component } from "react";
import { MyContext } from "../../store/store";
import { NothingToShow } from "../NothingToShow";

export const filterTodos = (todos, filterBy, searchValue = "") => {
  if (filterBy === "archived") {
    todos = todos.filter(({ archived }) => archived);
  } else if (filterBy === "checked") {
    todos = todos.filter(({ checked, archived }) => checked && !archived);
  } else {
    todos = todos.filter(({ archived }) => !archived);
  }

  if (searchValue) {
    todos = todos.filter(({ title }) =>
      title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  return todos;
};

export class TodoList extends Component {
  static contextType = MyContext;

  render() {
    let { todos, searchValue, filterBy } = this.context;

    let filteredTodos = filterTodos(todos, filterBy, searchValue);

    if (searchValue && filteredTodos?.length === 0) {
      return <NothingToShow text="ничего не найдено..." mode="searching" />;
    }
    if (filteredTodos?.length === 0 && filterBy === "archived") {
      return <NothingToShow text="в архиве пусто..." />;
    }
    if (filteredTodos?.length === 0 && filterBy === "checked") {
      return <NothingToShow text="нет выполненных дел..." />;
    }

    if (filteredTodos?.length === 0) {
      return <NothingToShow text="есть только в архиве..." />;
    }

    return (
      <ul className={styles.TodoList}>
        {filteredTodos.map((td) => (
          <TodoItem key={td.id} formData={td} />
        ))}
      </ul>
    );
  }
}