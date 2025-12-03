<template>
  <q-tooltip
    anchor="center left"
    self="center right"
    :offset="characterData.isHasCharacter ? [30, 0] : [-83, 0]"
    class="no-padding transparent z-max"
  >
    <div class="background-character" v-if="characterData.isHasCharacter">
      <div style="width: 95%; margin: auto">
        <character
          :equipment="{ ...characterData.character }"
          :isRanking="true"
          :isAnimation="true"
          :setId="`tooltip-${randomId}`"
        ></character>
      </div>
      <div
        class="q-pa-md row f14 absolute-bottom-left full-width"
        v-if="rankingType == 'school' && studentStore.studentType == 'school'"
      >
        <div>
          {{ `ชื่อ: ${characterData.studentName} ` }}
        </div>
        <div class="q-mx-sm">
          {{ ` ชั้น: ${characterData.class}/${characterData.room}` }}
        </div>
      </div>
      <div class="absolute-top-left q-pa-sm">
        <q-img
          width="90px"
          src="/images/icon_main/icon-level.png"
          no-spinner
          no-transition
        >
          <div class="fit no-padding transparent" v-if="characterData?.characterLevel">
            <div class="absolute-center" style="top: 57%">
              <span class="f24 text-level">
                {{ characterData.characterLevel }}
              </span>
            </div>
          </div>
        </q-img>
      </div>
    </div>
    <div class="box-no-has-character" v-if="!characterData.isHasCharacter">
      ยังไม่สร้างตัวละคร
    </div>
  </q-tooltip>
</template>

<script>
import character from "components/character_main/character.vue";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
export default {
  components: {
    character,
  },
  props: {
    characterData: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: null,
    },
    rankingType: {
      type: String,
      default: "school",
    },
  },
  setup(props) {
    return {
      studentStore: useStudentStore(),
      systemStore: useSystemStore(),

      randomId: Math.random().toString(36).substring(7),
    };
  },
};
</script>

<style lang="scss" scoped>
.background-character {
  position: relative;
  background-image: url("/images/background_main/background-character-ranking.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom center;
  width: 400px;
  padding-bottom: 40px;
  border-radius: 20px;
  border: 3px solid #51a2ff;
}

.text-level {
  color: #fff;
  font-family: fredoka;
  text-shadow: rgb(74, 38, 27) 4px 0px 0px, rgb(74, 38, 27) 3.87565px 0.989616px 0px,
    rgb(74, 38, 27) 3.51033px 1.9177px 0px, rgb(74, 38, 27) 2.92676px 2.72656px 0px,
    rgb(74, 38, 27) 2.16121px 3.36588px 0px, rgb(74, 38, 27) 1.26129px 3.79594px 0px,
    rgb(74, 38, 27) 0.282949px 3.98998px 0px, rgb(74, 38, 27) -0.712984px 3.93594px 0px,
    rgb(74, 38, 27) -1.66459px 3.63719px 0px, rgb(74, 38, 27) -2.51269px 3.11229px 0px,
    rgb(74, 38, 27) -3.20457px 2.39389px 0px, rgb(74, 38, 27) -3.69721px 1.52664px 0px,
    rgb(74, 38, 27) -3.95997px 0.56448px 0px, rgb(74, 38, 27) -3.97652px -0.432781px 0px,
    rgb(74, 38, 27) -3.74583px -1.40313px 0px, rgb(74, 38, 27) -3.28224px -2.28625px 0px,
    rgb(74, 38, 27) -2.61457px -3.02721px 0px, rgb(74, 38, 27) -1.78435px -3.57996px 0px,
    rgb(74, 38, 27) -0.843183px -3.91012px 0px, rgb(74, 38, 27) 0.150409px -3.99717px 0px,
    rgb(74, 38, 27) 1.13465px -3.8357px 0px, rgb(74, 38, 27) 2.04834px -3.43574px 0px,
    rgb(74, 38, 27) 2.83468px -2.82216px 0px, rgb(74, 38, 27) 3.44477px -2.03312px 0px,
    rgb(74, 38, 27) 3.84068px -1.11766px 0px, rgb(74, 38, 27) 3.9978px -0.132717px 0px;
}

.box-no-has-character {
  background-color: #51a2ff;
  padding: 5px;
  border-radius: 4px;
}
</style>
