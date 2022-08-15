import { getAxiosInstance } from ".";

export const getMovies = async () => {
    const api = getAxiosInstance;
    const data = await api.get('movie');
    return data;
}