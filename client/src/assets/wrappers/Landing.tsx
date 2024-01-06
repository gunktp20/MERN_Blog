import styled from "styled-components";
import wallpaper from "../images/wallpaper.jpeg"

const Wrapper = styled.article`
    background-color:#fff;
    /* background-color:#000000df; */
    width:100%;
    height:100%;
    position: relative;
    top:0;

    .navbar-main{
    background-color: #fff;
    display:flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: fixed;
    top:0;
    z-index: 2;
    }

    .title{
        font-size: 20px;
        font-weight: bold;
        color:#38bec9;
    }

    .logo-section{
        display: flex;
        align-items: center;
        grid-gap:0.6rem;
    }

    .navbar-content{
        display: flex;
        padding: 1rem;
        justify-content: space-between;
        background-color: #fff;
        align-items: center;
        width: 70%;
        
    }

    .login-btn{
        background-color:#2cb1bc ;
        color:#fff;
        padding: 0.6rem 1rem;
        border-radius: 5px;
        font-size: 14.3px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    }

    .wallpaper-main{
        background-image: url(${wallpaper});
        width: 100%;
        height: 430px;
        position: relative;
        background-size: cover;
        top:4.2rem;
        justify-content: center;
        align-items: center;
        display:flex;
    }

    .dark{
        background-color: #000000ba;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .welcome-section{
        position: absolute;
        display:flex;
        flex-direction: column;
        padding: 1rem;
        width: 600px;
    }

    a{
        text-decoration: none;
    }

    .welcome{
        color:#fff;
        margin-bottom: 1rem;
        font-size: 38px;
    }

    .welcome-desr{
        color:#ffffffd7;
        font-size: 14px;
    }

    .post-container{
        display: flex;
        align-items: center;
        justify-content: center;  
        width: 100%;
        top:6rem;
        position: relative;
    }

    .post-section{
        width: 90%;
        z-index: 1;
        grid-gap:3rem;
    }

    .post-item{
        z-index: 2;
        border-radius: 20px;
        overflow:hidden;
        width: 100%;
        height:230px;
        position: relative;
        padding-bottom:2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
        background-color:#fff;
        transition:0.3s all ease;
        cursor: pointer;
    }
    .post-item:hover{
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);;
    
    }
    .post-img{
        width:100%;
        height:230px;
        object-fit:cover;
    }
    .post-img-dark{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100vh;
        background-color:#0000006b;
    }

    .post-title{
        margin-top:1rem;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 1rem;
        padding-left:2rem;
        z-index:2;
        color:#fff;
    }

    .post-detail-section{
        display:flex;
        flex-direction:column;
        z-index:2;
        top:0;
        position:absolute;
        width:100%;
        align-items:center;
        justify-content:center;
        height:100%;
    }

    .post-desr{
        margin-bottom: 0.9rem;
        color:#333333e1;
        font-size: 13.4px;
        padding-left:2rem;
        z-index:2;
        color:#fff;
    }

    .post-content{
        font-size: 14.5px;
        padding-left:2rem;
        padding-right:2rem;
        z-index:2;
        color:#fff;
    }

    .slick-slide {
        padding: 0 15px;
        margin-bottom: 1.5rem;
    }


    @media screen and (min-width:0px) and (max-width:500px){
        .post-section{
            grid-template-columns: 1fr;
        }
        .welcome-section{
            width: 480px;
        }
    }

    

`

export default Wrapper