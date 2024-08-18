import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

function Button({ children, className, onClick, type = "button", tag = "button", href = "/", orange = false, white = false }) {
  return (
    <>
      {tag === "button" && (
        <button className={classNames("button", className && `${className}`, orange && "button_orange", white && "button_white")} onClick={onClick} type={type}>
          {children}
        </button>
      )}

      {tag === "Link" && (
        <Link className={classNames("button", className && `${className}`, orange && "button_orange", white && "button_white")} to={href}>
          {children}
        </Link>
      )}

      {tag === "a" && (
        <a className={classNames("button", className && `${className}`, orange && "button_orange", white && "button_white")} href={href}>
          {children}
        </a>
      )}
    </>
  );
}

export default React.memo(Button);
