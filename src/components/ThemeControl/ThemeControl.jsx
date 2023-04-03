import { Component } from "react";
import styles from "./styles.module.css";
import { MyContext } from "../../store/store";
import { SvgSelector } from "../SvgSelector";

export class ThemeControl extends Component {
  static contextType = MyContext;

  render() {
    const { toggleTheme, theme } = this.context;

    return (
      <button onClick={toggleTheme} className={styles.ThemeControl}>
        <SvgSelector name={theme === "light" ? "moon" : "sun"} />
      </button>
    );
  }
}
