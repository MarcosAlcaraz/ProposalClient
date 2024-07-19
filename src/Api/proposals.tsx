import axios from "axios"

const url = "http://localhost:3000/"

const getProposalCards = async () => {
    try {
        const response = await axios.get(url + 'Proposals');
        return response.data.cards;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default getProposalCards;