import axios from 'axios';

const getProposal = async (fatherID: number, childID: number) => {
  try {
    console.log("http://localhost:3000/proposals?parent_id=" + fatherID + "&child_id=" + childID);
    const response = await axios.get("http://localhost:3000/proposals?parent_id=" + fatherID + "&child_id=" + childID);
    console.log(response.data);
    return(response.data);
  } catch (error) {
    console.error('Error fetching proposals:', error);
  }
};

export default getProposal
