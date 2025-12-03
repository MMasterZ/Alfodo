import axios from "src/boot/axios";
import { db,auth } from "src/router";

const student =  (uid) => {
 
  const course = async (studentId) => {

     let apiUrl =
       `${process.env.API}/getAllCourse/?studentId=`

    let response = await axios.get(apiUrl + studentId);
    

     if (response.data) {
       return response.data;
     } else {
       return false;
    }
  
  };

  return { course };
};

export default { student };
