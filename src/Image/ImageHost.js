import axios from "axios"

export const ImageHost = async(ImageData)=>{
    const formData = new FormData()
    formData.append('image',ImageData)

    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,formData)

    return data?.data?.display_url
}