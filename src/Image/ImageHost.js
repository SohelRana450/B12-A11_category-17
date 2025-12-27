import axios from "axios"


export const ImageHost = async(imageData)=>{
    const formData = new FormData()
    formData.append('image',imageData)

    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,formData)
    return data?.data?.display_url
}

export const saveOrUpdateData = async(userData)=>{
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData
    )

    
    return data
}