import {configTheme, configureLikes, configureSidebarLeft, configureCommentIcon, configureComment, exit, loadPerfis, showPost, loadImgProfile, configureEditComment} from "../../utils/utils.js";
import {listPosts} from "../../controllers/post.js";
import {listUsers} from "../../controllers/user.js";

configTheme();
loadImgProfile();
exit();
loadPerfis();
configureSidebarLeft();

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

async function loadPosts(){
    const posts = document.querySelector("#posts");

    const load = document.createElement("span");
    load.classList.add("loading", "loading-spinner", "loading-md");

    posts.append(load);

    const resPosts = await listPosts();
    const resUsers = await listUsers();

    const login = localStorage.getItem("login");
    const username = localStorage.getItem("username");
    let userView = resUsers.users.filter((value) => value.login === login && value.nome === username)[0];

    if (userView == null) userView = {id: -1};

    load.remove();

    for (const post of resPosts.posts){
        const {comentarios, likes, ...postInfos} = post;
        const user = resUsers.users.filter((value) => value.id === postInfos.usuario)[0];

        posts.append(await showPost(user, postInfos, comentarios, likes, userView, resUsers.users));
    }
    
    configureLikes();
    configureCommentIcon();
    configureComment();
    configureEditComment();
}

await loadPosts();