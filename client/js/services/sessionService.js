const BASE_URL = 'http://localhost:3000/api/session';

async function query(filters = {}) {
    try {
        const response = await fetch(`${BASE_URL}/?${filters}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching sessions:', error);
    }
}

async function getById(sessionId) {
    try {
        const response = await fetch(`http://localhost:3000/api/session/${sessionId}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching session with ID ${sessionId}:`, error);
    }
}

async function add(body) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        if (response.ok) {
            window.location.href = document.referrer;
        } else {
            console.error(`Failed to create session:`, response.status, response.statusText);
        }
    } catch (error) {
        console.error(`Error creating session:`, error);
    }
}

async function update(body, sessionId) {
    try {
        const response = await fetch(`${BASE_URL}/${sessionId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        if (response.ok) {
            window.location.href = document.referrer;
        } else {
            console.error(`Failed to update session:`, response.status, response.statusText);
        }
    } catch (error) {
        console.error(`Error updating session:`, error);
    }
}

async function remove(sessionId) {
    try {
        const response = await fetch(`${BASE_URL}/${sessionId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            window.location.href = 'for_you.html';
        } else {
            console.error('Failed to delete session:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error deleting session:', error);
    }
}

const sessionService = {
    query,
    getById,
    add,
    update,
    remove
};

export default sessionService;