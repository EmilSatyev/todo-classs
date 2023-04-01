import { Component } from "react";
import styles from "./styles.module.css";
import { MyContext } from "../../store/store";
import { filterTodos } from "../TodoList";

export class Filter extends Component {
  static contextType = MyContext;

  render() {
    const { filterHandler, filterBy, todos } = this.context;
    return (
      <div className={styles.Filter}>
        <button
          className={`${styles.Filter__btn} ${
            filterBy === "all" ? styles.Filter__active : ""
          }`}
          name="all"
          onClick={filterHandler}
        >
          Все <span>{filterTodos(todos).length}</span>
        </button>
        <button
          className={`${styles.Filter__btn} ${
            filterBy === "checked" ? styles.Filter__active : ""
          }`}
          name="checked"
          onClick={filterHandler}
        >
          Выполненные <span>{filterTodos(todos, "checked").length}</span>
        </button>
        <button
          className={`${styles.Filter__btn} ${
            filterBy === "archived" ? styles.Filter__active : ""
          }`}
          name="archived"
          onClick={filterHandler}
        >
          В архиве <span>{filterTodos(todos, "archived").length}</span>
        </button>
      </div>
    );
  }
}
