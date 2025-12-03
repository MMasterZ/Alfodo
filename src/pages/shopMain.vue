<template>
  <q-page class="bg-shop-main">
    <shop-pc
      class="box-container-main"
      :detailsShop="detailsShop"
      :totalCoin="totalCoin"
      :characterLevel="characterLevel"
      @callback-selecteditem="funcSelectedItem"
      @callback-selectedcolor="funcSelectedColor"
      @callback-reset="funcResetShop"
      @callback-buy="(isDialogDetailShop = true), (isNoMoney = false)"
      v-if="$q.platform.is.desktop && isLoaded"
    ></shop-pc>
    <shop-mobile
      :detailsShop="detailsShop"
      :totalCoin="totalCoin"
      :characterLevel="characterLevel"
      @callback-selecteditem="funcSelectedItem"
      @callback-selectedcolor="funcSelectedColor"
      @callback-reset="funcResetShop"
      @callback-buy="(isDialogDetailShop = true), (isNoMoney = false)"
      v-if="$q.platform.is.mobile && isLoaded"
    ></shop-mobile>

    <q-dialog maximized v-model="isDialogDetailShop" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center">
          <div class="col-12" align="center">
            <div
              class="shadow-1 relative-position box-dialog-detail-shop q-px-md"
            >
              <div
                class="row justify-center absolute-center box-no-money q-pa-xs"
                v-if="isNoMoney"
              >
                <div class="self-center" align="center">
                  <q-img
                    width="25px"
                    class="q-mx-sm"
                    src="/images/coin.png"
                  ></q-img>
                </div>
                <div class="self-center">
                  <span class="f20">จำนวนเงินไม่เพียงพอ</span>
                </div>
              </div>
              <div>
                <q-img src="/images/shop/canvas-tent-color.png"></q-img>
              </div>
              <div class="box-content-detail-shop q-pr-sm">
                <div
                  class="relative-position box-details-shop-list q-pr-sm q-pl-sm"
                >
                  <div v-if="checkCartHasItem || detailsShop.isSelectedColor">
                    <div
                      class="relative-position q-my-sm row bg-white box-card-item"
                      v-for="(item, index) in detailsShop.cartList"
                      :data-new="item.isBuy ? false : item.isNew"
                      v-show="!item.isBuy"
                    >
                      <div
                        class="col-4 self-center q-pa-xs"
                        style="width: 90px; height: 90px"
                      >
                        <q-img
                          style="width: 100%; height: 100%"
                          :src="item.imgURL"
                        ></q-img>
                      </div>
                      <div class="col self-center q-pa-xs" align="left">
                        <div class="text-overflow">
                          <span class="f14">{{ item.itemNameTh }}</span>
                        </div>
                        <div class="q-py-xs" v-if="!item.isBuy">
                          <q-img width="20px" src="/images/coin.png"></q-img>
                          <span class="q-mx-sm">{{ item.price }}</span>
                        </div>
                        <div v-if="item.isBuy" class="q-py-xs">
                          <span class="f12"> ซื้อแล้ว </span>
                        </div>
                        <div align="center" v-if="!item.isAlwaysOn">
                          <span
                            class="f12"
                            v-if="item.dateBalance != '-' && !item.isBuy"
                          >
                            {{
                              `เหลือเวลา ${
                                item.dateBalance < 0 ? 0 : item.dateBalance
                              } วัน`
                            }}
                          </span>
                        </div>
                      </div>
                      <div class="col self-center q-pa-sm" align="right">
                        <q-btn
                          round
                          push
                          class="bg-brown-5 text-brown-2"
                          @click="funcSelectedItem(item.type, item)"
                        >
                          <q-icon name="fas fa-trash-alt"></q-icon>
                        </q-btn>
                      </div>
                    </div>
                    <div
                      class="relative-position q-my-sm row bg-white box-card-item"
                      v-if="detailsShop.isSelectedColor"
                    >
                      <div class="col-4 self-center q-pa-sm">
                        <div
                          style="width: 65px; height: 65px; border-radius: 50%"
                          :style="`background-color:${detailsShop.selectedColor};`"
                        ></div>
                      </div>
                      <div class="col self-center q-pa-sm" align="left">
                        <div class="text-overflow">
                          <span class="f14">สีผิว</span>
                        </div>
                        <div class="q-py-xs">
                          <q-img width="20px" src="/images/coin.png"></q-img>
                          <span class="q-mx-sm">50</span>
                        </div>
                      </div>
                      <div class="col self-center q-pa-sm" align="right">
                        <q-btn
                          round
                          push
                          class="bg-brown-5 text-brown-2"
                          @click="funcRemoveColor()"
                        >
                          <q-icon name="fas fa-trash-alt"></q-icon>
                        </q-btn>
                      </div>
                    </div>
                  </div>

                  <div v-else class="row fit justify-center items-center">
                    <span style="color: #82542c"> ไม่มีสินค้าในรถเข็น </span>
                  </div>
                </div>
              </div>

              <div
                class="q-pt-md text-bold f20"
                style="color: #512a08"
                align="left"
              >
                <span>รวม : </span>
                <q-img
                  class="q-mx-sm"
                  width="25px"
                  src="/images/coin.png"
                ></q-img>
                <span>{{ totalCoin }}</span>
                <div align="center" class="q-pt-md q-pb-sm">
                  <img
                    class="cursor-pointer"
                    style="width: 220px"
                    src="/images/shop/btn-buy-all.png"
                    @click="
                      checkCartHasItem || detailsShop.isSelectedColor
                        ? funcBuySelected()
                        : (isDialogDetailShop = false)
                    "
                  />
                </div>
              </div>
            </div>
            <div class="col-12 q-mt-lg" align="center">
              <q-btn round push class="bg-red text-white" v-close-popup>
                <q-icon name="fas fa-times"></q-icon>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog maximized v-model="isDialogBuySuccess" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center">
          <div class="box-buy-success q-pa-md" align="center">
            <div class="q-py-sm" align="center">
              <div class="f22 text-bold q-pb-md">ผู้นำด้านแฟชั่น</div>
              <div class="f18">สวมใส่ชุดที่ซื้อเลยหรือไม่</div>
            </div>

            <div class="q-mt-md row">
              <div class="col" align="center">
                <q-img
                  class="cursor-pointer"
                  v-close-popup
                  @click="funcResetShop()"
                  style="max-width: 120px; width: 100%"
                  src="/images/shop/btn-set-to-equipment.png"
                ></q-img>
              </div>
              <div class="col" align="center">
                <q-img
                  class="cursor-pointer"
                  @click="funcConfirmChangeEquipment()"
                  style="max-width: 120px; width: 100%"
                  src="/images/shop/btn-change-equipment.png"
                ></q-img>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <loading :isShowLoading="isShowLoading"></loading>
  </q-page>
</template>

<script>
import shopPc from "../components/shop/shopPc.vue";
import shopMobile from "../components/shop/shopMobile.vue";
import loading from "../components/dialog-loading.vue";
import { ref, onMounted, reactive, computed } from "vue";
import { useQuasar } from "quasar";
import studentHooks from "../hooks/gameHooks";
import updateHooks from "../hooks/updateHooks";
import getHooks from "../hooks/getHooks";
import { analyticsLogEvent, playSoundBackground } from "src/router";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    shopPc,
    shopMobile,
    loading,
  },
  setup(props) {
    // Intital Data
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const uid = ref("");
    const characterData = ref({});
    const characterLevel = ref(1);
    const inventoryList = ref({});
    const isLoaded = ref(false);
    const isDialogDetailShop = ref(false);
    const isNoMoney = ref(false);

    const isShowLoading = ref(true);

    // Details
    const detailsShop = reactive({
      isSelectedColor: false,
      selectedColor: "",
      isSelectedHeader: false,
      selectedHeader: {},
      isSelectedBody: false,
      selectedBody: {},
      isSelectedFooter: false,
      selectedFooter: {},
      isSelectedPet: false,
      selectedPet: {},
      isSelectedOther: false,
      selectedOther: {},
      cartList: [],
      characterCoin: 0,
      shopList: {
        head: [],
        body: [],
        footer: [],
        pet: [],
        other: [],
      },
    });

    // Func : Selected Color
    const funcSelectedColor = (val) => {
      if (detailsShop.selectedColor != characterData.value.color) {
        detailsShop.isSelectedColor = true;
      }
    };

    const funcSelectedItem = (type, item) => {
      let newItem = {
        type: item.type,
        price: item.isBuy ? 0 : item.price,
        itemName: item.itemName,
        imgURL: item.imgURL,
        itemNameTh: item.itemNameTh,
        isBuy: item.isBuy,
        isNew: item.isNew,
        dateBalance: item.dateBalance,
      };

      if (detailsShop.cartList.length) {
        let findItemIndex = detailsShop.cartList
          .map((x) => x.type)
          .indexOf(type);

        let sameItem = detailsShop.cartList.filter(
          (x) => x.itemName == item.itemName && x.type == type
        );

        if (sameItem.length) {
          detailsShop.cartList.splice(findItemIndex, 1);

          if (type == "head") {
            detailsShop.isSelectedHeader = false;
            detailsShop.selectedHeader.itemName =
              characterData.value.head || "";
          } else if (type == "body") {
            detailsShop.isSelectedBody = false;
            detailsShop.selectedBody.itemName = characterData.value.body || "";
          } else if (type == "footer") {
            detailsShop.isSelectedFooter = false;
            detailsShop.selectedFooter.itemName =
              characterData.value.footer || "";
          } else if (type == "pet") {
            detailsShop.isSelectedPet = false;
            detailsShop.selectedPet.itemName = characterData.value.pet || "";
          } else if (type == "other") {
            detailsShop.isSelectedOther = false;
            detailsShop.selectedOther.itemName =
              characterData.value.other || "";
          }
        } else {
          if (findItemIndex != "-1") {
            detailsShop.cartList[findItemIndex] = newItem;
          } else {
            detailsShop.cartList.push(newItem);
          }

          if (type == "head") {
            detailsShop.isSelectedHeader = true;
            detailsShop.selectedHeader = newItem;
          } else if (type == "body") {
            detailsShop.isSelectedBody = true;
            detailsShop.selectedBody = newItem;
          } else if (type == "footer") {
            detailsShop.isSelectedFooter = true;
            detailsShop.selectedFooter = newItem;
          } else if (type == "pet") {
            detailsShop.isSelectedPet = true;
            detailsShop.selectedPet = newItem;
          } else if (type == "other") {
            detailsShop.isSelectedOther = true;
            detailsShop.selectedOther = newItem;
          }
        }
      } else {
        detailsShop.cartList.push(newItem);

        if (type == "head") {
          detailsShop.isSelectedHeader = true;
          detailsShop.selectedHeader = newItem;
        } else if (type == "body") {
          detailsShop.isSelectedBody = true;
          detailsShop.selectedBody = newItem;
        } else if (type == "footer") {
          detailsShop.isSelectedFooter = true;
          detailsShop.selectedFooter = newItem;
        } else if (type == "pet") {
          detailsShop.isSelectedPet = true;
          detailsShop.selectedPet = newItem;
        } else if (type == "other") {
          detailsShop.isSelectedOther = true;
          detailsShop.selectedOther = newItem;
        }
      }
    };

    // Func : load student info
    const loadStudentInfo = async () => {
      isShowLoading.value = true;
      isLoaded.value = false;

      uid.value = $q.sessionStorage.getItem("uid");

      try {
        let getData = await studentHooks.studentInfomation(uid.value);

        characterData.value = getData.character;

        characterLevel.value = Number(getData.level);

        detailsShop.characterCoin = getData.coin || 0;
      } catch (error) {
        // console.log(`%c ${error} : Function Load Student Info`, "color: #E7C402");
      }
    };

    const loadInventory = async () => {
      try {
        let getData = await getHooks.getinventory(uid.value);

        inventoryList.value = getData;
      } catch (error) {
        // console.log(`%c ${error} : Function Load Inventory`, "color:#E7C402");
      }
    };

    const loadItemShop = async () => {
      try {
        let getData = await getHooks.getitemshop();

        for (let i = 0; i < getData.length; i++) {
          let itemType = getData[i].type;

          let findSameInventory = inventoryList.value[itemType].filter(
            (x) => x.itemName == getData[i].itemName
          );

          if (findSameInventory.length) {
            getData[i].isBuy = true;
          } else {
            getData[i].isBuy = false;
          }
        }

        let findHeadList = getData.filter((x) => x.type == "head");

        findHeadList.sort(
          (a, b) =>
            b.isNew - a.isNew || b.timestamp._seconds - a.timestamp._seconds
        );

        let findBodyList = getData.filter((x) => x.type == "body");

        findBodyList.sort(
          (a, b) =>
            b.isNew - a.isNew || b.timestamp._seconds - a.timestamp._seconds
        );

        let findFooterList = getData.filter((x) => x.type == "footer");

        findFooterList.sort(
          (a, b) =>
            b.isNew - a.isNew || b.timestamp._seconds - a.timestamp._seconds
        );

        let findPetList = getData.filter((x) => x.type == "pet");

        findPetList.sort(
          (a, b) =>
            b.isNew - a.isNew || b.timestamp._seconds - a.timestamp._seconds
        );

        let findOtherList = getData.filter((x) => x.type == "other");

        findOtherList.sort(
          (a, b) =>
            b.isNew - a.isNew || b.timestamp._seconds - a.timestamp._seconds
        );

        let newData = {
          head: findHeadList,
          body: findBodyList,
          footer: findFooterList,
          pet: findPetList,
          other: findOtherList,
        };

        detailsShop.shopList = newData;

        isShowLoading.value = false;

        isLoaded.value = true;
      } catch (error) {
        // console.log(`%c ${error} : Function Load Item Shop`, "color:#E7C402");
      }
    };

    // Func : Sum Total Coin
    const totalCoin = computed(() => {
      let sumCoin = 0;

      if (detailsShop.cartList.length) {
        sumCoin = detailsShop.cartList
          .map((x) => x.price)
          .reduce((a, b) => a + b, 0);
      }

      if (detailsShop.isSelectedColor) {
        sumCoin += 50;
      }

      return sumCoin;
    });

    // Func : Buy Item
    const isDialogBuySuccess = ref(false);
    const funcBuySelected = async () => {
      let tempItemCartList = detailsShop.cartList.filter((x) => !x.isBuy);

      if (tempItemCartList.length || detailsShop.isSelectedColor) {
        isShowLoading.value = true;

        if (detailsShop.characterCoin >= totalCoin.value) {
          let response = await updateHooks.updatecoin(
            uid.value,
            totalCoin.value
          );

          if (response == "fail") {
            isShowLoading.value = false;

            isNoMoney.value = true;
            setTimeout(() => {
              isNoMoney.value = false;
            }, 1500);
            return;
          } else {
            isDialogDetailShop.value = false;
            detailsShop.characterCoin = response.coin;

            if (detailsShop.isSelectedColor) {
              characterData.value.color = detailsShop.selectedColor;
              await updateHooks.updatecharacter(uid.value, characterData.value);
            }

            if (tempItemCartList.length) {
              tempItemCartList.forEach((item, index) => {
                let findIndexItemShop = detailsShop.shopList[item.type]
                  .map((x) => x.itemName)
                  .indexOf(item.itemName);

                detailsShop.shopList[item.type][findIndexItemShop].isBuy = true;
              });

              tempItemCartList = tempItemCartList.map((x) => {
                return { itemName: x.itemName, type: x.type, imgURL: x.imgURL };
              });

              let findHeadNew = tempItemCartList.filter(
                (x) => x.type == "head"
              );
              let findBodyNew = tempItemCartList.filter(
                (x) => x.type == "body"
              );
              let findFooterNew = tempItemCartList.filter(
                (x) => x.type == "footer"
              );
              let findPetNew = tempItemCartList.filter((x) => x.type == "pet");
              let findOtherNew = tempItemCartList.filter(
                (x) => x.type == "other"
              );

              if (!findHeadNew.length) {
                detailsShop.isSelectedHeader = false;
                detailsShop.selectedHeader.itemName = characterData.value.head;
              }

              if (!findBodyNew.length) {
                detailsShop.isSelectedBody = false;
                detailsShop.selectedBody.itemName = characterData.value.body;
              }

              if (!findFooterNew.length) {
                detailsShop.isSelectedFooter = false;
                detailsShop.selectedFooter.itemName =
                  characterData.value.footer;
              }

              if (!findPetNew.length) {
                detailsShop.isSelectedPet = false;
                detailsShop.selectedPet.itemName = characterData.value.pet;
              }

              if (!findOtherNew.length) {
                detailsShop.isSelectedOther = false;
                detailsShop.selectedOther.itemName = characterData.value.other;
              }

              await updateHooks.addinventory(uid.value, tempItemCartList);

              detailsShop.cartList = [];

              isDialogBuySuccess.value = true;
            }

            detailsShop.isSelectedColor = false;

            isNoMoney.value = false;
            isShowLoading.value = false;
          }
        } else {
          isShowLoading.value = false;
          isNoMoney.value = true;

          setTimeout(() => {
            isNoMoney.value = false;
          }, 1500);
          return;
        }
      } else {
        isDialogDetailShop.value = false;
      }
    };

    const funcConfirmChangeEquipment = async () => {
      isShowLoading.value = true;
      isDialogBuySuccess.value = false;

      if (detailsShop.isSelectedHeader) {
        characterData.value.head = detailsShop.selectedHeader.itemName;
        detailsShop.isSelectedHeader = false;
      }

      if (detailsShop.isSelectedBody) {
        characterData.value.body = detailsShop.selectedBody.itemName;
        detailsShop.isSelectedBody = false;
      }

      if (detailsShop.isSelectedFooter) {
        characterData.value.footer = detailsShop.selectedFooter.itemName;
        detailsShop.isSelectedFooter = false;
      }

      if (detailsShop.isSelectedPet) {
        characterData.value.pet = detailsShop.selectedPet.itemName;
        detailsShop.isSelectedPet = false;
      }

      if (detailsShop.isSelectedOther) {
        characterData.value.other = detailsShop.selectedOther.itemName;
        detailsShop.isSelectedOther = false;
      }

      await updateHooks.updatecharacter(uid.value, characterData.value);

      isShowLoading.value = false;
    };

    // const funcSetItemToInventory = () => {
    //   detailsShop.isSelectedHeader = false;
    //   detailsShop.isSelectedBody = false;
    //   detailsShop.isSelectedFooter = false;

    //   detailsShop.selectedHeader.itemName = characterData.value.head;
    //   detailsShop.selectedBody.itemName = characterData.value.body;
    //   detailsShop.selectedFooter.itemName = characterData.value.footer;
    // };

    const funcRemoveColor = () => {
      detailsShop.selectedColor = characterData.value.color;
      detailsShop.isSelectedColor = false;
    };

    // Func : Reset Selected Shop
    const funcResetShop = async () => {
      // is Boolean
      detailsShop.isSelectedColor = false;
      detailsShop.isSelectedHeader = false;
      detailsShop.isSelectedBody = false;
      detailsShop.isSelectedFooter = false;
      detailsShop.isSelectedPet = false;

      //
      detailsShop.selectedColor = characterData.value.color;
      detailsShop.selectedHeader.itemName = characterData.value.head;
      detailsShop.selectedBody.itemName = characterData.value.body;
      detailsShop.selectedFooter.itemName = characterData.value.footer;
      detailsShop.selectedPet.itemName = characterData.value.pet;
      detailsShop.selectedOther.itemName = characterData.value.other;

      // detailsShop.selectedPet.itemName = "";

      detailsShop.cartList = [];
    };

    const checkCartHasItem = computed(() => {
      let findItemInCart = detailsShop.cartList.filter((x) => !x.isBuy);

      return findItemInCart.length;
    });

    let isSync;

    onMounted(async () => {
      if (analyticsLogEvent != null) {
        analyticsLogEvent("/shop");
      }

      await loadStudentInfo();
      await loadInventory();
      await loadItemShop();

      if ($q.sessionStorage.has("isSync")) {
        isSync = $q.sessionStorage.getItem("isSync");
      }

      if (!isSync) {
        if ($q.sessionStorage.has("isEnableSoundBackground")) {
          let isSound = $q.sessionStorage.getItem("isEnableSoundBackground");

          playSoundBackground(route.name, isSound);
        } else {
          $q.sessionStorage.set("isEnableSoundBackground", true);
          playSoundBackground(route.name, true);
        }
      }

      funcResetShop();
    });

    return {
      // Details
      detailsShop,

      // character Data
      characterData,
      characterLevel,

      // Is Boolearn
      isLoaded,
      isShowLoading,
      isDialogDetailShop,
      isNoMoney,
      isDialogBuySuccess,

      // Function
      funcSelectedItem,
      funcSelectedColor,
      funcResetShop,
      funcBuySelected,
      funcRemoveColor,
      funcConfirmChangeEquipment,

      // Computed
      totalCoin,
      checkCartHasItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-shop-main {
  background-color: #f5e8d7;
}

.box-dialog-detail-shop {
  max-width: 320px;
  width: 100%;
  background-color: #ffeecb;
  border-radius: 20px;
  box-shadow: 0px 7px 0px #ffdc94;
}

.box-no-money {
  max-width: 360px;
  width: 100%;
  border: 2px solid#FFAA2E;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 50px;
  z-index: 2;
  transition: 0.5s;
}

.box-content-detail-shop {
  background-color: #ffdf9c;
  border-radius: 10px;
}

.box-details-shop-list {
  height: 300px;
  overflow-y: auto;
}

/* width */
.box-details-shop-list::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.box-details-shop-list::-webkit-scrollbar-track {
  background: #9d7d4b;
  border: 2px solid #ffdf9c;
  border-radius: 50px;
}

/* Handle */
.box-details-shop-list::-webkit-scrollbar-thumb {
  background: #f4910c;
  border-radius: 50px;
}

.box-card-item {
  background-color: #fff;
  border: 3px solid#fff;
  border-radius: 7px;
}

.box-card-item[data-new="true"]::after {
  content: "New";
  position: absolute;
  top: 0;
  left: -5px;
  transform: rotate(-30deg);
  padding: 1px 7px;
  font-size: 10px;
  color: #fff;
  background-color: #ad00d8;
  border-radius: 3px;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box-buy-success {
  width: 330px;
  background-color: #ffeecb;
  border: 5px solid #ffdc94;
  box-shadow: 0px 5px 0px #cd982c;
  border-radius: 20px;
}
</style>
