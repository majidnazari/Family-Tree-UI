import { getAuthToken } from "../utils/authToken";
import { toast } from "react-toastify";
import config from "../config";

const useGetBloodyPersonAncestry = () => {
  const fetchAncestry = async (depth = 10) => {
    const token = getAuthToken();

    const query = `
      query {
        getBloodyPersonAncestry(depth: ${depth}) {
          heads {
            person_id
            first_name
            last_name
          }
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
        toast.error(error.message || "Failed to fetch ancestry");
        throw new Error(error.message);
      }

      return result.data.getBloodyPersonAncestry.heads;
    } catch (err) {
      console.error("Ancestry Fetch Error:", err);
      toast.error(err.message || "Something went wrong");
      throw err;
    }
  };

  return { fetchAncestry };
};

export default useGetBloodyPersonAncestry;
