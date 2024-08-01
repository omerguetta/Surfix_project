const BASE_URL = 'https://surfix.onrender.com/api/beach';

const headers = {
    'Content-Type': 'application/json',
};

async function query(filters = {}) {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${BASE_URL}/${filters}`, {
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or forbidden');
    }

    if (!response.ok) {
        throw new Error('Failed to fetch beaches');
    }

    const data = await response.json();
    return data;
}

async function getById(beachId) {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${BASE_URL}/${beachId}`, {
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or forbidden');
    }

    if (!response.ok) {
        throw new Error('Failed to fetch beach');
    }

    const data = await response.json();
    return data;
}

async function add(body) {

    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });

    if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or forbidden');
    }

    if (!response.ok) {
        throw new Error('Failed to update beach');
    }

    window.location.href = document.referrer;
}

async function update(body, beachId) {

    const response = await fetch(`${BASE_URL}/${beachId}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });

    if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or forbidden');
    }

    if (!response.ok) {
        throw new Error('Failed to update beach');
    }

    window.location.href = document.referrer;
}

async function remove(beachId) {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${BASE_URL}/${beachId}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or forbidden');
    }

    if (!response.ok) {
        throw new Error('Failed to delete beach');
    }

    window.location.href = 'for_you.html';
}

const beachService = {
    query,
    getById,
    add,
    update,
    remove
};

export default beachService;