import React, {useState,useEffect} from 'react'
import moment from 'moment'
import { FcCalendar } from "react-icons/fc";
import Link from 'next/link'
import Image from 'next/image';
const Post = ({post}) => {
    const [postCategories, setpostCategories] = useState([]);
    useEffect(() => {
    
        
    }, [])

    console.log(post);
    // const output = inputObject.userList.map(user => user.age);
    console.log(post.categories.name);
    


    return (
        <div className="bg-white shadow-lg p-0 lg:p-8 pb-12 mb-8 dark:bg-gray-900 dark:rounded-lg border dark:border-gray-200">
            <div className="relative overfloww-hidden shadow-md pb-80 mb-6 ">
                <img src={post.featuredImage.url}  
                alt={post.title}
                className="object-top absolute h-80 w-full object-cover shadow-lg "
                />
            </div>
                <h1 className="transition duration-400  mb-8 cursor-pointer 
                hover:text-blue-600 text-3xl font-semibold w-full ">
                    <Link href={`/post/${post.slug}`}>
                        {post.title}
                    </Link>
                    {postCategories.map((obj)=>(

                    <span key={obj.slug}>
                        {obj.name}
                    </span>
                    ))}
                     
                </h1>
                <div className=" lg:flex ">
                    <div className="flex w-full lg:w-auto mr-8 ">
                        <Link href={`post/${post.slug}`}>
                        <Image 
                        unoptimized
                        alt={post.author.name} 
                        height="30px"
                        width="30px"
                        className="align-middle rounded-full object-cover object-top"
                        src={post.author.photo.url}
                        />
                        </Link>

                        <span className="ml-3 dark:text-gray-100 text-lg text-black">
                            {post.author.name} 
                        </span>

                            <span className="mt-1 ml-10">
                                <FcCalendar />
                            </span>
                            <span className="ml-auto">
                                {moment(post.createdAt).format('MMM DD, YYYY')}
                            </span>
                    </div>
                </div>
                <p className="mt-4 text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8 dark:text-gray-100 ">
                    {post.excerpt}
                </p>
                <div className="text-center">
                    <Link href={`post/${post.slug}`}>
                        <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-gray-900 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                            See post
                        </span>
                    </Link>
                </div>
        </div>
    )
}

export default Post
