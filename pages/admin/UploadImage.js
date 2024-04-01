/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import {  useState } from "react";
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import Lottie from "lottie-react";
import loading from '../../public/animation/loading.json'
const UploadImage = ({ setImage }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const handleUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("upload_preset", "m1xthruf");

        axios.post(
            "https://api.cloudinary.com/v1_1/doijstvrm/image/upload",
            formData
        )
            .then((response) => {
                setImage(response.data.secure_url);
                setCloudinaryImage(response.data.secure_url);
                setIsLoading(true)
                setTimeout(() => {
                    setIsLoading(false)
                }, 3000)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteImage = () => {
        setCloudinaryImage(null)
    }
    return (
        <div className='flex flex-col h-96'>

            {
                isLoading ? (
                    <h1 className=' min-h-[50vh] flex justify-center items-center'>
                        <div className='w-40 h-40'>
                            <Lottie animationData={loading} />
                        </div>
                    </h1>) : cloudinaryImage ? (
                        <> <div className=' relative h-full'>
                            <img src={cloudinaryImage} alt="uploadedImage" className='w-full h-full object-cover' />
                            <button type='button' onClick={deleteImage} className=' absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all'>
                                <MdDelete className='text-white' />
                            </button>
                        </div></>
                    ) : (
                    <label className='w-full  h-full flex flex-col items-center justify-center cursor-pointer'>
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                            <MdCloudUpload className=' text-gray-500 text-3xl hover:text-gray-700' />
                            <p className='text-gray-500  hover:text-gray-700'>Click here to upload</p>
                        </div>
                        <input type="file" name='uploadimage' accept='image/*' onChange={handleUpload} className='w-0 h-0' />
                    </label>
                )
            }
            
        </div>
    )
}

export default UploadImage
