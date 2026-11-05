import url from "../configs.js";

export async function listUsers() {
    try {
        const res = await fetch(url + "usuarios/");

        if(!res.ok)
            throw new Error("Erro ao se conectar no servidor");

        const users = await res.json();

        return { status: true, users: users };

    } catch(err) {
        return { status: false, message: err.message };
    }
}

export async function singUp(email, password, username, image) {
    const obj = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            login: email,
            senha: password,
            nome: username,
            img: image
        })
    };

    try{
        const res = await fetch(url + "usuarios/", obj);

        const response = await res.json();

        if(!res.ok)
            throw new Error(response.msg);

        return { status: true, user: response };

    } catch(err) {
        return { status: false, message: err.message };
    }
}

export async function singIn(email, password){
    const obj = {
        method: "POST",
        headers: { 
            "content-type": "application/json"
        },
        body: JSON.stringify({
            login: email,
            senha: password
        })
    };

    try{
        const res = await fetch(url + "usuarios/login", obj);

        const response = await res.json();

        if(!res.ok)
            throw new Error(response.msg);

        return{ status: true, user: response};

    } catch(err){
        return{ status: false, message: err.message};
    }
}

export async function check(token){
    const obj = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
   
    try{
        const res = await fetch(url + "usuarios/check", obj);

        const response = await res.json();

        if(!res.ok)
            throw new Error(response.msg);

        return { status: true, message: response.msg };

    } catch(err){
        return { status: false, message: err.message };
    }
}