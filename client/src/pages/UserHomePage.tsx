import Wrapper from "../assets/wrappers/Landing";
import logo from "../assets/images/logo.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_BASE_URL;

type Post = {
    _id:string,
    title:string,
    summary:string,
    content:string,
    cover:string,
    author:string,
    createdAt:string,
    updatedAt:string
}

function UserHomePage() {

    const [posts, setPosts] = useState<Post[]>([]);
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
        
        fetch(`http://localhost:4000/cookies`)
        
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
                        <Link className="login-btn" to="/login">Login / Register</Link>
                    </div>
                </div>
            </div>
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
                                    <div className="post-item" key={post._id}>
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

export default UserHomePage;
