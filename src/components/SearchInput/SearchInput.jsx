import { Component, createRef } from "react";
import styles from "./styles.module.css";
import { MyContext } from "../../store/store";

export class SearchInput extends Component {
  static contextType = MyContext;
  timer = null;
  searchInputRef = createRef();

  setSearchVal = () => {
    const value = this.searchInputRef.current.value;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.context.setSearchValue(value);
    }, 500);
  };

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={styles.searchInput}
      >
        <input
          ref={this.searchInputRef}
          onChange={this.setSearchVal}
          type="search"
          placeholder="Найти..."
        />
      </form>
    );
  }
}
