import * as utils from "../../utils/utils.js";
import {listPosts} from "../../controllers/post.js";
import {listUsers} from "../../controllers/user.js";

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

async function loadPosts(users){
    const posts = document.querySelector("#posts");
    const load = document.createElement("span");

    load.classList.add("loading", "loading-spinner", "loading-md");
    posts.append(load);

    const resPosts = await listPosts();
    let userView = utils.getUser(users);

    if (userView == null) userView = {id: -1};

    load.remove();

    for (const post of resPosts.posts){
        const {comentarios, likes, ...postInfos} = post;
        const user = utils.getUser(users, postInfos.usuario);

        posts.append(utils.showPost(user, postInfos, comentarios, likes, userView, users));
    }
    
    utils.configureLikes();
    utils.configureCommentIcon();
    utils.configureComment(userView);
    utils.configureEditComment();
    utils.loadProfile(userView);
    utils.loadButtonsProfiles();
}

async function loadPage(){
    utils.configTheme();
    utils.loadImgProfile();
    utils.exit();
    utils.configureSidebarLeft();
    utils.configureNavigate();

    const users = await listUsers();
    
    utils.loadPerfis(users.users);
    loadPosts(users.users);
}

loadPage();