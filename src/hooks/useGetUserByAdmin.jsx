import { getAuthToken } from "../utils/authToken";
import config from "../config";
import { toast } from "react-toastify";

const useGetUserByAdmin = () => {
    const getUser = async (id) => {
        const token = getAuthToken();

        const query = `
      query {
        getUserByAdmin(id: "${id}") {
          blood_user_relation_calculated
          code_expired_at
          country_code
          created_at
          id
          mobile
          mobile_is_verified
          password
          password_change_attempts
          role
          sent_code
          status
          updated_at
        }
      }
    `;

        try {
            const response = await fetch(config.GRAPHQL_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ query }),
            });

            const result = await response.json();

            if (result.errors) {
                const error = result.errors[0];
                toast.error(error.end_user_message || error.message || "An error occurred");
                throw new Error("Failed to fetch user");
            }

            return result.data.getUserByAdmin;
        } catch (err) {
            console.error("Get User Error:", err);
            toast.error(err.message || "Something went wrong");
            throw err;
        }
    };

    return { getUser };
};

export default useGetUserByAdmin;
