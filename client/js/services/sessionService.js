const BASE_URL = 'https://surfix.onrender.com/api/session';

const headers = {
    'Content-Type': 'application/json',
};

async function query(filters = {}) {

    const searchParams = new URLSearchParams(filters);

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${BASE_URL}?${searchParams}`, {
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or forbidden');
    }

    if (!response.ok) {
        throw new Error('Failed to fetch sessions');
    }

    const data = await response.json();
    return data;
}

async function getById(sessionId) {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${BASE_URL}/${sessionId}`, {
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or forbidden');
    }

    if (!response.ok) {
        throw new Error('Failed to fetch session');
    }

    const data = await response.json();
    return data;
}

async function add(body) {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    };

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
        throw new Error('Failed to update session');
    }

    window.location.href = document.referrer;
}

async function update(body, sessionId) {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${BASE_URL}/${sessionId}`, {
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
        throw new Error('Failed to update session');
    }

    window.location.href = document.referrer;
}

async function remove(sessionId) {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${BASE_URL}/${sessionId}`, {
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
        throw new Error('Failed to delete session');
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