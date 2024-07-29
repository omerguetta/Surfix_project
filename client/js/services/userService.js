const BASE_URL = 'http://localhost:3000/api/user';

const headers = {
    'Content-Type': 'application/json',
};

async function registerUser(userData) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers,
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ email, password }),
        });
        console.log(response);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
        }

        const data = await response.json();
        
        localStorage.setItem('access_token', data.token);
        localStorage.setItem('access_token_ttl', data.ttl);
        localStorage.setItem('userId', data.userId);
        
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

async function query() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401 || response.status === 403) {
            throw new Error('Unauthorized or forbidden');
        }

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

async function getById(userId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'GET',
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401 || response.status === 403) {
            throw new Error('Unauthorized or forbidden');
        }

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

async function update(userId, userData) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'PUT',
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (response.status === 401 || response.status === 403) {
            throw new Error('Unauthorized or forbidden');
        }

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function remove(userId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${BASE_URL}/${userId}`, {
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
            throw new Error('Failed to delete user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

const userService = {
    registerUser,
    loginUser,
    query,
    getById,
    update,
    remove,
};

export default userService;