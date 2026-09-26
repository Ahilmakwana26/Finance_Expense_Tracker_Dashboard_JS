const API_URL = 'http://192.168.31.81:8000/api/transaction';


export const getTransactionData = async () => {

    const response = await fetch(`${API_URL}/get`);

    const result = await response.json();
    if (!response.ok) {
        const error = new Error(result.message || 'Request Failed');
        error.errors = result.errors;
        throw error;
    }

    return result.data.data;
}

export const add = async (data) => {

    const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (!response.ok) {
        const error = new Error(result.message || 'Request Failed');
        error.errors = result.errors;
        throw error;
    }
    return result;
};


export const edit = async (data, id) => {

    return await fetch(`${API_URL}/update/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(async response => {
        const data = await response.json();

        if (!response.ok) {
            const error = new Error(data.message || 'Request failed');
            error.errors = data.errors;
            throw error;
        }
        return data;

    }).then(data => {
        return data;
    }).catch(error => {
        throw error;
    })
}
export const deleteData = async (id) => {
    
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
        const error = new Error(result.message || "Request failed");
        error.errors = result.errors;
        throw error;
    }

    return result;
};
