<template>
  <div class="content-container row">
    <div class="row fit relative-position">
      <div class="col-12" style="height: 10%"></div>
      <div class="col-12 relative-position box-chat-container row items-end">
        <div
          class="col-12 self-start fit"
          v-if="storyData.question.type == 'translation'"
        >
          <question :storyData="storyData"></question>
        </div>

        <!-- Message -->
        <div
          class="self-end col-12"
          v-if="
            storyData.chat.length && storyData.question.type != 'translation'
          "
        >
          <div
            class="relative-position box-chat"
            v-for="(item, index) in storyData.chat"
            :type="item.isUser ? 'user' : 'npc'"
          >
            <span v-html="item.message"> </span>
          </div>
        </div>
      </div>
      <div class="col-12 row self-end" style="height: 60%">
        <!-- <div class="col-12 relative-position " style="height: 55%"></div> -->
        <div
          class="col-12 relative-position self-end"
          style="height: 50%; padding: 0% 5% 10% 5%"
        >
          <div
            class="absolute-center"
            :style="!storyData.question.isQuestion ? 'z-index:3' : ''"
            style="max-width: 370px; width: 200%; left: 25%; top: -15%"
          >
            <div>
              <character :isPet="false"></character>
            </div>
          </div>
          <div
            class="absolute-center"
            style="max-width: 370px; width: 200%; left: 75%; top: -15%"
            :style="storyData.question.isQuestion ? 'z-index:3' : ''"
          >
            <div>
              <character :isPet="false"></character>
            </div>
          </div>

          <div class="row">
            <div
              class="box-name-npc font-mali-m"
              v-if="!storyData.question.isQuestion"
            >
              <span v-if="!storyData.question.isQuestion">{{ `Jisoo` }}</span>
            </div>
            <q-space></q-space>
            <div
              class="box-name-user font-mali-m"
              v-if="storyData.question.isQuestion"
            >
              <span>{{ `${studentStore.studentFullName}` }}</span>
            </div>
          </div>
          <div class="box-content relative-position font-mali-m">
            <div class="fit">
              <div class="fit row">
                <div
                  class="col-12 font-mali-m"
                  style="height: 80%; padding: 0% 0.5%"
                >
                  <!-- Practice -->
                  <div v-if="storyData.type == 'practice'">
                    <div>
                      <div>
                        <!-- Message  -->
                        <div
                          v-if="!storyData.question.isQuestion"
                          style="padding: 0.5%"
                        >
                          <span class="text-message">
                            {{ storyData.question.message }}
                          </span>
                        </div>

                        <!-- Question -->
                        <div v-else>
                          <!-- Type : Input -->
                          <div
                            v-if="storyData.question.type == 'input'"
                            style="padding: 0.3%"
                          >
                            <span class="text-hint">{{
                              storyData.question.hint
                            }}</span>
                            <div class="row" style="padding: 0.5% 0%">
                              <div
                                class="col-1 width-fit self-center"
                                v-for="(item, index) in storyData.question
                                  .message"
                              >
                                <div
                                  class="text-message"
                                  v-html="item.message"
                                  v-if="!item.isAnswer"
                                ></div>
                                <div v-if="item.isAnswer">
                                  <input
                                    :readonly="storyData.question.isSendAnswer"
                                    v-model.trim="item.currentAnswer"
                                    class="inputType font-mali-m"
                                    type="text"
                                    placeholder="Enter answer"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Type : Multiple Choices -->
                          <div
                            v-if="storyData.question.type == 'multiplechoices'"
                            style="padding: 0.3%"
                          >
                            <span class="text-hint">{{
                              storyData.question.hint
                            }}</span>
                            <div class="row" style="padding: 1% 0%">
                              <div
                                v-for="(answer, indexAnswer) in storyData
                                  .question.choices"
                                class="button-choices"
                                :style="
                                  storyData.question.isCorrect
                                    ? 'cursor:auto'
                                    : ''
                                "
                                :type="
                                  answer.isSendAnswer
                                    ? storyData.question.selected == indexAnswer
                                      ? storyData.question.isCorrect
                                        ? 'correct'
                                        : 'incorrect'
                                      : 'incorrect'
                                    : storyData.question.selected == indexAnswer
                                    ? 'selected'
                                    : 'default'
                                "
                                @click="
                                  storyData.question.isCorrect
                                    ? null
                                    : (storyData.question.selected =
                                        indexAnswer)
                                "
                              >
                                <div
                                  class="text-message"
                                  v-html="`${answer.answer}`"
                                ></div>
                              </div>
                            </div>
                          </div>

                          <!-- Type : Translation -->
                          <div
                            v-if="storyData.question.type == 'translation'"
                            style="padding: 0.3%"
                          >
                            <translation :storyData="storyData"></translation>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Roleplay -->
                  <div v-if="storyData.type == 'roleplay'">
                    <div v-for="(item, index) in storyData.list">
                      <div v-if="index == storyData.currentState">
                        <!-- Message  -->
                        <div v-if="!item.isQuestion" style="padding: 0.5%">
                          <span class="text-message"> {{ item.message }} </span>
                        </div>

                        <!-- Question -->
                        <div v-else>
                          <!-- Type : Input -->
                          <div style="padding: 0.3%">
                            <span class="text-hint">{{
                              `พูดอัดเสียงให้ถูกต้อง`
                            }}</span>
                            <div class="row" style="padding: 0.5% 0%">
                              <div
                                class="text-message"
                                v-html="item.message"
                              ></div>
                            </div>
                          </div>

                          <!-- Type : Roleplay -->
                          <div
                            class="
                              absolute-center
                              fit
                              row
                              justify-center
                              items-center
                            "
                            style="padding: 1.5%; z-index: 2"
                          >
                            <q-img
                              v-if="item.soundRecorder"
                              no-transition
                              class="self-end cursor-pointer"
                              width="12%"
                              src="/images/icon_main/icon-play.png"
                              style="margin: 5% 2%"
                            ></q-img>

                            <q-img
                              v-if="!item.isRecorder"
                              no-transition
                              class="self-end cursor-pointer"
                              width="12%"
                              src="/images/icon_main/icon-mic.png"
                              style="margin: 5% 2%"
                              @click="storyData.func.recordStart()"
                            ></q-img>

                            <q-img
                              v-if="item.isRecorder"
                              no-transition
                              no-spinner
                              class="self-end cursor-pointer"
                              width="12%"
                              src="/images/icon_main/icon-process.png"
                              style="margin: 5% 2%"
                            ></q-img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Button Next -->
                  <div
                    class="absolute-bottom-right"
                    style="bottom: 5%; right: 2%; z-index: 2"
                    v-if="
                      !storyData.question.isQuestion ||
                      (storyData.question.isQuestion &&
                        checkAnswerForQuestion &&
                        storyData.question.type == 'input') ||
                      (storyData.question.isQuestion &&
                        storyData.question.selected != null &&
                        storyData.question.type == 'multiplechoices' &&
                        !storyData.question.isCorrect) ||
                      (storyData.question.isQuestion &&
                        storyData.question.soundRecorder)
                    "
                  >
                    <span
                      class="font-mali-m text-next cursor-pointer"
                      @click="storyData.func.nextState()"
                    >
                      {{ `Next >>` }}
                    </span>
                  </div>
                </div>
                <div
                  class="col-12 self-end relative-position"
                  style="height: 30px"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="fit col-12 absolute-center"
          style="background-color: rgba(0, 0, 0, 0.5); z-index: 2"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import question from "components/story_main/question.vue";
import translation from "components/story_main/translation.vue";
import character from "components/character_main/character.vue";
import { computed } from "@vue/runtime-core";
export default {
  components: {
    character,

    // Practice
    question,
    translation,
  },
  props: {
    storyData: {
      type: Object,
      default: () => {},
    },
    studentStore: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const checkAnswerForQuestion = computed(() => {
      let story = props.storyData.question;
      if (props.storyData.type == "practice") {
        if (story.type == "input") {
          let answerLength = story.message.filter((x) => x.isAnswer).length;
          let checkAnswer = story.message.filter(
            (x) => x.currentAnswer != ""
          ).length;

          if (checkAnswer == answerLength) {
            return true;
          } else {
            return false;
          }
        }
      }

      return false;
    });

    return { checkAnswerForQuestion };
  },
};
</script>

<style lang="scss" scoped>
.content-container {
  width: 100%;
  margin: auto;
  height: 100%;
  overflow-x: hidden;
  background-image: url("/images/background_main/background-story.png");
  background-repeat: no-repeat;
  background-position: 50% 100%;
}

.box-chat-container {
  height: 30%;
  padding-top: 12%;
}

.box-chat {
  position: relative;
  max-width: 80%;
  width: fit-content;
  min-width: 70px;
  background-color: #fff;
  border-radius: 20px;
  padding: 3% 5%;
  z-index: 4;
  line-height: 1;
}

.box-chat[type="npc"] {
  margin: 2% auto 2% 2%;
}

.box-chat[type="user"] {
  margin: 2% 2% 2% auto;
}

.box-chat[type="npc"]::after {
  content: url("/images/icon_main/icon-chat-message.png");
  position: absolute;
  width: 100%;
  top: 91%;
  left: 7%;
  z-index: 4;
}

.box-chat[type="user"]::after {
  content: url("/images/icon_main/icon-chat-message.png");
  position: absolute;
  width: 100%;
  top: 91%;
  right: 7%;
  transform: rotateY(180deg);
  z-index: 4;
}

.chat-content-scroll {
  overflow-y: auto;
  height: 100%;
}

.chat-content-scroll::-webkit-scrollbar {
  width: 0px;
}

.story-container {
  max-width: 1600px;
  width: 100%;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.box-content {
  position: relative;
  max-height: fit-content;
  min-height: 100%;
  background-color: #fff5e7;
  border: 2px solid #4b1e0a;
  border-radius: 10px;
  font-size: 100%;
  padding: 2%;
  z-index: 3;
}

.box-shadow-content {
  background-color: #fff5e7;
  border-radius: 10px;
  padding: 1% 2%;
}

.text-content {
  font-size: clamp(5%, 5vw, 16px);
}

.box-name-npc {
  position: relative;
  left: 5%;
  top: 2px;
  background-color: #00d1ff;
  width: fit-content;
  color: #4b1e0a;
  border: 2px solid #4b1e0a;
  border-radius: 10px 10px 0px 0px;
  padding: 3.5% 5%;
  font-size: clamp(12px, 4vw, 16px);
  line-height: 0;
  z-index: 3;
}

.box-name-user {
  position: relative;
  right: 5%;
  top: 2px;
  background-color: #ffc100;
  width: fit-content;
  color: #4b1e0a;
  border: 2px solid #4b1e0a;
  border-radius: 10px 10px 0px 0px;
  padding: 3.5% 5%;
  font-size: clamp(12px, 4vw, 16px);
  line-height: 0;
  z-index: 3;
}

.text-next {
  font-size: clamp(3%, 5vw, 16px);
  line-height: 0;
  text-decoration: underline;
}

.text-message {
  font-size: clamp(5%, 5vw, 16px);
}

.text-hint {
  font-size: clamp(2%, 5vw, 12px);
}

.inputType {
  width: 100%;
  border: 1px solid #c0a275;
  background-color: #ffecd0;
  border-radius: 5px;
  padding: 3% 5%;
  margin: 3%;
  color: #4b1e0a;
  font-size: clamp(5%, 5vw, 12px);
}

.inputType:focus {
  outline: none;
}

.button-choices {
  border-radius: 5px;
  border: 1px solid #000;
  padding: 0.3% 1% 0.3% 1%;
  margin: 1%;
  font-size: clamp(5%, 5vw, 16px);
}

.button-choices[type="default"] {
  background-color: #fff;
  // box-shadow: 0px 10% 1px 1px #b9b9b9;
  cursor: pointer;
}

.button-choices[type="selected"] {
  background-color: #41a4ff;
  // box-shadow: 0px 2px 1px 1px #0857a0;
  color: #fff;
  cursor: pointer;
}

.button-choices[type="correct"] {
  background-color: #48cd5e;
  // box-shadow: 0px 2px 1px 1px #0f7920;
  color: #fff;
  cursor: pointer;
}

.button-choices[type="incorrect"] {
  background-color: #ffffff;
  // box-shadow: 0px 2px 1px 1px #b9b9b9;
  color: rgb(194, 194, 194);
  border: 1px solid #b9b9b9;
}
</style>


