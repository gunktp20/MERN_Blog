import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Post';
import { UserContext } from '../context/UserContext';
import logo from "../assets/images/logo.png";
import { LuMenu } from 'react-icons/lu';
import Slider from "react-slick";
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const baseURL = import.meta.env.BASE_URL

function Post() {
    type TPost = {
        author: {
            _id: string,
            username: string,
            password: string
        }
        content: string,
        cover: string,
        createdAt: string,
        summary: string,
        title: string,
        updatedAt: string,
        _id: string
    } | null

    type Post = {
        _id: string,
        title: string,
        summary: string,
        content: string,
        cover: string,
        author: string,
        createdAt: string,
        updatedAt: string
    }
    const { id } = useParams();
    const [post, setPost] = useState<TPost>(null);

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    //@ts-ignore
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [posts, setPosts] = useState<Post[]>([]);
    const [allow, setAllow] = useState<boolean>(false);

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
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
        ]
    };

    const deletePost = () => {
        fetch(`http://localhost:4000/post/${id}`, {
            method: "DELETE",
            credentials: "include",
        }).then((response: any) => {
            navigate("/")
        }).catch(err=>{
            console.log(err)
        });
    }

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then((response: any) => {
            response.json().then((result: any) => {
                setPost(result)
                if (result.author.username === userInfo.username) {
                    setAllow(true)
                }
            });
        });

    }, [])

    return (
        <Wrapper>
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
                                    <div onClick={() => {
                                        navigate("/insert");
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
            {!post ?
                null
                :
                <>
                    <img className="post-img" src={`http://localhost:4000/${post?.cover}`} alt="" />
                    <div className="post-img-dark"></div>
                    <div className="post-detail xl:w-[80%] lg:w-[80%] md:w-[80%] sm:w-[100%]  flex flex-col pt-[3rem] pb-[3rem] pl-[4rem] pr-[4rem]">
                        <div className=" text-[28px] font-bold mb-[1rem]">
                            {post?.title}
                        </div>
                        <div className="flex gap-3 mb-1 bg-[#eeeeee] pt-[2px] pb-[2px] pl-[1rem] pr-[1rem] w-fit border-[#00000028] border border-[1px] rounded-md">
                            <div className="flex items-center">
                                <div className='text-[13.5px] mr-2'>ผู้เขียน</div>
                                <div className="text-[13.5px]">{post.author.username}</div>
                            </div>
                            <div className="flex items-center">
                                <div className='text-[13.5px] mr-2'>created At</div>
                                <div className="text-[13.5px]">{post.updatedAt}</div>
                            </div>
                        </div>
                        <div className="flex items-center p-2 w-fit  mb-2">
                            <div className="text-sm  mr-2">Tag :</div>
                            <div className="text-[13.5px] text-[#3278d5]">{post?.summary}</div>
                        </div>

                        <div className="post-cover">
                            <img src={`http://localhost:4000/${post?.cover}`} alt="" />
                        </div>

                        <div className="mt-7 text-[#292929]">
                            {post?.content}
                        </div>
                        <div className="mt-7">
                            {allow ?
                                <div className=''>
                                    <Link to={`/edit/${id}`} className='text-[13px] h-fit bg-yellow-500 p-[9px] pl-5 pr-5 mr-5 rounded-md'>Edit</Link>
                                    <button className='text-[13px] h-fit bg-red-500 p-2 pl-5 pr-5 text-[#fff] rounded-md' onClick={(event) => {
                                            deletePost()
                                    }}>Delete</button>
                                </div> :
                                null
                            }
                        </div>
                    </div>
                </>
            }


        </Wrapper>
    )
}

export default Post
