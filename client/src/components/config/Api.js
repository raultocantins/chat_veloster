import Axios from 'axios'
const Api = Axios.create({
    baseURL:'http://localhost:4000/',
    headers: {}
    
});
export default Api