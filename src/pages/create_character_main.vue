<template>
  <div
    class="row justify-center relative-position"
    :class="isDesktop ? 'background-main' : 'background-main-mobile'"
  >
    <div
      v-if="isDesktop"
      class="q-pa-md"
      align="right"
      :class="isDesktop ? 'absolute-top-right ' : 'col-12 '"
    >
      <q-btn round>
        <q-img
          @click="isShowDialogLogout = true"
          no-spinner
          no-transition
          src="/images/icon_main/icon-logout.png"
        ></q-img>
      </q-btn>
    </div>
    <div
      class="row justify-center"
      align="center"
      :class="
        isDesktop
          ? 'box-create-character q-pa-md '
          : 'box-create-character-mobile q-pb-md q-pt-md '
      "
    >
      <div class="col-12" :class="isDesktop ? 'self-center' : 'self-center'">
        <!-- Input Field -->
        <div
          style="height: 50px"
          :class="isDesktop ? '' : 'row  q-px-sm'"
          :style="
            isDesktop
              ? 'max-width: 300px; width: 100%;margin-bottom: -20px'
              : 'max-width:550px;width: 95%;top:100px;'
          "
        >
          <div :class="!isDesktop ? 'col-8' : ''">
            <q-input
              rounded
              dense
              borderless
              placeholder="Your name..."
              label-color="white"
              input-class="text-white font-mali-m "
              class="f20"
              :class="
                isErrorCharacterName || character.name.length < 3
                  ? 'box-character-name-error'
                  : 'box-character-name'
              "
              input-style="padding:10px;"
              style="
                width: 100%;
                border-radius: 30px;
                padding: 5px;
                background-color: rgba(0, 0, 0, 0.3);
              "
              v-model.trim="character.name"
              maxlength="20"
              @keyup="funcSetName()"
              hide-bottom-space=""
            >
              <template v-slot:append>
                <q-icon
                  v-if="character.name.length == 0"
                  class="text-white q-pr-md"
                  size="24px"
                  name="far fa-edit"
                ></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col self-center" align="right" v-if="!isDesktop">
            <q-btn round>
              <q-img
                @click="isShowDialogLogout = true"
                no-spinner
                no-transition
                src="/images/icon_main/icon-logout.png"
              ></q-img>
            </q-btn>
          </div>
        </div>

        <div
          class="row justify-center q-pa-md relative-position"
          :style="
            isDesktop
              ? `max-width: 600px; width: 100%;`
              : `max-width: 650px; width: 100%; min-width:300px;`
          "
        >
          <!-- Button Left -->
          <div
            class="col-1 self-center absolute-center z-top"
            style="width: clamp(80px, 10vw, 100px); left: 15%"
            align="left"
          >
            <div class="">
              <div class="q-py-lg">
                <q-img
                  style="width: clamp(80px, 15vw, 100px)"
                  @click="selectedMenu = 'skin'"
                  class="cursor-pointer"
                  :src="`/images/button_main/button-skin-${
                    selectedMenu == 'skin' ? '' : 'no-'
                  }selected.png`"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div class="q-py-lg">
                <q-img
                  style="width: clamp(80px, 15vw, 100px)"
                  @click="selectedMenu = 'tops'"
                  class="cursor-pointer"
                  :src="`/images/button_main/button-tops-${
                    selectedMenu == 'tops' ? '' : 'no-'
                  }selected.png`"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
          <!-- Character -->
          <div class="col relative-position" :class="isDesktop ? '' : ''">
            <character-main
              class="relative-position"
              :isAnimation="true"
              :equipment="character.equipment"
              :isCreateCharacter="true"
              :setId="`Character-1`"
            ></character-main>
          </div>

          <!-- Button Right -->
          <div
            class="col-1 self-center absolute-center z-top"
            style="width: clamp(80px, 10vw, 100px); left: 85%"
            align="right"
          >
            <div class="">
              <div class="q-py-lg">
                <q-img
                  style="width: clamp(80px, 15vw, 100px)"
                  @click="selectedMenu = 'hair'"
                  class="cursor-pointer"
                  :src="`/images/button_main/button-hair-${
                    selectedMenu == 'hair' ? '' : 'no-'
                  }selected.png`"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div class="q-py-lg">
                <q-img
                  style="width: clamp(80px, 15vw, 100px)"
                  @click="selectedMenu = 'bottoms'"
                  class="cursor-pointer"
                  :src="`/images/button_main/button-bottoms-${
                    selectedMenu == 'bottoms' ? '' : 'no-'
                  }selected.png`"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
        </div>

        <!-- Object -->
        <div
          class="q-pa-md row justify-center"
          :style="isDesktop ? 'height: 200px;margin-top: -35px' : 'height:200px;'"
        >
          <!-- Box Color -->
          <div
            style="height: 120px"
            class="text-center width-fit col-12"
            v-show="selectedMenu == 'skin'"
            align="center"
          >
            <div class="relative-position text-center">
              <div :class="isDesktop ? '' : ''" style="margin-top: -50px">
                <div
                  class="relative-position"
                  style="
                    width: 300px;
                    height: 130px;
                    overflow: hidden;
                    border: 5px solid #fff;
                    background-color: #fff;
                    border-radius: 10px 10px 0px 0px;
                  "
                >
                  <q-color
                    class="absolute-top full-width"
                    style="top: -30%"
                    v-model="character.equipment.color"
                    no-header
                    no-header-tabs
                    no-footer
                    flat
                    @change="funcChangeColor()"
                  />
                </div>
                <div
                  class="relative-position"
                  style="
                    width: 300px;
                    height: 36px;
                    overflow: hidden;
                    border: 5px solid #fff;
                    background-color: #fff;
                    border-radius: 0px 0px 10px 10px;
                  "
                >
                  <q-color
                    class="absolute-bottom"
                    style="bottom: -7px"
                    v-model="character.equipment.color"
                    no-header
                    no-header-tabs
                    no-footer
                    flat
                    @change="funcChangeColor()"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Box Outfit -->
          <div
            style="height: 120px"
            class="text-center width-fit q-pt-xs row col-12"
            v-if="selectedMenu != 'skin'"
          >
            <div class="relative-position self-center">
              <div
                class="row justify-center no-wrap text-center"
                :class="isDesktop ? '' : ''"
                style="margin-top: -50px"
              >
                <div
                  class="col-1"
                  :class="isDesktop ? 'q-px-xs' : ''"
                  :style="
                    isDesktop
                      ? 'width: 140px'
                      : 'max-width:90px;min-width:75px;width:100%;padding:0px 2px'
                  "
                  v-for="i in 4"
                >
                  <q-img
                    fit="cover"
                    @click="
                      funcSelectedOutfit(outfit[selectedMenu].list[i - 1]),
                        (outfit[selectedMenu].selected =
                          outfit[selectedMenu].list[i - 1].itemName)
                    "
                    class="border-outfit cursor-pointer"
                    :mobile-mode="!isDesktop"
                    :class="
                      outfit[selectedMenu].selected ==
                      outfit[selectedMenu].list[i - 1].itemName
                        ? 'selected'
                        : ''
                    "
                    :src="`${PATH}/${outfit[selectedMenu].list[i - 1].itemName}.png`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
          </div>

          <div class="q-pa-md col-12">
            <q-img
              @click="isActiveCreateCharacter ? null : funcCreateCharacter()"
              :class="isActiveCreateCharacter ? 'cursor-not-allowed' : 'cursor-pointer'"
              width="120px"
              src="/images/button_main/button-create-character.png"
              no-spinner=""
              no-transition=""
            ></q-img>
          </div>
        </div>
      </div>
    </div>

    <q-dialog maximized v-model="isShowDialogAlertName" persistent class="z-top">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center">
          <div class="self-center relative-position">
            <q-img
              width="320px"
              src="/images/dialog_main/dialog-alert-character-name.png"
              no-spinner=""
              no-transition=""
            ></q-img>
            <div class="absolute-top-right" style="top: -7px; right: -7px">
              <q-btn round v-close-popup flat size="16px">
                <q-img
                  src="/images/icon_main/icon-close.png"
                  no-spinner=""
                  no-transition=""
                >
                </q-img>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <loading-dialog :isShowLoading="isActiveCreateCharacter"></loading-dialog>

    <logout-dialog
      :isDialogLogOut="isShowDialogLogout"
      v-if="isShowDialogLogout"
      @callback-closeDialog="isShowDialogLogout = false"
      @callback-logout="funcLogout()"
    ></logout-dialog>
  </div>
</template>

<script setup>
import characterMain from "components/character_main/character.vue";
import loadingDialog from "components/dialog-loading.vue";
import logoutDialog from "components/dialog_main/logout-dialog.vue";

import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import wordrude from "src/js/wordrude";
import { useStudentStore } from "src/stores/student";
import { auth } from "src/router";
import { useSystemStore } from "src/stores/system";
import { useInventoryStore } from "src/stores/inventory";

const studentStore = useStudentStore();
const systemStore = useSystemStore();
const inventoryStore = useInventoryStore();

const $q = useQuasar();
const $router = useRouter();
const isDesktop = ref($q.platform.is.desktop);

const listOfBadWord = ref(wordrude.list);
const isShowDialogLogout = ref(false);

const PATH = ref(
  "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory"
);
const selectedMenu = ref("skin");
const outfit = ref({
  tops: {
    selected: "shirt-01",
    list: [
      { itemName: "shirt-01", isFront: true, isBack: false, type: "body" },
      { itemName: "shirt-02", isFront: true, isBack: false, type: "body" },
      { itemName: "shirt-03", isFront: true, isBack: false, type: "body" },
      { itemName: "shirt-04", isFront: true, isBack: false, type: "body" },
    ],
  },
  hair: {
    selected: "hair-01",
    list: [
      { itemName: "hair-01", isFront: true, isBack: false, type: "head" },
      { itemName: "hair-02", isFront: true, isBack: false, type: "head" },
      { itemName: "hair-03", isFront: true, isBack: true, type: "head" },
      { itemName: "hair-04", isFront: true, isBack: false, type: "head" },
    ],
  },
  bottoms: {
    selected: "pants-01",
    list: [
      {
        itemName: "pants-01",
        isFront: true,
        isBack: false,
        type: "footer",
      },
      {
        itemName: "pants-02",
        isFront: true,
        isBack: false,
        type: "footer",
      },
      {
        itemName: "pants-03",
        isFront: true,
        isBack: false,
        type: "footer",
      },
      {
        itemName: "pants-04",
        isFront: true,
        isBack: false,
        type: "footer",
      },
    ],
  },
});

const character = ref({
  name: "",
  equipment: {
    head: computed(() =>
      outfit.value.hair.list.find((x) => x.itemName == outfit.value.hair.selected)
    ),
    body: computed(() =>
      outfit.value.tops.list.find((x) => x.itemName == outfit.value.tops.selected)
    ),
    footer: computed(() =>
      outfit.value.bottoms.list.find((x) => x.itemName == outfit.value.bottoms.selected)
    ),
    other: {
      itemName: "",
      isFront: false,
      isBack: false,
      type: "other",
    },
    pet: {
      itemName: "",
      isFront: false,
      isBack: false,
      type: "pet",
    },
    color: "#FFCDB0",
  },
});

const funcSelectedOutfit = (item) => {
  studentStore.setCharacterData([item]);
};

const funcChangeColor = () => {
  studentStore.setColor(character.value.equipment.color);
};

const isBadWord = ref(false);
const funcSetName = () => {
  isBadWord.value = false;
  for (let i = 0; i < listOfBadWord.value.length; i++) {
    let findBadWord = character.value.name.match(listOfBadWord.value[i]);

    if (findBadWord) {
      isBadWord.value = true;
      break;
    }
  }

  if (!isBadWord.value) {
    studentStore.setName(character.value.name);
  }
};

const isErrorCharacterName = computed(() => {
  if (isCreateCharacter.value || character.value.name.length > 0) {
    if (character.value.name.length < 3 || character.value.name == "" || isBadWord.value)
      return true;
    else return false;
  } else {
    return false;
  }
});

const isShowDialogAlertName = ref(false);

const isCreateCharacter = ref(false);
const isActiveCreateCharacter = ref(false);
const funcCreateCharacter = async () => {
  const inventoryStore = useInventoryStore();

  isCreateCharacter.value = true;

  if (isErrorCharacterName.value) {
    isShowDialogAlertName.value = true;
    return;
  }

  isActiveCreateCharacter.value = true;

  let response = await studentStore.setCharacter();

  if (response == "success") {
    studentStore.updateCreateCharacter();
    inventoryStore.addInventory();

    let temp = [];

    for (const key in character.value.equipment) {
      if (key != "color") {
        let item = character.value.equipment[key];

        if (item.itemName != "") {
          temp.push(item);
        }
      }
    }

    inventoryStore.setInventory(temp);

    setTimeout(() => {
      $router.replace("/lobby");
    }, 1000);
  } else {
    setTimeout(() => {
      $router.replace("/");
    }, 1000);
  }
};

const funcLogout = () => {
  const studentStore = useStudentStore();
  studentStore.logout();
  auth.signOut();
};

let authListen;
onMounted(() => {
  systemStore.setRouter("create-character");

  authListen = auth.onAuthStateChanged(async (user) => {
    if (user) {
      let temp = [
        character.value.equipment.head,
        character.value.equipment.body,
        character.value.equipment.footer,
        character.value.equipment.other,
        character.value.equipment.pet,
      ];

      studentStore.setCharacterData(temp);
      studentStore.setColor(character.value.equipment.color);
    } else {
      auth.signOut();
      $router.replace("/");
    }
  });
});

// asdasd
</script>

<style lang="scss" scoped>
.background-main {
  min-width: 1000px;
  height: 100vh;
  background-image: url("/images/background_main/background-create-character.png");
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
}

.background-main-mobile {
  width: 100%;
  height: 100vh;
  background-image: url("/images/background_main/background-create-character.png");
  background-size: cover;
  background-position: 50% 100%;
  background-origin: content-box;
  background-repeat: no-repeat;
  overflow: auto;
}

.box-create-character {
  max-width: 1600px;
  min-width: 1200px;
}

.box-create-character-mobile {
  // width: 100%;
  overflow: hidden;
}

.box-character-name-error {
  border: 2px solid #f00;
}

.box-character-name {
  border: 2px solid #fff;
}

.btn-menu {
  background-color: #db8200;
  border: 2px solid #4a261b;
  border-radius: 20px;
}

.q-color-picker__spectrum div {
  padding-bottom: 30% !important;
}

.border-outfit {
  border: 5px solid transparent;
  background-color: transparent;
  border-radius: 10px;
}

.border-outfit[mobile-mode="true"] {
  border: 2px solid transparent;
  background-color: transparent;
  border-radius: 10px;
}

.border-outfit.selected {
  border: 5px solid transparent;
  background-color: #007aff;
  border-radius: 10px;
}

.border-outfit[mobile-mode="true"].selected {
  border: 2px solid transparent;
  background-color: #007aff;
  border-radius: 10px;
}
</style>
