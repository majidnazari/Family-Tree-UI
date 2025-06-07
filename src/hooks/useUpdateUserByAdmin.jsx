import { getAuthToken } from "../utils/authToken";
import config from "../config";
import { toast } from "react-toastify";

const useUpdateUserByAdmin = () => {
    const updateUserByAdmin = async (user_id, input) => {
        const token = getAuthToken();
        console.log("Updating user ID:", user_id, "with input:", input);

        const query = `
      mutation {
        updateUserByAdmin(
          user_id: ${user_id}
          input: {
            blood_user_relation_calculated: ${input.blood_user_relation_calculated ? 1 : 0}
            code_expired_at: "${input.code_expired_at}"
            country_code: "${input.country_code}"
            mobile: "${input.mobile}"
            mobile_is_verified: ${input.mobile_is_verified}
            password: "${input.password}"
            password_change_attempts: ${input.password_change_attempts}
            role: ${input.role}
            sent_code: "${input.sent_code}"
            status: ${input.status}
          }
        ) {
          id
          mobile
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
                const validation = error?.extensions?.validation;

                if (validation) {
                    Object.entries(validation).forEach(([field, messages]) => {
                        messages.forEach((msg) => toast.error(msg));
                    });
                } else {
                    toast.error(error.end_user_message || error.message || "An error occurred");
                }

                throw new Error("Validation failed");
            }

            toast.success("User updated successfully");
            return result.data.updateUserByAdmin;
        } catch (err) {
            console.error("Update User Error:", err);
            toast.error(err.message || "Something went wrong");
            throw err;
        }
    };

    return { updateUserByAdmin };
};

export default useUpdateUserByAdmin;
