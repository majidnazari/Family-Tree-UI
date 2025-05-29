import config from "../config";
import { toast } from "react-toastify";
import { setAuthToken } from "../utils/authToken"; // adjust path if needed

const useLogin = () => {
  const login = async (username, password) => {
    const query = `
      mutation {
        login(input: { username: "${username}", password: "${password}" }) {
          access_token
        }
      }
    `;

    try {
      const response = await fetch(config.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      if (result.errors) {
        const error = result.errors[0];
        const message = error?.end_user_message || error.message || "Login failed";
        toast.error(message);
        throw new Error(message);
      }

      const token = result.data?.login?.access_token;
      console.log("token in login gets from backed is  :", token);

      if (!token) {
        toast.error("No access token returned");
        throw new Error("Login failed: no token received");
      }

      // Save the token so the rest of the app can access it
      setAuthToken(token);

      toast.success("Login successful");
      return token;
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.message || "Something went wrong");
      throw err;
    }
  };

  return { login };
};

export default useLogin;
