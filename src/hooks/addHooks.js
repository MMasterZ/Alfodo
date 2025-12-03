import { axios } from "src/boot/axios"

const buycourse = async(items) => {

    let apiUrl = `${process.env.API}/buyCourse`

    await axios.post(apiUrl, items)

}

// ******************************* NEW API *******************************

let APIURL = `${process.env.API}/`;


const addNewsLog = async (newsId,studentId) => {

    APIURL += 'nAddNewsLog';

    let postData = {
        newsId: newsId,
        UID:studentId,
    }

    let response = await axios.post(APIURL, postData);

    return response;
}

export default { buycourse ,addNewsLog }