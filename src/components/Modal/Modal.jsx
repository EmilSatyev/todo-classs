import { Component } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isActive: true,
      });
    }, 200);
  }

  act = (fn) => async (e) => {
    if (e.target.className !== styles.content) {
      this.setState({
        isActive: false,
      });
      await new Promise((r) => setTimeout(r, 200));
      fn();
    }
  };

  render() {
    const { isActive } = this.state;
    const { children, onClose, onConfirm } = this.props;
    return createPortal(
      <div
        onClick={this.act(onClose)}
        className={`${styles.Modal} ${isActive ? styles.Modal__active : ""}`}
      >
        <div className={styles.Modal__content}>
          <p className={styles.Modal__text}>{children}</p>
          <div className={styles.Modal__footer}>
            <button className={styles.Modal__btn} onClick={this.act(onConfirm)}>
              Да
            </button>
            <button className={styles.Modal__btn} onClick={this.act(onClose)}>
              Отмена
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }
}
