import { Component } from "react";
import styles from "./styles.module.css";
import { Logo } from "../Logo";
import { AddBtn } from "../AddBtn";
import { AddingForm } from "../AddingForm";
import TodoList from "../TodoList/TodoList";
import { Filter } from "../Filter";
import { MyContext } from "../../store/store";
import { NothingToShow } from "../NothingToShow";
import { SearchInput } from "../SearchInput";

export class App extends Component {
  static contextType = MyContext;

  render() {
    let { todos } = this.context;

    return (
      <div className={styles.App}>
        <div className={styles.App__wrap}>
          <header className={styles.App__header}>
            <Logo />
            <AddBtn />
          </header>
          <div className={styles.App__hr} />
          <AddingForm />
          {todos?.length > 0 ? (
            <>
              <div className={styles.App__filterSearch}>
                <Filter />
                <SearchInput />
              </div>
              <TodoList />
            </>
          ) : (
            <NothingToShow text="пока ничего нет..." mode="adding" />
          )}
        </div>
      </div>
    );
  }
}
