import { Component } from "react";
import styles from "./styles.module.css";
import { SvgSelector } from "../../SvgSelector";
import { MyContext } from "../../../store/store";
import { Modal } from "../../Modal";
import { Form } from "../../Form";

export class TodoItem extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isModal: false,
    };
  }

  editToggleHandler = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  deleteTodoHandle = () => {
    this.setState({
      isModal: true,
    });
  };

  render() {
    let { checkboxToggleTodo, deleteTodo, archivedToggleTodo, filterBy } =
      this.context;

    const { id, title, desc, checked } = this.props.formData;
    const { isEdit, isModal } = this.state;

    const modal = isModal ? (
      <Modal
        onConfirm={() => deleteTodo(id)}
        onClose={() => {
          this.setState({ isModal: false });
        }}
      >
        Вы уверены что хотите удалить?
      </Modal>
    ) : null;

    if (isEdit) {
      return (
        <li className={styles.root}>
          <Form
            mode="editing"
            formData={{ id, title, desc }}
            editToggleHandler={this.editToggleHandler}
          />
        </li>
      );
    }

    return (
      <li className={styles.TodoItem}>
        {filterBy !== "archived" && (
          <button
            className={styles.TodoItem__customCheckbox}
            onClick={() => checkboxToggleTodo(id)}
          >
            <SvgSelector name={checked ? "checked" : "unchecked"} />
          </button>
        )}

        <div className={styles.TodoItem__content}>
          <div className={styles.TodoItem__header}>
            <h3>{title}</h3>
            <div className={styles.TodoItem__btns}>
              {filterBy !== "archived" && (
                <button
                  onClick={this.editToggleHandler}
                  className={styles.TodoItem__edit}
                >
                  <SvgSelector name="edit" />
                </button>
              )}

              <button
                onClick={() => archivedToggleTodo(id)}
                className={styles.TodoItem__zip}
              >
                <SvgSelector name={filterBy === "archived" ? "unzip" : "zip"} />
              </button>
              <button
                onClick={() => this.deleteTodoHandle(id)}
                className={styles.TodoItem__delete}
              >
                <SvgSelector name="delete" />
              </button>
            </div>
          </div>
          <p>{desc}</p>
        </div>
        {modal}
      </li>
    );
  }
}
