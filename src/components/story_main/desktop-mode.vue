<template>
  <div class="row fit relative-position">
    <div class="back-drop absolute-center"></div>
    <div class="col-12 row justify-center" style="height: 30%">
      <div
        class="col-12 row self-end wrap relative-position"
        style="width: 30%; bottom: -30%"
        v-if="
          storyData.type == 'practice' ||
          storyData.question.type != 'translation'
        "
      >
        <div
          v-if="storyData.chat.length"
          v-for="(item, index) in storyData.chat"
          class="col-12 relative-position"
          :align="item.isUser ? 'right' : 'left'"
          style="margin-bottom: 1%; padding: 1%; z-index: 3"
        >
          <div
            class="relative-position"
            :class="item.isUser ? 'chat-user' : 'chat-npc'"
          >
            <span v-html="item.message"> </span>
          </div>
        </div>
      </div>

      <div
        class="col-12 self-center"
        v-if="storyData.question.type == 'translation'"
      >
        <question :storyData="storyData"></question>
      </div>
    </div>
    <div class="col-12 content-container relative-position row">
      <div class="col-12 row relative-position" style="height: 70%">
        <div class="col-6 relative-position" style="width: 50%">
          <div
            class="relative-position"
            style="left: -5%; bottom: -3%"
            :style="storyData.question.isQuestion ? '' : 'z-index: 3'"
          >
            <character-user class="" :isPet="false"></character-user>
          </div>
        </div>
        <q-space></q-space>
        <div class="col-6 relative-position" style="width: 50%">
          <div
            class="relative-position"
            style="left: 5%; bottom: -3%"
            :style="storyData.question.isQuestion ? 'z-index: 3' : ''"
          >
            <character-user class="" :isPet="false"></character-user>
          </div>
        </div>
      </div>
      <div
        class="col-12 self-end relative-position"
        style="height: 30%; z-index: 3"
      >
        <div class="absolute-center fit row" style="top: 15%">
          <!-- <div class="box-name">
            <div class="name">
              <span class="text-content">Jisoo</span>
            </div>
          </div> -->
          <div class="box-message relative-position">
            <div class="fit box-message-inside">
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
                                class="self-center"
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
                                    class="inputType"
                                    type="text"
                                    placeholder="Enter your answer"
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

                          <!-- Translation -->
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
                              width="5%"
                              src="/images/icon_main/icon-play.png"
                              style="margin: 0% 1%"
                            ></q-img>

                            <q-img
                              v-if="!item.isRecorder"
                              no-transition
                              class="self-end cursor-pointer"
                              width="5%"
                              src="/images/icon_main/icon-mic.png"
                              style="margin: 0% 1%"
                              @click="storyData.func.recordStart()"
                            ></q-img>

                            <q-img
                              v-if="item.isRecorder"
                              no-transition
                              no-spinner
                              class="self-end cursor-pointer"
                              width="5%"
                              src="/images/icon_main/icon-process.png"
                              style="margin: 0% 1%"
                            ></q-img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Button Next -->
                  <div
                    class="absolute-bottom-right"
                    style="bottom: 5%; right: 1%; z-index: 2"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import question from "components/story_main/question.vue";
import characterUser from "components/character_main/character.vue";
import characterNpc from "components/character_main/character.vue";
import translation from "components/story_main/translation.vue";
import { computed } from "@vue/runtime-core";
export default {
  components: {
    characterUser,
    characterNpc,

    // Practice
    question,
    translation,
  },
  props: {
    storyData: {
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

    return {
      checkAnswerForQuestion,
    };
  },
};
</script>

<style lang="scss" scoped>
.content-container {
  width: 80%;
  height: 70%;
  margin: 0px auto;
}

.box-message {
  position: relative;
  width: 80%;
  height: 90%;
  background-color: #dec7a6;
  border: 2px solid #4a261b;
  border-radius: 10px;
  margin: 0px auto 0px auto;
  padding-bottom: 0.4%;
}

.box-message-inside {
  position: relative;
  background-color: #fff5e7;
  border-radius: 10px;
  padding: 0.5% 1%;
}

.box-name {
  width: 80%;
  padding-left: 2%;
  margin: auto;
}

.name {
  width: fit-content;
  background-color: #000;
  color: #fff;
  border-radius: 10px 10px 0px 0px;
  padding: 0.5% 2.5%;
}

.text-content {
  font-size: clamp(5%, 1.2vw, 20px);
  line-height: 0;
}

.text-next {
  font-size: clamp(3%, 1.2vw, 18px);
  line-height: 0;
  text-decoration: underline;
}

.text-message {
  font-size: clamp(5%, 1.2vw, 18px);
}

.text-hint {
  font-size: clamp(2%, 1.2vw, 14px);
}

.inputType {
  width: 90%;
  border: none;
  background-color: #e9e9e9;
  border-radius: 5px;
  padding: 1% 5%;
  margin-left: 2%;
  font-size: clamp(5%, 1.2vw, 18px);
}

.inputType:focus {
  outline: none;
}

.button-choices {
  border-radius: 5px;
  border: 1px solid #000;
  padding: 0.3% 1% 0.3% 1%;
  margin-right: 0.8%;
  font-size: clamp(1%, 1vw, 16px);
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

.back-drop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.chat-npc {
  width: fit-content;
  background-color: #d9d9d9;
  border-radius: 10px 10px 10px 0px;
  padding: 1.5% 5% 1.5% 3%;
  font-size: clamp(1%, 1vw, 14px);
}

.chat-user {
  width: fit-content;
  background-color: #d9d9d9;
  border-radius: 10px 10px 0px 10px;
  padding: 1.5% 5% 1.5% 3%;
  font-size: clamp(1%, 1vw, 14px);
}
</style>
