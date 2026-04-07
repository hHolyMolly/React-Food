export function lockBody() {
  const paddingValue = window.innerWidth - document.querySelector("#root").offsetWidth + "px";
  document.body.style.paddingRight = paddingValue;
  document.body.style.overflow = "hidden";
}

export function unlockBody() {
  document.body.style.paddingRight = "0px";
  document.body.style.overflow = "auto";
}
