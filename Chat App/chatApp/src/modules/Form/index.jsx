import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";

const Form = ({ isSigninPage = false }) => {
  const [data, setData] = useState({
    ...(!isSigninPage && { fullname: "", cpassword: "" }),
    email: "",
    password: "",
  });


  const navigate = useNavigate();
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("") 
  

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const result  = await fetch(`http://localhost:5000/user/${isSigninPage ? 'login':'signup'}`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data)
    })

    const response = await result.json()

    console.log(response)

  }

  return (
    <>
      <div className="bg-white w-[600px] h-[700px] shadow-red-200 flex flex-col items-center rounded-lg justify-center">
        <div className="text-3xl font-extrabold">
          {" "}
          Welcome {isSigninPage && "Back"}
        </div>
        <div className="text-xl font-light mb-10">
          {isSigninPage ? "Sign in to get explored" : "Sign up to get started"}
        </div>
        <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
        {!isSigninPage && (
          <Input
            label="Full Name"
            value={data.fullname}
            onChange={(e) => setData({ ...data, fullname: e.target.value })}
            name="fullname"
            placeholder="Enter your full name"
          ></Input>
        )}
        <Input
          label="Email"
          value={data.email}
          type="email"
          onChange={(event) => setData({ ...data, email: event.target.value })}
          name="email"
          placeholder="example@gmail.com"
        ></Input>
        <Input
          label="Password"
          type="password"
          value={data.password}
          onChange={(event) =>
            setData({ ...data, password: event.target.value })
          }
          name="password"
          placeholder="Password"
        ></Input>
        {!isSigninPage && (
          <Input
            label="Confirm Password"
            value={data.cpassword}
            onChange={(e) => setData({ ...data, cpassword: e.target.value })}
            className="mb-5"
            name="cpassword"
            placeholder="Confirm Password"
          ></Input>
        )}
        <Button
          label={isSigninPage ? "Sign In" : "Sign Up"}
          className="w-1/2 mb-2"
          type="submit"
          
        ></Button>

        <div>
          {isSigninPage
            ? "Did't have an account? "
            : "Already have an account? "}
          <span
            className=" text-primary cursor-pointer underline"
            onClick={() =>
              navigate(`/user/${isSigninPage ? "SignUp" : "SignIn"}`)
            }
          >
            {isSigninPage ? "Sign Up" : "Sign In"}
          </span>
        </div>
        </form>
      </div>
    </>
  );
};
export default Form;
