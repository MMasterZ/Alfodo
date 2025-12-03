<template>
  <q-dialog
    maximized
    v-model="isShowTutorialDialog"
    persistent
    no-esc-dismiss
    class="z-max"
  >
    <q-card class="transparent no-padding shadow-0">
      <q-card-section
        class="fit row justify-center items-center no-padding no-margin"
        align="center"
      >
        <!-- Desktop -->
        <div
          class="col-12 relative-position box-tutorial"
          align="center"
          v-if="$q.platform.is.desktop"
        >
          <div class="row" style="height: 70px">
            <div class="col-1 q-pa-sm" style="width: 70px"></div>
            <div class="col self-center q-pa-sm">
              <div class="box-title text-bold f20" align="center">วิธีการใช้งาน</div>
            </div>
            <div class="col-1 q-pa-sm" style="width: 70px" align="right">
              <q-btn
                v-if="totalSelected + 1 == totalTutorial"
                dense
                icon="fas fa-times"
                class="text-white f18 bg-red"
                push
                round
                v-close-popup
                @click="funcFinishTutorial()"
              ></q-btn>
            </div>
          </div>

          <div class="row q-py-md">
            <div class="col-1 self-center" style="width: 70px">
              <q-btn
                v-if="currentSelected != 0"
                dense
                round
                push
                class="bg-amber"
                size="20px"
                align="center"
                @click="currentSelected == 0 ? null : currentSelected--"
              >
                <q-icon name="fas fa-chevron-left" size="30px"></q-icon>
              </q-btn>
            </div>
            <div class="col">
              <q-img
                fit="contain"
                v-if="showTutorialList.listPc.length"
                :src="showTutorialList.listPc[currentSelected]"
              ></q-img>
            </div>
            <div class="col-1 self-center" style="width: 70px">
              <q-btn
                v-if="currentSelected + 1 != totalTutorial"
                dense
                round
                push
                class="bg-amber"
                size="20px"
                align="center"
                @click="
                  currentSelected + 1 == totalTutorial ? null : currentSelected++,
                    totalSelected + 1 == totalTutorial ? null : totalSelected++
                "
              >
                <q-icon name="fas fa-chevron-right" size="30px"></q-icon>
              </q-btn>
            </div>
          </div>
        </div>

        <!-- Mobile -->
        <div class="col-12 q-pa-sm" v-else>
          <div class="box-tutorial-mobile">
            <div class="q-pa-sm">
              <div class="box-title text-bold" align="center">วิธีการใช้งาน</div>
            </div>

            <div>
              <div v-if="showTutorialList.listMobile.length">
                <q-img
                  style="max-width: 300px; width: 100%"
                  fit="contain"
                  :src="showTutorialList.listMobile[currentSelected]"
                  no-spinner
                  no-native-menu
                  no-transition
                ></q-img>
              </div>
              <div class="q-pa-md row">
                <div class="col-1" align="left" style="width: 70px">
                  <q-btn
                    v-if="currentSelected != 0"
                    dense
                    round
                    push
                    class="bg-amber"
                    size="20px"
                    align="center"
                    @click="currentSelected == 0 ? null : currentSelected--"
                  >
                    <q-icon name="fas fa-chevron-left" size="30px"></q-icon>
                  </q-btn>
                </div>
                <div class="col self-center" align="center">
                  <q-btn
                    v-if="totalSelected + 1 == totalTutorial"
                    icon="fas fa-times"
                    class="text-white f18 bg-red"
                    push
                    dense
                    v-close-popup
                    style="width: 120px"
                    @click="funcFinishTutorial()"
                  ></q-btn>
                </div>
                <div class="col-1" align="right" style="width: 70px">
                  <q-btn
                    v-if="currentSelected + 1 != totalTutorial"
                    dense
                    round
                    push
                    class="bg-amber"
                    size="20px"
                    align="center"
                    @click="
                      currentSelected + 1 == totalTutorial ? null : currentSelected++,
                        totalSelected + 1 == totalTutorial ? null : totalSelected++
                    "
                  >
                    <q-icon name="fas fa-chevron-right" size="30px"></q-icon>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { genCodeClearCatch } from "src/router";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { axios } from "src/boot/axios";
export default {
  props: {
    isShowTutorial: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "",
    },
    skill: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // Initial Data
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    const currentSelected = ref(0);
    const totalSelected = ref(0);
    const imageUrl = ref(
      "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com"
    );

    const genCode = ref(genCodeClearCatch);

    const tutorialList = ref([
      // profile
      {
        name: "profile",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/lobby/tutorial-profiles-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/lobby/tutorial-profiles-02-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/lobby/tutorial-profiles-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/lobby/tutorial-profiles-02-mobile.jpg?${genCode.value}`,
        ],
      },
      // Lobby
      {
        name: "lobby",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/lobby/tutorial-lobby-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/lobby/tutorial-lobby-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/lobby/tutorial-ranking-01-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/lobby/tutorial-lobby-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/lobby/tutorial-lobby-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/lobby/tutorial-lobby-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/lobby/tutorial-ranking-01-mobile.jpg?${genCode.value}`,
        ],
      },
      // Practice Main
      {
        name: "practicemain",
        type: "school",
        listPc: [
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-school-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-school-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-school-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-school-04-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-school-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-school-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-school-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-school-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-school-05-mobile.jpg?${genCode.value}`,
        ],
      },
      // Practice Main
      {
        name: "practicemain",
        type: "online",
        listPc: [
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-online-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-online-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-online-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-online-04-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-online-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-online-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-online-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-online-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/practicemain/tutorial-practicemain-online-05-mobile.jpg?${genCode.value}`,
        ],
      },
      // Vocabulary
      {
        name: "flashcard",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/vocabulary/tutorial-flashcard-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-flashcard-02-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/vocabulary/tutorial-flashcard-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-flashcard-02-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "matching",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/vocabulary/tutorial-matching-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-matching-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-matching-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-matching-04-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/vocabulary/tutorial-matching-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-matching-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-matching-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-matching-04-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "spellingbee",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/vocabulary/tutorial-spellingbee-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-spellingbee-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-spellingbee-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-spellingbee-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-spellingbee-05-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/vocabulary/tutorial-spellingbee-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-spellingbee-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-spellingbee-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-spellingbee-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-spellingbee-05-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "multiplevocab",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/vocabulary/tutorial-multiplevocab-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-multiplevocab-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-multiplevocab-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-multiplevocab-04-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/vocabulary/tutorial-multiplevocab-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-multiplevocab-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-multiplevocab-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/vocabulary/tutorial-multiplevocab-04-mobile.jpg?${genCode.value}`,
        ],
      },
      // Grammar
      {
        name: "vdolesson",
        type: "grammarlesson",
        listPc: [
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarlesson-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarlesson-02-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarlesson-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarlesson-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarlesson-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarlesson-04-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "grammaraction",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/grammar/tutorial-grammaraction-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammaraction-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammaraction-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammaraction-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammaraction-05-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/grammar/tutorial-grammaraction-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammaraction-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammaraction-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammaraction-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammaraction-05-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "grammarmultiple",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarmultiple-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarmultiple-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarmultiple-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarmultiple-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarmultiple-05-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarmultiple-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarmultiple-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarmultiple-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarmultiple-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/grammar/tutorial-grammarmultiple-05-mobile.jpg?${genCode.value}`,
        ],
      },
      // Reading
      {
        name: "readingmultiple",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-05-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-06-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-07-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-05-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/reading/tutorial-readingmultiple-06-mobile.jpg?${genCode.value}`,
        ],
      },
      // translation
      {
        name: "translation",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/writing/tutorial-translation-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-05-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-06-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-07-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/writing/tutorial-translation-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-05-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-06-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/writing/tutorial-translation-07-mobile.jpg?${genCode.value}`,
        ],
      },
      // Phonics
      {
        name: "vdolesson",
        type: "phonicslesson",
        listPc: [
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicslesson-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicslesson-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicslesson-03-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicslesson-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicslesson-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicslesson-03-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "phonicsmultiple",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-05-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-05-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/tutorial-phonicsmultiple-06-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "phonicsmultiple",
        type: "answersound",
        listPc: [
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-05-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-05-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-answersound-06-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "phonicsmultiple",
        type: "questionsound",
        listPc: [
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-05-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-05-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/phonics/tutorial-phonicsmultiple-questionsound-06-mobile.jpg?${genCode.value}`,
        ],
      },
      // Listening And Speaking
      {
        name: "vdolesson",
        type: "languagetips",
        listPc: [
          `${imageUrl.value}/tutorial/listening/tutorial-languagetips-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetips-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetips-03-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/listening/tutorial-languagetips-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetips-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetips-03-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "languagetipmultiple",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/listening/tutorial-languagetipsmultiple-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetipsmultiple-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetipsmultiple-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetipsmultiple-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetipsmultiple-05-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/listening/tutorial-languagetipsmultiple-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetipsmultiple-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetipsmultiple-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetipsmultiple-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-languagetipsmultiple-05-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "conversationlesson",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/listening/tutorial-conversation-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversation-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversation-03-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/listening/tutorial-conversation-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversation-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversation-03-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "conversationmultiple",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/listening/tutorial-conversationmultiple-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversationmultiple-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversationmultiple-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversationmultiple-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversationmultiple-05-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/listening/tutorial-conversationmultiple-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversationmultiple-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversationmultiple-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversationmultiple-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-conversationmultiple-05-mobile.jpg?${genCode.value}`,
        ],
      },
      {
        name: "roleplay",
        type: "",
        listPc: [
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-01-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-02-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-03-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-04-pc.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-05-pc.jpg?${genCode.value}`,
        ],
        listMobile: [
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-01-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-02-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-03-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-04-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-05-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-06-mobile.jpg?${genCode.value}`,
          `${imageUrl.value}/tutorial/listening/tutorial-roleplay-07-mobile.jpg?${genCode.value}`,
        ],
      },
    ]);

    const totalTutorial = computed(() => {
      let findTutorial = tutorialList.value.filter(
        (x) => x.name == route.name && x.type == props.type
      );

      if ($q.platform.is.desktop) {
        findTutorial = findTutorial[0].listPc.length;
      } else {
        findTutorial = findTutorial[0].listMobile.length;
      }

      return findTutorial;
    });
    const isShowTutorialDialog = ref(false);

    const funcCheckIsSeenTutorial = async () => {
      const url = `${process.env.NEWAPI}/tutorial-check`;
      const $studentStore = useStudentStore();
      const studentId = $studentStore.studentId;
      const data = {
        studentId: studentId,
        routeName: route.name,
        skill: props.skill,
      };
      const response = await axios.get(url, { params: data });
      return response.data.isPassedTutorial;
    };
    const showTutorialList = ref([]);
    const funcLoadTutorial = async () => {
      let isSeenTutorial = await funcCheckIsSeenTutorial();

      if (!isSeenTutorial) {
        let findTutorial = tutorialList.value.filter(
          (x) => x.name == route.name && x.type == props.type
        );

        showTutorialList.value = findTutorial[0];
        isShowTutorialDialog.value = true;
        saveIsSeenTutorial();
      }
    };

    const saveIsSeenTutorial = async () => {
      const url = `${process.env.NEWAPI}/tutorial-saveTutorial`;
      const $studentStore = useStudentStore();
      const studentId = $studentStore.studentId;
      const data = {
        studentId: studentId,
        routeName: route.name,
        skill: props.skill,
      };
      const response = await axios.post(url, data);
      return response.data.isPassedTutorial;
    };

    const funcFinishTutorial = async () => {
      const systemStore = useSystemStore();
      await systemStore.updateTutorial();
    };

    onMounted(() => {
      funcLoadTutorial();
    });

    return {
      currentSelected,
      totalTutorial,
      totalSelected,
      funcFinishTutorial,
      tutorialList,
      showTutorialList,
      isShowTutorialDialog,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-title {
  max-width: 300px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 2px 1px 0px rgb(199, 190, 190);
  border-radius: 10px;
  padding: 7px;
}

.box-tutorial {
  max-width: 1200px;
  width: 100%;
  min-height: 300px;
  max-height: fit-content;
  background-color: #fff1d6;
  border: 10px solid#FA9815;
  border-radius: 20px;
  overflow: hidden;
}

.box-tutorial-mobile {
  max-width: 450px;
  width: 95%;
  background-color: #fff1d6;
  border: 10px solid#FA9815;
  border-radius: 20px;
}
</style>
