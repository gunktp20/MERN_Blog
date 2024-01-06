import Wrapper from "../assets/wrappers/Landing";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
const baseURL = import.meta.env.VITE_BASE_URL;
import React from "react";
import Navbar from "../components/Navbar";

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

function LandingPage() {

    const [posts, setPosts] = useState<Post[]>([]);

    //@ts-ignore
    const { userInfo,setUserInfo } = useContext(UserContext);
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
    
    useEffect(() => {
        fetch(`http://localhost:4000/post`).then((response) => {
            response.json().then((posts) => {
                setPosts(posts);
            });
        });
    }, [])

    const navigate = useNavigate();
    return (
        <Wrapper>
           <Navbar/>
            <div className="wallpaper-main">
                <div className="dark"></div>
                <div className="welcome-section">
                    <div className="welcome">Welcome to Blogy</div>
                    <div className="welcome-desr">
                        ยินดีต้อนรับเข้าสู่ Website สำหรับอ่านบทความที่คุณสนใจ ที่มีบทความหลากหลายให้ท่านเลือกอ่าน มีมากกว่า 70 บทความ เเละ มากกว่า 30 ประเภท เเละสามารถติดตามข่าวสารผ่านช่องทาง Social Media ของ Blogy.net
                    </div>
                </div>
            </div>
            <div className="post-container">
                <div className="post-section">
                    <Slider {...settings}>
                        {
                            posts.length > 0 &&
                            posts.map((post) => {
                                return (
                                    <div className="post-item" key={post._id} onClick={(event)=>{
                                        navigate(`/post/${post._id}`)
                                    }}>
                                        <img className="post-img" src={`${baseURL}/${post.cover}`} alt="" />
                                        <div className="post-img-dark"></div>
                                        <div className="post-detail-section">
                                            <div className="post-title">{post.title}</div>
                                            <div className="post-desr">{post.summary}</div>
                                        </div>
                                    </div>
                                )
                            })}
                    </Slider>
                </div>
            </div>
            
        </Wrapper>
    );
}

export default LandingPage;
