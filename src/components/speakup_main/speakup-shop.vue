<template>
  <div
    align="center"
    class="animate__animated animate__zoomIn"
    style="animation-duration: 0.5s"
    v-if="isLoadItemShop"
  >
    <div
      class="box-itemshop-container relative-position"
      v-if="$q.platform.is.desktop"
    >
      <div class="box-itemshop-sub row">
        <div class="col box-itemshop-character relative-position row">
          <div class="col-12 self-end" align="center">
            <div class="q-py-md" style="width: 90%">
              <character
                :isShop="true"
                :equipment="equipment"
                :isAnimation="true"
              ></character>
            </div>
            <!-- #region Shop And Cart -->
            <div
              class="row q-pt-lg justify-center"
              style="padding-bottom: 38px; padding-top: 28px"
            >
              <div class="q-mx-xs">
                <q-img
                  width="49px"
                  src="/images/speakup_main/speakup-button-reset.png"
                  no-spinner
                  no-transition
                  class="button-speakup-main active"
                  @click="funcGetCharacter()"
                ></q-img>
              </div>
              <div class="q-mx-xs">
                <q-img
                  width="186px"
                  src="/images/speakup_main/speakup-box-summary-shop.png"
                  no-spinner
                  no-transition
                >
                  <div class="transparent fit no-padding">
                    <div
                      class="absolute-center row justify-between"
                      style="width: 80%; top: 47%"
                    >
                      <div
                        class="self-center q-px-sm font-mali-r f24 text-shop-diamond"
                      >
                        {{ `${totalCoin}` }}
                      </div>
                      <div
                        class="self-center relative-position"
                        style="width: 15px"
                      >
                        <q-img
                          width="45px"
                          class="absolute-center"
                          :src="`${eventData.monetaryImgUrl}`"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </q-img>
              </div>
              <div class="q-mx-xs">
                <q-img
                  width="65px"
                  src="/images/speakup_main/speakup-button-cart.png"
                  no-spinner
                  no-transition
                  class="button-speakup-main active"
                  @click="funcOpenCart()"
                ></q-img>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>

        <!-- #region Itemshop -->
        <div class="col row">
          <div class="col-12 self-start" align="right" style="height: 15%">
            <div
              class="relative-position"
              style="width: 130px; top: 15px; right: 15px"
            >
              <q-img
                src="/images/speakup_main/speakup-box-diamond.png"
                no-spinner
                no-transition
              >
                <div class="transparent no-padding fit">
                  <div class="absolute-center" style="left: 55%">
                    <div class="f24 font-prompt-b text-coin-event">
                      {{
                        `${
                          eventData.eventCoin > 9999
                            ? `+9999`
                            : eventData.eventCoin
                        }`
                      }}
                    </div>
                  </div>
                </div>
              </q-img>

              <div class="absolute-top-left" style="top: -15px; left: -25px">
                <q-img
                  width="70px"
                  :src="`${eventData.monetaryImgUrl}`"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
          <!-- #region box item -->
          <div class="col-12 self-center q-pa-sm" style="height: 70%">
            <div class="box-itemshop-scroll">
              <div class="row q-px-lg" style="margin: auto">
                <div
                  class="col-4 q-pa-sm"
                  v-for="(itemshop, indexItemshop) in itemShopList[
                    selectPage - 1
                  ]"
                  :index="indexItemshop"
                >
                  <div
                    class="button-itemshop-container"
                    :class="
                      !itemshop.isHasItem
                        ? equipment[itemshop.type].itemId === itemshop.itemId
                          ? 'active selected'
                          : 'active'
                        : ''
                    "
                    @click="
                      equipment[itemshop.type].itemId === itemshop.itemId ||
                      itemshop.isHasItem
                        ? null
                        : funcSelectItemshop(itemshop)
                    "
                  >
                    <div class="button-itemshop-sub row">
                      <div class="col-12 q-px-sm q-pt-sm">
                        <div class="">
                          <div
                            class="itemshop-image row justify-center items-center q-pa-xs"
                          >
                            <q-img
                              width="70%"
                              :src="itemshop.pathItem"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 q-px-sm">
                        <div class="f14 text-overflow" align="left">
                          {{ `${itemshop.itemNameTh}` }}
                        </div>
                        <div class="">
                          <div style="border: 1px dashed #000"></div>
                        </div>
                        <div
                          class="row"
                          style="padding: 3px 0px 0px 0px"
                          v-if="!itemshop.isHasItem"
                        >
                          <div class="relative-position" style="width: 20px">
                            <q-img
                              class="absolute-center"
                              width="30px"
                              :src="`${eventData.monetaryImgUrl}`"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                          <div class="f12">
                            {{ `${itemshop.price}` }}
                          </div>
                        </div>
                        <div
                          align="center"
                          style="padding: 3px 0px 0px 0px"
                          v-if="itemshop.isHasItem"
                        >
                          มีแล้ว
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->
          <!-- #region pagination -->
          <div
            class="col-12 justify-center items-center relative-position"
            style="height: 15%"
          >
            <div class="absolute-center" style="top: 50%">
              <div class="row box-pagination-container font-mali-b f16">
                <div
                  class="box-pagination-index row justify-center items-center"
                  :class="selectPage === 1 ? 'disable' : ''"
                  @click="selectPage == 1 ? null : selectPage--"
                >
                  {{ `<` }}
                </div>
                <div
                  v-for="i in totalPagination"
                  class="box-pagination-index row justify-center items-center"
                  :class="selectPage === i ? 'select' : ''"
                  @click="selectPage = i"
                >
                  <div class="">
                    {{ i }}
                  </div>
                </div>
                <div
                  class="box-pagination-index row justify-center items-center"
                  :class="selectPage === totalPagination ? 'disable' : ''"
                  @click="selectPage == totalPagination ? null : selectPage++"
                >
                  {{ `>` }}
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->
      </div>

      <div class="absolute-center" style="top: 0">
        <q-img
          width="300px"
          src="/images/speakup_main/speakup-label-shop.png"
          no-spinner
          no-transition
        ></q-img>
      </div>
    </div>
  </div>

  <q-dialog
    v-model="isShowDialogItemshop"
    maximized
    persistent
    transition-show="slide-left"
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit no-padding">
        <div class="fit">
          <div class="row absolute-top q-pa-sm z-max">
            <div>
              <q-img
                class="button-speakup-main size-40 active"
                src="/images/speakup_main/speakup-button-back.png"
                @click="funcBack()"
                no-spinner
                no-transition
              ></q-img>
            </div>

            <div
              class="self-center q-mx-sm"
              :class="$q.platform.is.desktop ? 'f40 ' : 'f16'"
            >
              <div
                class="text-title-shop font-fredoka animate__animated animate__fadeIn"
                style="line-height: 0"
                data-text="SHOP"
              >
                {{ `SHOP` }}
              </div>
            </div>
            <q-space></q-space>

            <div
              class="col-1 self-center relative-position"
              style="width: 80px"
            >
              <q-img
                src="/images/speakup_main/speakup-box-diamond.png"
                no-spinner
                no-transition
              >
                <div class="transparent no-padding fit">
                  <div class="absolute-center" style="left: 55%">
                    <div class="f14 font-prompt-b text-coin-event">
                      {{
                        `${
                          eventData.eventCoin > 9999
                            ? `+9999`
                            : eventData.eventCoin
                        }`
                      }}
                    </div>
                  </div>
                </div>
              </q-img>

              <div class="absolute-center" style="left: 5px">
                <q-img
                  width="45px"
                  :src="`${eventData.monetaryImgUrl}`"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>

          <div class="background-itemshop row relative-position">
            <div class="col-12 self-end q-pa-md" align="center">
              <div class="" style="width: 80%">
                <character
                  :isShop="true"
                  :equipment="equipment"
                  :isAnimation="true"
                ></character>
              </div>
            </div>
          </div>

          <div class="box-itemshop-content-mobile relative-position">
            <div class="box-itemshop-scroll-mobile" align="center">
              <div class="row q-mt-sm">
                <div
                  class="col-4 q-pa-xs"
                  algin="center"
                  v-for="(itemshop, indexItemshop) in itemShopList[
                    selectPage - 1
                  ]"
                  :index="indexItemshop"
                >
                  <div
                    class="button-itemshop-container mobile"
                    :class="
                      !itemshop.isHasItem
                        ? equipment[itemshop.type].itemId === itemshop.itemId
                          ? 'active selected'
                          : 'active'
                        : ''
                    "
                    @click="
                      equipment[itemshop.type].itemId === itemshop.itemId ||
                      itemshop.isHasItem
                        ? null
                        : funcSelectItemshop(itemshop)
                    "
                  >
                    <div class="button-itemshop-sub row">
                      <div class="col-12 q-px-sm q-pt-sm">
                        <div class="">
                          <div
                            class="itemshop-image row justify-center items-center q-pa-xs"
                          >
                            <q-img
                              width="80%"
                              :src="itemshop.pathItem"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 q-px-sm">
                        <div class="f14 text-overflow" align="left">
                          {{ `${itemshop.itemNameTh}` }}
                        </div>
                        <div class="">
                          <div style="border: 1px dashed #000"></div>
                        </div>
                        <div
                          class="row"
                          style="padding: 3px 0px 0px 0px"
                          v-if="!itemshop.isHasItem"
                        >
                          <div class="relative-position" style="width: 20px">
                            <q-img
                              class="absolute-center"
                              width="30px"
                              :src="`${eventData.monetaryImgUrl}`"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                          <div class="f12">
                            {{ `${itemshop.price}` }}
                          </div>
                        </div>
                        <div
                          align="center"
                          style="padding: 3px 0px 0px 0px"
                          v-if="itemshop.isHasItem"
                        >
                          มีแล้ว
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12" style="height: 110px"></div>
              </div>
            </div>
            <div class="fixed-bottom box-dialog-itemshop-footer">
              <div
                class="box-pagination-container-mobile row justify-between font-mali-b f16"
              >
                <div
                  class="box-pagination-index row justify-center items-center"
                  :class="selectPage === 1 ? 'disable' : ''"
                  @click="selectPage == 1 ? null : selectPage--"
                >
                  {{ `<` }}
                </div>
                <div class="row">
                  <div
                    v-for="i in totalPagination"
                    class="box-pagination-index row justify-center items-center"
                    :class="selectPage === i ? 'select' : ''"
                    @click="selectPage = i"
                  >
                    <div class="">
                      {{ i }}
                    </div>
                  </div>
                </div>
                <div
                  class="box-pagination-index row justify-center items-center"
                  :class="selectPage === totalPagination ? 'disable' : ''"
                  @click="selectPage == totalPagination ? null : selectPage++"
                >
                  {{ `>` }}
                </div>
              </div>
              <div class="q-pa-sm" style="width: 360px; margin: auto">
                <div class="row justify-center">
                  <div class="q-mx-xs">
                    <q-img
                      width="49px"
                      src="/images/speakup_main/speakup-button-reset.png"
                      no-spinner
                      no-transition
                      class="button-speakup-main active"
                      @click="funcGetCharacter()"
                    ></q-img>
                  </div>
                  <div class="q-mx-xs">
                    <q-img
                      width="186px"
                      src="/images/speakup_main/speakup-box-summary-shop.png"
                      no-spinner
                      no-transition
                    >
                      <div class="transparent fit no-padding">
                        <div
                          class="absolute-center row justify-between"
                          style="width: 80%; top: 47%"
                        >
                          <div
                            class="self-center q-px-sm font-mali-r f24 text-shop-diamond"
                          >
                            {{ `${totalCoin}` }}
                          </div>
                          <div
                            class="self-center relative-position"
                            style="width: 15px"
                          >
                            <q-img
                              width="45px"
                              class="absolute-center"
                              :src="`${eventData.monetaryImgUrl}`"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                        </div>
                      </div>
                    </q-img>
                  </div>
                  <div class="q-mx-xs">
                    <q-img
                      width="65px"
                      src="/images/speakup_main/speakup-button-cart.png"
                      no-spinner
                      no-transition
                      class="button-speakup-main active"
                      @click="funcOpenCart()"
                    ></q-img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- #region Dialog Cart -->
  <q-dialog v-model="isShowDialogCart" maximized persistent class="z-max">
    <q-card class="shadow-0 transparent">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body">
                <div style="height: 30px"></div>
                <div class="dialog-body-scroll shop">
                  <div
                    class="q-mb-sm q-pr-xs q-pl-sm"
                    v-for="(
                      itemshopCart, indexItemshopCart
                    ) in selectedShopList"
                    :key="indexItemshopCart"
                  >
                    <div
                      class="box-itemshop-cart-container"
                      v-if="!itemshopCart.isHasItem"
                    >
                      <div class="box-itemshop-cart-sub row">
                        <div
                          class="box-itemshop-cart-image row justify-center items-center"
                        >
                          <q-img
                            :src="itemshopCart.pathItem"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                        <div class="col self-center q-px-sm font-prompt-r">
                          <div align="left" class="q-py-xs">
                            {{ `${itemshopCart.itemNameTh}` }}
                          </div>
                          <div style="border: 1px dashed #a1aec7"></div>
                          <div
                            class="row q-py-xs"
                            v-if="!itemshopCart.isHasItem"
                          >
                            <div
                              class="col-1 relative-position"
                              style="width: 20px"
                            >
                              <q-img
                                class="absolute-center"
                                width="30px"
                                :src="`${eventData.monetaryImgUrl}`"
                                no-spinner
                                no-transition
                              ></q-img>
                            </div>
                            <div class="q-px-sm">
                              {{ `${itemshopCart.price}` }}
                            </div>
                          </div>
                          <div class="q-pa-xs" v-if="itemshopCart.isHasItem">
                            {{ `มีแล้ว` }}
                          </div>
                        </div>
                        <div class="col-1 self-center" style="width: 35px">
                          <q-img
                            width="34px"
                            src="/images/speakup_main/speakup-button-bin.png"
                            no-spinner
                            no-transition
                            class="button-speakup-main active"
                            @click="
                              funcRemoveTrash(itemshopCart, indexItemshopCart)
                            "
                          ></q-img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="q-pa-sm row justify-center" align="center">
                <div class="text-total-cart font-fredoka f24">
                  {{ `Total: ${totalCoin}` }}
                </div>
                <div
                  class="self-center relative-position col-1"
                  style="width: 50px"
                >
                  <div class="absolute-center">
                    <q-img
                      width="50px"
                      :src="`${eventData.monetaryImgUrl}`"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
              </div>

              <div class="q-pa-xs q-mt-sm" align="center">
                <q-img
                  width="130px"
                  src="/images/speakup_main/speakup-button-check-out.png"
                  class="button-speakup-main active"
                  no-spinner
                  no-transition
                  @click="funcConfirmBuyItemShop()"
                ></q-img>
              </div>
            </div>
          </div>

          <div class="absolute-top-right" style="top: -15px; right: -15px">
            <q-img
              width="50px"
              src="/images/speakup_main/speakup-button-close.png"
              no-spinner
              no-transition
              class="button-speakup-main active"
              v-close-popup
            ></q-img>
          </div>

          <div class="absolute-center" v-if="isShowAmountNotEnough">
            <div
              class="box-show-amount-not-enough animate__animated animate__bounceIn animate__delay-1s"
            >
              <div class="row justify-center font-mali-m f20 text-white">
                <div class="self-center">จำนวน</div>
                <div class="relative-position" style="width: 50px">
                  <div class="absolute-center">
                    <q-img
                      width="50px"
                      :src="eventStore.speakUp.data.monetaryImgUrl"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
                <div class="self-center">ไม่เพียงพอ</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Confirm Set up outfit -->
  <q-dialog
    v-model="isShowDialogSetUpOutfit"
    maximized
    persistent
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body">
                <div
                  align="center"
                  class="q-pa-md text-title-dialog font-fredoka f24"
                >
                  FASHIONISTA
                </div>
                <div align="center" class="font-prompt-m f16 q-pb-md">
                  เป็นผู้นำด้านแฟชั่นกันเถอะ
                  <br />
                  สวมใส่เสื้อผ้าที่ซื้อทันที
                </div>
              </div>

              <div class="box-dialog-footer row justify-center">
                <div class="q-px-sm">
                  <q-img
                    class="button-speakup-main active"
                    src="/images/speakup_main/speakup-button-no.png"
                    no-spinner
                    no-transition
                    v-close-popup
                    @click="funcGetCharacter()"
                  ></q-img>
                </div>
                <div class="q-px-sm">
                  <q-img
                    class="button-speakup-main active"
                    src="/images/speakup_main/speakup-button-yeah.png"
                    no-spinner
                    no-transition
                    @click="funcSetCharacterData()"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script>
import character from "components/character_main/character.vue";
import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useEventStore } from "src/stores/event";
import { useStudentStore } from "src/stores/student";
export default {
  props: {
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    character,
  },
  setup(props) {
    // Initial Data
    const selectPage = ref(1);
    const $q = useQuasar();

    const equipment = ref({
      head: {},
      body: {},
      footer: {},
      pet: {},
      other: {},
      color: "",
    });

    // Dialog
    const isShowDialogItemshop = ref(false);
    const isShowDialogCart = ref(false);
    const isShowDialogSetUpOutfit = ref(false);

    const selectedShopList = ref([]);
    const itemShopList = ref();

    const funcSelectItemshop = (item) => {
      let findItem = selectedShopList.value.find(
        (x) => x.type === item.type && x.itemId !== item.itemId
      );

      if (findItem) {
        selectedShopList.value = selectedShopList.value.filter(
          (x) => x.itemId !== findItem.itemId
        );
      }
      selectedShopList.value.push(item);
      equipment.value[item.type] = item;
    };

    const funcRemoveTrash = (item, index) => {
      const studentStore = useStudentStore();
      selectedShopList.value.splice(index, 1);
      equipment.value[item.type] = studentStore.characterData[item.type];
    };

    const funcConfirmBuyItemShop = async () => {
      const eventStore = useEventStore();

      if (selectedShopList.value.length == 0) {
        isShowDialogCart.value = false;
        return;
      }

      if (funcCheckAmountNotEnough()) {
        return;
      }

      isShowDialogCart.value = false;

      try {
        $q.loading.show();

        let setCoinTotalBuy = props.eventData.eventCoin - totalCoin.value;

        if (setCoinTotalBuy <= 0) {
          props.eventData.eventCoin = 0;
        } else {
          props.eventData.eventCoin -= totalCoin.value;
        }

        await eventStore.buySpeakUpItem(selectedShopList.value);

        getItemShop();

        isShowDialogSetUpOutfit.value = true;
        $q.loading.hide();
      } catch (e) {
        props.eventData.eventCoin += totalCoin.value;
        isShowDialogCart.value = true;
        $q.loading.hide();
      }
    };

    const funcResetSelectItemshop = () => {
      selectedShopList.value = [];
    };

    const totalCoin = computed(() => {
      let total = 0;

      if (selectedShopList.value.length) {
        total = selectedShopList.value
          .filter((x) => !x.isHasItem)
          .reduce((a, b) => a + b.price, 0);
      }

      return total;
    });

    const funcBack = () => {
      if (props.eventData.isShowDialogItemshop)
        props.eventData.isShowDialogItemshop = false;
      isShowDialogItemshop.value = false;
    };

    const isShowAmountNotEnough = ref(false);
    let listenAmountNotEnough = null;
    const funcOpenCart = () => {
      isShowDialogCart.value = true;

      funcCheckAmountNotEnough();
    };

    const isLoadItemShop = ref(false);
    const getItemShop = () => {
      const eventStore = useEventStore();

      let temp = [];
      let tempItemShop = JSON.stringify(eventStore.speakUp.data.itemShop);
      tempItemShop = JSON.parse(tempItemShop);

      tempItemShop.sort((a, b) => {
        let itemIndexA = 0;
        let itemIndexB = 0;

        if (a.isHasItem || b.isHasItem) {
          if (a.isHasItem) itemIndexA = 99;
          if (b.isHasItem) itemIndexB = 99;
        } else {
          if (a.type == "head") itemIndexA = 1;
          if (b.type == "head") itemIndexB = 1;

          if (a.type == "body") itemIndexA = 2;
          if (b.type == "body") itemIndexB = 2;

          if (a.type == "footer") itemIndexA = 3;
          if (b.type == "footer") itemIndexB = 3;

          if (a.type == "pet") itemIndexA = 4;
          if (b.type == "pet") itemIndexB = 4;

          if (a.type == "other") itemIndexA = 5;
          if (b.type == "other") itemIndexB = 5;
        }

        return itemIndexA - itemIndexB || a.price - b.price;
      });

      let minLength = 0;
      let maxLength = 9;
      let totalPage = Math.ceil(tempItemShop.length / 9);

      for (let i = 0; i < totalPage; i++) {
        let newData = tempItemShop.slice(minLength, maxLength);
        temp.push(newData);
        minLength += maxLength;
        maxLength += 9;
      }

      itemShopList.value = temp;

      if (!$q.platform.is.desktop) {
        isShowDialogItemshop.value = true;
      }

      isLoadItemShop.value = true;
    };

    const funcGetCharacter = () => {
      const studentStore = useStudentStore();

      equipment.value = { ...studentStore.characterData };

      funcResetSelectItemshop();
    };

    const funcSetCharacterData = async () => {
      isShowDialogSetUpOutfit.value = false;
      $q.loading.show();
      const studentStore = useStudentStore();
      studentStore.setCharacterData(selectedShopList.value);
      studentStore.setCharacter();
      funcResetSelectItemshop();
      $q.loading.hide();
    };

    const funcCheckAmountNotEnough = () => {
      if (totalCoin.value > props.eventData.eventCoin) {
        if (isShowAmountNotEnough.value) {
          if (listenAmountNotEnough) {
            clearTimeout(listenAmountNotEnough);
          }
        }

        isShowAmountNotEnough.value = true;

        listenAmountNotEnough = setTimeout(() => {
          isShowAmountNotEnough.value = false;
        }, 5000);
        return true;
      }

      return false;
    };

    const totalPagination = computed(() => {
      let total = 0;

      if (itemShopList.value.length) {
        total = itemShopList.value.length;
      }

      return total;
    });

    onMounted(() => {
      getItemShop();
      funcGetCharacter();
    });

    return {
      // Store
      eventStore: useEventStore(),

      // Data
      equipment,
      selectPage,
      selectedShopList,
      itemShopList,

      // Function
      funcSelectItemshop,
      funcRemoveTrash,
      funcConfirmBuyItemShop,
      funcGetCharacter,
      funcSetCharacterData,
      funcBack,
      funcOpenCart,

      // Computed
      totalCoin,
      totalPagination,

      // Boolean
      isLoadItemShop,

      // Dialog
      isShowDialogItemshop,
      isShowDialogCart,
      isShowDialogSetUpOutfit,
      isShowAmountNotEnough,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-itemshop-container {
  width: 1000px;
  height: 700px;
  background-color: #7f4429;
  border: 5px solid #4b1e0a;
  border-radius: 30px;
  padding-bottom: 7px;
}

.box-itemshop-container .box-itemshop-sub {
  height: 100%;
  background-color: #fff5e7;
  border-radius: 30px;
  overflow: hidden;
}

.box-itemshop-character {
  background-image: url("/images/speakup_main/speakup-shop-character.png");
  background-position: bottom;
}

.box-itemshop-scroll {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
}

.box-itemshop-scroll::-webkit-scrollbar {
  width: 15px;
}

.box-itemshop-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border: 2px solid #4b1e0a;
  border-radius: 8px;
}

.box-itemshop-scroll::-webkit-scrollbar-thumb {
  background: #d36b3c;
  border-radius: 8px;
  border: 2px solid #4b1e0a;
}

.box-itemshop-scroll-mobile {
  max-width: 360px;
  width: 100%;
  min-width: 360px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  margin: auto;
}

.box-itemshop-scroll::-webkit-scrollbar {
  width: 0px;
}

.button-itemshop-container {
  width: 120px;
  height: 100%;
  background-color: #d2dae9;
  border: 2px solid #4b1e0a;
  border-radius: 7px;
  padding-bottom: 4px;
}

.button-itemshop-container.active {
  cursor: pointer;
}

.button-itemshop-container.selected {
  border: 2px solid #4fc91e !important;
}

.button-itemshop-container.mobile {
  width: 110px;
  height: 100%;
  background-color: #d2dae9;
  border: 2px solid #4b1e0a;
  border-radius: 7px;
  padding-bottom: 4px;
}

.button-itemshop-container.active:active {
  transform: scale(0.95);
}

.button-itemshop-sub {
  width: 100%;
  height: 100%;
  background-color: #fafcff;
  border-radius: 7px;
  padding-bottom: 3px;
}

.itemshop-image {
  width: 100%;
  height: 75px;
  background-color: #fafcff;
  border-radius: 7px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-shop-diamond {
  color: #4a261b;
}

.box-itemshop-cart-container {
  background-color: #d2dae9;
  border: 1px solid #a1aec7;
  border-radius: 10px;
  padding-bottom: 5px;
  color: #4a261b;
}

.box-itemshop-cart-sub {
  width: 100%;
  height: 100%;
  background-color: #fafcff;
  border-radius: 9px;
  padding: 7px;
}

.box-itemshop-cart-image {
  width: 60px;
  height: 60px;
  background-color: #fff;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.text-total-cart {
  color: #fff;
  text-shadow: rgb(75, 30, 10) 1px 0px 0px,
    rgb(75, 30, 10) 0.540302px 0.841471px 0px,
    rgb(75, 30, 10) -0.416147px 0.909297px 0px,
    rgb(75, 30, 10) -0.989992px 0.14112px 0px,
    rgb(75, 30, 10) -0.653644px -0.756802px 0px,
    rgb(75, 30, 10) 0.283662px -0.958924px 0px,
    rgb(75, 30, 10) 0.96017px -0.279415px 0px;
}

.box-pagination-container {
  width: fit-content;
  height: 100%;
  background-color: #e9e9e9;
  border: 1px solid #e9e9e9;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
}

.box-pagination-container-mobile {
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e9e9e9;
}

.box-pagination-index {
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #e9e9e9;
  color: #b05928;
  cursor: pointer;
}

.box-pagination-index.disable {
  color: #e9e9e9;
  background-color: #fff;
  cursor: default !important;
}

.box-pagination-index.select {
  color: #fff;
  background-color: #b05928;
}

.text-title-dialog {
  color: #fff;
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
    rgb(75, 30, 10) 1.92034px -0.558831px 0px, rgb(75, 30, 10) 0px 3px 0px,
    rgb(75, 30, 10) 1.5px 3px 0px, rgb(75, 30, 10) -1.5px 3px 0px,
    rgb(75, 30, 10) -2px 2px 0px, rgb(75, 30, 10) 2px 2px 0px;
}

.text-title-shop {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px,
    rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px,
    rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}

.text-title-shop::before {
  content: attr(data-text);
  position: absolute;
  text-shadow: 0px 4px 0px rgb(75, 30, 10), 3px 4px 0px rgb(75, 30, 10),
    -1px 4px 0px rgb(75, 30, 10);
}

.text-coin-event {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px,
    rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px,
    rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}

.box-show-amount-not-enough {
  width: 340px;
  border: 3px solid #4a261b;
  border-radius: 35px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
}

// #region Dialog Mobile
.background-itemshop {
  max-width: 500px;
  width: 100%;
  min-width: 360px;
  height: 50%;
  background-image: url("/images/speakup_main/speakup-background-shop-mobile.png");
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
}

.box-itemshop-content-mobile {
  height: 50%;
  background-color: #fff5e7;
}

.box-dialog-itemshop-footer {
  background-color: #ffffff;
  box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.5);
}

// #endregion
</style>
