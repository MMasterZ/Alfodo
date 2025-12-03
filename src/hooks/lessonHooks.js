import axios from "axios";
import { db } from "src/router";

const lesson = () => {

  const grammaraction = async (level, unit,practiceListId ) => {
    
     const apiURL =
       `${process.env.API}/getVideoHelpGrammarByPracticeListId`

     const postData = {
       level: level,
       unit: unit,
       practiceListId: practiceListId,
     };

    const response = await axios.post(apiURL, postData);
    
    if (response.data) {
     return response.data;
    } 
    

  };


  const lessonAll = async (level, unit, skill) => {

    const apiURL =
      `${process.env.API}/getVideoHelpBySkill`

    const postData = {
      level: level,
      unit: unit,
      skill:skill
    };

    const response = await axios.post(apiURL, postData);

    if (response.data) {
      return response.data;
    } 

    // let getData = await db
    //   .collection("practiceList")
    //   .where("level", "==", level)
    //   .where("unit", "==", unit)
    //   .where("skill", "==", "Grammar")
    //   .where("practiceType", "==", "grammarlesson")
    //   .get();

    // let tempList = [];
    // let tempLesson = [];

    // getData.forEach((res) => {
    //   let newData = {
    //     order: res.data().order,
    //     id: res.id,
    //     name: res.data().name,
    //   };
    //   tempList.push(newData);
    // });

    // tempList = [...new Set(tempList)];

    // tempList.sort((a, b) => a.order - b.order);

    // for (let i = 0; i < tempList.length; i++) {
    //   let getLesson = await db
    //     .collection("practiceData")
    //     .doc("server")
    //     .collection("practice")
    //     .where("practiceListId", "==", tempList[i].id)
    //     .get();

    //   getLesson.forEach((resLesson) => {
    //     let newData = {
    //       listOrder: tempList[i].order,
    //       lessOrder: resLesson.data().order,
    //       id: resLesson.id,
    //       imageUrl: resLesson.data().imageUrl,
    //       name: resLesson.data().name,
    //       value: resLesson.id,
    //       label: resLesson.data().name,
    //     };
    //     tempLesson.push(newData);
    //   });
    // }

    // tempLesson.sort(
    //   (a, b) => a.listOrder - b.listOrder || a.lessOrder - b.lessOrder
    // );

    // return tempLesson;

  }
  

  const listening = async (level, unit) => {

    let getData = await db
      .collection("practiceList")
      .where("level", "==", level)
      .where("unit", "==", unit)
      .where("skill", "==", "Listening & Speaking")
      .where("practiceType", "==", "languagetips")
      .get();

    let tempList = [];
    let tempLesson = [];

    getData.forEach((res) => {
      let newData = {
        order: res.data().order,
        id: res.id,
      };
      tempList.push(newData);
    });

    tempList = [...new Set(tempList)];

    tempList.sort((a, b) => a.order - b.order);

    for (let i = 0; i < tempList.length; i++) {
      let getLesson = await db
        .collection("practiceData")
        .doc("server")
        .collection("practice")
        .where("practiceListId", "==", tempList[i].id)
        .get();

      getLesson.forEach((resLesson) => {
        if (!resLesson.data().soundUrl) {
          let newData = {
            listOrder: tempList[i].order,
            lessOrder: resLesson.data().order,
            id: resLesson.id,
            imageUrl: resLesson.data().imageUrl,
            vdoUrl: resLesson.data().vdoUrl,
            name: resLesson.data().name,
            value: resLesson.id,
            label: resLesson.data().name,
          };
          tempLesson.push(newData);
        }
      });
    }

    tempLesson.sort(
      (a, b) => a.listOrder - b.listOrder || a.lessOrder - b.lessOrder
    );

    return tempLesson;
  };

    return { grammaraction, lessonAll,  listening };

}

export default { lesson };