const sidebarLeftButton = document.querySelector('#sidebarLeftButton');
const sidebarLeft = document.querySelector('#sidebarLeft');
const buttonsSidebarLower = document.querySelectorAll('.buttonSidebarLower');

sidebarLeft.addEventListener('mouseenter', () => sidebarLeftButton.click());
sidebarLeft.addEventListener('mouseleave', () => sidebarLeftButton.click());

for (const button of buttonsSidebarLower){
    button.addEventListener('click', () => {
        for (const btn of buttonsSidebarLower){
            btn.classList.remove('dock-active');
        };

        button.classList.add('dock-active');
    });
}