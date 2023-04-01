import { Component } from "react";
import styles from "./styles.module.css";
import { MyContext } from "../../store/store";
import { SvgSelector } from "../SvgSelector";

export class Form extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        id: this.props.formData?.id || null,
        title: this.props.formData?.title || "",
        desc: this.props.formData?.desc || "",
      },
      isError: false,
      isEditing: this.props.mode === "editing",
    };
  }

  changeHandler = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({
      isError: false,
    });

    const { addTodo, toggleAddingForm, editTodo } = this.context;
    const { formData, isEditing } = this.state;
    const { title, desc } = formData;

    if (!title.trim() || !desc.trim()) {
      this.setState({
        isError: true,
        formData: {
          id: this.props.formData?.id || null,
          title: title.trim(),
          desc: desc.trim(),
        },
      });
      return false;
    }
    if (isEditing) {
      editTodo(formData);
      this.props.editToggleHandler();
    } else {
      addTodo(formData);
      toggleAddingForm();
    }
    this.setState({
      formData: {
        title: "",
        desc: "",
      },
    });
  };

  cancelHandler = (e) => {
    e.preventDefault();
    this.props.editToggleHandler();
  };

  render() {
    const { formData, isError, isEditing } = this.state;
    const { title, desc } = formData;

    return (
      <form
        onSubmit={this.submitHandler}
        className={`${styles.Form} ${isEditing ? styles.Form__editMode : ""}`}
      >
        <input
          placeholder="Введите заголовок"
          type="text"
          name="title"
          value={title}
          onChange={this.changeHandler}
          className={isError && !title.trim() ? styles.Form__error : ""}
        />
        <textarea
          placeholder="Введите описание"
          name="desc"
          value={desc}
          onChange={this.changeHandler}
          className={isError && !desc.trim() ? styles.Form__error : ""}
        />
        {isEditing ? (
          <div className={styles.Form__btns}>
            <button
              onClick={this.submitHandler}
              className={styles.Form__confirm}
            >
              <SvgSelector name="check" />
            </button>
            <button
              onClick={this.cancelHandler}
              className={styles.Form__cancel}
            >
              <SvgSelector name="cross" />
            </button>
          </div>
        ) : (
          <button className={styles.Form__btn}>Добавить</button>
        )}
      </form>
    );
  }
}
