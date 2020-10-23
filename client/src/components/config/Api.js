import Axios from 'axios'
const Api = Axios.create({
    baseURL:'http://localhost:4001/',
    headers: {}
    
});
export default Api