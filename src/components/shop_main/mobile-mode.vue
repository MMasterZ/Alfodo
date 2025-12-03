<template>
  <div class="background-main row" v-if="systemStore.platform.mobile">
    <div class="col-12" style="height: 300px">
      <div class="box-character relative-position">
        <div class="absolute-bottom" style="bottom: 25px">
          <div
            class="q-pa-md"
            style="width: 250px; margin: auto; overflow: hidden"
          >
            <character
              :isAnimation="true"
              :isShop="true"
              :equipment="equipment"
            ></character>
          </div>
        </div>

        <div class="absolute-top-left q-pa-sm row">
          <div class="col-1 width-fit" @click="$router.replace('/lobby')">
            <q-img
              class="cursor-pointer"
              width="35px"
              no-spinner
              no-transition
              src="/images/icon_main/icon-back.png"
            ></q-img>
          </div>
          <div class="col-1 q-mx-md width-fit">
            <q-img
              no-spinner
              no-transition
              width="120px"
              src="/images/box_main/box-coin-bar.png"
            >
              <div
                class="absolute-top-right no-padding row transparent"
                style="width: 60%; height: 70%; top: 2px"
              >
                <div
                  class="self-center q-px-sm text-overflow text-white"
                  align="left"
                >
                  <span class="f12">
                    {{
                      studentData.coin <= 99999 ? studentData.coin : "+99999"
                    }}
                  </span>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 self-start">
      <div class="box-shop-detail">
        <div class="row justify-center box-header-menu-bar relative-position">
          <div class="col-12 row" style="max-width: 500px">
            <div
              class="col button-header-menu q-py-xs relative-position"
              :class="activeMenu == item.type ? 'selected' : ''"
              @click="
                $emit('callback-selectedMenu', item.type),
                  (isShowSubMenu = true)
              "
              align="center"
              v-for="(item, index) in headerMenu"
            >
              <div align="center">
                <q-img
                  style="width: 35%"
                  no-spinner
                  no-transition
                  :src="`/images/icon_main/icon-shop-${item.img}${
                    activeMenu == item.type ? '-selected' : '-no-selected'
                  }.png`"
                ></q-img>
              </div>
              <div align="center">
                <span class="text-header">
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
          <div class="box-shop-content q-px-xs q-py-sm">
            <div class="row">
              <div
                class="col-12 row justify-center"
                v-if="activeMenu != 'skin'"
              >
                <div
                  class="col-12 row"
                  v-for="(typeShop, indexType) in itemshop"
                >
                  <div
                    class="col-4"
                    @click="
                      $emit(
                        'callback-selectedItem',
                        item,
                        indexType,
                        typeShop.currentPage
                      )
                    "
                    v-if="
                      activeMenu == indexType ||
                      (activeMenu == 'more' && activeSubMenu == indexType)
                    "
                    v-for="(item, index) in typeShop.list[
                      typeShop.currentPage - 1
                    ]"
                  >
                    <div class="relative-position q-pa-sm" align="center">
                      <q-img
                        class="box-items relative-position"
                        :class="
                          typeShop.selected == item.itemName ? 'selected' : ''
                        "
                        src="/images/box_main/box-shop-item.png"
                        no-spinner
                        no-transition
                      >
                        <div
                          class="
                            fit
                            no-padding
                            transparent
                            box-shop-item
                            relative-position
                          "
                        >
                          <div class="row justify-center q-px-md q-py-sm">
                            <div class="col-8 self-center" style="width: 95%">
                              <div class="items-img">
                                <q-img
                                  no-spinner
                                  no-transition
                                  width="80%"
                                  :src="`https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory/${item.itemName}.png`"
                                ></q-img>
                              </div>
                            </div>
                            <div
                              class="col-10 q-pa-xs text-item"
                              style="width: 100%"
                            >
                              <div class="text-overflow" align="left">
                                <span>{{ item.itemNameTh }}</span>
                              </div>
                              <div
                                style="
                                  border: 1px dashed #a1aec7;
                                  margin: 2px 0px;
                                "
                              ></div>
                              <div class="row" v-if="!item.isHas">
                                <div>
                                  <q-img
                                    no-spinner
                                    no-transition
                                    width="20px"
                                    src="/images/icon_main/icon-coin-winner.png"
                                  ></q-img>
                                </div>
                                <div class="self-end q-mx-sm">
                                  {{ item.price }}
                                </div>
                              </div>
                              <div v-else>
                                <div class="self-end q-mx-sm">มีแล้ว</div>
                              </div>
                            </div>
                          </div>

                          <div
                            class="transparent absolute-top-right no-padding"
                            style="right: 10px; top: 1px"
                            v-if="item.dateBalance != '-'"
                          >
                            <div class="label-end-item font-mali-b">
                              <div>
                                {{ item.dateBalance }}
                              </div>
                              <div style="font-size: 6px">Day</div>
                            </div>
                          </div>
                        </div>
                      </q-img>

                      <div
                        class="absolute-center"
                        style="top: 5px"
                        v-if="item.isNew"
                      >
                        <q-img
                          no-spinner
                          no-transition
                          width="70px"
                          src="/images/icon_main/icon-new-items-shop.png"
                        >
                        </q-img>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="" style="padding-bottom: 120px"></div>
              </div>
              <div
                class="col-12 self-center q-py-md"
                v-if="activeMenu == 'skin'"
                align="center"
              >
                <q-color
                  style="width: 50%; border-radius: 5px"
                  v-model="equipment.color"
                  no-header
                  no-footer
                  flat
                  bordered
                  @change="$emit('callback-changeColor')"
                />
                <div class="q-pa-sm row justify-center" align="center">
                  <span class="self-center q-mx-xs f12" style="color: #00638d">
                    เปลี่ยนสีผิวตัวละคร ครั้งละ 50
                  </span>
                  <q-img
                    no-spinner
                    no-transition
                    class="self-center"
                    width="20px"
                    src="/images/icon_main/icon-coin-winner.png"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="isShowSubMenu"
            class="absolute-top-right z-max"
            style="top: 60px; right: 15px"
          >
            <q-img
              no-spinner
              no-transition
              width="100px"
              src="/images/box_main/box-dialog-menu-shop-mobile.png"
            >
              <div
                class="
                  full-width
                  absolute-center
                  no-padding
                  row
                  justify-center
                  items-center
                "
                style="top: 55%; height: 80%"
              >
                <div class="col-10 self-center">
                  <q-img
                    no-spinner
                    no-transition
                    width="100%"
                    :src="`/images/button_main/button-shop-buddy-${
                      activeSubMenu == 'pet' ? 'selected' : 'no-selected'
                    }.png`"
                    @click="(activeSubMenu = 'pet'), (isShowSubMenu = false)"
                  ></q-img>
                </div>
                <div class="col-10 self-center">
                  <q-img
                    no-spinner
                    no-transition
                    width="100%"
                    :src="`/images/button_main/button-shop-accessories-${
                      activeSubMenu == 'other' ? 'selected' : 'no-selected'
                    }.png`"
                    @click="(activeSubMenu = 'other'), (isShowSubMenu = false)"
                  ></q-img>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>
      <div
        class="bg-white fixed-bottom"
        style="
          max-width: 500px;
          min-width: 320px;
          width: 100%;
          z-index: 1;
          margin: auto;
        "
      >
        <div
          class="row justify-center q-pa-xs"
          v-if="activeMenu != 'skin'"
          align="center"
          style="bottom: 15px"
        >
          <div v-if="activeMenu == 'more' && activeSubMenu != ''">
            <q-pagination
              class="bg-white"
              v-model="itemshop[activeSubMenu].currentPage"
              :max="itemshop[activeSubMenu].totalPage"
              :max-pages="7"
              direction-links
              active-color="purple"
              :rounded="false"
            />
          </div>
          <div v-if="activeMenu != 'more'">
            <q-pagination
              class="bg-white"
              v-model="itemshop[activeMenu].currentPage"
              :max="itemshop[activeMenu].totalPage"
              :max-pages="7"
              direction-links
              active-color="purple"
              :rounded="false"
            />
          </div>
        </div>
        <div class="q-py-sm">
          <div class="row justify-center" style="width: 320px; margin: auto">
            <div class="self-center width-fit">
              <q-img
                width="65px"
                class="cursor-pointer"
                @click="$emit('callback-reset')"
                src="/images/button_main/button-reset-equipment.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <div
              class="self-center q-pr-xs box-shop-price"
              style="width: 180px"
            >
              <q-img
                src="/images/box_main/box-shop-price.png"
                no-spinner
                no-transition
              >
                <div
                  class="no-padding absolute-center transparent row"
                  style="height: 70%; width: 90%; top: 45%"
                >
                  <div
                    class="col q-px-md self-center text-overflow"
                    align="left"
                  >
                    <span class="text-price f16">{{ totalPrice }} </span>
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                      class="transparent"
                    >
                      <span class="f16">
                        {{ totalPrice }}
                      </span>
                    </q-tooltip>
                  </div>
                  <q-space></q-space>
                  <div class="col-1 self-center q-px-xs" style="width: 30px">
                    <q-img
                      width="30px"
                      src="/images/icon_main/icon-coin-winner.png"
                    ></q-img>
                  </div>
                </div>
              </q-img>
            </div>
            <div class="self-center q-pa-xs col-2">
              <q-img
                width="width:60px;"
                class="cursor-pointer"
                @click="$emit('callback-showCart')"
                src="/images/button_main/button-buy-item.png"
                no-spinner
                no-transition
              >
              </q-img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import character from "components/character_main/character.vue";

import { useSystemStore } from "src/stores/system";
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";

export default {
  components: {
    character,
  },
  props: {
    itemshop: {
      type: Object,
      default: () => {},
    },
    headerMenu: {
      type: Array,
      default: () => [],
    },
    activeMenu: {
      type: String,
      default: "skin",
    },

    equipment: {
      type: Object,
      default: () => {},
    },
    studentData: {
      type: Object,
      default: () => {},
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const systemStore = useSystemStore();

    const isShowSubMenu = ref(false);
    const activeSubMenu = ref("");

    watch(
      () => props.activeMenu,
      () => {
        if (props.activeMenu == "more") {
          isShowSubMenu.value = true;
        } else {
          isShowSubMenu.value = false;
        }
      }
    );

    return {
      systemStore,
      activeSubMenu,
      isShowSubMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.background-main {
  max-width: 1000px;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
  max-height: fit-content;
  margin: auto;
}

.box-character {
  max-width: 500px;
  min-width: 300px;
  height: 100%;
  background-image: url("/images/background_main/background-shop-mobile.png");
  background-position: center bottom;
  background-size: cover;
  margin: auto;
}

.box-shop-detail {
  max-width: 500px;
  min-width: 300px;
  margin: auto;
}

.box-header-menu-bar {
  background-color: #a532ea;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.5);
}

.button-header-menu {
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-family: fredoka;
  color: #fff;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
}

.button-header-menu.selected {
  background-color: #fff;
  color: #a532ea;
}

.text-header {
  font-size: clamp(12px, 3vw, 16px);
}

.box-shop-content {
  position: relative;
  width: 100%;
  height: calc(100vh - 370px);
  background-color: #faf3ff;
  overflow: auto;
  z-index: 1;
}

.box-shop-content::-webkit-scrollbar {
  width: 0px;
}

.text-overflow {
  color: #50008f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
}

.box-items {
  cursor: pointer;
}

.box-items.selected {
  border-radius: 10px;
  box-shadow: 0px 0px 0px 3px #a532ea;
  background-color: #a532ea;
}

.items-img {
  position: relative;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding: 5px;
}

.text-overflow {
  color: #00638d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-item {
  color: #00638d;
  font-size: clamp(12px, 3vw, 14px);
}

.label-end-item {
  font-size: 10px;
  width: fit-content;
  padding: 0px 5px 3px 5px;
  background-color: #ff5454;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
</style>
