import axios from "axios";

const finishtutorial = async (routeName,practiceType,studentId) => {
  let apiURL =
    `${process.env.API}/finishtutorial`

  let postData = {
    practiceType: practiceType,
    routeName: routeName,
    studentId: studentId,
  };

  let response = await axios.post(apiURL, postData);

  if (response.data) {
    return response.data;
  }
};

export default { finishtutorial };