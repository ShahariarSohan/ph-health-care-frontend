/* eslint-disable @typescript-eslint/no-explicit-any */

const checkAuthStatus = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
      if (!res.ok) {
          throw new Error( "Error occurred when authenticating");
      }
      const data = await res.json();
      return {
          authenticated: true,
          user:data.data
      }
    
  } catch (err: any) {
    console.log(err)
    return {
      authenticated: false,
      user: null,
    };
  }
};

export default checkAuthStatus;
