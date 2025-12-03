<template>
  <q-dialog v-model="isShowDialogQuestionnaire" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position box-questionnaire-main">
          <div class="box-questionnaire-scroll">
            <div class="header font-mali-b f20" align="center">
              ความพึงพอใจหลังการใช้งาน
              <br />
              Winner English
            </div>

            <div class="q-pa-sm">
              <div
                class="row q-px-md justify-between items-center"
                style="width: 80%; margin: auto"
              >
                <div
                  v-for="i in 5"
                  class="col-1 relative-position box-icon-vote"
                  @click="questionnaireForm.voteStar = i"
                  @mouseenter="questionnaireForm.hoverVoteStar = i"
                  @mouseleave="questionnaireForm.hoverVoteStar = 0"
                >
                  <q-img
                    width="40px"
                    :src="`/images/icon_main/icon-questionnaire-vote-star${
                      questionnaireForm.voteStar >= i ||
                      questionnaireForm.hoverVoteStar >= i
                        ? '-selected'
                        : ''
                    }.png`"
                    class="absolute-center"
                    no-spinner=""
                    no-transition=""
                  ></q-img>
                </div>
              </div>
            </div>

            <div class="q-py-md">
              <div class="row q-px-md">
                <div
                  class="box-vote-item"
                  :class="
                    questionnaireForm.selectedVoteList.includes(itemVote)
                      ? 'active'
                      : ''
                  "
                  v-for="(itemVote, indexVote) in questionnaireForm.voteList"
                  @click="funcSelectedVoteList(itemVote)"
                  :key="indexVote"
                >
                  <span class="f12 font-mali-m">
                    {{ itemVote }}
                  </span>
                </div>
              </div>
            </div>

            <div class="">
              <div
                class="q-pt-xs"
                v-for="(
                  itemQuestion, indexQuestion
                ) in questionnaireForm.questionList"
                :key="indexQuestion"
              >
                <div class="font-mali-sb q-px-md f14">
                  {{ itemQuestion.title }}
                </div>
                <div class="q-py-sm q-px-md row" style="font-size: 13px">
                  <div
                    class="col-4 q-pa-xs"
                    :class="
                      itemChoice.value == 'other' ? 'col-12 row' : 'col-4'
                    "
                    v-for="(itemChoice, indexChoice) in itemQuestion.list"
                    :key="indexChoice"
                  >
                    <div>
                      <q-radio
                        v-model="itemQuestion.selected"
                        dense
                        :val="itemChoice.value"
                        :label="itemChoice.label"
                      />
                    </div>
                    <div
                      class="relative-position"
                      v-if="itemChoice.value == 'other'"
                    >
                      <q-input
                        dense
                        style="
                          width: 120px;
                          height: 30px;
                          border-bottom: 1px solid;
                          margin-top: -8px;
                          margin-left: 10px;
                        "
                        borderless=""
                        :disable="itemQuestion.selected != 'other'"
                        v-model="itemQuestion.otherText"
                      ></q-input>
                    </div>
                  </div>
                </div>
                <q-separator
                  class="q-mb-sm"
                  style="background-color: #f1f1f1; height: 3px"
                ></q-separator>
              </div>
            </div>

            <div class="">
              <div class="q-px-md q-pt-sm q-pb-md">
                <div class="">
                  <q-input
                    type="textarea"
                    input-class="q-pa-sm"
                    dense=""
                    borderless=""
                    class="box-text-area"
                    autogrow
                    placeholder="ข้อเสนอแนะเพิ่มเติม"
                    v-model="questionnaireForm.suggestion"
                  ></q-input>
                </div>
              </div>
            </div>

            <div class="" style="height: 70px" align="center">
              <q-img
                width="250px"
                :src="`/images/button_main/button-questionnaire-confirm${
                  questionnaireForm.isCheckFinishForm() ? '' : '-disble'
                }.png`"
                no-spinner=""
                no-transition=""
                :class="
                  questionnaireForm.isCheckFinishForm() ? 'cursor-pointer' : ''
                "
                @click="
                  questionnaireForm.isCheckFinishForm()
                    ? funcConfirmSaveQuestionnaire()
                    : null
                "
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props, { emit }) {
    const isShowDialogQuestionnaire = ref(true);

    // Vote
    const funcSelectedVoteList = (item) => {
      let findVoteList = questionnaireForm.value.selectedVoteList.find(
        (itemVote) => itemVote == item
      );

      if (findVoteList) {
        questionnaireForm.value.selectedVoteList =
          questionnaireForm.value.selectedVoteList.filter(
            (itemVote) => itemVote != item
          );
        return;
      }

      questionnaireForm.value.selectedVoteList.push(item);
    };

    // Form

    const questionnaireForm = ref({
      voteStar: 0,
      hoverVoteStar: 0,
      voteList: [
        "ราคาคุ้มค่า",
        "เนื้อหาเหมาะสม",
        "กราฟิกสวยงาม",
        "รูปแบบการเรียนน่าสนใจ",
      ],
      selectedVoteList: [],
      questionList: [
        {
          title: "ผู้ตอบแบบสอบถาม",
          list: [
            {
              label: "ผู้ปกครอง",
              value: "parent",
            },
            {
              label: "นักเรียน",
              value: "student",
            },
          ],
          selected: "",
          otherText: "",
          type: "radio",
        },
        {
          title: "ท่านรู้จัก Winner English จากช่องทางไหน",
          list: [
            {
              label: "เพื่อน",
              value: "friend",
            },
            {
              label: "โรงเรียน",
              value: "school",
            },
            {
              label: "SE-ED",
              value: "se-ed",
            },
            {
              label: "Google",
              value: "google",
            },
            {
              label: "Facebook",
              value: "facebook",
            },
            {
              label: "อื่นๆ (ระบุ)",
              value: "other",
            },
          ],
          selected: "",
          otherText: "",
          type: "radio",
        },
        {
          title: "ท่านมีแนวโน้มที่จะแนะนำโปรแกรมให้ผู้อื่น",
          list: [
            {
              label: "ใช่",
              value: "yes",
            },
            {
              label: "ไม่",
              value: "no",
            },
          ],
          selected: "",
          otherText: "",
          type: "radio",
        },
      ],
      suggestion: "",

      // Computed check form
      isCheckFinishForm: () => {
        return (
          questionnaireForm.value.voteStar > 0 &&
          questionnaireForm.value.selectedVoteList.length > 0 &&
          questionnaireForm.value.questionList.every(
            (item) => item.selected != ""
          )
        );
      },
    });

    const funcConfirmSaveQuestionnaire = () => {};

    return {
      // Data
      questionnaireForm,

      // Function
      funcSelectedVoteList,
      funcConfirmSaveQuestionnaire,

      // Boolean
      isShowDialogQuestionnaire,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-questionnaire-main {
  max-width: 360px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 2px 2px;
}

.box-questionnaire-scroll {
  max-height: 550px;
  overflow: auto;
}

.box-questionnaire-scroll::-webkit-scrollbar {
  width: 8px;
}

.box-questionnaire-scroll::-webkit-scrollbar-track {
  background: #fff;
}

.box-questionnaire-scroll::-webkit-scrollbar-thumb {
  background: #828282;
  border: 1px solid #fff;
  border-radius: 10px;
}

.box-questionnaire-main .header {
  padding: 20px 0px;
}

.box-icon-vote {
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  // background-color: #f1f1f1;
  cursor: pointer;
  transition: 0.3s;
  // border-radius: 50%;
  // border: 1.5px solid transparent;
}

// .box-icon-vote:hover,
// .box-icon-vote.active {
//   // background-color: #eff9ff;
//   // border: 1.5px solid #0097ff;
// }

.box-vote-item {
  background-color: #f1f1f1;
  border: 1px solid #d1d1d1;
  border-radius: 50px;
  padding: 3px 10px;
  margin: 4px 5px 4px 0px;
  cursor: pointer;
}

.box-vote-item.active {
  background-color: #eff9ff;
  border: 1px solid #0097ff;
}

.box-text-area {
  background-color: #f1f1f1;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  min-height: 130px;
  max-height: 130px;
  height: 100%;
  overflow: auto;
  cursor: text;
}
</style>
