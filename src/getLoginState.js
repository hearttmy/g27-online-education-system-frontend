export default function () {
  let loginState;
  decodeURI(document.cookie)
    .split(";")
    .forEach(value => {
      if (/loginState=/.test(value)) {
        loginState = JSON.parse(value.split("=")[1]);
      }
    });
    return loginState;
}