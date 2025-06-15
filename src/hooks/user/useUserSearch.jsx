import { useState, useEffect } from "react";
import { getAuthToken } from "../../utils/authToken";
import config from "../../config";
import { toast } from "react-toastify";

const useUserSearch = (searchTerm) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = getAuthToken();

  useEffect(() => {
    if (!searchTerm || searchTerm.length < 3) {
      setOptions([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      const query = `
        query getUsers {
          getUsers(
            first: 20,
            page: 1,
            orderBy: { column: "id", order: ASC },
            mobile: "${searchTerm}"
          ) {
            data {
              id
              mobile
              OwnerPerson {
                first_name
                last_name
              }
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

        if (result?.data?.getUsers?.data) {
          const formattedOptions = result.data.getUsers.data.map(user => ({
            value: user.id,
            label: `${user.mobile} (${user?.OwnerPerson?.first_name ?? ''} ${user?.OwnerPerson?.last_name ?? ''})`
          }));
          setOptions(formattedOptions);
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  return { options, loading };
};

export default useUserSearch;
