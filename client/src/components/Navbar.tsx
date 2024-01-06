import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
import logo from "../assets/images/logo.png";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LuMenu } from 'react-icons/lu';

function Navbar() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    if (!userContext) return null;
    const { userInfo, setUserInfo } = userContext;

    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const toggleDropdown = (event: ButtonEvent) => {
        if (showDropdown) {
            setShowDropdown(false)
        } else {
            setShowDropdown(true)
        }
    }

    const handleLogout = (event: any) => {
        localStorage.removeItem("user");
        setUserInfo(null)
    }

    return (
        <div className="navbar-main">
            <div className="navbar-content">
                <div className="logo-section">
                    <img width="35px" src={logo} alt="" />
                    <div className="title">Blog</div>
                </div>
                <div className="option-section">

                    {userInfo &&
                        <div className="relative">
                            <button onClick={(event) => {
                                toggleDropdown(event)
                            }} className="transition p-2 text-[25px] rounded-md flex jsi hover:bg-[#38bec9] hover:text-white"><LuMenu /></button>
                            {showDropdown && <div className="absolute w-[200px] left-[-6rem] top-[3.5rem] bg-white flex flex-col shadow-md overflow-hidden">
                                <div onClick={(event: any) => {
                                    navigate("/insert")
                                }} className="menu-control overflow-hidden transition pl-7 pr-7 ease-in-out delay-10 text-[14.8px] cursor-pointer p-4 hover:bg-[#38bec9] hover:text-[#fff]">
                                    เพิ่มโพสต์ของคุณ
                                </div>
                                <div onClick={(event) => {
                                    handleLogout(event)
                                }} className="menu-control overflow-hidden transition pl-7 pr-7 ease-in-out delay-10 text-[14px] cursor-pointer p-4 hover:bg-[#38bec9] hover:text-[#fff]">
                                    ออกจากระบบ
                                </div>
                            </div>}
                        </div>
                    }
                    {
                        !userInfo &&
                        <Link className="login-btn" to="/login">Login / Register</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
