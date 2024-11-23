import axios from "axios"

//  insatnce .
const url= import.meta.env.VITE_BASE_URL_POSTS


const api=axios.create({
    baseURL:url
})

export const getpost=(endpoint)=>{
    return api.get(endpoint)
}

// delete data

export const deletePost=(id)=>{
    return api.delete(`/posts/${id}`)
}

// add the post in json
export const postData=(post)=>{
return api.post("/posts",post)
}

// update the post 

export const upDatePost=(id,post)=>{
    return api.put(`/posts/${id}`,post)
}