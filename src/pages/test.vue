<template>
  <div
    class="flex flex-center"
    style="height: 100vh; background-color: #141414"
  >
    <q-toolbar class="absolute-top">
      <q-toolbar-title>
        <div
          class="text-red text-weight-bold q-px-xl q-pt-md text-h4"
          style="letter-spacing: 4px"
        >
          IMPORT
        </div></q-toolbar-title
      >
    </q-toolbar>
    <div class="row justify-center" style="width: 100%">
      <div
        class="col-12 text-white text-h3 text-weight-bold q-pb-lg"
        align="center"
      >
        เลือกเมนู
      </div>
      <div class="col-12" align="center">
        <q-btn
          label="import questionpool"
          @click="importQuestionPool()"
          color="white"
          text-color="black"
        ></q-btn>
      </div>
      <div class="q-pa-lg" style="width: 250px">
        <q-card
          @click="importPracticeList()"
          class="card1-bg cursor-pointer card-hover relative-position"
          style="height: 200px; width: 200px"
        >
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 30px;
            "
            class="bg-white absolute"
          ></div>
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 150px;
            "
            class="bg-white absolute"
          ></div>

          <div
            style="
              width: 80px;
              height: 20px;
              border-radius: 5px;
              top: 120px;
              left: 60px;
            "
            class="bg-white absolute"
          ></div>
          <div
            align="center"
            class="text-white text-h5 q-pt-md absolute"
            style="bottom: -40px; width: 100%"
          >
            Practice List
          </div>
        </q-card>
      </div>
      <div class="q-pa-lg" style="width: 250px">
        <q-card
          class="card2-bg cursor-pointer card-hover relative-position"
          style="height: 200px; width: 200px"
          @click="
            (importMode = 'practice'), (isShowDialogImportPracticeData = true)
          "
        >
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 30px;
            "
            class="bg-white absolute"
          ></div>
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 150px;
            "
            class="bg-white absolute"
          ></div>

          <div
            style="
              width: 80px;
              height: 20px;
              border-radius: 5px;
              top: 120px;
              left: 60px;
            "
            class="bg-white absolute"
          ></div>
          <div
            align="center"
            class="text-white text-h5 q-pt-md absolute"
            style="bottom: -40px; width: 100%"
          >
            Practice Data
          </div>
        </q-card>
      </div>

      <div class="q-pa-lg" style="width: 250px">
        <q-card
          class="card3-bg cursor-pointer card-hover relative-position"
          style="height: 200px; width: 200px"
          @click="
            (importMode = 'reading'), (isShowDialogImportPracticeData = true)
          "
        >
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 30px;
            "
            class="bg-white absolute"
          ></div>
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 150px;
            "
            class="bg-white absolute"
          ></div>

          <div
            style="
              width: 80px;
              height: 20px;
              border-radius: 5px;
              top: 120px;
              left: 60px;
            "
            class="bg-white absolute"
          ></div>
          <div
            align="center"
            class="text-white text-h5 q-pt-md absolute"
            style="bottom: -40px; width: 100%"
          >
            Reading
          </div>
        </q-card>
      </div>

      <div class="q-pa-lg" style="width: 250px">
        <q-card
          class="card4-bg cursor-pointer card-hover relative-position"
          style="height: 200px; width: 200px"
          @click="fixPartOfSpeech()"
        >
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 30px;
            "
            class="bg-white absolute"
          ></div>
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 150px;
            "
            class="bg-white absolute"
          ></div>

          <div
            style="
              width: 80px;
              height: 20px;
              border-radius: 5px;
              top: 120px;
              left: 60px;
            "
            class="bg-white absolute"
          ></div>
          <div
            align="center"
            class="text-white text-h5 q-pt-md absolute"
            style="bottom: -40px; width: 100%"
          >
            PartOfSpeech
          </div>
        </q-card>
      </div>

      <div class="q-pa-lg" style="width: 250px">
        <q-card
          class="card5-bg cursor-pointer card-hover relative-position"
          style="height: 200px; width: 200px"
          @click="importFlashcardExtraVocab()"
        >
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 30px;
            "
            class="bg-white absolute"
          ></div>
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 150px;
            "
            class="bg-white absolute"
          ></div>

          <div
            style="
              width: 80px;
              height: 20px;
              border-radius: 5px;
              top: 120px;
              left: 60px;
            "
            class="bg-white absolute"
          ></div>
          <div
            align="center"
            class="text-white text-h5 q-pt-md absolute"
            style="bottom: -40px; width: 100%"
          >
            Extra Vocab
          </div>
        </q-card>
      </div>

      <div class="q-pa-lg" style="width: 250px">
        <q-card
          class="card6-bg cursor-pointer card-hover relative-position"
          style="height: 200px; width: 200px"
          @click="importPracticeListName()"
        >
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 30px;
            "
            class="bg-white absolute"
          ></div>
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 150px;
            "
            class="bg-white absolute"
          ></div>

          <div
            style="
              width: 80px;
              height: 20px;
              border-radius: 5px;
              top: 120px;
              left: 60px;
            "
            class="bg-white absolute"
          ></div>
          <div
            align="center"
            class="text-white text-h5 q-pt-md absolute"
            style="bottom: -40px; width: 100%"
          >
            PracticeListName
          </div>
        </q-card>
      </div>
      <div class="q-pa-lg" style="width: 250px">
        <q-card
          class="card7-bg cursor-pointer card-hover relative-position"
          style="height: 200px; width: 200px"
          @click="importConversationLesson()"
        >
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 30px;
            "
            class="bg-white absolute"
          ></div>
          <div
            style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              top: 50px;
              left: 150px;
            "
            class="bg-white absolute"
          ></div>

          <div
            style="
              width: 80px;
              height: 20px;
              border-radius: 5px;
              top: 120px;
              left: 60px;
            "
            class="bg-white absolute"
          ></div>
          <div
            align="center"
            class="text-white text-h5 q-pt-md absolute"
            style="bottom: -40px; width: 100%"
          >
            Conver Lesson
          </div>
        </q-card>
      </div>
      <!-- Delete Level != 13 -->
      <!-- <div class="col-12 q-pt-lg" align="center">
        <q-btn
          label="Delete Level < 12"
          @click="deletePracticeList()"
          icon="fas fa-trash"
          color="red"
        ></q-btn>
      </div> -->
    </div>

    <q-dialog v-model="isShowDialogImportPracticeData" persistent="">
      <q-card style="width: 500px">
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3 text-grey-7"
          active-color="primary"
          indicator-color="purple"
          align="justify"
        >
          <q-tab name="byLevel" label="By Level" />
          <q-tab name="byLevelUnit" label="By Level & Unit" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="text-white">
          <q-tab-panel name="byLevel">
            <div class="text-black text-h6" align="center">
              {{ importMode }}
            </div>
            <div class="text-h6 text-black">เลือกเลเวล</div>
            <q-select
              :options="[
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
              ]"
              v-model="level"
              label="เลเวล"
            ></q-select>
            <div align="center" class="q-pt-md q-gutter-sm">
              <q-btn
                v-close-popup
                label="ยกเลิก"
                class="text-black"
                flat
              ></q-btn>
              <q-btn
                @click="importPracticeDataByLevel()"
                label="ตกลง"
                class="text-white bg-primary"
              ></q-btn>
            </div>
          </q-tab-panel>

          <q-tab-panel name="byLevelUnit">
            <div class="text-h6 text-black">เลือกเลเวล / ยูนิต</div>
            <q-select
              :options="[
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
              ]"
              v-model="level"
              label="เลเวล"
            ></q-select>
            <q-select
              :options="[
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
              ]"
              v-model="unit"
              label="ยูนิต"
            ></q-select>
            <div align="center" class="q-pt-md q-gutter-sm">
              <q-btn
                v-close-popup
                label="ยกเลิก"
                class="text-black"
                flat
              ></q-btn>
              <q-btn
                @click="importPracticeDataByLevelUnit()"
                label="ตกลง"
                class="text-white bg-primary"
              ></q-btn>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { db, st, ts } from "src/router";
import { useQuasar } from "quasar";
import { ref } from "vue";
export default {
  setup() {
    const $q = useQuasar();
    const importPracticeList = async () => {
      $q.dialog({
        title: "Confirm",
        message: "Would you like to confirm import data",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        $q.loading.show();
        let url =
          "https://us-central1-winneradventure-ed4a1.cloudfunctions.net/adventureFunctions/getPracticeList";
        let response = await axios.get(url);
        $q.loading.hide();

        const data = response.data;

        console.log(data);

        data.forEach((element, index) => {
          let newData = { ...element };
          delete newData.practiceListId;
          db.collection("practiceList")
            .doc(element.practiceListId)
            .set(newData)
            .then(() => {
              console.log("setted");
            });
        });
      });
    };

    const isShowDialogImportPracticeData = ref(false);

    const tab = ref("byLevel");
    const deletePracticeList = () => {
      db.collection("practiceList")
        .where("level", "!=", "13")
        .get()
        .then((doc) => {
          doc.forEach((element) => {
            db.collection("practiceList")
              .doc(element.id)
              .delete()
              .then(() => {
                console.log("deleted");
              });
          });
        });
    };

    const level = ref("1");
    const unit = ref("1");

    const importMode = ref("practice");

    const importPracticeDataByLevel = async () => {
      console.log(importMode.value);
      if (importMode.value == "reading") {
        importReadingContentByLevel();
      } else if (importMode.value == "conversationLesson") {
        confirmImportConversationLessonByLevel();
      } else {
        const url =
          "https://us-central1-winneradventure-ed4a1.cloudfunctions.net/adventureFunctions/getPracticeData";
        const response = await axios.post(url, {
          level: level.value,
          isUnit: false,
        });
        console.log(response.data);

        const responseData = response.data;

        console.log(responseData.length);
        responseData.forEach((element) => {
          element.timestamp = ts;
          db.collection("practiceData")
            .doc("draft")
            .collection("practice")
            .doc(element.id)
            .set(element)
            .then(() => {
              console.log("setted");
            });
        });
      }
    };

    const importPracticeDataByLevelUnit = async () => {
      if (importMode.value == "reading") {
        importReadingContentByLevelUnit();
      } else if (importMode.value == "conversationLesson") {
        confirmImportConversationLessonByLevelUnit();
      } else {
        const url =
          "https://us-central1-winneradventure-ed4a1.cloudfunctions.net/adventureFunctions/getPracticeData";
        const response = await axios.post(url, {
          level: level.value,
          unit: unit.value,
          isUnit: true,
        });
        console.log(response.data);
        const responseData = response.data;
        console.log(responseData.length);
        responseData.forEach((element) => {
          element.timestamp = ts;
          console.log(element);
          db.collection("practiceData")
            .doc("draft")
            .collection("practice")
            .doc(element.id)
            .set(element)
            .then(() => {
              console.log("setted");
            });
        });
      }
    };

    const importReadingContentByLevel = async () => {
      $q.loading.show();
      const url =
        "https://us-central1-winneradventure-ed4a1.cloudfunctions.net/adventureFunctions/getReadingContent";
      const response = await axios.post(url, {
        level: level.value,
        unit: unit.value,
        isUnit: false,
      });

      let counter = 0;

      responseData.forEach((element) => {
        db.collection("readingContent")
          .doc("draft")
          .collection("content")
          .doc(element.id)
          .set(element)
          .then(() => {
            counter++;

            if (counter == responseData.length) {
              $q.loading.hide();
            }
            console.log("setted");
          });
      });

      console.log(response.data);
    };

    const importReadingContentByLevelUnit = async () => {
      const url =
        "https://us-central1-winneradventure-ed4a1.cloudfunctions.net/adventureFunctions/getReadingContent";
      const response = await axios.post(url, {
        level: level.value,
        unit: unit.value,
        isUnit: true,
      });

      const responseData = response.data;
      console.log(responseData.length);

      responseData
        .forEach((element) => {
          element.timestamp = ts;
          db.collection("readingContent")
            .doc("draft")
            .collection("content")
            .doc(element.id)
            .set(element);
        })
        .then(() => {
          console.log("setted");
        });

      console.log(response.data);
    };

    const fixPartOfSpeech = async () => {
      $q.dialog({
        title: "Confirm",
        message: "Would you like to Convert PartOfSpeech",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        db.collection("practiceList")
          .where("practiceType", "==", "flashcard")
          .get()
          .then((doc) => {
            let tempPracticeListId = [];
            doc.forEach((element) => {
              tempPracticeListId.push(element.id);
            });

            tempPracticeListId.forEach((flashcardId) => {
              db.collection("practiceData")
                .doc("draft")
                .collection("practice")
                .where("practiceListId", "==", flashcardId)
                .get()
                .then((p) => {
                  p.forEach((pElement) => {
                    let data = pElement.data().partOfSpeech;
                    let tempFix;

                    if (data == "adj.") {
                      tempFix = {
                        des: "adjective (คุณศัพท์)",
                        label: "adjective (คุณศัพท์)",
                        partOfSpeech: "adj.",
                        value: "AEc6mv8nUrwK6MUxSsGS",
                      };
                    } else if (data == "adv.") {
                      tempFix = {
                        des: "adverb (คำวิเศษณ์)",
                        label: "adverb (คำวิเศษณ์)",
                        partOfSpeech: "adv.",
                        value: "5P4tZcqXo6f9m1bKPjlI",
                      };
                    } else if (data == "conj.") {
                      tempFix = {
                        des: "conjunction (สันธาน)",
                        label: "conjunction (สันธาน)",
                        partOfSpeech: "conj.",
                        value: "eWVVxUofnK98sXgIkoKn",
                      };
                    } else if (data == "det.") {
                      tempFix = {
                        des: "determiner (คำกำกับนาม)",
                        label: "determiner (คำกำกับนาม)",
                        partOfSpeech: "det.",
                        value: "MnBbVZgoTAvKVf6KJUR6",
                      };
                    } else if (data == "n.") {
                      tempFix = {
                        des: "noun (คำนาม)",
                        label: "noun (คำนาม)",
                        partOfSpeech: "n.",
                        value: "rLRo2hShB1Ai05PDQPjd",
                      };
                    } else if (data == "v.") {
                      tempFix = {
                        des: "verb (กริยา)",
                        label: "verb (กริยา)",
                        partOfSpeech: "v.",
                        value: "nFNj5sU4OeqQ6hYGX3Ra",
                      };
                    } else if (data == "pron.") {
                      tempFix = {
                        des: "pronoun (สรรพนาม)",
                        label: "pronoun (สรรพนาม)",
                        partOfSpeech: "pron.",
                        value: "7XAvUqomqq6DOrKQ7M1v",
                      };
                    } else if (data == "prep.") {
                      tempFix = {
                        des: "preposition (บุพบท)",
                        label: "preposition (บุพบท)",
                        partOfSpeech: "prep.",
                        value: "CnBISjIeMuR6rkvakXlO",
                      };
                    } else {
                      // ไม่ระบุ
                      tempFix = {
                        des: "ไม่ระบุ",
                        label: "ไม่ระบุ",
                        partOfSpeech: "ไม่ระบุ",
                        value: "FsAjOyiSm03cZmPe0KqX",
                      };
                    }

                    db.collection("practiceData")
                      .doc("draft")
                      .collection("practice")
                      .doc(pElement.id)
                      .update({
                        partOfSpeech: tempFix,
                      })
                      .then(() => {
                        console.log("fixed");
                      });
                  });
                });
            });
          });
      });
    };

    const importFlashcardExtraVocab = async () => {
      $q.dialog({
        title: "Confirm",
        message: "Would you like to Convert PartOfSpeech",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        let level = "12";
        console.log(level);
        db.collection("practiceList")
          .where("practiceType", "==", "flashcard")
          .where("level", "==", level)
          .get()
          .then((doc) => {
            let tempPracticeListId = [];
            doc.forEach((element) => {
              tempPracticeListId.push(element.id);
            });

            tempPracticeListId.forEach((flashcardId) => {
              db.collection("practiceData")
                .doc("draft")
                .collection("practice")
                .where("practiceListId", "==", flashcardId)
                .get()
                .then((p) => {
                  p.forEach(async (pElement) => {
                    const url =
                      "http://localhost:5000/winneradventure-ed4a1/us-central1/adventureFunctions/getExtraVocab";
                    const response = await axios.post(url, {
                      questionId: pElement.id,
                    });
                    const responseData = response.data;
                    db.collection("practiceData")
                      .doc("draft")
                      .collection("practice")
                      .doc(pElement.id)
                      .update({
                        extraVocab: responseData,
                      })
                      .then(() => {
                        console.log("updated");
                      });
                  });
                });
            });
          });
      });
    };

    const importPracticeListName = async () => {
      $q.dialog({
        title: "Confirm",
        message: "Would you like to Convert PartOfSpeech",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const url =
          "http://localhost:5000/winneradventure-ed4a1/us-central1/adventureFunctions/getPracticeListName";
        const response = await axios.get(url);
        const data = response.data;
        data.forEach((element) => {
          db.collection("practiceListName")
            .add(element)
            .then(() => {
              console.log("added");
            });
        });
      });
    };

    const importConversationLesson = () => {
      importMode.value = "conversationLesson";
      isShowDialogImportPracticeData.value = true;
    };

    const confirmImportConversationLessonByLevel = async () => {
      console.log("1234");

      const url =
        "http://localhost:5000/winneradventure-ed4a1/us-central1/adventureFunctions/getConversationLesson";
      const postData = { level: level.value, unit: unit.value, isUnit: false };
      const response = await axios.post(url, postData);

      const responseData = response.data;
      console.log(responseData);

      responseData.forEach((element) => {
        let copyElement = { ...element };
        delete copyElement.id;
        console.log(element);
        // db.collection("practiceData")
        //   .doc("draft")
        //   .collection("practice")
        //   .doc(element.id)
        //   .set(copyElement)
        //   .then(() => {
        // console.log("updated");
        //   });
        console.log(element);

        db.collection("practiceData")
          .doc("draft")
          .collection("practice")
          .where("practiceListId", "==", element.practiceListId)
          .get()
          .then((doc) => {
            doc.forEach((pElement) => {
              db.collection("practiceData")
                .doc("draft")
                .collection("practice")
                .doc(pElement.id)
                .collection("sentence")
                .doc(element.id)
                .set(copyElement)
                .then(() => {
                  console.log("updated");
                });
            });
          });
      });
    };

    const confirmImportConversationLessonByLevelUnit = async () => {
      const url =
        "http://localhost:5000/winneradventure-ed4a1/us-central1/adventureFunctions/getConversationLesson";
      const postData = { level: level.value, unit: unit.value, isUnit: true };
      const response = await axios.post(url, postData);

      const responseData = response.data;
      console.log(responseData);

      responseData.forEach((element) => {
        let copyElement = { ...element };
        delete copyElement.id;
      });

      // console.log(response.data);
    };

    const importQuestionPool = async () => {
      $q.loading.show();
      // const url =
      //   "http://localhost:5000/winneradventure-ed4a1/us-central1/adventureFunctions/getQuestionPool";
      // const response = await axios.get(url);

      // const data = response.data;

      // data.forEach((element) => {
      //   element.syncStatus = "updated";
      //   db.collection("questionpool")
      //     .doc("draft")
      //     .collection("practice")
      //     .doc(element.id)
      //     .set(element)
      //     .then(() => {
      //       console.log("set");
      //     });

      //   db.collection("questionpool")
      //     .doc("server")
      //     .collection("practice")
      //     .doc(element.id)
      //     .set(element)
      //     .then(() => {
      //       console.log("set");
      //     });
      // });

      db.collection("questionpool")
        .doc("draft")
        .collection("practice")
        .where("level", "==", "12")
        .get()
        .then((doc) => {
          console.log(doc.size);
          doc.forEach((element) => {
            db.collection("questionpool")
              .doc("draft")
              .collection("practice")
              .doc(element.id)
              .get()
              .then((qDoc) => {
                if (qDoc.data().instrunctionTh) {
                  db.collection("questionpool")
                    .doc("draft")
                    .collection("practice")
                    .doc(element.id)
                    .update({
                      instructionTh: qDoc.data().instrunctionTh,
                      instrunctionTh: firebase.firestore.FieldValue.delete(),
                    })
                    .then(() => {
                      console.log("yes");
                    });
                } else {
                  console.log("no");
                }
              });
          });
        });
      $q.loading.hide();
    };

    return {
      importPracticeList,
      isShowDialogImportPracticeData,
      tab,
      deletePracticeList,
      level,
      unit,
      importPracticeDataByLevel,
      importPracticeDataByLevelUnit,
      importMode,
      importReadingContentByLevel,
      importReadingContentByLevelUnit,
      fixPartOfSpeech,
      importFlashcardExtraVocab,
      importPracticeListName,
      importConversationLesson,
      importQuestionPool,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-hover:hover {
  border: 3px solid white;
}
.card1-bg {
  background-image: linear-gradient(#426cf5, #90a8f5);
}
.card2-bg {
  background-image: linear-gradient(#fac125, #fae4a7);
}
.card3-bg {
  background-image: linear-gradient(#069c33, #56d8a6);
}
.card4-bg {
  background-image: linear-gradient(#f54e80, #a70e0e);
}
.card5-bg {
  background-image: linear-gradient(#ce7604, #fcaf67);
}
.card6-bg {
  background-image: linear-gradient(#302d29, #070401);
}
.card7-bg {
  background-image: linear-gradient(#f54cec, #9e0ae2);
}
</style>
