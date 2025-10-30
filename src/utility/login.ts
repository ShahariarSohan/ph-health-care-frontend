/* eslint-disable @typescript-eslint/no-explicit-any */


const userLogin = async (data: { email: string, password: string }) => {
    try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
        credentials:"include"
         })
        const result = await res.json()
        return result
    }
    catch (err:any) {
       throw new Error(err.message||"Error occurred when logging in")
    }
   
    
   
  
};

export default userLogin;