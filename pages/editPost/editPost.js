import {configTheme, loadImgProfile, exit, configureSidebarLeft, configureNavigate, loadProfile, loadButtonsProfiles, getUser, sendMessage} from "../../utils/utils.js";
import {listUsers} from "../../controllers/user.js";
import { getPost, editPost } from "../../controllers/post.js";

async function loadPage(){
    configTheme();
    loadImgProfile();
    exit();
    configureSidebarLeft();
    configureNavigate();

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    if (id) {
        const res = await getPost(id);

        if (res.status) {
            document.querySelector("#description").value = res.post.texto;
            document.querySelector("#imgPost").value = res.post.img;
        } else {
            sendMessage("Erro", res.message);
        }
    } else {
        sendMessage("Erro", "Post inválido");
    }

    const users = await listUsers();

    loadProfile(getUser(users.users));
    loadButtonsProfiles();
}

const form = document.querySelector("#formEditPost");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const description = document.querySelector("#description").value;
    const image = document.querySelector("#imgPost").value;

    const token = localStorage.getItem("token");
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    if (!id) {
        sendMessage("Erro", "É preciso acessar um post válido");
    } else if (!token) {
        sendMessage("Erro", "É preciso estar logado");
    } else {
        const res = await editPost(token, id, description, image);

        if (res.status) {
            sendMessage("Sucesso", "Post editado");
        } else {
            sendMessage("Erro", res.message);
        }
    }
})


loadPage();