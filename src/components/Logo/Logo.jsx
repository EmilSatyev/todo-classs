import { Component } from "react";
import styles from "./styles.module.css";
import { SvgSelector } from "../SvgSelector";

export class Logo extends Component {
  render() {
    return (
      <div className={styles.Logo}>
        <SvgSelector name="logo" />
      </div>
    );
  }
}
