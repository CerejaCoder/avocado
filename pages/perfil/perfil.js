import * as utils from "../../utils/utils.js";
import {listPosts} from "../../controllers/post.js";
import {listUsers} from "../../controllers/user.js";

async function loadPage(){
    utils.configTheme();
    utils.loadImgProfile();
    utils.exit();
    utils.configureSidebarLeft();
    utils.configureNavigate();

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const users = await listUsers();
    const userPage = utils.getUser(users.users, id);
    const userView = utils.getUser(users.users);

    utils.loadProfile(userView);
    utils.loadButtonsProfiles();

    if (userPage){
        const pUsername = document.querySelector("#username");
        const imageProfile = document.querySelector("#imgProfile");

        pUsername.innerText = userPage.nome;

        if (userPage.img) imageProfile.src = userPage.img;
        
        loadPosts(userPage, userView, users.users);
    }
}

async function loadPosts(userPage, userView, users){
    const posts = document.querySelector("#posts");

    const load = document.createElement("span");
    load.classList.add("loading", "loading-spinner", "loading-md");

    posts.append(load);

    const resPosts = await listPosts();
    
    load.remove();

    const userPosts = resPosts.posts.filter((post) => post.usuario === userPage.id);

    if (!userPosts.length){
        const p = document.createElement("p");
        p.innerText = "Esse perfil não tem nenhum post disponível";

        posts.append(p);
    } else {
        for (const post of userPosts){
            const {comentarios, likes, ...postInfos} = post;

            posts.append(utils.showPost(userPage, postInfos, comentarios, likes, userView, users));
        }
            
        utils.configureLikes();
        utils.configureCommentIcon();
        utils.configureComment(userView);
        utils.configureEditComment();
        utils.loadProfile(userView);
        utils.loadButtonsProfiles();
    }
}

loadPage();