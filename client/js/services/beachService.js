const BASE_URL = 'http://localhost:3000/api';

exports.beachService = {

    async getBeaches() {
        const response = await fetch(`${BASE_URL}/beach`);
        return await response.json();
    },

    async getBeach(beachId) {
        const response = await fetch(`${BASE_URL}/beach/${beachId}`);
        return await response.json();
    },

    async removeBeach(beachId) {
        const response = await fetch(`${BASE_URL}/beach/${beachId}`, {
            method: 'DELETE'
        });
        return await response.json();
    },

    async addBeach(beach) {
        const response = await fetch(`${BASE_URL}/beach`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({beach})
        });
        return await response.json();
    },

    async updateBeach(beachId, beach) {
        const response = await fetch(`${BASE_URL}/beach/${beachId}`, {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({beach})
        });
        return await response.json();
    }
}