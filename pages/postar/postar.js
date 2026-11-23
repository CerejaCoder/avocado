import {configTheme, loadImgProfile, exit, configureSidebarLeft, configureNavigate, loadProfile, loadButtonsProfiles, getUser, sendMessage} from "../../utils/utils.js";
import {listUsers} from "../../controllers/user.js";
import {post} from "../../controllers/post.js";

async function loadPage(){
    configTheme();
    loadImgProfile();
    exit();
    configureSidebarLeft();
    configureNavigate();

    const users = await listUsers();

    loadProfile(getUser(users.users));
    loadButtonsProfiles();
}

const form = document.querySelector("#formPost");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const description = document.querySelector("#description").value;
    const image = document.querySelector("#imgPost").value;

    const token = localStorage.getItem("token");
    
    if (token) {
        const res = await post(token, description, image);
        
        if (res.status) {
            sendMessage("Sucesso", "Post Criado com Sucesso");
        } else {
            sendMessage("Erro", res.message);
        }
        
    } else {
        sendMessage("Erro", "É necessário estar logado para postar");
    }
})


loadPage();