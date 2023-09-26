import React from "react";
import styles from "@/styles/components/modal.module.scss";


const Modal = ({ show, handleClose, children }) => {
  return (
    <>
      {show && (
        <div className={styles.modal}>
          <header className={styles.header}>
            <button className={styles.button} onClick={handleClose}>&#x2715;</button>
          </header>
          <div className={styles.content}>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { handleClose});
              }
              return child;
            })}
          </div>
        </div>
      )}
   </>
  );
};

export default Modal;
