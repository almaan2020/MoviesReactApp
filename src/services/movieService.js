import http from './httpService';

const apiEndpoint = 'http://localhost:3900/api/movies';

export function getMovies() {
    return http.get(apiEndpoint);
}

export function getMovie(movieId) {
    return http.get(`${apiEndpoint}/${movieId}`);
}

export function saveMovie(movie) {
    if (movie._id) {
        //REST API dosent like two _id in http.put(request url, request data) so we use body instead movie 
        const body = { ...movie };
        delete body._id;
        return http.put(`${apiEndpoint}/${movie._id}`, body);
    }

    return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
    return http.delete(`${apiEndpoint}/${movieId}`)
}