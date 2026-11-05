import url from "../configs.js";

export async function getLikes(idPost){
    try {
        const res = await fetch(url + `posts/${idPost}/likes`);

        const response = await res.json();

        if (!res.ok)
            throw new Error(response.msg);

        return { status: true, likes: response };

    } catch (err){
        return { status: false, message: err.message };
    }
}

export async function interact(idPost, token){
    const obj = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const res = await fetch(url + `posts/${idPost}/likes`, obj);

        const response = await res.json();

        if (!res.ok)
            throw new Error(response.msg);

        return { status: true, message: response.msg };

    } catch (err){
        return { status: false, message: err.message };
    }
}