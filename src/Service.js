const baseUrl = 'http://localhost:3000';
const endPoints = {
    'search': '/v1/search',
    'findWeather': '/v1/currentWeather'
}
const dataUrl = (name) => baseUrl + endPoints[name];
export default dataUrl;