import React, { useEffect, useRef } from 'react'
import logo from "../../assets/Logo/sitelogo.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai"
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from '../core/Auth/ProfileDropDown'
import useOnClickOutside from '../../hooks/useOnClickOutside'


const newUserLinks = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Sign Up",
    path: '/signup',
  }
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)
  const [open,setOpen] = useState(false);

  useOnClickOutside(ref, () => setOpen(false))

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        // console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-primaryDark2 bg-primaryDark transition-all duration-200`}
    >
      <div className="flex w-[96%] md:w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img className=' rounded-sm' src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="">
          <ul className="flex md:gap-x-6 text-primaryLight">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? " text-primaryLight2"
                          : "text-primaryLight"
                      }`}
                    >
                       <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-primaryLight3 p-4 text-primaryDark2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-primaryLight3"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (
                          <>
                            {subLinks && subLinks.length > 0 ? (
                              subLinks
                                .filter(
                                  (subLink) => subLink?.courses?.length > 0
                                  
                                )
                                .map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-primaryLight2"
                                    key={i}
                                  >
                                    <p>{subLink.name}</p>
                                  </Link>
                                ))
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-primaryLight3 hidden md:block"
                          : "text-primaryLight hidden md:block"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className=" hidden md:block rounded-[8px] border border-richblack-700 bg-primaryLight px-[12px] py-[8px] text-primaryLight4">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className=" hidden md:block rounded-[8px] border border-richblack-700 bg-primaryLight px-[12px] py-[8px] text-primaryLight4">
                Sign up
              </button>
            </Link>
          )}
          
          {token !== null && <ProfileDropdown />}
        </div>
        
        <div className='relative mr-1 md:hidden flex gap-x-4'>
            <div className=' mt-2'>
              {token !== null && <ProfileDropdown />}
            </div>

            <button
          className="relative mr-1"
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center gap-x-1">
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
              </div>
              {open && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 w-[120px] overflow-hidden rounded-md border-[1px] border-primaryDark3 bg-primaryDark4 "
                  ref={ref}
                >
                  {NavbarLinks.map((link, index) => (
                    <li key={index} className="list-none">
                      {link.title === "Catalog" ? (
                        <></>
                      ) : (
                        <Link to={link?.path}>
                          <p
                            className={`${
                              matchRoute(link?.path)
                                ? "text-primaryLight4 py-2"
                                : "text-primaryLight py-2"
                            }`}
                          >
                            {link.title}
                          </p>
                        </Link>
                      )}
                    </li>
                  ))}
                  {!user && newUserLinks.map((link, index) => (
                    <li key={index} className="list-none">
                      {link.title === "Catalog" ? (
                        <></>
                      ) : (
                        <Link to={link?.path}>
                          <p
                            className={`${
                              matchRoute(link?.path)
                                ? "text-primaryLight4 py-2"
                                : "text-primaryLight py-2"
                            }`}
                          >
                            {link.title}
                          </p>
                        </Link>
                      )}
                    </li>
                  ))}
                </div>
              )}
            </button>

        </div>
        
      </div>
    </div>
  )
}

export default Navbar
