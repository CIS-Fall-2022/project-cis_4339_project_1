import axios from "axios";


export const mydata = () => {
    var host = import.meta.env.VITE_ROOT_API
    let apiUrl = `${host}/organization/organizationdata`
    return axios.get(apiUrl).then((response) => response);
}