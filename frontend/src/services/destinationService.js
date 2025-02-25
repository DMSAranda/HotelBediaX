/* eslint-disable no-useless-catch */
import destinationsApi from "../apis/detinationsApi";

const BASE_URL = '';

export const findAll = async() => {
    try {
        const response = await destinationsApi.get(`${BASE_URL}/readAll`);
        return response;
    } catch (error) {
        //console.error(error);
        throw error;
    }
}

export const findAllPages = async(page = 0) => {
    try {
        const response = await destinationsApi.get(`${BASE_URL}/page/${page}`);
        return response;
    } catch (error) {
        //console.error(error);
        throw error;
    }
}

export const save = async ({ name, description, countryCode, type }) => {
    try {
        return await destinationsApi.post(`${BASE_URL}/create`, {
            name,
            description,
            countryCode,
            type,
        });
    } catch (error) {
        throw error;
    }
}

export const update = async({ id, name, description, countryCode, type }) => {
    try {
        return await destinationsApi.put(`${BASE_URL}/update/${id}`, {
            name,
            description,
            countryCode,
            type
        });
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        await destinationsApi.delete(`${BASE_URL}/delete/${id}`);
    } catch (error) {
        throw error;
    }
}