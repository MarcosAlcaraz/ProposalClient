import axios from "axios"

const url = "http://localhost:3000/"

const getProposal = async (proposalID: number) => {
    try {
        const response = await axios.get(url + 'Proposals/' + proposalID);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default getProposal;