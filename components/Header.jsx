import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./assets/Logo.png"
import lightLogo from "./assets/Logo-light.png"
import { getCategories } from "../services";
//dark mode
import {useTheme} from 'next-themes'

import {MoonIcon, SunIcon} from '@heroicons/react/solid'

const Header = () => {
  //dark mode script
  const {systemTheme, theme,setTheme} = useTheme()
  const [isLight, setisLight] = useState(false)
  const [mounted, setmounted] = useState(false)
  
  useEffect(() => {
    
   setmounted(true)
  }, [])

  const renderThemeChanger = () =>{
    if(!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;

    if(currentTheme === 'dark'){
      
      return( <SunIcon className="w-7 h-7" role="button" onClick={() => setTheme ('light')}
      />
      )

    }else{
     
      return(
        <MoonIcon className="w-7 h-7" role="button" onClick={() => setTheme ('dark')}/>
      )
    }
  }

  const [categories, setcategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => {
      setcategories(newCategories);
    });
  }, []);
  return (
    <div className=" mb-8 w-full drop-shadow dark:bg-gray-900">
      <div className="border-b w-full py-5 flex dark:border-b-0 ">
        <div className="flex-1">
          <Link href="/" className="dark:text-white">
            <span className="cursor-pointer font-bold text-4xl text-black pl-8 tracking-normal dark:text-white">
              <Image
                src={Logo}
                unoptimized
                height="60px"
                width="60px"
                className="m-9 "
              />
            Kaanbalcat
            </span>
          </Link>
        </div>
        <div className="md:flex md:h-full md:align-middle md:content-center mr-9 hidden">
          {categories.map((category) => (
            <>
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="flex-end mt-5 align-middle text-black  font-semibold cursor-pointer  mx-4 dark:text-white">
                  {category.name}
                </span>
              </Link>
              
            </>
            
          ))}

        <div className="box-dark-theme
          mt-3 transition duration-500 ease transform 
          text-gray-50
          dark:bg-yellow-300 
          dark:transition duration-500 ease-in-out"
          >
        {renderThemeChanger()}

        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
