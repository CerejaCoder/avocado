const sidebarLeftButton = document.querySelector('#sidebarLeftButton');
const sidebarLeft = document.querySelector('#sidebarLeft');
const buttonsSidebarLower = document.querySelectorAll('.buttonSidebarLower');

const likesIcons = document.querySelectorAll('.likesIcons');
const commentIcons = document.querySelectorAll('.commentIcons');

const idCommentForm = document.querySelector('#idCommentForm');
const modalComment = document.querySelector('#modalComment');
const modalClose = document.querySelector('#modalClose');

const formComment = document.querySelector('#formComment');

sidebarLeft.addEventListener('mouseenter', () => sidebarLeftButton.click());
sidebarLeft.addEventListener('mouseleave', () => sidebarLeftButton.click());
formComment.addEventListener('submit', (e) => {
    e.preventDefault();
    modalClose.click();
});

for (const button of buttonsSidebarLower){
    button.addEventListener('click', () => {
        for (const btn of buttonsSidebarLower){
            btn.classList.remove('dock-active');
        };

        button.classList.add('dock-active');
    });
}

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

for (const commentIcon of commentIcons){
    commentIcon.addEventListener('click', () => {
        modalComment.click();
        idCommentForm.value = commentIcon.parentElement.value;
    });
}
