export function sendMessage(header, message){
    const title = document.querySelector("#titleNotify");
    const body = document.querySelector("#bodyNotify");

    title.innerText = header;
    body.innerText = message;

    notify.showModal();
}

export function configTheme(){
    const theme = localStorage.getItem("theme");

    if (theme === "black"){
        const main = document.querySelector("main");
        const checkTheme = document.createElement("input");

        checkTheme.type = "checkbox";
        checkTheme.value = "black";
        checkTheme.classList.add("toggle", "theme-controller", "hidden");
        main.append(checkTheme);
        checkTheme.checked = true;
    }
}