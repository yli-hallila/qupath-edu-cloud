import { hostState } from "lib/atoms";
import { getRecoil } from "recoil-nexus";

/**
 * Helper to make GET requests to the API.
 *
 * @param path
 * @returns data response as json
 */
async function request(path: string, init: RequestInit = {}) {
    const host = getRecoil(hostState);
    if (!host) {
        throw new Error("No host selected");
    }

    if (host.host.endsWith("/")) {
        path = path.substring(1);
    }

    let response: Response;

    try {
        response = await fetch(`${host.host}${path}`, {
            ...init,
            mode: "cors",
        });
    } catch {
        throw new Error("Connection refused.");
    }

    if (!response) {
        throw new Error("Invalid response.");
    } else if (!response.ok) {
        throw new Error("Request failed.");
    } else if (!response.body) {
        throw new Error("No data.");
    }

    return response.json();
}

export const fetchHosts = async () => {
    const response = await fetch(process.env.REACT_APP_SERVERS_URL || "http://localhost:7778/api/servers");
    return response.json();
};

export const isValidHost = async (url: string) => {
    if (!url) {
        return false;
    }

    try {
        const response = await fetch(url);

        // TODO: enable response.ok check when backend supports it.
        return response; // && response.ok;
    } catch {
        return false;
    }
};

export const fetchOrganizations = () => {
    return request(`/api/v0/organizations`, { method: "GET" });
};

export const fetchProjects = () => {
    return request(`/api/v0/projects`, { method: "GET" });
};

export const fetchProjectData = (id: string) => {
    return request(`/api/v0/projects/${id}`, { method: "GET" });
};

export const fetchWorkspaces = () => {
    return request(`/api/v0/workspaces`, { method: "GET" });
};

export const fetchSlide = (id: string) => {
    return request(`/api/v0/slides/${id}`, { method: "GET" });
};
