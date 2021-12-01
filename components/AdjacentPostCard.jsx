import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

const AdjacentPostCard = ({ post, position }) => (
  <>
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-black text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
      <p className="text-black text-shadow font-semibold text-2xl text-center">{post.title}</p>
    </div>
    <Link href={`/post/${post.slug}`}><span className="z-10 cursor-pointer absolute w-full h-full" /></Link>
    {position === 'LEFT' && (
      <div className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-pink-600 left-4 rounded-full">
        <FiArrowLeftCircle className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
      </div>
    )}
    {position === 'RIGHT' && (
      <div className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-pink-900 right-4 rounded-full">
        <FiArrowRightCircle className="h-6 w-100 text-white w-full " />
      </div>
    )}
  </>
);

export default AdjacentPostCard;