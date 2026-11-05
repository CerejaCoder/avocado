import {check, singIn} from "../../controllers/user.js";
import {sendMessage, configTheme} from "../../utils/utils.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const res = await singIn(email, password);

    if (!res.status) sendMessage("Ocorreu um erro!", res.message);
    else {
        localStorage.setItem("token", res.user.token);
        localStorage.setItem("login", res.user.usuario.login);
        localStorage.setItem("username", res.user.usuario.nome);
        localStorage.setItem("image", res.user.usuario.img);

        window.location.href = "../index/index.html";
    }
});

async function init(){
    const token = localStorage.getItem("token");

    configTheme();

    if (token){
        const res = await check(token);
        if (res.status) window.location.href = "../index/index.html";
    }
}

await init();