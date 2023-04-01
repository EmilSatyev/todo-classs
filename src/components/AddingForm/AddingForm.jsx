import { Component } from "react";
import styles from "./styles.module.css";
import { MyContext } from "../../store/store";
import {Form} from "../Form";

export class AddingForm extends Component {
  static contextType = MyContext;

  render() {
    const { isShowAddingForm } = this.context;
    return (
      <div className={`${styles.AddingForm} ${isShowAddingForm ? styles.AddingForm__show : ""}`}>
        <Form/>
        <div className={styles.AddingForm__hr} />
      </div>
    );
  }
}
