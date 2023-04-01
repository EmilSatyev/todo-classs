import React, { Component } from "react";

const MyContext = React.createContext(null);

class StoreContext extends Component {
  state = {
    isShowAddingForm: false,
    isCheckedFilter: false,
    filterBy: "all",
    todos: JSON.parse(localStorage.getItem("todos") || '[]'),
    searchValue: null,
  };

  addTodo = async ({ title, desc }) => {
    const id = Date.now();
    await this.setState({
      todos: [
        { id, title, desc, checked: false, archived: false },
        ...this.state.todos,
      ],
    });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
  editTodo = ({ id, title, desc }) => {
    this.setState({
      todos: this.state.todos.map((td) => {
        if (td.id === id) {
          td.title = title;
          td.desc = desc;
        }
        return td;
      }),
    });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
  deleteTodo = (id) => {
    const todosFromStorage = JSON.parse(localStorage.getItem("todos"));
    const filteredTodos = todosFromStorage.filter((td) => td.id !== id);

    if (filteredTodos.length === 0) {
      localStorage.removeItem("todos");
      this.setState({
        filterBy: "all",
        todos: [],
      });
      return false;
    }

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
    this.setState({
      todos: filteredTodos,
    });
  };
  checkboxToggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map((td) => {
        if (td.id === id) {
          td.checked = !td.checked;
        }
        return td;
      }),
    });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
  archivedToggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map((td) => {
        if (td.id === id) {
          td.archived = !td.archived;
        }
        return td;
      }),
    });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };

  toggleAddingForm = () => {
    this.setState({
      filterBy: "all",
      isShowAddingForm: !this.state.isShowAddingForm,
    });
  };

  filterHandler = (e) => {
    this.setState({
      isCheckedFilter: e.target.name === "checked",
      filterBy: e.target.name,
    });
  };

  setSearchValue = (value) => {
    this.setState({
      searchValue: value,
    });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          todos: this.state.todos,
          addTodo: this.addTodo,
          editTodo: this.editTodo,
          deleteTodo: this.deleteTodo,
          checkboxToggleTodo: this.checkboxToggleTodo,
          archivedToggleTodo: this.archivedToggleTodo,

          isShowAddingForm: this.state.isShowAddingForm,
          toggleAddingForm: this.toggleAddingForm,

          isCheckedFilter: this.state.isCheckedFilter,
          filterHandler: this.filterHandler,

          searchValue: this.state.searchValue,
          setSearchValue: this.setSearchValue,

          filterBy: this.state.filterBy,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export { StoreContext, MyContext };
