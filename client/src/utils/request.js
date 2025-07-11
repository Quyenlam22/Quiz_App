const API_DOMAIN = process.env.REACT_APP_API;

export const get = async (path) => {
    const response = await fetch(`${API_DOMAIN}/${path}`);
    const result = await response.json();
    return result;
}

export const post = async (options, path) => {
    const response = await fetch(`${API_DOMAIN}/${path}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
    });
    const result = await response.json();
    return result;
}

export const put = async (options, path) => {
    const response = await fetch(`${API_DOMAIN}/${path}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
    });
    const result = await response.json();
    return result;
}

export const patch = async (options, path) => {
    const response = await fetch(`${API_DOMAIN}/${path}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
    });
    const result = await response.json();
    return result;
}

export const del = async (path) => {
    const response = await fetch(`${API_DOMAIN}/${path}`, {
        method: "DELETE"
    });
    const result = await response.json();
    return result;
}