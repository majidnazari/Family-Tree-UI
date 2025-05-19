// src/hooks/useCreateSpouse.js
import { getAuthToken } from "../auth/authToken";

const useCreateSpouse = () => {
  const createSpouse = async (input) => {
    console.log("spouse is :" , input);
    const token = getAuthToken();

    const query = `
      mutation {
        createSpouse(
          input: {
            person_id: "${input.person_id}",
            marriage_date: "${input.marriage_date}",
            marriage_status: ${input.marriage_status},
            spouse: {
              first_name: "${input.spouse.first_name}",
              last_name: "${input.spouse.last_name}",
              birth_date: "${input.spouse.birth_date}",
              mobile: "${input.spouse.mobile}"
            },
            status: ${input.status}
          }
        ) {
          Man {
            id
            last_name
            first_name
          }
          Woman {
            id
            first_name
            last_name
          }
          id
        }
      }
    `;

    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data.createSpouse;
  };

  return { createSpouse };
};

export default useCreateSpouse;
