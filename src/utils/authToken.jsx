// src/utils/authToken.js

// const token = "1eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDE2NjExODdkNTJiOWE3YjNlM2JiOTUzYjk1NjQyMzg0N2RiNjdkMGY3NWEzZjQyZWJkMWQ1NTE0YWI3NDYwMzE4NjUyN2QxNTdlZjA2YzgiLCJpYXQiOjE3NDg0MTE0MTguODQzNjQxLCJuYmYiOjE3NDg0MTE0MTguODQzNjQxLCJleHAiOjE3NDg2NzA2MTguODI1MTQsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.LC5LcksKhh2kx8KxeqC9ofBSTMzg5cHF5M4DK9bgn8mZ1qP-O7ctWz_Kyf41aYP6r5zSQMtpSB8kWVWwTaV7tPbFiITSsAZAopjvdnI5RaMqixoOUGJ4F8up5THhmxA_yRj7hlAK2xERRInBPo7q1Sp0A0xBmwWxySEY7-_D-HXopN6h9ASZSjXpPYDxjnGhIK1IUbfrxA-rj9EgycFNvn4yXRGycx-UD-Np_5q0GWckIQbnmQK_RRSK33Qbfszqg4s1r45Qd3sruBWAb7E5ZYPHl6iBfsYmKlwcXxeiRHcCFCgsCGh07E0p8exhZLoBHPZgUqU2Y7SsQ2Y3X9VExh2OtKUlY5qGJ5mprAj1phutEBRhHmknizohWyq3lxMTH-py8PmI0wWnqL5cANa_HcuZhXeAhXSrrulC1iHcj2XC8iOxEGLGHcwIhe-kEb2QVrLepgqXbv_kkv_CeBJqS7_7TzvtR58O66Q01uxmYJwyD349TRSdfO75TtFuoI5qxVPI23UsqNKKxIzVcRpGt5Xrg22l_3HNTrzJ_7Ah5CPWgN2ZfQAul6WlrjE9JkWX3qKt1CXuv2QLnLXW21Qy25rReLCzWbg5sWNzpF4Eu4J8h0CMfpMymWDcs2eiFR1zMBaplS8_AJz6RlIwoaxy6bgWMbHqGNoZ9zzs2DUrLiE";

// export const getAuthToken = () => token;



// src/utils/authToken.js

export const getAuthToken = () => {
    const token = localStorage.getItem("auth_token");
    console.log("[utils] getAuthToken returns:", token);
    return token;
};

export const setAuthToken = (token) => {
    console.log("set token is  :", token);

    localStorage.setItem("auth_token", token);
};

export const clearAuthToken = () => {
    localStorage.removeItem("auth_token");
};

