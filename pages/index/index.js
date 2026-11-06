import {configTheme, configureLikes, configureSidebarLeft, configureCommentIcon, configureComment} from "../../utils/utils.js";

configTheme();
configureLikes();
configureSidebarLeft();
configureCommentIcon();
configureComment();

const buttunToLeft = document.querySelector(".arrowToLeft");
const buttunToRight = document.querySelector(".arrowToRight");
const listPerfis = document.querySelector("#listPerfis");

buttunToLeft.addEventListener("click", () => {
    listPerfis.scrollBy({
        left: -100,
        behavior: 'smooth'
    });
});

buttunToRight.addEventListener("click", () => {
    listPerfis.scrollBy({
        left: 100,
        behavior: 'smooth'
    });
});
