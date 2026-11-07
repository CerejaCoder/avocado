import url from "../configs.js";

export async function listComments(id) {
   try {
      const res = await fetch(url + `posts/${id}/comentarios`);

      const response = await res.json();

      if(!res.ok)
         throw new Error(response.msg);

      return { status: true, commentary: response };

   } catch(err) {
      return { status: false, message: err.message };
   }
}

export async function comment(id, token, commentary) {
   const obj = {
      method: "POST",
      headers: {
         "content-type": "application/json",
         "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ texto: commentary })
   };

   try {
      const res = await fetch(url + `posts/${id}/comentarios`, obj)

      const response = await res.json();

      if(!res.ok)
         throw new Error(response.msg);

      return { status: true, commentary: response };

   } catch(err){
      return { status: false, message: err.message};
   }
}


export async function editCommentary(id, token, editedCommentary) {
   const obj = {
      method: "PUT",
      headers: {
         "content-type": "application/json",
         "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ texto: editedCommentary })
   };

   try{
      const res = await fetch(url + `comentarios/${id}`, obj);

      const response = await res.json();

      if(!res.ok)
         throw new Error(response.msg);

      return { status: true, newCommentary: response};

   } catch(err) {
      return { status: false, message: err.message };
   }
}


export async function deleteCommentary (id, token){
   const obj = {
      method: "DELETE",
      headers: {
         "content-type": "application/json",
         "Authorization": `Bearer ${token}`
      }
   };

   try{
      const res = await fetch(url + `comentarios/${id}`, obj);

      const response = await res.json();

      if(!res.ok)
         throw new Error(response.msg);

      return { status: true, message: response};

   } catch(err){
      return { status: true, message: err.msg}
   }
}