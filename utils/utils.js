import {listUsers} from "../controllers/user.js";
import {comment, deleteCommentary, editCommentary} from "../controllers/comment.js";
import {interact} from "../controllers/like.js";

export function sendMessage(header, message){
    const title = document.querySelector("#titleNotify");
    const body = document.querySelector("#bodyNotify");

    title.innerText = header;
    body.innerText = message;

    notify.showModal();
}

export function configTheme(){
    const themeButton = document.querySelector("#theme");
    const theme = localStorage.getItem("theme");

    if (theme === "black") themeButton.checked = true;

    themeButton.addEventListener("click", () => {
        const theme = localStorage.getItem("theme");
        
        if (theme === "black") localStorage.setItem("theme", "default");
        else localStorage.setItem("theme", "black");
    });
}

export function configureLikes(){
    const likesIcons = document.querySelectorAll('.likesIcons');

    for (const likeIcon of likesIcons){
        likeIcon.addEventListener('click', async () => {
            const token = localStorage.getItem("token");
            const idPost = Number(likeIcon.parentElement.value);

            if (token){
                const res = await interact(idPost, token);

                if (res.status){
                    let val = Number(likeIcon.nextElementSibling.innerText);

                    if (likeIcon.classList.contains('iconLikeSelected')){
                        likeIcon.classList.remove('iconLikeSelected');
                        likeIcon.nextElementSibling.innerText = --val;
                    } else {
                        likeIcon.classList.add('iconLikeSelected');
                        likeIcon.nextElementSibling.innerText = ++val;
                    } 
                } else sendMessage("Erro", res.message);
            } else sendMessage("Erro", "É necessário estar logado para interagir com um post!");
        });
    }
}

export function configureSidebarLeft(){
    const sidebarLeftButton = document.querySelector('#sidebarLeftButton');
    const sidebarLeft = document.querySelector('#sidebarLeft');

    sidebarLeft.addEventListener('mouseenter', () => sidebarLeftButton.click());
    sidebarLeft.addEventListener('mouseleave', () => sidebarLeftButton.click());
}

export function configureCommentIcon(){
    const commentIcons = document.querySelectorAll('.commentIcons');
    const idCommentForm = document.querySelector('#idCommentForm');

    for (const commentIcon of commentIcons){
        commentIcon.addEventListener('click', () => {
            commentModal.showModal();
            idCommentForm.value = commentIcon.parentElement.value;
        });
    }
}

export function configureComment(){
    const formComment = document.querySelector("#formComment");

    formComment.addEventListener("submit", async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) sendMessage("Erro", "Para comentar é necessário estar logado!");
        else {
            const message = document.querySelector("#comment").value;
            const idPost = Number(document.querySelector("#idCommentForm").value);
            const res = await comment(idPost, token, message);

            commentModal.close();

            if (res.status){
                formComment.reset();

                sendMessage("Sucesso!", "Comentário registrado com sucesso!");

                const card = document.querySelector(`.card-${idPost}`);
                const counterCommentaris = card.children[1].children[1].children[1].children[1];
                counterCommentaris.innerText = Number(counterCommentaris.innerText) + 1;

                const footerCommentaries = card.children[3];

                const userList = await listUsers();
                const login = localStorage.getItem("login");
                const username = localStorage.getItem("username");
                let user = userList.users.filter((value) => value.login === login && value.nome === username)[0];

                const comment = {texto: message, id: res.commentary.id, usuario: user.id};
                const post = {id: idPost};

                footerCommentaries.append(showComment(comment, user, user, post));

            } else sendMessage("Erro", res.message);
        }
    });
}

export function configureEditComment(){
    const formEditComment = document.querySelector("#formEditComment");

    formEditComment.addEventListener("submit", async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) sendMessage("Erro", "Para editar um comentário é necessário estar logado!");
        else {
            const message = document.querySelector("#commentEdited").value;
            const idComment = Number(document.querySelector("#idEditCommentForm").value);
            const res = await editCommentary(idComment, token, message);

            editCommentModal.close();

            if (res.status){
                formEditComment.reset();

                sendMessage("Sucesso!", "Comentário editado com sucesso!");

                const comment = document.querySelector(`.comment-${idComment}`).lastChild;
                comment.innerText = message;
            } else sendMessage("Erro", res.message);
        }
    });
}

export async function exit(){
    const exitButtons = document.querySelectorAll(".exit");

    for (const exit of exitButtons){
        exit.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "../login/login.html";
        });
    }
}

export async function loadPerfis(){
    const users = await listUsers();
    const articlePerfis = document.querySelector("#listPerfis");

    for (const user of users.users){
        const button = document.createElement("button");
        const div = document.createElement("div");
        const img = document.createElement("img");

        button.classList.add("avatar", "cursor-pointer");
        button.value = user.id;

        div.classList.add("w-20", "rounded-full");

        if (user.img && !Number(user.img) && user.img != 'null') img.src = user.img;
        else img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLOxRW9wIvJfJHNtxsSBRGG7drOdLd5NwKKAbnii5FA&s=10";

        img.alt = `Imagem de Perfil do(a) usuário(a) ${user.nome}`;

        div.append(img);
        button.append(div);
        articlePerfis.append(button);
    }  
}

export function loadImgProfile(){
    const imageProfile = document.querySelector("#imageProfile");
    const img = localStorage.getItem("image");

    if (img && !Number(img)) imageProfile.src = img;
}

export async function showPost(user, post, commentaries, likes, userViewer, userList){
    const card = document.createElement("div");
    card.classList.add("card", "shadow-md", "p-5", "max-w-9/10", "gap-3", "w-md", `card-${post.id}`);
    
    const headerCard = document.createElement("div");
    headerCard.classList.add("headerCard", "flex", "justify-between", "flex-wrap", "gap-3");

    const leftHeader = document.createElement("div");
    leftHeader.classList.add("flex", "flex-wrap", "items-center", "gap-3");

    const profileButton = document.createElement("button");
    profileButton.value = user.id;
    profileButton.classList.add("cursor-pointer");

    const profileImage = document.createElement("img");
    profileImage.classList.add("mask", "mask-circle", "w-10");
    if (user.img) profileImage.src = user.img;
    else profileImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLOxRW9wIvJfJHNtxsSBRGG7drOdLd5NwKKAbnii5FA&s=10";
    profileImage.alt = "Foto de perfil";

    const profileName = document.createElement("h4");
    profileName.classList.add("text-lg");
    profileName.innerText = user.nome;

    profileButton.append(profileImage);
    leftHeader.append(profileButton, profileName);
    headerCard.append(leftHeader);

    if (post.usuario === userViewer){
        const postOptions = document.createElement("button");
        postOptions.classList.add("cursor-pointer");
        postOptions.setAttribute("popovertarget", `popover-${post.id}`);
        postOptions.style.setProperty("anchor-name", `--anchor-${post.id}`);

        const svgPostOptions = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgPostOptions.classList.add("size-[1.6em]");
        svgPostOptions.setAttribute("viewBox", "0 0 24 24");
        svgPostOptions.setAttribute("fill", "currentColor");

        svgPostOptions.innerHTML = `
            <circle cx="12" cy="4.5" r="2.1"/>
            <circle cx="12" cy="12" r="2.1"/>
            <circle cx="12" cy="19.5" r="2.1"/>
        `;

        postOptions.append(svgPostOptions);
        headerCard.append(postOptions);

        const postOptionsList = document.createElement("ul");
        postOptionsList.classList.add("dropdown", "dropdown-end", "menu", "w-52", "rounded-box", "bg-base-100", "shadow-sm");
        postOptionsList.setAttribute('popover', '');
        postOptionsList.id = `popover-${post.id}`;
        postOptionsList.style.setProperty('position-anchor', `--anchor-${post.id}`);

        const liEdit = document.createElement('li');
        const editButton = document.createElement('button');
        editButton.value = post.id;
        editButton.innerText = 'Editar';
        liEdit.append(editButton);

        const liDelete = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.value = post.id;
        deleteButton.innerText = 'Deletar';
        liDelete.append(deleteButton);

        postOptionsList.append(liEdit, liDelete);
        headerCard.append(postOptionsList);
    }
        
    card.append(headerCard);

    const body = document.createElement("div");
    body.classList.add("body", "flex", "flex-col", "w-full", "gap-3");

    if (post.img && !Number(post.img)){
        const imagePost = document.createElement("img");
        imagePost.classList.add("max-h-150", "w-full");
        imagePost.src = post.img;
        imagePost.alt = "Imagem do Post";
        body.append(imagePost);
    } 

    const interactionButtons = document.createElement("div");
    interactionButtons.classList.add("actions", "flex", "gap-5");

    const likeButton = document.createElement("button");
    likeButton.classList.add("cursor-pointer", "flex", "gap-1", "items-center");
    likeButton.value = post.id;

    const svgLike = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgLike.classList.add("size-[1.8em]", "likesIcons");
    svgLike.setAttribute('viewBox', '0 0 24 24');
    svgLike.setAttribute('stroke-linejoin', 'round');
    svgLike.setAttribute('stroke-linecap', 'round');
    svgLike.setAttribute('stroke-width', '2');
    svgLike.setAttribute('fill', 'none');
    svgLike.setAttribute('stroke', 'currentColor');

    if (likes.some((value) => value.usuario === userViewer.id)) svgLike.classList.add("iconLikeSelected");

    const pathLike = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathLike.setAttribute("d", "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z");

    const likesCount = document.createElement("p");
    likesCount.innerText = likes.length;

    svgLike.append(pathLike);
    likeButton.append(svgLike, likesCount);

    const commentButton = document.createElement("div");
    commentButton.classList.add("cursor-pointer", "flex", "gap-1", "items-center");
    commentButton.value = post.id;

    const svgComment = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svgComment.classList.add("size-[1.8em]", "commentIcons");
    svgComment.setAttribute('viewBox', '0 0 24 24');
    svgComment.setAttribute('stroke-linejoin', 'round');
    svgComment.setAttribute('stroke-linecap', 'round');
    svgComment.setAttribute('stroke-width', '2');
    svgComment.setAttribute('fill', 'none');
    svgComment.setAttribute('stroke', 'currentColor');

    const pathComment = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathComment.setAttribute("d", "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z");

    const commentariesCount = document.createElement("p");
    commentariesCount.innerText = commentaries.length;

    svgComment.append(pathComment);
    commentButton.append(svgComment);
    commentButton.append(commentariesCount);

    interactionButtons.append(likeButton, commentButton);

    const infos = document.createElement("div");
    infos.classList.add("infos");

    const date = document.createElement("p");
    const timePass = Date.parse(post.data);
    const dateFormated = new Date(timePass);
    date.innerText = `Data da postagem: ${dateFormated.toLocaleDateString('pt-BR')}`;

    const text = document.createElement("p");
    text.innerText = post.texto;

    infos.append(text, date);

    body.append(infos);
    body.append(interactionButtons);

    const divider = document.createElement("div");
    divider.classList.add("divider");

    const footerCard = document.createElement("div");
    footerCard.classList.add("footerCard", "flex", "flex-col", "gap-5");

    const titleComments = document.createElement("h6");
    titleComments.classList.add("text-lg");
    titleComments.innerText = "Comentários";

    footerCard.append(titleComments);

    if (!commentaries.length){
        const infosComments = document.createElement("p");
        infosComments.innerText = "Não há nenhum comentário nesse post";
        footerCard.append(infosComments);
    } else {
        const commentariesPart = document.createElement("div");
        commentariesPart.classList.add("comments", "flex", "flex-col", "w-full", "gap-10");

        for (const comment of commentaries){  
            const userComment = userList.filter((value) => value.id === comment.usuario)[0];
            footerCard.append(showComment(comment, userComment, userViewer, post));
        }

        footerCard.append(commentariesPart);
    }

    card.append(body, divider, footerCard);

    return card;
}

export function showComment(comment, user, userViewer, post){
    const divComment = document.createElement("div");
    const headerComment = document.createElement("div");
    const headerLeft = document.createElement("div");
    const profile = document.createElement("button");
    const imgProfileComment = document.createElement("img");
    const userProfile = document.createElement("h4");
    const pComment = document.createElement("p");

    divComment.classList.add(`comment-${comment.id}`, "flex", "flex-col", "gap-3");
    headerComment.classList.add("flex", "flex-wrap", "items-center", "gap-3", "justify-between");
    headerLeft.classList.add("flex", "gap-3", "items-center");

    profile.classList.add("cursor-pointer");
    profile.value = user.id;

    imgProfileComment.classList.add("mask", "mask-circle", "w-10");
    if (user.img) imgProfileComment.src = user.img;
    else imgProfileComment.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLOxRW9wIvJfJHNtxsSBRGG7drOdLd5NwKKAbnii5FA&s=10";
    imgProfileComment.alt = "Imagem de Perfil";

    userProfile.innerText = user.nome;
    userProfile.classList.add("text-lg");

    headerLeft.append(profile, userProfile);

    pComment.classList.add("break-all");
    pComment.innerText = comment.texto;

    profile.append(imgProfileComment);
    headerComment.append(headerLeft);
    divComment.append(headerComment, pComment);

    if (comment.usuario === userViewer.id){
        const buttonOptions = document.createElement("button");
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const listOptions = document.createElement("ul");
        const liEdit = document.createElement('li');
        const editButton = document.createElement('button');
        const liDelete = document.createElement('li');
        const deleteButton = document.createElement('button');

        buttonOptions.classList.add("cursor-pointer");
        buttonOptions.setAttribute("popovertarget", `popover-Comment${comment.id}`);
        buttonOptions.style.setProperty("anchor-name", `--anchor-Comment${comment.id}`);

        icon.classList.add("size-[1.6em]");
        icon.setAttribute("viewBox", "0 0 24 24");
        icon.setAttribute("fill", "currentColor");

        icon.innerHTML = `
            <circle cx="12" cy="4.5" r="2.1"/>
            <circle cx="12" cy="12" r="2.1"/>
            <circle cx="12" cy="19.5" r="2.1"/>
        `;

        buttonOptions.append(icon);
        headerComment.append(buttonOptions);

        listOptions.classList.add("dropdown", "dropdown-end", "menu", "w-52", "rounded-box", "bg-base-100", "shadow-sm");
        listOptions.setAttribute('popover', '');
        listOptions.id = `popover-Comment${comment.id}`;
        listOptions.style.setProperty('position-anchor', `--anchor-Comment${comment.id}`);
        
        editButton.addEventListener("click", async (e) => {
            editCommentModal.showModal();

            const textComment = e.target.parentElement.parentElement.parentElement.nextElementSibling.innerText;
            const textInput = document.querySelector("#commentEdited");
            const idInput = document.querySelector("#idEditCommentForm");

            idInput.value = comment.id;
            textInput.value = textComment;
        });

        editButton.value = comment.id;
        editButton.innerText = 'Editar';
        liEdit.append(editButton);

        deleteButton.addEventListener("click", async (e) => deleteComment(e.target.value, post.id));
        deleteButton.value = comment.id;
        deleteButton.innerText = 'Deletar';

        liDelete.append(deleteButton);
        
        listOptions.append(liDelete, liEdit);
        headerComment.append(buttonOptions, listOptions);
    }

    return divComment;
}

async function deleteComment(idComment, idPost){
    const token = localStorage.getItem("token");

    const res = await deleteCommentary(idComment, token);

    if (!res.status) sendMessage("Erro", res.message);
    else {
        const card = document.querySelector(`.card-${idPost}`);
        const counterCommentaris = card.children[1].children[1].children[1].children[1];
        counterCommentaris.innerText = Number(counterCommentaris.innerText) - 1;

        const commentary = document.querySelector(`.comment-${idComment}`);
        commentary.remove();
        sendMessage("Sucesso!", res.message);
    }
}

