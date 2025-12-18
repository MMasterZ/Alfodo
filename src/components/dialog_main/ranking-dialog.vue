<template>
  <div class="absolute-center fit row justify-center items-center box-backdrop-main z-max">
    <div class="relative-position box-dialog-ranking-main animate__animated" :class="{'animate__zoomIn':isAnimation,'animate__zoomOut':!isAnimation,'mobile':isMobile}" v-if="!isLoaded">
      <q-img src="/images/ranking_main/ranking-dialog.webp" no-spinner no-transition></q-img>
      <div class="absolute-center fit">
        <div class="box-content-dialog-ranking" :class="{'mobile':isMobile}">
          <div class="row box-header row justify-center" :class="{'mobile':isMobile}" v-if="studentStore.studentType != 'online'">
            <div class="button-school" :class="{'mobile':isMobile}" @click="selectedType = 'school'">
              <q-img :src="`/images/ranking_main/button-school${selectedType == 'school' ? '' : '-disable'}.webp`" no-spinner no-transition></q-img>
            </div>
            <div class="button-class" :class="{'mobile':isMobile}" @click="selectedType = 'class'">
              <q-img :src="`/images/ranking_main/button-class${selectedType == 'class' ? '' : '-disable'}.webp`" no-spinner no-transition></q-img>
            </div>
          </div>
          <div class="box-content-scroll" :class="{'mobile':isMobile,'online':studentStore.studentType == 'online'}">
            <div v-if="showRankingBySelectedType.length > 0 && isShowCharacterRanking">
              <div
                class="row box-content-scroll-item justify-end relative-position"
                :class="{'mobile':isMobile}"
                v-for="(item, index) in showRankingBySelectedType"
              >
                <div class="box-head-character absolute-left" :class="{'mobile':isMobile}">
                  <div class="box-head-character relative-position" :class="{'mobile':isMobile}">
                    <q-img src="/images/ranking_main/box-character-head.webp" no-spinner no-transition></q-img>
                    <div
                      class="box-character absolute-center" :class="{'mobile':isMobile}"
                    >
                      <div class="box-head absolute-center" :class="{'mobile':isMobile}" v-if="item.isHasCharacter">
                        <character
                          :equipment="{ ...item.character }"
                          :isRanking="true"
                          :isAnimation="true"
                          :isPet="false"
                          :setId="`character-ranking-${index + 1}`"
                        ></character>
                      </div>
                      <div class="box-head absolute-center" :class="{'mobile':isMobile}" v-else>
                        <q-img
                          width="50%"
                          class="absolute-center"
                          style="top:clamp(-25px,-1.5625cqw,-15.625px)"
                          src="/images/icon_main/icon-character.png"
                          no-spinner no-transition
                        ></q-img>
                      </div>
                    </div>
                  </div>
                  <dialog-character
                    v-if="isDesktop"
                    :characterData="item"
                    :index="index + 1"
                  ></dialog-character>
                </div>

                <div class="self-center box-character-name row" :class="{'mobile':isMobile}">
                  <div class="self-center col relative-position">
                    <div class="text-overflow text-name" :class="{'mobile':isMobile}">
                      <span class=" font-mali-b">
                        {{ item.character.name }}
                      </span>
                    </div>
                    <div class="box-star-main row" :class="{'mobile':isMobile}">
                      <div class="box-star self-center" :class="{'mobile':isMobile}">
                        <q-img
                          src="/images/icon_main/icon-star-ranking.png"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                      <div class="self-end text-star font-mali-b" :class="{'mobile':isMobile}">
                        {{ item.star }}
                      </div>
                    </div>
                  </div>
                  <div class="self-center box-ranking-number" :class="{'mobile':isMobile}" align="center">
                    <div class="ranking-top relative-position" :class="{'mobile':isMobile}" v-if="index + 1 <= 3">
                      <q-img
                        class="absolute-center"
                        :src="`/images/icon_main/icon-ranking-number-${
                          index + 1
                        }.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div class="ranking-number relative-position" :class="{'mobile':isMobile}" v-else>
                      <q-img src="/images/ranking_main/box-number-ranking.webp" no-spinner no-transition></q-img>
                      <div class="absolute-center">
                        {{ index + 1 }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="absolute-center"
              style="width: 100%"
              align="center"
              v-if="
                showRankingBySelectedType.length > 0 && !isShowCharacterRanking
              "
            >
              <span style="color: #fff" class="f20 font-mali-m"
                >กำลังโหลดข้อมูล...</span
              >
            </div>
            <div
              class="absolute-center"
              style="width: 100%"
              align="center"
              v-if="showRankingBySelectedType.length == 0"
            >
              <span style="color: #fff" class="f20 font-mali-m"
                >ยังไม่มีการจัดอันดับ</span
              >
            </div>
          </div>
        </div>
        <div class="box-current-user-character">
          <div class="row box-content-scroll-item justify-end relative-position">
            <div class="box-head-character absolute-left" :class="{'mobile':isMobile}">
              <div class="box-head-character relative-position" :class="{'mobile':isMobile}">
                <q-img src="/images/ranking_main/box-character-head.webp" no-spinner no-transition></q-img>
                <div
                  class="box-character absolute-center" :class="{'mobile':isMobile}"
                >
                  <div class="box-head absolute-center" :class="{'mobile':isMobile}">
                    <character
                      :equipment="{ ...studentStore.characterData }"
                      :isRanking="true"
                      :isAnimation="true"
                      :isPet="false"
                      :setId="`character-ranking-${index + 1}`"
                    ></character>
                  </div>
                </div>
              </div>
              <!-- <dialog-character
                v-if="isDesktop"
                :characterData="item"
                :index="index + 1"
              ></dialog-character> -->
            </div>

            <div class="self-center box-character-name row" :class="{'mobile':isMobile}">
              <div class="self-center col relative-position">
                <div class="text-overflow text-name" :class="{'mobile':isMobile}">
                  <span class=" font-mali-b">
                    {{ studentStore.characterData.name }}
                  </span>
                </div>
                <div class="box-star-main row" :class="{'mobile':isMobile}">
                  <div class="box-star self-center" :class="{'mobile':isMobile}">
                    <q-img
                      src="/images/icon_main/icon-star-ranking.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="self-end text-star font-mali-b" :class="{'mobile':isMobile}">
                    {{ studentCurrentRankingData.star }}
                  </div>
                </div>
              </div>
              <div class="self-center box-ranking-number" :class="{'mobile':isMobile}" align="center">

                <div class="ranking-top relative-position" :class="{'mobile':isMobile}" v-if="currentPositionRanking >= 1 && currentPositionRanking <= 3">
                  <q-img
                    class="absolute-center"
                    :src="`/images/icon_main/icon-ranking-number-${
                      currentPositionRanking
                    }.png`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div class="ranking-number relative-position" :class="{'mobile':isMobile}" v-else>
                  <q-img src="/images/ranking_main/box-number-ranking.webp" no-spinner no-transition></q-img>
                  <div class="absolute-center">
                    {{ `${currentPositionRanking || "-"}` }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute-top-right button-close" :class="{'mobile':isMobile}"
      >
        <q-img
          @click="funcCloseDialog()"
          class="cursor-pointer"
          src="/images/icon_main/icon-close.png"
          no-spinner
          no-transition
        >
        </q-img>
      </div>
    </div>
  </div>

  <div v-if="!isLoaded && false">
    <q-dialog v-model="isShowDialogRanking" maximized persistent class="z-max">
      <q-card class="transparent shadow-0 font-mali">
        <q-card-section class="fit row items-center no-padding">
          <div class="col-12 relative-position q-pa-xs">
            <div align="center" class="relative-position" style="z-index: 1">
              <q-img
                style="max-width: 360px; width: 100%; min-width: 300px"
                src="/images/icon_main/icon-ranking-leaderboard.png"
                no-spinner
                no-transition
              >
                <div
                  class="absolute-bottom-right transparent"
                  style="bottom: 25px; right: -15px"
                >
                  <q-img
                    @click="funcCloseDialog()"
                    width="50px"
                    class="cursor-pointer"
                    src="/images/icon_main/icon-close.png"
                    no-spinner
                    no-transition
                  >
                  </q-img>
                </div>
              </q-img>
            </div>
            <div style="margin-top: -65px">
              <div class="dialog-container relative-position">
                <div class="dialog-content row">
                  <div
                    class="col-12 self-start q-pa-md row justify-around items-center"
                    :style="
                      studentStore.studentType != 'school'
                        ? 'padding-top:30px'
                        : 'padding-top:60px'
                    "
                  >
                    <div
                      class="col-1 self-end"
                      style="width: fit-content"
                      v-if="studentStore.studentType == 'school'"
                    >
                      <q-img
                        width="110px"
                        class="cursor-pointer"
                        @click="selectedType = 'school'"
                        :src="`/images/button_main/button-school-${
                          selectedType == 'school' ? 'selected' : 'disable'
                        }.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div
                      class="col-1 self-end"
                      style="width: fit-content"
                      v-if="studentStore.studentType == 'school'"
                    >
                      <q-img
                        width="110px"
                        class="cursor-pointer"
                        @click="selectedType = 'class'"
                        :src="`/images/button_main/button-class-${
                          selectedType == 'class' ? 'selected' : 'disable'
                        }.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>

                  <!-- #region Type : School  -->
                  <div
                    class="col-12 box-show-ranking-all-by-school relative-position"
                    v-if="studentStore.studentType == 'school'"
                  >
                    <div
                      class="q-pa-sm"
                      v-if="showRankingBySelectedType.length && isShowCharacterRanking"
                    >
                      <div
                        class="row relative-position"
                        :style="index > 0 ? 'margin-top: 10px' : ''"
                        v-for="(item, index) in showRankingBySelectedType"
                      >
                        <div class="col-12 absolute-center box-character-name"></div>
                        <div
                          class="absolute-center box-show-character-all-back-drop"
                        ></div>
                        <div class="col-1 self-center" style="width: fit-content">
                          <div
                            class="box-show-character-all relative-position"
                            :class="item.isHasCharacter ? 'cursor-pointer' : ''"
                          >
                            <div
                              class="absolute-center"
                              :style="item.isHasCharacter ? 'top:90%' : ''"
                            >
                              <div style="width: 150px" v-if="item.isHasCharacter">
                                <character
                                  :equipment="{ ...item.character }"
                                  :isRanking="true"
                                  :isAnimation="true"
                                  :setId="`character-ranking-${index + 1}`"
                                ></character>
                              </div>
                              <div v-else>
                                <q-img
                                  width="70px"
                                  src="/images/icon_main/icon-character.png"
                                ></q-img>
                              </div>
                            </div>
                            <dialog-character
                              v-if="isDesktop"
                              :characterData="item"
                              :index="index + 1"
                            ></dialog-character>
                          </div>
                        </div>
                        <div
                          class="col relative-position self-center q-px-sm font-mali-b"
                        >
                          <div class="relative-position">
                            <div style="margin-top: 0px" class="text-overflow">
                              <span class="f14" style="color: #804208">
                                {{ item.character.name }}
                              </span>
                            </div>
                            <div class="" style="margin-top: -3px">
                              <q-img
                                width="20px"
                                src="/images/icon_main/icon-star-ranking.png"
                                no-spinner
                                no-transition
                              ></q-img>
                              <span class="absolute text-star f18" style="left: 30px">{{
                                item.star
                              }}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-1 self-center q-pa-sm relative-position box-ranking-number"
                          align="center"
                        >
                          <div class="score-character relative-position">
                            <q-img
                              class="absolute-center"
                              width="55px"
                              style="top: 75%"
                              :src="`/images/icon_main/icon-ranking-number-${
                                index + 1
                              }.png`"
                              v-if="index + 1 <= 3"
                              no-spinner
                              no-transition
                            ></q-img>
                            <span class="absolute-center" v-else>
                              {{ index + 1 }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="absolute-center"
                      style="width: 100%"
                      align="center"
                      v-if="
                        showRankingBySelectedType.length > 0 && !isShowCharacterRanking
                      "
                    >
                      <span style="color: #4a261b" class="f20 font-mali-m"
                        >กำลังโหลดข้อมูล...</span
                      >
                    </div>
                    <div
                      class="absolute-center"
                      style="width: 100%"
                      align="center"
                      v-if="showRankingBySelectedType.length == 0"
                    >
                      <span style="color: #4a261b" class="f20 font-mali-m"
                        >ยังไม่มีการจัดอันดับ</span
                      >
                    </div>
                  </div>
                  <!-- #endregion -->

                  <!--  -->
                  <div
                    class="col-12 box-show-ranking-all-by-online relative-position"
                    v-if="studentStore.studentType != 'school'"
                  >
                    <div
                      class="q-pa-sm"
                      v-if="showRankingBySelectedType.length && isShowCharacterRanking"
                    >
                      <div
                        :style="index > 0 ? 'margin-top: 10px' : ''"
                        v-for="(item, index) in showRankingBySelectedType"
                      >
                        <div class="row relative-position" v-if="item.isHasCharacter">
                          <div class="col-12 absolute-center box-character-name"></div>
                          <div
                            class="absolute-center box-show-character-all-back-drop"
                          ></div>
                          <div class="col-1 self-center" style="width: fit-content">
                            <div
                              class="box-show-character-all relative-position"
                              :class="item.isHasCharacter ? 'cursor-pointer' : ''"
                            >
                              <div
                                class="absolute-center"
                                :style="item.isHasCharacter ? 'top:90%' : ''"
                              >
                                <div style="width: 150px" v-if="item.isHasCharacter">
                                  <character
                                    :equipment="{ ...item.character }"
                                    :isRanking="true"
                                    :isAnimation="true"
                                    :setId="`character-ranking-online-${index + 1}`"
                                  ></character>
                                </div>
                                <div v-else>
                                  <q-img
                                    width="70px"
                                    src="/images/icon_main/icon-character.png"
                                  ></q-img>
                                </div>
                              </div>
                              <dialog-character
                                v-if="isDesktop"
                                :characterData="item"
                                :index="index + 1"
                              ></dialog-character>
                            </div>
                          </div>
                          <div
                            class="col relative-position self-center q-px-sm font-mali-b"
                          >
                            <div class="relative-position">
                              <div style="margin-top: 0px" class="text-overflow">
                                <span class="f14" style="color: #804208">
                                  {{ item.character.name }}
                                </span>
                              </div>
                              <div class="" style="margin-top: -3px">
                                <q-img
                                  width="20px"
                                  src="/images/icon_main/icon-star-ranking.png"
                                  no-spinner
                                  no-transition
                                ></q-img>
                                <span class="absolute text-star f18" style="left: 30px">{{
                                  item.star
                                }}</span>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-1 self-center q-pa-sm relative-position box-ranking-number"
                            align="center"
                          >
                            <div class="score-character relative-position">
                              <q-img
                                class="absolute-center"
                                width="55px"
                                style="top: 75%"
                                :src="`/images/icon_main/icon-ranking-number-${
                                  index + 1
                                }.png`"
                                v-if="index + 1 <= 3"
                                no-spinner
                                no-transition
                              ></q-img>
                              <span class="absolute-center" v-else>
                                {{ index + 1 }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="absolute-center"
                      style="width: 100%"
                      align="center"
                      v-if="
                        showRankingBySelectedType.length > 0 && !isShowCharacterRanking
                      "
                    >
                      <span style="color: #4a261b" class="f20 font-mali-m"
                        >กำลังโหลดข้อมูล...</span
                      >
                    </div>
                    <div
                      class="absolute-center"
                      style="width: 100%"
                      align="center"
                      v-if="showRankingBySelectedType.length == 0"
                    >
                      <span style="color: #4a261b" class="f20 font-mali-m"
                        >ยังไม่มีการจัดอันดับ</span
                      >
                    </div>
                  </div>
                  <div class="self-end col-12 box-show-ranking-user row">
                    <div class="col-1" style="width: fit-content; padding: 3px 10px">
                      <div class="box-show-character relative-position">
                        <div class="absolute icon-header-character">
                          <character
                            :setId="`user`"
                            :isAnimation="isAnimation"
                          ></character>
                        </div>
                      </div>
                    </div>
                    <div class="col self-center q-pa-xs font-mali-b">
                      <div>
                        <span class="f16" style="color: #804208">{{
                          `${studentStore.characterName}`
                        }}</span>
                      </div>
                      <div class="relative-position">
                        <q-img
                          width="20px"
                          src="/images/icon_main/icon-star-ranking.png"
                          no-spinner
                          no-transition
                        ></q-img>
                        <span class="absolute text-star f18" style="left: 30px">{{
                          studentCurrentRankingData.star
                        }}</span>
                      </div>
                    </div>
                    <div
                      class="col-1 self-center q-pa-sm relative-position box-ranking-number"
                      align="center"
                    >
                      <q-img
                        class="absolute-center"
                        width="45px"
                        style="top: 50%"
                        :src="`/images/icon_main/icon-ranking-number-${currentPositionRanking}.png`"
                        v-if="currentPositionRanking >= 1 && currentPositionRanking <= 3"
                        no-spinner
                        no-transition
                      ></q-img>
                      <div class="score-character relative-position" v-else>
                        <span class="absolute-center">
                          {{ `${currentPositionRanking || "-"}` }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

  <loading v-if="isLoaded"></loading>
</template>

<script setup>
import character from "components/character_main/character.vue";
import dialogCharacter from "components/dialog_main/dialog-character.vue";
import loading from "components/dialog-loading.vue";
import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";

const emit = defineEmits(["callback-closeDialog"]);

// Intitialize Data
const $q = useQuasar();
const isAnimation = ref(true);
const selectedType = ref("school");
const isDesktop = ref($q.platform.is.desktop);
const courseStore = useCourseStore();
const studentStore = useStudentStore();

const isLoaded = ref(true);
const isMobile = ref($q.platform.is.mobile);
const rankingList = ref([]);
const isShowCharacterRanking = ref(false);

const showRankingBySelectedType = computed(() => {

  let temp = rankingList.value;

  isShowCharacterRanking.value = false;

  console.log("*** ",temp)

  if (temp.length == 0) return [];
  if (selectedType.value == "school") {
    setTimeout(() => {
      isShowCharacterRanking.value = true;
    }, 300);

    return temp.schoolRanking.rankings || [];
  } else {
    setTimeout(() => {
      isShowCharacterRanking.value = true;
    }, 300);
    return temp.classRanking.rankings || [];
  }
});

const currentPositionRanking = computed(() => {
  let temp = rankingList.value;
  if (studentStore.studentType == "online") {
    return temp.currentStudentPosition || 0;
  } else {
    if (selectedType.value == "school") return temp.schoolRanking.currentPosition || 0;
    else return temp.classRanking.currentPosition || 0;
  }
});

const studentCurrentRankingData = computed(() => {
  let temp = rankingList.value;
  const courseStore = useCourseStore();

  if (selectedType.value == "school") {
    let find = temp.schoolRanking.rankings.find(
      (x) => x.studentId == studentStore.studentId
    );

    if (find) {
      return find;
    } else {
      return { star: courseStore.courseData.star };
    }
  } else {
    let find = temp.classRanking.rankings.find(
      (x) => x.studentId == studentStore.studentId
    );

    if (find) {
      return find;
    } else {
      return { star: courseStore.star };
    }
  }
});

const getRanking = async () => {


  if (studentStore.studentType == "school") {
    rankingList.value = await studentStore.getRanking();
  } else {
    rankingList.value = await studentStore.getOnlineRanking();
  }

  console.log("*** ",rankingList.value)

  // const classRanking = rankingList.value.classRanking;
  // let filterCharacter = [];
  // classRanking.rankings.forEach((element) => {
  //   const character = element.character;
  //   if (character) {
  //   } else {
  //     element.character = {};
  //   }
  //   filterCharacter.push(element);
  // });

  // rankingList.value.classRanking.rankings = filterCharacter;

  isLoaded.value = false;
};

const isShowDialogRanking = ref(true);
const funcCloseDialog = () => {
  isShowDialogRanking.value = false;

  setTimeout(() => {
    emit("callback-closeDialog", false);
  }, 500);
};

onMounted(async () => {
  // $q.loading.show();
  getRanking();

  // $q.loading.hide();
});
</script>

<style lang="scss" scoped>

.box-backdrop-main{
  background-color: rgba(0, 0, 0, 0.5);
}

.box-dialog-ranking-main{
  width:clamp(225px,22.5cqw,360px);

  &.mobile{
    width:360px;
  }

  & .box-header{
    padding:clamp(10px,1cqw,16px) 0px clamp(6.25px,0.625cqw,10px);

    &.mobile{
      padding:16px 0px 10px;
    }

    & .button-school{
      width:clamp(63.75px,6.375cqw,102px);
      margin:0px clamp(6.25px,0.625cqw,10px);
      cursor:pointer;

      &.mobile{
        width:102px;
        margin:0px 10px;
      }
    }

    & .button-class{
      width:clamp(63.75px,6.375cqw,102px);
      margin:0px clamp(6.25px,0.625cqw,10px);
      cursor:pointer;
    }

    & .mobile{
      width:102px;
      margin:0px 10px;
    }

    & .disable{
      cursor:not-allowed;
    }

  }

  & .box-content-dialog-ranking{
    width: clamp(176.875px,17.6875cqw,283px);
    height: clamp(196.875px,19.6875cqw,315px);
    margin:clamp(100px,10cqw,160px) 0px 0px clamp(21.25px,2.125cqw,34px);
    border-radius: clamp(12.5px,1.25cqw,20px);

    &.mobile{
      width: 283px;
      height: 315px;
      margin:160px 0px 0px 34px;
      border-radius: 20px;
    }

    & .box-content-scroll{
      height:81%;
      padding:0px clamp(6.25px,0.625cqw,10px);
      overflow:auto;

      &.mobile{
        height:81.5%;
        padding:0px 10px;
      }

      &.online{
        height:100%;
        padding:clamp(6.25px,0.625cqw,10px);
      }

      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }

    }

  }

  & .box-content-scroll-item{
    width:100%;
    margin-bottom: clamp(6.25px,0.625cqw,10px);

    &.mobile{
      margin-bottom: 10px;
    }

    & .box-head-character{
      width:clamp(37.5px,3.75cqw,60px);
      height:clamp(37.5px,3.75cqw,60px);
      overflow:hidden;

      &.mobile{
        width:60px;
        height:60px;
      }

      & .box-character{
        width:80%;
        height:80%;
        border-radius: 50%;
        overflow:hidden;

        &.mobile{
          border-radius:50%;
        }

        & .box-head{
          top:100%;
          width:clamp(62.5px,6.25cqw,100px);
          cursor:pointer;

          &.mobile{
            width:110px;
          }
        }
      }
    }

    & .box-character-name {
      width:95%;
      border: clamp(1.875px,0.1875cqw,3px) solid #1E467B;
      height: clamp(31.25px,3.125cqw,50px);
      border-radius: clamp(9.375px,0.9375cqw,15px);
      background-color: #D4F3FF;
      padding-left:clamp(31.25px,3.125cqw,50px);
      margin-top:clamp(3.125px,0.3125cqw,5px);

      &.mobile{
        height:50px;
        padding-left:50px;
        border-radius:15px;
        background-color:#D4F3FF;
        margin-top:5px;
      }

      & .text-name{
        color:#1E467B;
        font-size:clamp(7.5px,0.75cqw,12px);
        line-height:clamp(17.5px,1.75cqw,28px);
        margin-top:clamp(-5px,-0.3125cqw,-3.125px);

        &.mobile{
          font-size:12px;
          line-height:28px;
          margin-top:-3px;
        }
      }

      & .box-star-main{
        margin-top:clamp(-5px,-0.3125cqw,-3px);

        &.mobile{
          margin-top:-3px;
        }

        & .box-star{
          width:clamp(11.25px,1.125cqw,18px);
          line-height:0;

          &.mobile{
            width:18px;
          }
        }

        & .text-star {
          color: #01C0FC;
          text-shadow: rgb(30, 70, 123) 1px 0px 0px, rgb(30, 70, 123) 0.540302px 0.841471px 0px, rgb(30, 70, 123) -0.416147px 0.909297px 0px, rgb(30, 70, 123) -0.989992px 0.14112px 0px, rgb(30, 70, 123) -0.653644px -0.756802px 0px, rgb(30, 70, 123) 0.283662px -0.958924px 0px, rgb(30, 70, 123) 0.96017px -0.279415px 0px;
          font-size:clamp(10px,1cqw,16px);
          line-height: clamp(11.25px,1.125cqw,18px);
          padding:0px clamp(6.25px,0.625cqw,10px);

          &.mobile{
            font-size:16px;
            line-height:18px;
            padding:0px 10px;
          }
        }
      }

      & .box-ranking-number{
        width:clamp(31.25px,3.125cqw,50px);

        &.mobile{
          width:50px;
        }

        & .ranking-number{
          width:clamp(18.75px,1.875cqw,30px);
          color:#D4F3FF;
          font-size:clamp(10px,1cqw,16px);
          font-weight: bold;
          line-height:0px;

          &.mobile{
            width:30px;
            font-size:16px;
            line-height:16px;
          }
        }

        & .ranking-top{
          width:clamp(25px,2.5cqw,40px);
          margin-top:clamp(6.25px,0.625cqw,10px);

          &.mobile{
            width:40px;
            margin-top:10px;
          }
        }
      }
    }
  }

  & .box-current-user-character{
    width:80%;
    height:clamp(43.75px,4.375cqw,70px);
    margin:clamp(5px,0.5cqw,8px) auto;
    padding:0px clamp(10px,1cqw,16px) 0px clamp(3.125px,0.3125cqw,5px);

    &.mobile{
      padding:0px 10px 0px 5px;
    }
  }
}

.button-close{
  width:clamp(29.375px,2.9375cqw,47px);
  top:clamp(41.25px,4.125cqw,66px);
  right:clamp(5.625px,0.5625cqw,9px);

  &.mobile{
    width:47px;
    top:66px;
    right:9px;
  }
}

</style>
