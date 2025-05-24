import { useEffect, useState } from "react";
import mapFamilyTreeResponse from "../utils/mapFamilyTreeResponse";
import { getAuthToken } from "../auth/authToken";
import { toast } from "react-toastify";


//  Change this to however many levels you want
//const REPEAT_COUNT = 2;

const generatePersonMarriageFragment = (depth) => {
  if (depth === 0) return '';
  return `
        PersonMarriages {
            id
            Man {
                id
                first_name
                last_name
                gender
                birth_date
                death_date
                is_owner
                status
            }
            Woman {
                id
                first_name
                last_name
                gender
                birth_date
                death_date
                is_owner
                status
            }
            Children {
                id
                first_name
                last_name
                gender
                birth_date
                death_date
                is_owner
                status
                ${generatePersonMarriageFragment(depth - 1)}
            }
        }
    `;
};

const useFamilyTreeData = (personId, maxLevel=2 ) => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFamilyTree = async () => {
      try {
       // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWZmYzA1ZGFmYjhlODE1ZWQxNTczNzg0ZWU3ZDBhMjliYjA5ZmVlYzIzZjNjNmY3OGY5YWZmYWU5NDY2YWQxZmYwZDlmYTdhMGQwYWQ5OGYiLCJpYXQiOjE3NDc0ODQxNzMuNjY3ODc5LCJuYmYiOjE3NDc0ODQxNzMuNjY3ODc5LCJleHAiOjE3NDc3NDMzNzMuNjYyMDY0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.te4HTAU2CKZvCRuXZfeZ2CHy9jkVNi34amLCM8XJnXZEv2F5zKtkXnx4cBO3Lg1sT2Xwx7Bh4Pz_tP0_RKoMkot6Uy0ypZQapn9yL0UevICw0gSDYQFqnonO5lAD1iZYzTufcyD-EuwRzyPaLps0zY08UGRippHDaxNwvN0KyZD13G3woranSAfWIJfOXGHkYchYSy44bd88MLM7WJGNVY-laTy2fZbsYi7RKjN-chi03tu-GhFdIhRDnPdTt4pVl_Hp17QdPbf2Nw48uAVY4D84wz04iuTVydKeOKgJ5Xz5YfOeuK5D1NDbkjUaruuQ_QMYL5PIxV6Uk9-m9UljgUzs521b6njSIqS7Y3erfAj3B4DUPjY-2mkFBxZ_9doTYaq9TaERXQGR4RINosPZN7HE_iHybc4CRfGTNKipru6iH8lafqKjnktwQDp9RMWqMibpqV1ODkrEd20XPuJXHJE9IvRiTgUhO-YZ8AxYV-PB1nB-VBXSUec8jWpRziqF5mVY5UkdRIwxkCWSziMq3mAcUkB0wLv0aLzDRMHTpLT08TPBz71kHKABM2ajquOC-wotWfZTkFg9nJQs1ey0j7wY7naKfCBYnz87HjaopMmCdFpcM4-U4LW6o_kDAQXHuXLaNbhLZU2V4Y2qsgu5HeGYeslNaNXHLUAWICX40mc";
        const token = getAuthToken();
        const query = `
                    query getPerson {
                        getPerson(id: "${personId}") {
                            id
                            first_name
                            gender
                            mobile
                            birth_date
                            death_date
                            is_owner
                            status
                            ${generatePersonMarriageFragment(maxLevel)}
                        }
                    }
                `;
{
 // console.log("the final query is :" , query)
}
        const response = await fetch("http://localhost:8000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            query,
            variables: { personId },
          }),
        });

        const result = await response.json();
        console.log("data is:", result);

        if (result?.data?.getPerson) {
          const mapped = mapFamilyTreeResponse(result.data.getPerson);
          console.log("mapped is:", mapped);
          setTreeData(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch family tree:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyTree();
  }, [personId,maxLevel]);

  return { treeData, loading };
};

export default useFamilyTreeData;
