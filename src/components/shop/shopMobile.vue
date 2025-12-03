<template>
  <div class="window-height">
    <div
      align="center"
      class="
        bg-shop-mobile
        col-12
        self-start
        q-pa-sm
        row
        justify-center
        relative-position
      "
    >
      <div class="col-12 self-start row" align="left">
        <div class="col-2 self-center" style="width: 50px">
          <q-img
            style="max-width: 40px; width: 100%"
            src="/images/btn-back-to-lobby.png"
            @click="$router.replace('/lobby')"
          ></q-img>
          <!-- <q-btn round class="bg-amber-5 q-mb-sm" push >

          </q-btn> -->
        </div>
        <div class="col-4 self-start q-pl-sm" align="left">
          <q-img
            class=""
            style="width: 110px; margin-top: -2px"
            src="/images/shop/shop-coin-bar.png"
          >
            <div
              class="absolute-right transparent"
              style="
                right: -5px;
                top: 50%;
                transform: translate(0%, -72%);
                line-height: 0;
              "
              align="center"
            >
              <span class="f12">{{ detailsShop.characterCoin }}</span>
            </div>
          </q-img>
        </div>
        <div class="col self-center q-pl-xs" align="left">
          <!-- <q-img
            style="max-width: 140px; width: 100%"
            class="q-mt-xs"
            src="/images/shop/shop-coin-bar.png"
          >
            <div
              class="absolute-right transparent"
              style="top: 0px; height: 30px; line-height: 0"
              align="center"
            >
              <span class="f12">{{ detailsShop.characterCoin }}</span>
            </div>
          </q-img> -->
        </div>
        <q-space></q-space>
        <div
          class="col-3 self-start"
          style="max-width: 120px; width: 100%"
          align="right"
        >
          <q-img src="/images/shop/label-shop.png"></q-img>
        </div>
      </div>

      <div class="col-12" align="center">
        <character
          style="max-width: 400px"
          :equipment="{
            head: detailsShop.selectedHeader.itemName,
            body: detailsShop.selectedBody.itemName,
            footer: detailsShop.selectedFooter.itemName,
            pet: detailsShop.selectedPet.itemName,
            other: detailsShop.selectedOther.itemName,
          }"
          :bodycolor="detailsShop.selectedColor"
        ></character>
      </div>
    </div>

    <div class="col-12 relative-position">
      <div class="box-shop-detail">
        <div class="row box-shop-menu justify-around">
          <div class="col">
            <q-btn
              style="border-radius: 0px"
              flat
              class="fit"
              :class="selectedMenu == 'color' ? 'btn-menu-active' : ''"
              @click="funcSelectedMenu('color')"
            >
              <q-img
                style="max-width: 100px"
                src="/images/shop/icon-shop-color.png"
              ></q-img
            ></q-btn>
          </div>

          <div class="col">
            <q-btn
              style="border-radius: 0px"
              rounded
              flat
              class="fit"
              :class="selectedMenu == 'head' ? 'btn-menu-active' : ''"
              @click="funcSelectedMenu('head')"
              ><q-img
                style="max-width: 100px"
                src="/images/shop/icon-shop-hair.png"
              ></q-img>
            </q-btn>
          </div>
          <div class="col">
            <q-btn
              style="border-radius: 0px"
              flat
              class="fit"
              :class="selectedMenu == 'body' ? 'btn-menu-active' : ''"
              @click="funcSelectedMenu('body')"
              ><q-img
                style="max-width: 100px"
                src="/images/shop/icon-shop-shirt.png"
              ></q-img
            ></q-btn>
          </div>
          <div class="col">
            <q-btn
              style="border-radius: 0px"
              flat
              class="fit"
              :class="selectedMenu == 'footer' ? 'btn-menu-active' : ''"
              @click="funcSelectedMenu('footer')"
              ><q-img
                style="max-width: 100px"
                src="/images/shop/icon-shop-pants.png"
              ></q-img
            ></q-btn>
          </div>
          <!-- Menu Pet -->
          <div class="col">
            <q-btn
              style="border-radius: 0px"
              flat
              class="fit"
              :class="
                selectedMenu == 'pet' || selectedMenu == 'other'
                  ? 'btn-menu-active'
                  : 'btn-menu'
              "
              @click="selectedMenu = 'pet'"
              ><q-img
                style="max-width: 100px"
                src="/images/shop/icon-shop-toy.png"
              ></q-img
            ></q-btn>
          </div>
        </div>
        <div>
          <div class="q-pa-sm row items-center" style="height: 50px">
            <div class="col-1"></div>
            <q-space></q-space>
            <div
              class="col-1 q-mx-xs"
              style="width: fit-content"
              v-if="selectedMenu == 'pet' || selectedMenu == 'other'"
            >
              <q-btn
                flat
                class="q-px-md q-py-xs"
                style="border-radius: 10px"
                @click="selectedMenu = 'pet'"
                :class="selectedMenu == 'pet' ? 'btn-sub-menu' : ''"
                >คู่หู</q-btn
              >
            </div>
            <div
              class="col-1 q-mx-xs"
              style="width: fit-content"
              v-if="selectedMenu == 'pet' || selectedMenu == 'other'"
            >
              <q-btn
                flat
                class="q-px-md q-py-xs"
                style="border-radius: 10px"
                @click="selectedMenu = 'other'"
                :class="selectedMenu == 'other' ? 'btn-sub-menu' : ''"
                >เครื่องประดับ</q-btn
              >
            </div>
          </div>
        </div>
        <div class="box-shop-details-list row q-pa-xs" id="shop-detail">
          <!--  -->
          <div
            class="col-12"
            v-show="selectedMenu == index"
            v-for="(itemArr, index) in detailsShop.shopList"
            :key="index"
          >
            <div class="row" align="left">
              <div
                align="left"
                class="col-6 q-pa-sm"
                v-for="(item, indexItem) in itemArr"
                v-show="
                  item.isAlwaysOn || (!item.isAlwaysOn && item.dateBalance > 0)
                "
              >
                <div
                  @click="
                    characterLevel < item.level
                      ? null
                      : $emit('callback-selecteditem', index, item)
                  "
                  v-ripple="characterLevel >= item.level"
                  class="relative-position shadow-1 row cursor-pointer"
                  :class="[
                    detailsShop.isSelectedHeader && selectedMenu == 'head'
                      ? detailsShop.selectedHeader.itemName == item.itemName
                        ? 'box-card-item-active'
                        : 'box-card-item'
                      : 'box-card-item',
                    detailsShop.isSelectedBody && selectedMenu == 'body'
                      ? detailsShop.selectedBody.itemName == item.itemName
                        ? 'box-card-item-active'
                        : 'box-card-item'
                      : 'box-card-item',
                    detailsShop.isSelectedFooter && selectedMenu == 'footer'
                      ? detailsShop.selectedFooter.itemName == item.itemName
                        ? 'box-card-item-active'
                        : 'box-card-item'
                      : 'box-card-item',
                    detailsShop.isSelectedPet && selectedMenu == 'pet'
                      ? detailsShop.selectedPet.itemName == item.itemName
                        ? 'box-card-item-active'
                        : 'box-card-item'
                      : 'box-card-item',
                    detailsShop.isSelectedOther && selectedMenu == 'other'
                      ? detailsShop.selectedOther.itemName == item.itemName
                        ? 'box-card-item-active'
                        : 'box-card-item'
                      : 'box-card-item',
                    characterLevel < item.level
                      ? 'no-pointer-event'
                      : 'cursor-pointer',
                  ]"
                  :data-new="item.isBuy ? false : item.isNew"
                >
                  <div
                    class="col-3 self-start relative-position"
                    style="width: 45%"
                  >
                    <q-img
                      class=""
                      fit="cover"
                      width="100%"
                      :src="item.imgURL"
                    ></q-img>
                  </div>
                  <div class="col self-start q-py-sm q-pr-xs q-px-sm">
                    <div class="text-overflow">
                      <span class="f12">{{ item.itemNameTh }}</span>
                      <q-tooltip>{{ item.itemNameTh }}</q-tooltip>
                    </div>
                    <div class="q-py-xs" v-if="!item.isBuy">
                      <q-img
                        width="20px"
                        style="margin-left: -5px"
                        src="/images/coin.png"
                      ></q-img>
                      <span class="q-mx-sm">{{ item.price }}</span>
                      <span
                        class="q-pl-xs text-grey relative-position"
                        v-if="item.discount > 0"
                        >{{ item.fullPrice }}
                        <div
                          class="absolute-center"
                          style="
                            left: -1px;
                            width: 105%;
                            height: 1px;
                            background-color: red;
                            transform: rotate(-10deg);
                          "
                        ></div>
                      </span>
                    </div>
                    <div v-if="item.isBuy" class="q-pa-sm" align="center">
                      <span style="font-size: 10px"> ซื้อแล้ว </span>
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

                  <div
                    v-if="characterLevel < item.level"
                    class="
                      absolute-center
                      fit
                      lock-level
                      row
                      justify-center
                      items-center
                    "
                  >
                    <div class="" align="center">
                      <q-icon
                        name="fas fa-lock"
                        class="text-white"
                        size="30px"
                      ></q-icon>
                      <br />
                      <div class="relative-position text-white f14 q-mt-sm">
                        ปลดล็อคที่เลเวล {{ item.level }}
                      </div>
                    </div>
                  </div>

                  <div
                    class="absolute-bottom text-white"
                    style="
                      width: fit-content;
                      bottom: -10px;
                      left: 50%;
                      transform: translate(-50%, 0%);
                      font-size: 12px;
                    "
                    v-if="item.discount > 0 && !item.isBuy"
                  >
                    <div class="bg-red q-px-xs rounded-borders">
                      <span>
                        {{ `ลด ${item.discount}%` }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="col-12 self-center q-pa-md"
            v-if="selectedMenu == 'color'"
            align="center"
          >
            <q-color
              v-model="detailsShop.selectedColor"
              @change="$emit('callback-selectedcolor', selectedColor)"
              no-header
              no-footer
              square
              style="max-width: 350px; width: 55%"
              class="shadow-0"
            />
            <div class="q-py-md">
              <span class="text-black">
                เปลี่ยนสีผิวตัวละคร ครั้งละ 50 เหรียญ
              </span>
            </div>
          </div>
          <div class="col-12" style="height: 70px"></div>
        </div>
      </div>
    </div>
    e

    <div
      class="
        fixed-bottom
        shadow-1
        col-12
        row
        self-end
        relative-position
        bg-white
      "
    >
      <div class="col-5 self-center q-px-sm">
        <div class="box-coin-and-diamond row justify-center q-px-md q-py-xs">
          <div class="self-center">
            <q-img width="20px" src="/images/coin.png"></q-img>
          </div>
          <div class="self-center">
            <span class="relative-position q-mx-sm text-bold text-brown f14">
              {{ totalCoin }}
            </span>
          </div>

          <!-- <div style="border: 2px solid #b36233" class="q-py-md q-mx-md"></div>
              <div class="self-center">
                <q-img width="25px" src="/images/diamond.png"></q-img>
              </div>
              <div class="self-center">
                <span class="relative-position q-mx-sm text-bold text-brown f20">
                  99999
                </span>
              </div> -->
        </div>
      </div>
      <div class="col self-center q-px-xs q-mt-xs" align="right">
        <q-img
          class="relative-position btn-active cursor-pointer q-mx-xs"
          style="width: 50px"
          src="/images/shop/btn-cart-shop.png"
          @click="$emit('callback-buy')"
        ></q-img>
        <q-img
          @click="$emit('callback-reset')"
          class="relative-position btn-active cursor-pointer q-ml-xs"
          style="max-width: 50px; width: 50%; margin-top: 5px"
          src="/images/shop/btn-reset.png"
        ></q-img>
      </div>
    </div>
  </div>
</template>

<script>
import character from "../../components/character.vue";
import { ref } from "vue";
export default {
  props: {
    characterLevel: {
      type: Number,
      default: 1,
    },
    detailsShop: {
      type: Object,
      default: () => {},
    },
    totalCoin: {
      type: Number,
      default: 0,
    },
  },
  components: {
    character,
  },
  emits: [
    "callback-selecteditem",
    "callback-selectedcolor",
    "callback-buy",
    "callback-reset",
  ],
  setup(props) {
    // Initial Data
    const selectedMenu = ref("color");

    const funcSelectedMenu = (type) => {
      selectedMenu.value = type;

      let el = document.getElementById("shop-detail");

      // el.style.scrollBehavior = "smooth";

      el.scrollTop = 0;
    };

    return {
      // Selected Menu
      selectedMenu,

      // Function
      funcSelectedMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-shop-mobile {
  width: 100%;
  min-height: 50vh;
  max-height: fit-content;
  background-image: url("/images/shop/bg-shop-mobile.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
}

.box-shop-detail {
  width: 100%;
  background-color: #fff7c5;
  overflow: hidden;
}

.box-shop-details-list {
  min-height: calc(60vh - 230px);
  max-height: 195px;
  overflow: auto;
}

/* width */
.box-shop-details-list::-webkit-scrollbar {
  width: 7px;
}

/* Track */
.box-shop-details-list::-webkit-scrollbar-track {
  background: #ff9200;
}

/* Handle */
.box-shop-details-list::-webkit-scrollbar-thumb {
  background: #894403;
}

.box-shop-menu {
  position: sticky;
  top: 0;
  background-color: #f4910c;
  box-sizing: border-box;
}

.box-coin-and-diamond {
  width: fit-content;
  background-color: #f8efc6;
  border-radius: 15px;
  border: 5px solid#B36233;
}

.btn-active {
  transform: scale(1);
  transition: 0.05s;
}

.btn-active:active {
  transition: 0.05s;
  transform: scale(0.9);
}

.btn-menu-active {
  background-color: #efd090;
}

.box-card-item {
  min-height: 100px;
  max-height: fit-content;
  background-color: #fff;
  border: 3px solid#fff;
  border-radius: 7px;
}

.box-card-item-active {
  min-height: 100px;
  max-height: fit-content;
  background-color: #fff;
  border: 3px solid#F4910C;
  border-radius: 7px;
}

.box-card-item[data-new="true"]::after,
.box-card-item-active[data-new="true"]::after {
  content: "New";
  position: absolute;
  top: 0;
  left: -10px;
  transform: rotate(-30deg);
  padding: 1px 10px;
  font-size: 14px;
  color: #fff;
  background-color: #ad00d8;
  border-radius: 5px;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lock-level {
  background-color: rgba(0, 0, 0, 0.5);
}

.btn-sub-menu {
  background-color: #efd090;
}
</style>
