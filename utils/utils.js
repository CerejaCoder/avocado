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
