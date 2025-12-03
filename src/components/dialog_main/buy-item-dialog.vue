<template>
  <div>
    <q-dialog v-model="isDialogBuyItem" maximized persistent>
      <q-card class="transparent shadow-0 font-mali-m">
        <q-card-section class="fit row justify-center">
          <div class="self-center relative-position">
            <q-img
              width="320px"
              src="/images/box_main/box-buy-item.png"
              no-transition
              no-spinner
            >
              <div class="fit row transparent relative-position">
                <div class="col-12 box-scroll q-pa-sm q-py-md relative-position">
                  <div class="q-py-xs" v-if="isChangeColor">
                    <q-img
                      src="/images/box_main/box-item-shop.png"
                      no-transition
                      no-spinner
                    >
                      <div class="fit row q-pa-xs transparent">
                        <div
                          class="col-1 self-center relative-position"
                          style="width: 50px"
                        >
                          <div
                            class="box-item absolute-center row justify-center items-center q-pa-sm"
                          >
                            <div
                              class="box-color"
                              :style="`background-color:${color}`"
                            ></div>
                          </div>
                        </div>
                        <div class="col self-center q-px-sm q-pl-md relative-position">
                          <div class="q-pa-xs absolute-center" style="width: 110px">
                            <div class="text-item-name">
                              <span class=""> สีผิว </span>
                            </div>
                            <div class="q-my-xs" style="border: 1px dashed #a1aec7"></div>
                            <div class="row q-px-xs">
                              <q-img
                                width="22px"
                                src="/images/icon_main/icon-coin-winner.png"
                                no-transition
                                no-spinner
                              ></q-img>
                              <span class="self-center q-mx-sm text-price"> 50</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-1 self-center width-fit">
                          <q-btn size="12px" round @click="$emit('callback-removeColor')">
                            <q-img
                              src="/images/icon_main/icon-trash.png"
                              no-transition
                              no-spinner
                            ></q-img>
                          </q-btn>
                        </div>
                      </div>
                    </q-img>
                  </div>
                  <div class="q-py-xs" v-for="(item, index) in showItemshop">
                    <q-img
                      src="/images/box_main/box-item-shop.png"
                      no-transition
                      no-spinner
                    >
                      <div class="fit row transparent no-padding">
                        <div class="row fit" style="padding: 13px">
                          <div
                            class="col-1 self-center relative-position"
                            style="width: 60px; height: 100%"
                          >
                            <div
                              class="box-item fit relative-position row justify-center items-center"
                            >
                              <q-img
                                width="80%"
                                class="absolute-center"
                                :src="`${item.image}`"
                                no-transition
                                no-spinner
                              ></q-img>
                            </div>

                            <q-img
                              v-if="item.isNew"
                              class="absolute-center"
                              style="top: -27px"
                              width="35px"
                              src="/images/icon_main/icon-new-items-shop.png"
                              no-transition
                              no-spinner
                            ></q-img>
                          </div>
                          <div class="col self-center relative-position" align="left">
                            <div class="absolute-center" style="width: 85%">
                              <div class="text-item-name">
                                <span class="">
                                  {{ item.itemNameTh }}
                                </span>
                              </div>
                              <div
                                class="q-my-xs"
                                style="border: 1px dashed #a1aec7"
                              ></div>
                              <div class="col row q-px-xs">
                                <div style="width: 22px">
                                  <q-img
                                    src="/images/icon_main/icon-coin-winner.png"
                                    no-transition
                                    no-spinner
                                  ></q-img>
                                </div>
                                <div class="self-center text-price">
                                  <span
                                    v-if="item.discount > 0"
                                    class="relative-position q-ml-xs"
                                    style="color: #d80000"
                                  >
                                    {{ `${item.fullPrice}` }}
                                    <div
                                      class="absolute-center"
                                      style="
                                        width: 100%;
                                        height: 0.01cm;
                                        background-color: #d80000;
                                      "
                                    ></div>
                                  </span>
                                  <span class="q-mx-xs">
                                    {{ item.price }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-1 self-center width-fit">
                            <q-btn size="12px" round @click="funcRemoveItem(item)">
                              <q-img
                                src="/images/icon_main/icon-trash.png"
                                no-transition
                                no-spinner
                              ></q-img>
                            </q-btn>
                          </div>
                        </div>
                      </div>
                    </q-img>
                  </div>
                </div>
                <div class="col-12 self-center row">
                  <div class="col-12 row justify-center q-pb-md" align="cneter">
                    <div class="self-center">
                      <span class="text-total-price q-mx-sm">
                        {{ `Total: ${price}` }}
                      </span>
                    </div>
                    <div class="self-center" style="padding-bottom: 5px">
                      <q-img
                        width="30px"
                        class="self-center"
                        src="/images/icon_main/icon-coin-winner.png"
                        no-transition
                        no-spinner
                      ></q-img>
                    </div>
                  </div>
                  <div class="col-12 self-end q-pb-sm" align="center">
                    <q-img
                      :class="isCanNotBuyItem ? 'cursor-not-allowed' : 'cursor-pointer'"
                      @click="isCanNotBuyItem ? null : funcBuyItem()"
                      width="125px"
                      src="/images/button_main/button-check-out.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                </div>

                <div
                  v-if="isCanNotBuyItem"
                  class="absolute-center full-width box-can-not-buy-item row justify-center"
                >
                  <div>
                    <q-img
                      src="/images/icon_main/icon-coin-winner.png"
                      width="35px"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                  <div class="self-center f20 q-mx-xs">
                    <span>จำนวนเงินไม่เพียงพอ</span>
                  </div>
                </div>
              </div>
            </q-img>

            <div class="absolute-top-right" style="top: -5px; right: -5px">
              <q-btn round flat v-close-popup @click="$emit('callback-closeDialog')">
                <q-img
                  src="/images/icon_main/icon-close.png"
                  no-transition
                  no-spinner
                ></q-img>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog maximized v-model="isDialogConfirmBuyItem" persistent>
      <q-card class="shadow-0 transparent font-mali-m">
        <q-card-section class="row fit justify-center">
          <div class="self-center">
            <q-img
              width="320px"
              src="/images/box_main/box-confirm-buy-item.png"
              no-transition
              no-spinner
            >
              <div class="fit row transparent">
                <div
                  class="col-12 q-pa-md box-content-text-confirm row justify-center items-center"
                >
                  <div align="center" class="col-12">
                    <q-img
                      width="60%"
                      src="/images/label_main/label-fashionista.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                  <div class="q-pa-md" align="center">
                    <span class="text-content-confirm">
                      เป็นผู้นำด้านแฟชั่นกันเถอะ สวมใส่เสื้อผ้าที่ซื้อทันที
                    </span>
                  </div>
                </div>
                <div class="col-12 self-end q-pa-md row">
                  <div class="col q-pr-sm">
                    <q-img
                      @click="$emit('callback-noSetNewEquipment')"
                      class="cursor-pointer"
                      src="/images/button_main/button-no.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                  <div class="col q-pl-sm">
                    <q-img
                      class="cursor-pointer"
                      @click="$emit('callback-setNewEquipment', showItemshop)"
                      src="/images/button_main/button-yeah.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                </div>
              </div>
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  props: {
    isDialogBuyItem: {
      type: Boolean,
      default: false,
    },
    isDialogConfirmBuyItem: {
      type: Boolean,
      default: false,
    },
    isCanNotBuyItem: {
      type: Boolean,
      default: false,
    },
    isChangeColor: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "",
    },
    itemshop: {
      type: Object,
      default: () => {},
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const itemshop = ref(props.itemshop);
    const showItemshop = computed(() => {
      let temp = [];

      for (let i = 0; i < itemshop.value.length; i++) {
        let item = itemshop.value[i];
        if (!item.isHas) {
          temp.push(item);
        }
      }

      return temp;
    });

    const funcBuyItem = () => {
      if (showItemshop.value.length == 0 && !props.isChangeColor) {
        emit("callback-closeDialog");
        return;
      }

      emit("callback-buyItem", showItemshop.value);
    };

    const funcRemoveItem = (item) => {
      emit("callback-removeItem", item);

      itemshop.value = itemshop.value.filter((x) => x.type != item.type);
    };

    return {
      showItemshop,

      // Function
      funcBuyItem,
      funcRemoveItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-scroll {
  height: 75%;
  background-color: #fff;
  border-radius: 20px;
  overflow-y: auto;
}

.box-scroll::-webkit-scrollbar {
  width: 0px;
}

.text-total-price {
  color: #50008f;
  font-size: 24px;
  font-family: fredoka;
  text-shadow: rgb(255, 255, 255) 1px 0px 0px,
    rgb(255, 255, 255) 0.540302px 0.841471px 0px,
    rgb(255, 255, 255) -0.416147px 0.909297px 0px,
    rgb(255, 255, 255) -0.989992px 0.14112px 0px,
    rgb(255, 255, 255) -0.653644px -0.756802px 0px,
    rgb(255, 255, 255) 0.283662px -0.958924px 0px,
    rgb(255, 255, 255) 0.96017px -0.279415px 0px;
}

.box-content-text-confirm {
  height: 70%;
  background-color: #ecfaff;
  border-radius: 20px;
}

.text-content-confirm {
  font-size: 16px;
  color: #00638d;
}

.box-can-not-buy-item {
  width: 100%;
  padding: 7px;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid #ffaa2e;
  border-radius: 40px;
}

.box-item {
  width: 65px;
  width: 65px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.text-price {
  color: #00638d;
}

.text-item-name {
  color: #00638d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}

.box-color {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.3);
}
</style>
