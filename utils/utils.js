import { createElement, Profiler } from "react";

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
        likeIcon.addEventListener('click', () => {
            let val = Number(likeIcon.nextElementSibling.innerText);

            if (likeIcon.classList.contains('iconLikeSelected')){
                likeIcon.classList.remove('iconLikeSelected');
                likeIcon.nextElementSibling.innerText = --val;
            } else {
                likeIcon.classList.add('iconLikeSelected');
                likeIcon.nextElementSibling.innerText = ++val;
            } 
            
            //Pegar o elemento pai (botão com value) e chamar a função para atualizar - likeIcon.parentElement.value;
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
    const modalComment = document.querySelector('#modalComment');

    for (const commentIcon of commentIcons){
        commentIcon.addEventListener('click', () => {
            modalComment.click();
            idCommentForm.value = commentIcon.parentElement.value;
        });
    }
}

export function configureComment(){
    const formComment = document.querySelector("#formComment");

    formComment.addEventListener("submit", (e) => {
        e.preventDefault();

        formComment.reset();
        commentModal.close();

        sendMessage("Sucesso!", "Comentário registrado com sucesso!");
    });
}


export function showPost(user, post, commentaries, likes){
    const card = document.createElement("div");
    card.classList.add("card", "shadow-md", "p-5", "max-w-9/10", "gap-3 w-md");
    
    const headerCard = document.createElement("div");
    headerCard.classList.add("headerCard", "flex", "justify-between", "flex-wrap gap-3");

    const leftHeader = document.createElement("div");
    leftHeader.classList.add("flex", "flex-wrap", "items-center", "gap-3");

    const profileButton = document.createElement("button");
    profileButton.value = user.id;
    profileButton.classList.add("cursor-pointer");

    const profileImage = document.createElement("img");
    profileImage.classList.add("mask", "mask-circle", "w-10");
    profileImage.src = user.img;
    profileImage.alt = "Foto de perfil";

    const profileName = document.createElement("h4");
    profileName.classList.add("text-lg");
    profileName.textContent = user.nome;

    profileButton.append(profileImage);
    leftHeader.append(profileButton);
    leftHeader.append(profileName);
    headerCard.append(leftHeader);
    card.append(headerCard);

    const postOptions = document.createElement("button");
    postOptions.classList.add("cursor-pointer");
    postOptions.setAttribute("popovertarget", "popover-1");
    postOptions.style.setProperty("anchor-name", "--anchor-1")

    const svgPostOptions = document.createElement("svg");
    svgPostOptions.classList.add("size-[1.6em]");
    svgPostOptions.setAttribute("xmlns", "http://www.w3.org/2000/svg");
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
    postOptionsList.classList("dropdown", "dropdown-end", "menu", "w-52", "rounded-box", "bg-base-100", "shadow-sm");
    postOptionsList.setAttribute('popover', '');
    postOptionsList.id = 'popover-1';
    postOptionsList.style.setProperty('position-anchor', '--anchor-1');

    const liEdit = document.createElement('li');
    const editButton = document.createElement('button');
    editButton.value = post.id;
    editButton.textContent = 'Editar';
    liEdit.append(editButton);

    const liDelete = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.value = post.id;
    deleteButton.textContent = 'Deletar';
    liDelete.append(deleteButton);

    postOptionsList.append(liEdit, liDelete)

    headerCard.append(postOptionsList)

    const rightHeader = document.createElement("div");
    rightHeader.classList("body", "flex", "flex-col", "w-full", "gap-3");

    const imagePost = document.createElement("img");
    imagePost.classList("max-h-150", "w-full");
    imagePost.src = post.img;
    imagePost.alt = "Imagem do Post";

    leftHeader.append(imagePost);

    const interactionButtons = document.createElement("div");
    interactionButtons.classList("actions", "flex", "gap-5")

    const likeButton = document.createElement("button");
    likeButton.classList("cursor-pointer", "flex", "gap-1", "items-center");
    likeButton.value = post.id;

    const svgLike = document.createElement("svg");
    svgLike.classList("size-[1.6em]", "likesIcons");
    svgLike.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgLike.setAttribute('viewBox', '0 0 24 24');
    svgLike.setAttribute('stroke-linejoin', 'round');
    svgLike.setAttribute('stroke-linecap', 'round');
    svgLike.setAttribute('stroke-width', '2');
    svgLike.setAttribute('fill', 'none');
    svgLike.setAttribute('stroke', 'currentColor');

    const pathLike = document.createElement("path");
    pathLike.setAttribute("d", "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z");


    const likesCount = document.createElement("p");
    likesCount.innerText = likes.length;

    svgLike.append(pathLike);
    likeButton.append(svgLike, likesCount);

    const commentButton = document.createElement("div");
    commentButton.classList("cursor-pointer", "flex", "gap-1", "items-center");
    commentButton.value = post.id;

    const svgComment = document.createElement("svg");
    svgComment.classList("size-[1.8em]", "commentIcons");
    svgComment.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgComment.setAttribute('viewBox', '0 0 24 24');
    svgComment.setAttribute('stroke-linejoin', 'round');
    svgComment.setAttribute('stroke-linecap', 'round');
    svgComment.setAttribute('stroke-width', '2');
    svgComment.setAttribute('fill', 'none');
    svgComment.setAttribute('stroke', 'currentColor');

    const pathComment = document.createElement("path");
    pathComment.setAttribute("d", "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z");

    svgComment.append(pathComment);

    const commentariesCount = document.createElement("p");
    commentariesCount.innerText = commentaries.length;

    commentButton.append(svgComment);
    commentButton.append(commentariesCount)

    const shareButton = document.createElement("div");
    shareButton.classList("cursor-pointer");

    const svgShare = document.createElement("svg");
    svgShare
}