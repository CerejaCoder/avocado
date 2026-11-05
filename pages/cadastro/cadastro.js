import {sendMessage, configTheme} from "../../utils/utils.js";
import {singUp} from "../../controllers/user.js";

configTheme();
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const userImage = document.querySelector("#userImage").value;

    const res = await singUp(email, password, username, userImage);

    if (res.status) sendMessage("Cadastro realizado com sucesso!", "Seu cadastro foi registrado com sucesso.");
    else sendMessage("Ocorreu um erro", res.status.message);
});