async function query(filters = {}) {
    try {
        const response = await fetch(`http://localhost:3000/api/beach/${filters}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching beaches:', error);
    }
}

async function getById(beachId) {
    try {
        const response = await fetch(`http://localhost:3000/api/beach/${beachId}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching beach with ID ${beachId}:`, error);
    }
}

async function add(body) {
    try {
        const response = await fetch('http://localhost:3000/api/beach', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        if (response.ok) {
            window.location.href = document.referrer;
        } else {
            console.error(`Failed to create beach:`, response.status, response.statusText);
        }
    } catch (error) {
        console.error(`Error creating beach:`, error);
    }
}

async function update(body, beachId) {
    try {
        const response = await fetch(`http://localhost:3000/api/beach/${beachId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        if (response.ok) {
            window.location.href = document.referrer;
        } else {
            console.error(`Failed to update beach:`, response.status, response.statusText);
        }
    } catch (error) {
        console.error(`Error updating beach:`, error);
    }
}

async function remove(beachId) {
    try {
        const response = await fetch(`http://localhost:3000/api/beach/${beachId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            window.location.href = 'for_you.html';
        } else {
            console.error('Failed to delete beach:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error deleting beach:', error);
    }
}

const beachService = {
    query,
    getById,
    add,
    update,
    remove
};

export default beachService;