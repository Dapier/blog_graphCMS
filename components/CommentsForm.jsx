import React, {useState,useEffect, useRef} from 'react'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {submitComment} from "../services"


toast.configure();
const CommentsForm = ({slug}) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccesMsg, setShowSuccesMsg] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name')
        emailEl.current.value = window.localStorage.getItem('email')
    }, [])

    //comment
    const handleCommentSubmission = () =>{
        setError(false);

        const {value: comment} = commentEl.current;
        const {value: name} = nameEl.current;
        const {value: email} = emailEl.current;
        const {checked: storeData} = storeDataEl.current;

        if(!comment || !name || !email){
            setError(true);
            return;
        }

        const commentObj = {name, email, comment,slug}

        if(storeData){
            window.localStorage.setItem('name',name)
            window.localStorage.setItem('email',email)
        }else{
            window.localStorage.removeItem('name',name)
            window.localStorage.removeItem('email',email)
        }

        submitComment(commentObj).then((res) =>{
            setShowSuccesMsg(true);


            setTimeout(() => {
                setShowSuccesMsg(false)
            }, 3000);
        })
        
    }

    return (
        <div className="bg-white shadow-lg
         rouded-lg p-8 pb-12 mb-8 dark:bg-gray-900
         ">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Comments</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea 
                    ref={commentEl} 
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 ease-in duration-300 border-b-2 dark:border-b-0" 
                    placeholder="Write something"
                    name="comment"

                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input 
                    type="text" ref={nameEl}
                    className="py-2 px-2 outline-none w-full rounded-lg focus:ring-2 ease-in duration-300 border-b-2 dark:border-b-0" 
                    placeholder="Name"
                    name="name"
                />
                <input 
                    type="text" ref={emailEl}
                    className="py-2 px-2 outline-none w-full rounded-lg focus:ring-2 ease-in duration-300 border-b-2 dark:border-b-0" 
                    placeholder="Email"
                    name="email"
                    />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                        <input ref={storeDataEl}
                        type="checkbox"
                        id="storeData"
                        name="storeData"
                        value="true"
                        />
                        <label className="ml-2 text-gray-500 cursor-pointer" htmlFor="storeData">
                            Save my email for the next time
                        </label>
                    </div>
            </div>
            {error && toast.error("Ups!, all fields are required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })}
            <div className="mt-8">
                <button 
                type="button" 
                onClick={handleCommentSubmission}
                className="transition duration-500 ease-in-out bg-indigo-400 hover:bg-gray-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Comment
                </button>
                {showSuccesMsg && 
                toast.success("Comment added!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                  })
                }
            </div>
        </div>
    )
}

export default CommentsForm
