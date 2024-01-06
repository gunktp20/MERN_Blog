import { useEffect, useState , useContext} from "react";
import Editor from "../components/Editor";
const baseURL = import.meta.env.VITE_BASE_URL;
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Wrapper from "../assets/wrappers/InsertPost"

const EditPost = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState<any>("");

    const { id } = useParams();
    const navigate = useNavigate()

    //@ts-ignore
    const { userInfo, setUserInfo } = useContext(UserContext);

    const editPost = async (e: any) => {
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("file", files[0]);
        e.preventDefault();

        const response = await fetch(`${baseURL}/post/${id}`, {
            method: "PUT",
            body: data,
            credentials: "include",
        });
        if (response.ok) {
            navigate('/')
        }
    };

    useEffect(()=>{
        if(!id){
            return navigate("/")
        }

        fetch(`http://localhost:4000/post/${id}`).then((response: any) => {
            response.json().then((result: any) => {
                if (result.author.username !== userInfo.username) {
                    return navigate("/")
                }
                setTitle(result.title)
                setSummary(result.summary)
                setContent(result.content)
            });
        });
        
    },[])


    return (
        <Wrapper>
            <Navbar/>
            <form className="max-w-xl mx-auto block bg-white border border-gray-200 rounded-lg shadow mt-[7rem] p-8 text-slate-950">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Summary
                    </label>
                    <input
                        type="text"
                        name="summary"
                        value={summary}
                        placeholder="summary"
                        onChange={(e) => setSummary(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="user_avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Upload profile picture
                    </label>
                    <input
                        className="shadow-sm mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        type="file"
                        name="file"
                        id="file"
                        onChange={(e) => setFiles(e.target.files)}
                        required
                    />

                    <Editor
                        value={content}
                        onChange={setContent}
                        className="mb-4 block text-sm font-medium leading-10 text-gray-900"
                    />
                </div>
                <button
                    onClick={(event)=>{
                        editPost(event)
                    }}
                    className="w-full bg-[#2cb1bc] text-white p-2 rounded-md shadow-lg"
                >
                    Edit Post
                </button>
            </form>
        </Wrapper>




    );
};
export default EditPost;