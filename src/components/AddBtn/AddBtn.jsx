import { Component } from "react";
import styles from "./styles.module.css";
import { SvgSelector } from "../SvgSelector";
import {MyContext} from "../../store/store";

export class AddBtn extends Component {
  static contextType = MyContext;

  render() {
    const { toggleAddingForm, isShowAddingForm } = this.context;

    return (
      <button
        onClick={toggleAddingForm}
        className={`${styles.AddBtn} ${isShowAddingForm ? styles.AddBtn__open : ""}`}
      >
        <SvgSelector name="addBtn" />
      </button>
    );
  }
}
