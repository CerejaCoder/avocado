import url from "../configs.js";

export async function listPosts(){
    try{
        const res = await fetch(url + "posts/");

        const response = await res.json();

        if (!res.ok)
            throw new Error(response.msg);

        return { status: true, posts: response };

    } catch (err){
        return { status: false, message: err.message };
    }
}

export async function post(token, text, image){
    const obj = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ texto: text, img: image })
    };

    try {
        const res = await fetch(url + "posts/", obj);

        const response = await res.json();

        if (!res.ok)
            throw new Error(response.msg);

        return { status: true, post: response };

    } catch (err){
        return { status: false, message: err.message };
    }
}

export async function getPost(id){
    try {
        const res = await fetch(url + `posts/${id}`);

        const response = await res.json();

        if (!res.ok)
            throw new Error(response.msg);

        return { status: true, post: response };

    } catch (err){
        return { status: false, message: err.message };
    }
}

export async function editPost(token, idPost, text, image){
    const obj = {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ texto: text, img: image })
    };

    try {
        const res = await fetch(url + `posts/${idPost}`, obj);

        const response = await res.json();

        if (!res.ok)
            throw new Error(response.msg);

        return { status: true, post: response };
    } catch (err){
        return { status: false, message: err.message };
    }
}

export async function deletePost(token, idPost){
    const obj = {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const res = await fetch(url + `posts/${idPost}`, obj);

        const response = await res.json();

        if (!res.ok)
            throw new Error(response.msg);

        return { status: true, message: response.msg };

    } catch (err){
        return { status: false, message: err.message };
    }
}