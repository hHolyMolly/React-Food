import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedModal } from "../../redux/slices/modals";
import { unlockBody } from "../../utils/bodyLock";

function ModalLayout({ title = "Заголовок", children, className }) {
  const dispatch = useDispatch();
  const { isOpened } = useSelector(({ modals }) => modals);

  const wrapperRef = React.useRef();

  const closeModal = () => {
    dispatch(setOpenedModal(false));

    setTimeout(() => {
      unlockBody();
    }, 300);
  };

  React.useEffect(() => {
    if (!isOpened) return;

    const onOutsideClick = (e) => {
      if (wrapperRef.current.contains(e.target)) closeModal();
    };

    const closeOnKey = (e) => {
      if (e.code === "Escape") closeModal();
    };

    document.body.addEventListener("click", onOutsideClick);
    document.body.addEventListener("keydown", closeOnKey);

    return () => {
      document.body.removeEventListener("click", onOutsideClick);
      document.body.removeEventListener("keydown", closeOnKey);
    };
  }, [isOpened]);

  return (
    <div className={classNames("modal", className && `${className}`)} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal__body">
        <div className="modal__top modal-top">
          <h2 className="modal-top__title">{title}</h2>
          <button className="modal-top__close _close" onClick={closeModal} type="button" aria-label="Закрыть"></button>
        </div>
        <div className="modal__content modal-content">{children}</div>
      </div>
      <div className="modal__wrapper" ref={wrapperRef} />
    </div>
  );
}

export default React.memo(ModalLayout);
