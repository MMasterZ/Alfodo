<template>
  <q-page
    class="row"
    :class="isDesktop ? 'box-equipment-main' : 'box-equipment-main-mobile'"
  >
    <div
      class="col-12 relative-position"
      :class="isDesktop ? 'box-lobby-content' : 'justify-center'"
    >
      <!-- #region Desktop -->
      <div v-if="isDesktop" :class="isDesktop ? '' : ''">
        <!-- Background Desktop -->
        <div class="relative-position">
          <background-main></background-main>

          <div class="absolute-center box-character-container">
            <character
              :isAnimation="true"
              :isEquipment="true"
              :equipment="characterData.equipment"
            ></character>
          </div>

          <div class="absolute-top-right box-equipment-container" align="center">
            <q-img
              src="/images/equipment_main/box-equipment.webp"
              no-spinner
              no-transition
              class="no-margin no-padding"
            >
              <div class="absolute-center fit transparent no-padding row justify-center items-center">
                <div class="absolute box-equipment-content">

                  <div class="row">
                    <div
                      class="col relative-position"
                      style="width: 20%"
                      v-for="(itemMenu, indexMenu) in equipmentMenu"
                      :key="indexMenu"

                    >
                      <q-img
                        :src="`/images/equipment_main/button-menu-${
                          itemMenu.name
                        }${selectedMenu == itemMenu.name ? '-selected' : ''}.webp`"
                        no-spinner
                        no-transition
                        class="cursor-pointer"
                        @click="funcSelectedMenu(itemMenu.name)"
                      ></q-img>
                    </div>
                  </div>

                  <div class="box-items-container">
                    <div class="row fit">
                      <div
                        class="self-start row"
                        style="
                          width: 90%;
                          min-height: 80%;
                          max-height: fit-content;
                          margin: auto;
                          padding: 3% 0%;
                        "
                      >
                        <div
                          class="col-1 self-start relative-position"
                          style="width: 20%"
                          v-for="(itemInventory, indexInventory) in comItemList[
                            selectedPageNumber - 1
                          ]"
                          :key="indexInventory"
                        >
                          <div
                            style="padding: 5%"
                            @click="funcSetEquipment(itemInventory)"
                          >
                            <div v-if="itemInventory.itemName == ''">
                              <q-img
                                width="100%"
                                :src="`/images/equipment_main/button-item-${
                                  comCharacterData.itemName == ''
                                    ? 'close-selected'
                                    : 'close'
                                }.webp`"
                                no-spinner
                                no-transition
                                class="button-item"
                                :class="
                                  comCharacterData.itemName == ''
                                    ? ''
                                    : 'cursor-pointer active'
                                "
                              >
                              </q-img>
                            </div>
                            <div v-else>
                              <q-img
                                width="100%"
                                :src="`/images/equipment_main/button-item${
                                  itemInventory?.grade == 'limited' ? `-limited` : ''
                                }${
                                  itemInventory.itemName == ''
                                    ? '-close'
                                    : comCharacterData.itemName == itemInventory.itemName
                                    ? '-selected'
                                    : ''
                                }.webp`"
                                no-spinner
                                no-transition
                                class="button-item"
                                :class="
                                  comCharacterData.itemName == itemInventory.itemName
                                    ? ''
                                    : 'cursor-pointer'
                                "
                              >
                                <div
                                  class="transparent fit row justify-center items-center no-padding"
                                  v-if="itemInventory.itemName != ''"
                                >
                                  <q-img
                                    width="68%"
                                    :src="`${itemInventory.path}`"
                                    class=""
                                    no-spinner
                                    no-transition
                                  ></q-img>
                                </div>
                              </q-img>
                              <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                :offset="[10, -3]"
                                class="transparent"
                                v-if="
                                  itemInventory.itemNameTh != '' &&
                                  itemInventory.itemNameTh != undefined
                                "
                              >
                                <div
                                  style="
                                    background-color: #757575;
                                    border-radius: 8px;
                                    padding: 3px 5px;
                                  "
                                >
                                  {{ `${itemInventory.itemNameTh}` }}
                                </div>
                              </q-tooltip>
                            </div>
                          </div>

                          <div
                            class="absolute-center"
                            style="width: 36.24%; top: 10%"
                            v-if="!itemInventory?.isSeen"
                          >
                            <q-img
                              src="/images/icon_main/icon-new-items-shop-red.png"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                        </div>
                      </div>

                      <!-- #region Pagination -->
                      <div
                        class="col-12 row justify-center"
                        style="height: 20%"
                        v-if="comRunPagination > 0"
                      >
                        <div class="col-12 row justify-center items-center font-mali-b">
                          <div class="col-1 button-pagination">
                            <q-img
                              src="/images/equipment_main/button-pagination-number.webp"
                              @click="
                                selectedPageNumber == 1 ? null : selectedPageNumber--
                              "
                              no-spinner
                              no-transition
                              :class="selectedPageNumber == 1 ? '' : 'cursor-pointer'"
                            >
                              <div
                                class="absolute-center button-text-pagination transparent"
                                :class="selectedPageNumber == 1 ? 'disable' : ''"
                              >
                                {{ `<` }}
                              </div>
                            </q-img>
                          </div>
                          <div
                            class="col-1 button-pagination"
                            v-for="i in comRunPagination"
                            v-show="i < 10"
                          >
                            <q-img
                              :src="`/images/equipment_main/button-pagination-number${selectedPageNumber == i ? '-selected' : ''}.webp`"
                              @click="selectedPageNumber = funcAddPaginationPage(i)"
                              no-spinner
                              no-transition
                            >
                              <div
                                class="absolute-center fit button-text-pagination no-padding trasparent cursor-pointer"
                                :class="
                                  selectedPageNumber == funcAddPaginationPage(i)
                                    ? 'selected'
                                    : ''
                                "
                              >
                                <div class="absolute-center">
                                  <span
                                    v-if="
                                      (comRunPagination > 9 &&
                                        selectedPageNumber > 5 &&
                                        i == 2) ||
                                      (comRunPagination > 9 &&
                                        selectedPageNumber < comRunPagination - 4 &&
                                        i == 8)
                                    "
                                  >
                                    {{ `...` }}
                                  </span>
                                  <span v-else>
                                    {{ `${funcAddPaginationPage(i)}` }}
                                  </span>
                                </div>
                              </div></q-img
                            >
                          </div>
                          <div class="col-1 button-pagination">
                            <q-img
                              src="/images/equipment_main/button-pagination-number.webp"
                              @click="
                                selectedPageNumber == comRunPagination
                                  ? null
                                  : selectedPageNumber++
                              "
                              no-spinner
                              no-transition
                              :class="
                                selectedPageNumber == comRunPagination
                                  ? ''
                                  : 'cursor-pointer'
                              "
                            >
                              <div
                                class="absolute-center button-text-pagination transparent"
                                :class="
                                  selectedPageNumber == comRunPagination ? 'disable' : ''
                                "
                              >
                                {{ `>` }}
                              </div>
                            </q-img>
                          </div>
                        </div>
                      </div>
                      <!-- #endregion -->
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="absolute-center transparent no-padding"
                style="width: 92%; top: 25%; margin: auto"
              >
                <div class="row z-max">
                  <div
                    class="col relative-position"
                    style="width: 20%"
                    v-for="(itemMenu, indexMenu) in equipmentMenu"
                    :key="indexMenu"
                  >
                    <div
                      class="absolute-center"
                      v-if="funcCheckNewEquipment(itemMenu.name)"
                      style="width: 32.62%; top: 0%"
                    >
                      <q-img
                        src="/images/icon_main/icon-new-items-shop-red.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>
              </div>
            </q-img>
          </div>
        </div>

        <div class="absolute-top-left button-back">
          <q-img
            src="/images/equipment_main/button-back.webp"
            no-spinner
            no-transition
            @click="$router.replace('/lobby')"
            class="cursor-pointer"
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Mobile -->
      <div class="fit relative-position" align="center" v-if="!isDesktop">
        <div class="background-equipment-mobile relative-position">

          <div class="absolute-center box-background-mobile">
          </div>

          <div class="absolute-top-left q-pa-md">
            <q-btn round flat style="z-index: 1" @click="$router.replace('/lobby')">
              <q-img
                src="/images/equipment_main/button-back.webp"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
          <div class="absolute-center" style="width: 300px">
            <character
              :isAnimation="true"
              :isEquipment="true"
              :equipment="characterData.equipment"
            ></character>
          </div>
        </div>

        <div class="box-equipment-content-mobile relative-position">
          <div class="box-menu-header relative-position">
            <div class="absolute icon-header">
              <q-img src="/images/equipment_main/box-menu-header-mobile.webp" no-spinner="" no-transition=""></q-img>
            </div>
          </div>
          <div class="row relative-position">
            <div
              class="col relative-position"
              style="width: 20%; z-index: 2; background-color: #f6d588"
              v-for="(itemMenu, indexMenu) in equipmentMenu"
              :key="indexMenu"
            >
              <q-img
                :src="`/images/equipment_main/button-menu-${itemMenu.name}-mobile${
                  selectedMenu == itemMenu.name ? '-selected' : ''
                }.webp`"
                no-spinner
                no-transition
                class="cursor-pointer"
                @click="funcSelectedMenu(itemMenu.name)"
              ></q-img>

              <div
                class="absolute-center"
                style="top: -3px; width: 36px"
                v-if="funcCheckNewEquipment(itemMenu.name)"
              >
                <q-img
                  src="/images/icon_main/icon-new-items-shop-red.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>

          <div class="box-items-container mobile">
            <div class="row">
              <div
                class="self-start row"
                style="
                  width: 85%;
                  min-height: 80%;
                  max-height: fit-content;
                  margin: auto;
                  padding: 50px 0%;
                "
              >
                <div
                  class="col-1 self-start"
                  style="width: 33.33%"
                  align="center"
                  v-for="(itemInventory, indexInventory) in comItemList[
                    selectedPageNumber - 1
                  ]"
                  :key="indexInventory"
                >
                  <div style="padding: 5%" @click="funcSetEquipment(itemInventory)">
                    <div v-if="itemInventory.itemName == ''">
                      <q-img
                        width="90%"
                        :src="`/images/equipment_main/button-item-${
                          comCharacterData.itemName == ''
                            ? 'close-selected'
                            : 'close'
                        }.webp`"
                        no-spinner
                        no-transition
                        class="button-item"
                        :class="
                          comCharacterData.itemName == itemInventory.itemName
                            ? ''
                            : 'cursor-pointer active'
                        "
                        style="pointer-events: none"
                      >
                      </q-img>
                    </div>
                    <div class="relative-position" v-else>
                      <q-img
                        width="90%"
                       :src="`/images/equipment_main/button-item${
                          itemInventory?.grade == 'limited' ? `-limited` : ''
                        }${
                          itemInventory.itemName == ''
                            ? '-close'
                            : comCharacterData.itemName == itemInventory.itemName
                            ? '-selected'
                            : ''
                        }.webp`"
                        no-spinner
                        no-transition
                        class="button-item"
                        :class="
                          comCharacterData.itemName == itemInventory.itemName
                            ? ''
                            : 'cursor-pointer active'
                        "
                        style="-webkit-touch-callout: none"
                        :id="`item-img-${indexInventory}`"
                        @mouseover="($event) => funcCancelHoldImage(indexInventory)"
                      >
                        <div
                          class="transparent fit row justify-center items-center no-padding"
                        >
                          <q-img
                            width="68%"
                            :src="`${itemInventory.path}`"
                            class=""
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                      </q-img>

                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, -3]"
                        class="transparent"
                        v-if="
                          itemInventory.itemNameTh != '' &&
                          itemInventory.itemNameTh != undefined
                        "
                      >
                        <div
                          style="
                            background-color: #757575;
                            border-radius: 8px;
                            padding: 3px 5px;
                          "
                        >
                          {{ `${itemInventory.itemNameTh}` }}
                        </div>
                      </q-tooltip>

                      <div
                        class="absolute-center"
                        style="top: 2px; width: 36px"
                        v-if="!itemInventory?.isSeen"
                      >
                        <q-img
                          src="/images/icon_main/icon-new-items-shop-red.png"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style="height: 10%"></div>
          </div>
        </div>

        <div
          class="fixed-bottom row justify-center box-pagination-container mobile"
          v-if="comRunPagination > 0"
        >
          <div class="col-12 row items-center font-mali-b">
            <div class="col-1 button-pagination mobile">
              <q-img
                src="/images/equipment_main/button-pagination-number.webp"
                @click="selectedPageNumber == 1 ? null : selectedPageNumber--"
                no-spinner
                no-transition
                :class="selectedPageNumber == 1 ? '' : 'cursor-pointer'"
              >
                <div
                  class="absolute-center button-text-pagination mobile transparent"
                  :class="selectedPageNumber == 1 ? 'disable' : ''"
                >
                  {{ `<` }}
                </div>
              </q-img>
            </div>
            <div
              class="col-1 button-pagination mobile"
              v-for="i in comRunPagination"
              :key="i"
              v-show="i < 10"
            >
              <div>
                <q-img
                  :src="`/images/equipment_main/button-pagination-number${selectedPageNumber == i ? '-selected' : ''}.webp`"
                  no-spinner
                  no-transition
                  @click="
                    i < comRunPagination + 1
                      ? funcSelectedPaginationPaage(funcAddPaginationPage(i))
                      : null
                  "
                >
                  <div
                    class="absolute-center fit button-text-pagination mobile no-padding trasparent cursor-pointer"
                    :class="
                      selectedPageNumber == funcAddPaginationPage(i) ? 'selected' : ''
                    "
                  >
                    <div class="absolute-center">
                      <span
                        v-if="
                          (comRunPagination > 9 && selectedPageNumber > 5 && i == 2) ||
                          (comRunPagination > 9 &&
                            selectedPageNumber < comRunPagination - 4 &&
                            i == 8)
                        "
                      >
                        {{ `...` }}
                      </span>
                      <span v-else> {{ `${funcAddPaginationPage(i)}` }}</span>
                    </div>
                  </div>
                </q-img>
              </div>
            </div>
            <q-space></q-space>
            <div class="col-1 button-pagination mobile">
              <q-img
                src="/images/equipment_main/button-pagination-number.webp"
                @click="
                  selectedPageNumber == comRunPagination ? null : selectedPageNumber++
                "
                no-spinner
                no-transition
                :class="selectedPageNumber == comRunPagination ? '' : 'cursor-pointer'"
              >
                <div
                  class="absolute-center button-text-pagination mobile transparent"
                  :class="selectedPageNumber == comRunPagination ? 'disable' : ''"
                >
                  {{ `>` }}
                </div>
              </q-img>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
  </q-page>
</template>

<script setup>
import backgroundMain from "components/equipment_main/background-main.vue";
import character from "components/character_main/character.vue";

import { useQuasar } from "quasar";
import { ref, computed, defineComponent, onBeforeUnmount, onMounted } from "vue";
import { useStudentStore } from "src/stores/student";
import { useInventoryStore } from "src/stores/inventory";
import { useSystemStore } from "src/stores/system";
import { useRoute, useRouter } from "vue-router";

// Components
const components = defineComponent({
  character,
  backgroundMain,
});

// #region ***** Initialize Data *****
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const isDesktop = ref($q.platform.is.desktop);
// #endregion

// #region ***** Data *****
const selectedMenu = ref("head");
const equipmentMenu = ref([
  {
    name: "head",
  },
  {
    name: "body",
  },
  {
    name: "footer",
  },
  {
    name: "other",
  },
  {
    name: "pet",
  },
]);

const characterData = ref({
  equipment: {
    head: {},
    body: {},
    footer: {},
    pet: {},
    other: {},
  },
});

// #endregion

// #region  ***** Function *****

// #region Set equipment
const funcSetEquipment = async (item, type) => {
  const studentStore = useStudentStore();

  if (characterData.value.equipment[selectedMenu.value].itemName == item.itemName) {
    return;
  }

  characterData.value.equipment[selectedMenu.value] = item;
  studentStore.setCharacterData([item]);
  studentStore.setCharacter();
};
// #endregion

// #region Selected Menu
const funcSelectedMenu = (menu) => {
  const inventoryStore = useInventoryStore();

  if (menu != selectedMenu.value) {
    if (funcCheckNewEquipment(selectedMenu.value)) {
      funcUpdateIsSeen(selectedMenu.value);
    }
  }

  selectedMenu.value = menu;
};
// #endregion

// #region Cancel Hold Image
const funcCancelHoldImage = (id) => {
  var protectedImage = document.getElementById(`item-img-${id}`);
  protectedImage.oncontextmenu = (e) => {
    e.preventDefault();
  };
};
// #endregion

// #region Load Inventory
const tempInventoryList = ref([]);
const funcLoadInventory = async () => {
  const inventoryStore = useInventoryStore();

  if (inventoryStore.isLoaded) {
    tempInventoryList.value = inventoryStore.list;
    return;
  }

  try {
    let response = await inventoryStore.getInventory();

    if (response != "success") {
      throw new Error("error");
    }

    tempInventoryList.value = inventoryStore.list;
  } catch (e) {
    console.log(e);
  }
};
// #endregion

// #region Add Pagination
const funcAddPaginationPage = (page) => {
  if (comRunPagination.value < 10) {
    return page;
  }

  let currentPage = page;
  let totalPage = comRunPagination.value;
  let currentSelectedPage = selectedPageNumber.value;

  let hlefPage = Math.ceil(9 / 2);

  if (currentSelectedPage > hlefPage && currentSelectedPage < totalPage - 4) {
    let setAddNumber = Math.floor(currentSelectedPage - hlefPage);
    if (currentSelectedPage > hlefPage) {
      currentPage = page + setAddNumber;
    }
  } else {
    if (currentSelectedPage <= hlefPage) {
      currentPage = page;
    }

    if (currentSelectedPage >= totalPage - 4) {
      currentPage = page + (totalPage - 9);
    }
  }

  if (page == 1) {
    currentPage = 1;
  }

  if (page == 9) {
    currentPage = totalPage;
  }

  return currentPage;
};
// #endregion

// #region Selected Pagination Page
const funcSelectedPaginationPaage = (page) => {
  selectedPageNumber.value = page;
};
// #endregion

// #region Check New Equipment
const funcCheckNewEquipment = (type) => {
  let isCheck = false;

  let findIsNewItem = tempInventoryList.value.filter((x) => {
    return x.type == type && x.isSeen == false;
  });

  if (findIsNewItem.length > 0) {
    isCheck = true;
  }

  return isCheck;
};
// #endregion

// #region Update Is Seen
const funcUpdateIsSeen = async (menu) => {
  const inventoryStore = useInventoryStore();

  inventoryStore.updateIsSeen(menu);

  tempInventoryList.value = tempInventoryList.value.map((x) => {
    if (x.type == menu) {
      x.isSeen = true;
    }
    return x;
  });
};
// #endregion

// #endregion

// #region ***** Computed *****
const selectedPageNumber = ref(1);
const comItemList = computed(() => {
  const inventoryStore = useInventoryStore();

  let temp = [];
  selectedPageNumber.value = 1;

  let tempItem = tempInventoryList.value.filter((item, index) => {
    return item.type == selectedMenu.value;
  });

  tempItem = inventoryStore.updateSortInventory(tempItem);

  tempItem = JSON.stringify(tempItem);
  let itemJSON = JSON.parse(tempItem);

  let runItemMaxLength = Math.ceil(itemJSON.length / 10);

  let minLength = 0;
  let maxLength = 10;

  if (selectedMenu.value == "pet" || selectedMenu.value == "other") {
    let setOutOfPet = {
      itemName: "",
      isBack: false,
      isFront: false,
      type: selectedMenu.value,
      isSeen: true,
    };
    itemJSON.unshift(setOutOfPet);
  }

  if (!$q.platform.is.desktop) {
    runItemMaxLength = Math.ceil(itemJSON.length / 9);
    maxLength = 9;
  }

  for (let i = 0; i < runItemMaxLength; i++) {
    temp.push(itemJSON.slice(minLength, maxLength));

    if (!$q.platform.is.desktop) {
      minLength += 9;
      maxLength += 9;
    } else {
      minLength += 10;
      maxLength += 10;
    }
  }

  return temp;
});

const comRunPagination = computed(() => {
  let temp = 0;

  if (comItemList.value.length) {
    temp = comItemList.value.length;
  }

  return temp;
});

const comCharacterData = computed(() => {
  const studentStore = useStudentStore();
  let temp = studentStore.characterData[selectedMenu.value];

  return temp;
});

// #endregion

onMounted(() => {
  const studentStore = useStudentStore();
  const systemStore = useSystemStore();

  systemStore.setRouter("Equipment");

  funcLoadInventory();

  characterData.value.equipment = studentStore.characterData;
});

onBeforeUnmount(() => {
  if (funcCheckNewEquipment(selectedMenu.value)) {
    funcUpdateIsSeen(selectedMenu.value);
  }
});
</script>

<style lang="scss" scoped>
.box-equipment-main {
  width: 100%;
  // min-width: 1200px;
  box-sizing: content-box;
  background-image: url("/images/background_main/backdrop-lobby.png");
  background-size: contain;
  background-position: center;
  //   background-repeat: no-repeat;
}

.box-equipment-main-mobile {
  max-width: 1600px;
  width: 100%;
  min-width: 300px;
  height: 100vh;
  background-image: url("/images/background_main/backdrop-lobby.png");
  background-size: cover;
  background-position: center;
  margin: auto;
}

.background-equipment-mobile {
  min-width: 360px;
  max-width: 1000px;
  height: 45%;
  overflow: hidden;

  & .box-background-mobile {
    width: 100%;
    height: 100%;
    background-image: url("/images/background_main/background-equipment-mobile.webp");
    background-position: 0px bottom;
    background-size: cover;
    background-repeat: no-repeat;
  }
}

// #region Button Back
.button-back {
  width: clamp(31.875px,3.1875cqw,51px);
  padding: 2%;

  &.mobile{

  }
}
// #endregion

// #region Box Character Container
.box-character-container {
  width: 33.75%;
  top: 59%;
  left: 25%;
}
// #endregion

// #region Box Equipment Container
.box-equipment-container {
  width: clamp(583.75px,58.375cqw,934px);
  top: clamp(101.25px,10.125cqw,162px);
  right: 0%;
}
// #endregion

// #region Box Items Container
.box-items-container {
  width: 95%;
  height: 84%;
  // background-color: #fff;
  overflow: hidden;
}

.box-items-container.mobile {
  height: calc(100% - 27%);
  overflow: auto;
}

.box-items-container.mobile::-webkit-scrollbar {
  width: 0.5vw;
}

.button-item.active:active {
  transform: scale(0.9);
  transition: 0.1s;
}
// #endregion

// #region Box Pagination

.box-pagination-container.mobile {
  max-width: 400px;
  width: 100%;
  min-width: 360px;
  margin: auto;
  background-color: #fff;
  box-shadow: 0px -1px 4px 2px rgba(0, 0, 0, 0.2);
}

.button-pagination {
  width: 4.38%;
}

.button-pagination.mobile {
  width: 9.091%;
}

.button-text-pagination.selected {
  cursor: pointer;
  color: #fff;
}

.button-text-pagination.disable {
  opacity: 0.2;
  color: #884924;
  cursor: default;
}

.button-text-pagination {
  font-size: min(16px, 1vw);
  color: #014DA4;
  background-color: transparent;
}

.button-text-pagination.mobile {
  font-size: 16px;
}
// #endregion

.box-lobby-content {
  max-width: 1600px;
  // min-width: 1200px;
  width: 100%;
  margin: auto;
}

.box-equipment-content {
  top:clamp(31.25px,3.125cqw,50px);
  left:clamp(34.375px,3.4375cqw,55px);
  width: clamp(437.5px,43.75cqw,700px);
  height: 82.7%;
  background-color: transparent;
  border-radius: clamp(31.25px,3.125cqw,50px);
  box-sizing: border-box;
  overflow: hidden;
}

.box-equipment-content-mobile {
  min-width: 360px;
  max-width: 1000px;
  background-color: #D4F3FF;
  height: 55%;
  margin: auto;

  & .box-menu-header{
    width:100%;
    border-top:2px solid #073B66;
    background-color:#0C90B9;
    padding-bottom:10px;

    & .icon-header{
      bottom:0px;
      left:50%;
      transform: translateX(-50%);
      width:74px;
    }
  }
}

.button-menu {
  font-family: fredoka;
  font-size: 16px;
  background-color: #9f4d00;
  box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  color: #fff;
  cursor: pointer;
}

.button-menu.selected {
  background-color: #f6d588;
  box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0);
  color: #9f4d00;
}
</style>
