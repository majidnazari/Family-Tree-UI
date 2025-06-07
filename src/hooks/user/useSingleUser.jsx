import { useEffect, useState } from "react";
import { getAuthToken } from "../../utils/authToken";
import { toast } from "react-toastify";
import config from "../../config";

const useSingleUser = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getAuthToken();

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      setLoading(true);

      const query = `
        query getUser {
          getUser(id: "${id}") {
            id
            country_code
            mobile
            role
            status
            OwnerPerson {
              id
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

        if (result?.data?.getUser) {
          setUser(result.data.getUser);
        } else {
          toast.error("Failed to fetch user.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("An error occurred while fetching the user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading };
};

export default useSingleUser;
