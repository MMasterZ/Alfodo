<template>
  <div>
    <!-- #region Desktop -->
    <div
      class="fit row justify-center relative-position animate__animated animate__fadeInLeft"
      style="animation-duration: 0.7s"
      v-if="platform.desktop"
    >
      <div class="box-shop-container relative-position">
        <background-shop></background-shop>
        <div class="absolute-center fit" tyle="oveflow: hidden">
          <div class="row fit">
            <div class="col box-character row justify-center relative-position">
              <div class="box-character-sub">
                <character
                  :isAnimation="true"
                  :setId="`character-in-shop-desktop`"
                  :isShop="true"
                  :equipment="equipment"
                ></character>
              </div>
              <div
                class="absolute-center row justify-center"
                style="width: 100%; top: 90%"
              >
                <div class="self-center q-pa-sm" style="width: 11%">
                  <q-img
                    no-spinner
                    no-transition
                    class="cursor-pointer"
                    src="/images/button_main/button-event-story-reset-shop.png"
                    @click="funcResetEquipment()"
                  ></q-img>
                </div>
                <div class="self-center" style="width: 37%">
                  <q-img
                    no-spinner
                    no-transition
                    src="/images/box_main/box-event-story-sum-total-coin-shop.png"
                  >
                    <div
                      class="row no-padding absolute-center transparent"
                      style="
                        top: 45%;
                        width: 85%;
                        height: 70%;
                        overflow: hidden;
                        color: #4a261b;
                      "
                    >
                      <div class="self-center q-px-sm">
                        <span class="f20 font-mali-m">
                          {{ sumTotalPrice }}
                        </span>
                      </div>
                      <q-space></q-space>
                      <div class="self-center" style="width: 20%">
                        <q-img
                          no-spinner
                          no-transition
                          :src="eventStore.eventDataInfo.coinUrl"
                        ></q-img>
                      </div>
                    </div>
                  </q-img>
                </div>
                <div class="self-center q-pa-sm" style="width: 14%">
                  <q-img
                    no-spinner
                    no-transition
                    @click="isShowDialogCart = true"
                    class="cursor-pointer"
                    src="/images/button_main/button-event-story-cart-shop.png"
                  ></q-img>
                </div>
              </div>
            </div>
            <div class="col q-pa-md relative-position">
              <div
                v-if="eventData.isEventItemshopLoading"
                class="absolute-center"
              >
                <logo-login style="width: 120px; height: 120px"></logo-login>
                <div style="margin-top: -15px" align="center">Loading...</div>
              </div>
              <div
                class="col-12 q-pb-md q-mb-md"
                style="height: fit-content"
                align="right"
              >
                <div
                  class="self-start box-diamond font-mali-b f20 row justify-center"
                >
                  <div class="relative-position" style="width: 20px">
                    <q-img
                      no-spinner=""
                      no-transition
                      class="absolute-center"
                      width="80px"
                      :src="eventStore.eventDataInfo.coinUrl"
                    ></q-img>
                  </div>
                  <div
                    align="center"
                    class="col q-mr-sm q-pr-sm q-pl-xs q-ml-sm"
                  >
                    <span class="">
                      {{ `${diamond >= 10000 ? "+9999" : diamond}` }}
                    </span>

                    <q-tooltip
                      class="bg-black text-white q-px-lg"
                      style="border-radius: 20px"
                    >
                      <span class="f16">
                        {{ diamond }}
                      </span>
                    </q-tooltip>
                  </div>
                </div>
              </div>
              <div class="row justify-center" align="center">
                <div
                  class="col-10 self-start row"
                  style="
                    min-width: 300px;
                    width: 100%;
                    max-width: 425px;
                    height: fit-content;
                  "
                  v-if="!eventData.isEventItemshopLoading"
                >
                  <div
                    class="col-4 q-py-xs"
                    style="width: 140px; height: fit-content"
                    align="center"
                    v-for="(itemshop, indexItemshop) in eventData.itemshopList[
                      eventData.currentPageItemshop
                    ]"
                    :key="indexItemshop"
                  >
                    <div
                      class="box-item-shop-border"
                      :class="
                        selectedDataList[itemshop.type].length
                          ? selectedDataList[itemshop.type][0].itemName ==
                            itemshop.itemName
                            ? 'selected'
                            : ''
                          : ''
                      "
                    >
                      <div
                        class="box-item-shop"
                        @click="funcSelectedEquipment(itemshop)"
                      >
                        <div
                          class="box-sub relative-position row justify-center items-center q-pa-sm"
                        >
                          <div
                            class="col-12 self-start item-image relative-position"
                          >
                            <q-img
                              no-spinner
                              no-transition
                              class="absolute-center"
                              style="width: 60%"
                              :src="`${pathURL}/${itemshop.itemName}.png`"
                            ></q-img>
                          </div>
                          <div class="col-12 q-px-sm">
                            <div
                              class="q-pl-xs q-pa-xs text-overflow f12"
                              align="left"
                            >
                              {{ itemshop.itemNameTh }}
                            </div>
                            <div class="dot q-mb-sm"></div>
                            <div class="relative-position">
                              <q-img
                                no-spinner=""
                                no-transition
                                class="absolute-center"
                                width="20px"
                                style="left: 15px"
                                :src="eventStore.eventDataInfo.coinUrl"
                              ></q-img>
                              <div
                                class="q-pl-lg q-ml-xs f12 q-pa-xs"
                                align="left"
                              >
                                {{ itemshop.price }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="absolute-bottom q-py-md q-pb-lg"
                align="center"
                v-if="!eventData.isEventItemshopLoading"
              >
                <div class="width-fit row box-pagination font-mali-b f16">
                  <div
                    class="pagination-number cursor-pointer row justify-center items-center"
                    v-if="eventData.currentPageItemshop >= 0"
                    @click="
                      eventData.currentPageItemshop == 0
                        ? null
                        : eventData.currentPageItemshop--
                    "
                  >
                    {{ `<` }}
                  </div>
                  <div
                    v-for="indexNumber in eventData.itemshopList.length"
                    :key="indexNumber"
                  >
                    <div
                      class="pagination-number row justify-center items-center"
                      :class="
                        indexNumber == 0
                          ? 'cursor-inherit'
                          : eventData.currentPageItemshop == indexNumber - 1
                          ? 'active'
                          : 'no-active'
                      "
                      @click="
                        indexNumber == 0
                          ? null
                          : (eventData.currentPageItemshop = indexNumber - 1)
                      "
                    >
                      {{ `${indexNumber}` }}
                    </div>
                  </div>

                  <div
                    class="pagination-number cursor-pointer row justify-center items-center"
                    @click="
                      eventData.currentPageItemshop ==
                      eventData.itemshopList.length - 1
                        ? null
                        : eventData.currentPageItemshop++
                    "
                  >
                    {{ `>` }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute-center" style="top: 0">
        <q-img
          no-spinner
          no-transition
          width="300px"
          src="/images/label_main/label-event-story-shop.png"
        ></q-img>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div
      class="absolute-center box-shop-container-mobile animate__animated animate__fadeIn fit row"
      style="animation-duration: 0.7s"
      v-if="platform.mobile"
    >
      <div class="relative-position">
        <!-- Character -->
        <div class="box-character-mobile row justify-center" align="center">
          <div class="self-end q-pb-md relative-position" style="width: 80%">
            <character
              :isAnimation="true"
              :setId="`character-in-shop-desktop`"
              :isShop="true"
              :equipment="equipment"
            ></character>
          </div>

          <div class="absolute-top-right q-pa-md">
            <div class="box-diamond-mobile font-mali-b f16 row justify-center">
              <div class="relative-position" style="width: 20px">
                <q-img
                  no-spinner
                  no-transition
                  class="absolute-center"
                  width="55px"
                  :src="eventStore.eventDataInfo.coinUrl"
                ></q-img>
              </div>
              <div align="center" class="col q-mr-sm q-pr-sm q-pl-xs q-ml-sm">
                <span class="">
                  {{ `${diamond >= 10000 ? "+9999" : diamond}` }}
                </span>

                <q-tooltip
                  class="bg-black text-white q-px-lg"
                  style="border-radius: 20px"
                >
                  <span class="f16">
                    {{ diamond }}
                  </span>
                </q-tooltip>
              </div>
            </div>
          </div>
        </div>

        <!-- #region show itemshop and button buy -->
        <div class="box-shop-item-mobile">
          <!-- item shop -->
          <div
            class="self-center box-item-shop-container mobile relative-position"
          >
            <div class="row fit q-pt-sm q-pa-sm">
              <div
                class="col-4 q-pa-xs"
                v-for="(itemshop, indexItemshop) in eventData.itemshopList[
                  eventData.currentPageItemshop
                ]"
                :key="indexItemshop"
              >
                <div
                  class="box-item-shop-border mobile"
                  :class="
                    selectedDataList[itemshop.type].length
                      ? selectedDataList[itemshop.type][0].itemName ==
                        itemshop.itemName
                        ? 'selected'
                        : ''
                      : ''
                  "
                >
                  <div class="box-item-shop mobile">
                    <div
                      class="box-sub relative-position row justify-center items-center q-pa-sm"
                      @click="funcSelectedEquipment(itemshop)"
                    >
                      <div class="col-12" style="height: 0px"></div>
                      <div
                        class="col-12 self-start item-image mobile relative-position q-pa-sm"
                        align="center"
                      >
                        <q-img
                          no-spinner
                          no-transition
                          width="90%"
                          :src="`${pathURL}/${itemshop.itemName}.png`"
                        ></q-img>
                      </div>
                      <div class="col-12">
                        <div class="q-py-xs q-ml-xs text-overflow">
                          {{ itemshop.itemNameTh }}
                        </div>
                        <div class="dot q-mb-sm"></div>
                        <div class="relative-position q-py-xs">
                          <q-img
                            no-spinner
                            no-transition
                            class="absolute-center"
                            width="20px"
                            style="left: 10px"
                            :src="eventStore.eventDataInfo.coinUrl"
                          ></q-img>
                          <div class="q-pl-lg f14">
                            {{ itemshop.price }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style="height: 10px" class="col-12"></div>
            </div>
          </div>

          <!-- Box Buy Item And Pagination -->
          <div class="absolute-bottom">
            <div class="bg-white shadow-2" style="height: 85px">
              <div
                class="bg-white row justify-between font-fredoka f16"
                align="center"
              >
                <div
                  class="box-pagination mobile"
                  v-if="eventData.currentPageItemshop >= 0"
                  @click="
                    eventData.currentPageItemshop == 0
                      ? null
                      : eventData.currentPageItemshop--
                  "
                >
                  <div
                    class="pagination-number mobile row justify-center items-center"
                  >
                    {{ `<` }}
                  </div>
                </div>
                <div class="row box-pagination mobile">
                  <div
                    v-for="indexNumber in eventData.itemshopList.length"
                    :key="indexNumber"
                  >
                    <div
                      class="pagination-number mobile row justify-center items-center"
                      :class="
                        indexNumber == 0
                          ? 'cursor-inherit'
                          : eventData.currentPageItemshop == indexNumber - 1
                          ? 'active'
                          : 'no-active'
                      "
                      @click="
                        indexNumber == 0
                          ? null
                          : (eventData.currentPageItemshop = indexNumber - 1)
                      "
                    >
                      {{ `${indexNumber}` }}
                    </div>
                  </div>
                </div>
                <div
                  class="box-pagination mobile"
                  @click="
                    eventData.currentPageItemshop ==
                    eventData.itemshopList.length - 1
                      ? null
                      : eventData.currentPageItemshop++
                  "
                >
                  <div
                    class="pagination-number mobile row justify-center items-center"
                  >
                    {{ `>` }}
                  </div>
                </div>
              </div>
              <div class="q-py-xs q-px-md row shadow-2 justify-center">
                <div class="self-center">
                  <q-btn round flat @click="funcResetEquipment()">
                    <q-img
                      no-spinner
                      no-transition
                      class="cursor-pointer"
                      src="/images/button_main/button-event-story-reset-shop.png"
                    ></q-img>
                  </q-btn>
                </div>
                <div class="q-mx-xs self-center" style="width: 160px">
                  <q-img
                    no-spinner
                    no-transition
                    src="/images/box_main/box-event-story-sum-total-coin-shop.png"
                  >
                    <div
                      class="row no-padding absolute-center transparent"
                      style="
                        top: 45%;
                        width: 85%;
                        height: 70%;
                        overflow: hidden;
                        color: #4a261b;
                      "
                    >
                      <div class="self-center q-px-sm">
                        <span class="f20 font-mali-m"> 0 </span>
                      </div>
                      <q-space></q-space>
                      <div class="self-center" style="width: 20%">
                        <q-img
                          no-spinner
                          no-transition
                          :src="eventStore.eventDataInfo.coinUrl"
                        ></q-img>
                      </div>
                    </div>
                  </q-img>
                </div>
                <div class="self-center">
                  <q-btn round flat>
                    <q-img
                      width="55px"
                      no-spinner
                      no-transition
                      @click="isShowDialogCart = true"
                      class="cursor-pointer"
                      src="/images/button_main/button-event-story-cart-shop.png"
                    ></q-img>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- Dialog Show Item in Cart -->
    <q-dialog maximized v-model="isShowDialogCart" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="row fit justify-center items-center">
          <!-- #region Show Cart Item -->
          <div class="relative-position" v-if="!isBuyItemSuccess">
            <div class="box-dialog-cart-container">
              <div class="box-sub row q-pa-md">
                <div class="col-12 box-cart-content q-pa-sm">
                  <div class="box-cart-scroll q-pa-sm">
                    <!-- Item in cart -->
                    <div
                      class="box-cart-item q-mb-sm"
                      v-for="(itemCart, indexCart) in selectedDataList"
                      :key="indexCart"
                      v-show="itemCart.length"
                    >
                      <div class="box-sub q-pa-sm row" v-if="itemCart.length">
                        <div class="col-1 self-center width-fit">
                          <div class="box-sub-item">
                            <q-img
                              no-spinner
                              no-transition
                              :src="`${pathURL}/${itemCart[0].itemName}.png`"
                            ></q-img>
                          </div>
                        </div>
                        <div class="col self-center q-px-sm">
                          <div class="q-px-sm q-pb-xs f14 text-overflow">
                            {{ itemCart[0].itemNameTh }}
                          </div>
                          <div class="dot"></div>
                          <div class="row">
                            <div>
                              <q-img
                                no-spinner
                                no-transition
                                width="25px"
                                :src="eventStore.eventDataInfo.coinUrl"
                              ></q-img>
                            </div>
                            <div class="self-center f12">
                              {{ itemCart[0].price }}
                            </div>
                          </div>
                        </div>
                        <div class="col-1 width-fit self-center">
                          <q-btn
                            round
                            flat
                            @click="funcDeleteItemInCart(itemCart[0])"
                          >
                            <q-img
                              no-spinner
                              no-transition
                              width="33px"
                              src="/images/icon_main/icon-trash.png"
                            ></q-img>
                          </q-btn>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 self-end">
                  <div class="row justify-center q-py-sm" align="center">
                    <div class="self-center">
                      <span class="text-total f26 font-fredoka"
                        >Total: {{ sumTotalPrice }}
                      </span>
                    </div>
                    <div class="self-center">
                      <q-img
                        no-spinner
                        no-transition
                        width="40px"
                        :src="eventStore.eventDataInfo.coinUrl"
                      ></q-img>
                    </div>
                  </div>
                  <div align="center">
                    <q-img
                      no-transition
                      no-spinner
                      width="120px"
                      class="cursor-pointer"
                      src="/images/button_main/button-check-out.png"
                      @click="funcButItem()"
                    ></q-img>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute-top-right" style="top: -7px; right: -7px">
              <q-btn round flat @click="isShowDialogCart = false">
                <q-img
                  no-spinner
                  no-transition
                  width="44px"
                  src="/images/icon_main/icon-close.png"
                ></q-img>
              </q-btn>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Buy Item Success -->
          <div class="relative-position" v-else>
            <div class="box-buy-item-success-container">
              <div class="box-sub q-pa-md">
                <div class="box-buy-item-success q-pa-md">
                  <div class="q-pt-md q-pb-sm relative-position" align="center">
                    <span
                      class="absolute-center font-fredoka f24 title-buy-item-success-shadow"
                      style="top: 59%"
                    >
                      FASHIONISTA
                    </span>
                    <span class="font-fredoka title-buy-item-success f24">
                      FASHIONISTA
                    </span>
                  </div>
                  <div align="center" class="q-mt-xs">
                    <span class="font-mali-b f16">
                      เป็นผู้นำด้านแฟชั้นกันเถอะ <br />
                      สวมใส่เสื้อผ้าที่ซื้อทันที
                    </span>
                  </div>
                </div>

                <div class="q-py-md q-px-sm q-mt-xs row justify-center">
                  <div class="col q-mx-sm">
                    <q-img
                      no-spinner
                      no-transition
                      @click="funcSetEquipment(false)"
                      class="cursor-pointer"
                      src="/images/button_main/button-no.png"
                    ></q-img>
                  </div>
                  <div class="col q-mx-sm">
                    <q-img
                      no-spinner
                      no-transition
                      @click="funcSetEquipment(true)"
                      class="cursor-pointer"
                      src="/images/button_main/button-yeah.png"
                    ></q-img>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </q-card-section>
      </q-card>
    </q-dialog>

    <loading :isShowLoading="isLoading"></loading>
  </div>
</template>

<script>
import logoLogin from "components/logo-login.vue";
import Character from "components/character_main/character.vue";
import BackgroundShop from "components/event_main/event-story-background-shop.vue";
import Loading from "components/dialog-loading.vue";
import { reactive, ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { useSystemStore } from "src/stores/system";
import { useEventStore } from "src/stores/event";
import { useStudentStore } from "src/stores/student";
export default {
  components: {
    Character,
    BackgroundShop,
    Loading,
    logoLogin,
  },
  props: {
    diamond: {
      type: Number,
      default: 0,
    },
    eventData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const currentPageShop = ref(1);
    const systemStore = useSystemStore();
    const eventStore = useEventStore();
    const platform = reactive(systemStore.platform);
    const pathURL = ref(
      "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory"
    );

    const equipment = ref({
      head: {},
      body: {},
      pet: {},
      footer: {},
      other: {},
      color: "",
    });

    const selectedDataList = ref({
      head: [],
      body: [],
      pet: [],
      footer: [],
      other: [],
    });

    const funcSelectedEquipment = (item) => {
      const studentStore = useStudentStore();

      let newData = {
        itemName: item.itemName,
        isFront: item.isFront,
        isBack: item.isBack,
        duration: item.duration || 0,
        FPS: item.FPS || 0,
        price: item.price,
        type: item.type,
        itemNameTh: item.itemNameTh,
      };

      if (selectedDataList.value[item.type].length) {
        if (selectedDataList.value[item.type][0].itemName == item.itemName) {
          selectedDataList.value[item.type].pop();
          equipment.value[item.type] = studentStore.characterData[item.type];
          return;
        } else {
          selectedDataList.value[item.type].pop();
        }
      }

      selectedDataList.value[item.type].push(newData);

      equipment.value[item.type] = newData;
    };

    const funcDeleteItemInCart = (item) => {
      const studentStore = useStudentStore();
      selectedDataList.value[item.type].pop();
      equipment.value[item.type] = studentStore.characterData[item.type];
    };

    const sumTotalPrice = computed(() => {
      let findPrice = selectedDataList.value.head.concat(
        selectedDataList.value.body[0] || [],
        selectedDataList.value.pet[0] || [],
        selectedDataList.value.footer[0] || [],
        selectedDataList.value.other[0] || []
      );

      findPrice = findPrice.map((x) => x.price).reduce((a, b) => a + b, 0);

      return findPrice || 0;
    });

    const isShowDialogCart = ref(false);
    const isBuyItemSuccess = ref(false);
    const isLoading = ref(false);

    const funcButItem = () => {
      console.log("#region funcButItem");

      isLoading.value = true;
      isShowDialogCart.value = false;

      setTimeout(() => {
        isShowDialogCart.value = true;
        isBuyItemSuccess.value = true;

        isLoading.value = false;
      }, 2000);
    };

    const funcSetEquipment = (bool) => {
      isBuyItemSuccess.value = false;
      isShowDialogCart.value = false;
    };

    const pagination = computed(() => {
      let pagination = [];
      let totalPage = 10;
      let beforePage = currentPageShop.value - 1;
      let afterPage = currentPageShop.value + 1;

      if (currentPageShop.value > 2) {
        pagination.push(1);
        if (currentPageShop.value > 3) {
          pagination.push(0);
        }
      }

      if (currentPageShop.value == totalPage) {
        beforePage = beforePage - 2;
      } else if (currentPageShop.value == totalPage - 1) {
        beforePage = beforePage - 1;
      }

      if (currentPageShop.value == 1) {
        afterPage = afterPage + 2;
      } else if (currentPageShop.value == 2) {
        afterPage = afterPage + 1;
      }

      for (let page = beforePage; page <= afterPage; page++) {
        if (page != 0 && page <= totalPage) {
          pagination.push(page);
        }
      }

      if (currentPageShop.value < totalPage - 1) {
        if (currentPageShop.value < totalPage - 2) {
          pagination.push(0);
        }
        pagination.push(totalPage);
      }

      return pagination;
    });

    const funcResetEquipment = () => {
      const studentStore = useStudentStore();

      equipment.value = { ...studentStore.characterData };

      selectedDataList.value = {
        head: [],
        body: [],
        pet: [],
        footer: [],
        other: [],
      };
    };

    onMounted(() => {
      funcResetEquipment();
    });

    return {
      // Store
      eventStore,

      // Initialize
      platform,
      pathURL,

      // Data
      selectedDataList,

      // Active Item
      equipment,
      currentPageShop,
      pagination,

      // Boolearn
      isLoading,
      isShowDialogCart,
      isBuyItemSuccess,

      // Function
      funcButItem,
      funcSetEquipment,
      funcSelectedEquipment,
      funcResetEquipment,
      funcDeleteItemInCart,

      // Computed
      sumTotalPrice,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-shop-container {
  width: 1000px;
  height: 100%;
  background-color: #fff5e7;
  border: 5px solid #4b1e0a;
  border-radius: 30px;
  margin: auto;
  overflow: hidden;
}

.box-character {
  width: 100%;
  height: 100%;
  background-color: #fff5e7;
  background-image: url("/images/background_main/background-event-story-character-shop.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.box-character-sub {
  width: 100%;
  margin: auto;
}

.box-diamond {
  position: relative;
  width: 120px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 3px solid #4a261b;
  border-radius: 33px;
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px,
    rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px,
    rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}

.box-pagination {
  background-color: #e9e9e9;
  color: #b05928;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
}

.box-pagination.mobile {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
}

.box-pagination .pagination-number {
  width: 25px;
  height: 25px;
  background-color: white;
  margin: 1px;
}

.box-pagination .pagination-number.mobile {
  width: 30px;
  height: 30px;
  background-color: white;
  margin: 1px;
}

.box-pagination .pagination-number.active {
  background-color: #b05928;
  color: white;
}

.box-pagination .pagination-number.no-active {
  background-color: white;
  color: #b05928;
  cursor: pointer;
}

.box-item-shop-container {
  height: 100%;
  overflow: auto;
  cursor: pointer;
}

.box-item-shop-container.mobile {
  height: 50vh;
  overflow: auto;
  cursor: pointer;
}

.box-item-shop-container.mobile::-webkit-scrollbar {
  width: 0px;
}

.box-item-shop-container::-webkit-scrollbar {
  width: 5px;
}

.box-item-shop-container::-webkit-scrollbar-thumb {
  background-color: rgb(155, 155, 155);
  border-radius: 30px;
}

.box-item-shop-border {
  width: 130px;
  height: fit-content;
  border: 5px solid transparent;
  border-radius: 20px;
}

.box-item-shop-border.mobile {
  width: 100%;
  height: fit-content;
  border: 5px solid transparent;
  border-radius: 20px;
}

.box-item-shop-border.selected {
  border: 5px solid #47b812;
}

.box-item-shop {
  height: fit-content;
  background-color: #d2dae9;
  border: 2px solid #4b1e0a;
  border-radius: 15px;
  padding-bottom: 5px;
  cursor: pointer;
}

.box-item-shop.selected {
  border: 2px solid #47b812;
}

.box-item-shop.mobile {
  width: 100%;
  height: fit-content;
  background-color: #d2dae9;
  border: 2px solid #4b1e0a;
  border-radius: 15px;
  padding-bottom: 5px;
}

.box-item-shop .box-sub {
  width: 100%;
  height: 100%;
  background-color: #fafcff;
  border-radius: 15px;
}

.box-sub .item-image {
  width: 100px;
  height: 75px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: inset 0px 0px 3px 1px rgba(105, 105, 105, 0.2);
  margin: auto;
  overflow: hidden;
}

.box-sub .item-image.mobile {
  width: 100%;
  height: fit-content;
}
.dot {
  width: 90%;
  border: 1px dotted #4b1e0a;
  margin: auto;
}

.box-dialog-cart-container {
  width: 320px;
  height: 500px;
  background-color: #7f4429;
  border: 3px solid #4b1e0a;
  border-radius: 40px;
  padding-bottom: 10px;
  overflow: hidden;
}

.box-dialog-cart-container .box-sub {
  width: 100%;
  height: 100%;
  background-color: #ba6f4d;
  border-radius: 40px;
}

.box-cart-content {
  background-color: #fff2e5;
  border-radius: 20px;
  height: 80%;
  overflow-y: auto;
}

.box-cart-scroll {
  height: 100%;
  overflow-y: auto;
}

.box-cart-scroll::-webkit-scrollbar {
  width: 5px;
}

.box-cart-scroll::-webkit-scrollbar-thumb {
  background-color: #a1aec7;
  border-radius: 20px;
}

.text-total {
  color: #fff;
  text-shadow: rgb(75, 30, 10) 1px 0px 0px,
    rgb(75, 30, 10) 0.540302px 0.841471px 0px,
    rgb(75, 30, 10) -0.416147px 0.909297px 0px,
    rgb(75, 30, 10) -0.989992px 0.14112px 0px,
    rgb(75, 30, 10) -0.653644px -0.756802px 0px,
    rgb(75, 30, 10) 0.283662px -0.958924px 0px,
    rgb(75, 30, 10) 0.96017px -0.279415px 0px;
}

.box-cart-item {
  background-color: #d2dae9;
  border: 2px solid #a1aec7;
  border-radius: 10px;
  overflow: hidden;
}
.box-cart-item .box-sub {
  width: 100%;
  height: 100%;
  background-color: #fafcff;
  border-radius: 10px;
}

.box-sub-item {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
}

// reigon: css for dialog shop
.box-buy-item-success-container {
  background-color: #7f4429;
  width: 320px;
  height: 250px;
  border: 3px solid #4b1e0a;
  border-radius: 40px;
  padding-bottom: 5px;
  overflow: hidden;
}

.box-buy-item-success-container .box-sub {
  width: 100%;
  height: 100%;
  background-color: #ba6f4d;
  border-radius: 40px;
}

.box-buy-item-success {
  width: 100%;
  background-color: #fff2e5;
  border-radius: 20px;
  height: 70%;
  color: #4b1e0a;
}

.title-buy-item-success {
  position: relative;
  color: #ba6f4d;
  text-shadow: rgb(75, 30, 10) 2px 0px 0px,
    rgb(75, 30, 10) 1.75517px 0.958851px 0px,
    rgb(75, 30, 10) 1.0806px 1.68294px 0px,
    rgb(75, 30, 10) 0.141474px 1.99499px 0px,
    rgb(75, 30, 10) -0.832294px 1.81859px 0px,
    rgb(75, 30, 10) -1.60229px 1.19694px 0px,
    rgb(75, 30, 10) -1.97998px 0.28224px 0px,
    rgb(75, 30, 10) -1.87291px -0.701566px 0px,
    rgb(75, 30, 10) -1.30729px -1.5136px 0px,
    rgb(75, 30, 10) -0.421592px -1.95506px 0px,
    rgb(75, 30, 10) 0.567324px -1.91785px 0px,
    rgb(75, 30, 10) 1.41734px -1.41108px 0px,
    rgb(75, 30, 10) 1.92034px -0.558831px 0px;
  z-index: 2;
}

.title-buy-item-success-shadow {
  color: #4b1e0a;
  text-shadow: rgb(75, 30, 10) 3px 0px 0px,
    rgb(75, 30, 10) 2.83487px 0.981584px 0px,
    rgb(75, 30, 10) 2.35766px 1.85511px 0px,
    rgb(75, 30, 10) 1.62091px 2.52441px 0px,
    rgb(75, 30, 10) 0.705713px 2.91581px 0px,
    rgb(75, 30, 10) -0.287171px 2.98622px 0px,
    rgb(75, 30, 10) -1.24844px 2.72789px 0px,
    rgb(75, 30, 10) -2.07227px 2.16926px 0px,
    rgb(75, 30, 10) -2.66798px 1.37182px 0px,
    rgb(75, 30, 10) -2.96998px 0.42336px 0px,
    rgb(75, 30, 10) -2.94502px -0.571704px 0px,
    rgb(75, 30, 10) -2.59586px -1.50383px 0px,
    rgb(75, 30, 10) -1.96093px -2.27041px 0px,
    rgb(75, 30, 10) -1.11013px -2.78704px 0px,
    rgb(75, 30, 10) -0.137119px -2.99686px 0px,
    rgb(75, 30, 10) 0.850987px -2.87677px 0px,
    rgb(75, 30, 10) 1.74541px -2.43999px 0px,
    rgb(75, 30, 10) 2.44769px -1.73459px 0px,
    rgb(75, 30, 10) 2.88051px -0.838247px 0px;
}

// End region: css for dialog shop

// #region Mobile

.box-shop-container-mobile {
  width: 100%;
  height: 100vh;
  margin: auto;
}

.box-character-mobile {
  max-width: 600px;
  width: 100%;
  min-width: 320px;
  height: 40%;
  background-image: url("/images/background_main/background-event-story-character-shop-mobile.png");
  background-size: cover;
  background-position: 50% 100%;
  background-repeat: no-repeat;
  margin: auto;
}

.box-shop-item-mobile {
  max-width: 600px;
  min-width: 320px;
  height: 60%;
  background-color: #fff5e7;
  margin: auto;
}

.box-diamond-mobile {
  position: relative;
  width: 95px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 3px solid #4a261b;
  border-radius: 33px;
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px,
    rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px,
    rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}

// #endregion Mobile
</style>
