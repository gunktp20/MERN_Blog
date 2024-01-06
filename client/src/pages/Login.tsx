import { useState , useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Login";
const baseURL = import.meta.env.VITE_BASE_URL;
import { UserContext } from '../context/UserContext';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertText, setAlertText] = useState<string>("");
    const [alertType, setAlertType] = useState<string>("danger");

    //@ts-ignore
    const { userInfo,setUserInfo } = useContext(UserContext);

    const onSubmit = async () => {
        setIsLoading(true)
        if (!username || !password) {
            setShowAlert(true);
            setAlertType("danger")
            setAlertText("กรุณากรอกข้อมูลให้ครบถ้วน !")
            setTimeout(() => {
                setShowAlert(false);
                setAlertType("danger")
                setAlertText("")
                setIsLoading(false)
            }, 3000)
            setIsLoading(false)
            return;
        }

        const response = await fetch(`${baseURL}/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });

        if (response.status === 400) {
            const result = await response.json();
            setShowAlert(true);
            setAlertType("danger")
            setAlertText(result.msg)
            setTimeout(() => {
                setShowAlert(false);
                setAlertType("danger")
                setAlertText("")
                setIsLoading(false)
            }, 3000)
            return;
        }

        const result = await response.json()
        setUserInfo(result);
        localStorage.setItem("user", JSON.stringify(result));
        setIsLoading(false)
        
    }

    useEffect(()=>{
        if(userInfo){
            navigate("/");
        }
    },[userInfo])


    return (
        <Wrapper>
            <div className="form-main w-[400px] ">
                <h3 className="text-left text-[32px] mt-1 font-bold mb-3 text-[#333]">
                    Sign in
                </h3>
                <div className="text-[12.5px] text-gray-600">กรอกข้อมูของคุณเพื่อเข้าสู่ระบบ</div>
                {showAlert && alertType === "danger" &&
                    <div className="alert-danger p-3 mt-4 text-[12px] rounded-[5px]">
                        {alertText}
                    </div>
                }
                {showAlert && alertType === "success" &&
                    <div className="alert-success p-3 mt-4 text-[12px] rounded-[5px]">
                        {alertText}
                    </div>
                }
                <div className="relative z-0 w-full mb-5 group mt-7">
                    <input onChange={(event)=>{
                        setUsername(event.target.value)
                    }} type="text" name="username" id="username" className="block py-2.5 px-0 w-full text-[14.5px] text-gray-900 bg-transparent border-0 border-b-[1.6px] border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#2cb1bc] focus:outline-none focus:ring-0 focus:border-[#2cb1bc] peer" placeholder=" " required />
                    <label htmlFor="username" className="peer-focus:font-medium absolute text-[12.5px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#2cb1bc] peer-focus:dark:text-[#2cb1bc] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">username</label>
                </div>
                <div className="relative z-0 w-full mb-5 group mt-7">
                    <input onChange={(event)=>{
                        setPassword(event.target.value)
                    }}type="password" name="password" id="username" className="block py-2.5 px-0 w-full text-[14.5px] text-gray-900 bg-transparent border-0 border-b-[1.6px] border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#2cb1bc] focus:outline-none focus:ring-0 focus:border-[#2cb1bc] peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-[12.5px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#2cb1bc] peer-focus:dark:text-[#2cb1bc] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
                </div>
                <button onClick={onSubmit} className="w-full bg-[#2cb1bc] text-white h-[38px] rounded-md mt-5 shadow-md">
                    {isLoading ? "Loading..." : "Sign In" }
                </button>
                <div className="flex mt-2 justify-end pr-2">
                    <p className="text-[12.4px] text-[#333]">หากคุณยังไม่ได้เป็นสมาชิก</p>
                    <Link className="text-[12.4px] ml-2 text-[#333]" to="/register">
                        Register
                    </Link>
                </div>
            </div>
        </Wrapper>
    );
}

export default LoginPage;
