import { Component } from "react";
import styles from "./styles.module.css";
import { MyContext } from "../../store/store";

export class SearchInput extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      searchVal: "",
    };
  }

  setSearchVal = (e) => {
    this.setState({
      searchVal: e.target.value,
    });

    this.context.setSearchValue(e.target.value);
  };

  render() {
    const { searchVal } = this.state;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={styles.searchInput}
      >
        <input
          onChange={this.setSearchVal}
          value={searchVal}
          type="search"
          placeholder="Найти..."
        />
      </form>
    );
  }
}
