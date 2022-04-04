import "../sass/style.scss";
import "lazysizes";
import "./modernizr-custom";

let images = document.querySelectorAll("img");

images.forEach((img) => {
  console.log(img);
  console.log(img.width, img.height);
});
