import { Component } from "react";
import styles from "./styles.module.css";
import { AddBtn } from "../AddBtn";
import { MyContext } from "../../store/store";

export class NothingToShow extends Component {
  static contextType = MyContext;

  render() {
    const { text, mode } = this.props;
    const { isShowAddingForm, filterBy } = this.context;

    let emoji = "🤨";
    if (isShowAddingForm) {
      emoji = "🙄";
    } else if (mode === "searching") {
      emoji = "🧐";
    } else if (filterBy === 'archived') {
      emoji = "📖"
    }

    return (
      <div className={styles.NothingToShow}>
        <span>{emoji}</span>
        <h1>{text}</h1>
        {!isShowAddingForm && mode === "adding" && (
          <p>
            нажмите
            <AddBtn />
            чтобы добавить
          </p>
        )}
      </div>
    );
  }
}
