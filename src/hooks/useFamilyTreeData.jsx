import { useEffect, useState } from "react";

const useFamilyTreeData = (personId) => {
    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFamilyTree = async () => {
            try {
                const token = localStorage.getItem("token"); // ⬅️ Adjust if you're storing the token elsewhere

                const response = await fetch("http://localhost:8000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTllMTk5YWRjMjUyOWU4ZDQ1NzY3ZGViZWQzODk5OGE0MzQ1Mzg3OWExOGQyMTQ2MWFlZmE2YzI5NDY4OTMxODU2YjU2YTgyYWI2NTE5NTUiLCJpYXQiOjE3NDcxMzk0NTQuMzg1MDg4LCJuYmYiOjE3NDcxMzk0NTQuMzg1MDg5LCJleHAiOjE3NDczOTg2NTQuMzcyNTIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.KzGlgG0bWYKEQr5YZtnwNVaNmd6yyCejTw6aivLYXYv2sptlL6qn0ouqrNe9ETQZWpMwjJ8hdC9LMuZgD6haiXWCmphLyPUYyv5U2pankm3XhKlNgmsIMJcrq74DZtbINwLbBkrJEDBI6rXttr9hG5lsbOZhUo5p3VsCFn3qpguKMhXHVB3ohKRsOFs6t1d2Ey9gYkoyJyACdIeWMeLYgkIDJDE3Y6q5e0Y5K1XIMFWjp4hrcXNWn4tv56hzugSJjZShznThmRUKnxSOd7e3PHmPoy19q-OdD3MHEWpWTkY-YBEmO5Lim0Wief6CDIFpTnQ9P57zRDcVJbOuCMY7Fk9Zp5FuZ0ZG6srnkzCRk5TVRs2L8wYi2aboz1_qGGcCl8MnW_UyKezPr9afdxjaG4EOYJgMNsCac1ALjOxXLN3eUFX8zBc2-opnn04H1BmifJL2KfyGEvDzy7CDMA7cPNBmlLRM1iyDi9wBYcQXeHSMPGE8U-t6mJ-0qn25esXQlsObfui-KGJpAfyMYiNIVfnyL9rnm_6bSIyYQbhVdkdQXI09Msq8eHZTiaamL1mSxIlStJE1rkGhcETkVByac_jGyzfyec8BTZxCJga1W6N5R9PJUI816jr1u2A6ltOJQaIr3R7pSiM3RhBrE6OrA4NBHU-KLnaRS-4CRXQnoEc"
                    },
                    body: JSON.stringify({
                        query: `
            query getPerson {
                getPerson(id: "103") {
                  PersonMarriages {
                    id
                    Man {
                      id
                      first_name
                      last_name
                      PersonMarriages {
                        id
                        Man {
                          id
                          first_name
                          last_name
                        }
                        Woman {
                          id
                          first_name
                          last_name
                        }
                        Children {
                          id
                          first_name
                          last_name
                          PersonMarriages {
                            id
                            Man {
                              id
                              first_name
                              last_name
                            }
                            Woman {
                              id
                              first_name
                              last_name
                            }
                            Children {
                              id
                              first_name
                              last_name
                            }
                          }
                        }
                      }
                    }
                    Woman {
                      id
                      first_name
                      last_name
                    }
                    Children {
                      id
                      first_name
                      last_name
                      PersonMarriages {
                        id
                        Man {
                          id
                          first_name
                          last_name
                        }
                        Woman {
                          id
                          first_name
                          last_name
                        }
                        Children {
                          id
                          first_name
                          last_name
                          PersonMarriages {
                            id
                            Man {
                              id
                              first_name
                              last_name
                            }
                            Woman {
                              id
                              first_name
                              last_name
                            }
                            Children {
                              id
                              first_name
                              last_name
                              PersonMarriages {
                                id
                                Man {
                                  id
                                  first_name
                                  last_name
                                }
                                Woman {
                                  id
                                  first_name
                                  last_name
                                }
                                Children {
                                  id
                                  first_name
                                  last_name
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  gender
                  first_name
                  mobile
                }
                
              }
              
            `,
                        variables: { personId },
                    }),
                });

                const result = await response.json();
               { console.log("datat is:",result);}
                if (result?.data?.getPerson) {
                    const mapped = mapFamilyTreeResponse(result.data.getPerson);
               { console.log("mapped is:",mapped);}
                    
                    setTreeData(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch family tree:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFamilyTree();
    }, [personId]);

    return { treeData, loading };
};

export default useFamilyTreeData;
