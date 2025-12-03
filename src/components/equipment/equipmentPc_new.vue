<template>
  <div class="bg-outside">
    <div class="box-container-main bg-equipment">
      <div align="center" class="q-pa-md" style="height: 50px">
        <div class="absolute-top-left q-pa-md">
          <q-btn
            round
            class="bg-amber-5"
            push
            @click="$router.replace('/lobby')"
          >
            <q-img src="/images/btn-back-to-lobby.png"></q-img>
          </q-btn>
        </div>
      </div>

      <div
        class="row absolute-center"
        style="padding-bottom: 50px; width: 100%"
      >
        <div class="col-4 self-end" style="">
          <div style="width: 100%" class="" align="center">
            <character
              style="width: 100%"
              :bodycolor="characterData.color"
              :equipment="characterData"
            ></character>
          </div>
        </div>
        <div class="col-8" align="center" style="max-width: 800px">
          <!-- Button Selected Mode -->
          <q-img
            src="images/inventory-top-frame.png"
            style="max-width: 650px; position: relative; top: 10px"
          >
          </q-img>
          <q-img src="images/inventory-frame.png" style="max-width: 700px">
            <div class="absolute-top transparent">
              <!-- Tab -->
              <div
                class="row items-center relative-position"
                style="
                  border-radius: 50px 50px 0px 0px;
                  background-color: #f6d588;
                  width: 97%;
                  top: 10px;
                "
              >
                <div class="col-12"></div>
                <div
                  class="col-6 justify-center row items-center cursor-pointer relative-position"
                  v-ripple
                  style="height: 60px; border-radius: 50px 0px 0px 0px"
                  :class="selectedTab != 'clothes' ? '' : 'bg-menu-active'"
                  @click="selectedTab = 'clothes'"
                >
                  <div class="col-12 q-pt-sm">
                    <!-- <q-icon name="fas fa-user"></q-icon> -->
                    <q-img
                      v-show="selectedTab != 'clothes'"
                      src="images/clothes-inactive.png"
                      style="width: 62px; height: 31px"
                    ></q-img>
                    <q-img
                      v-show="selectedTab == 'clothes'"
                      src="images/clothes-active.png"
                      style="width: 62px; height: 31px"
                    ></q-img>
                  </div>

                  <span
                    class="text-weight-bold"
                    :class="
                      selectedTab == 'clothes' ? 'text-white' : 'my-text-brown'
                    "
                  >
                    Clothes & Hair
                  </span>
                </div>
                <div
                  class="col-6 justify-center row items-center cursor-pointer relative-position"
                  v-ripple
                  style="height: 60px; border-radius: 0px 50px 0px 0px"
                  @click="selectedTab = 'buddy'"
                  :class="selectedTab == 'clothes' ? '' : 'bg-menu-active'"
                >
                  <div class="col-12 q-pt-sm">
                    <!-- <q-icon name="fas fa-user"></q-icon> -->
                    <q-img
                      v-show="selectedTab != 'buddy'"
                      src="images/buddy-inactive.png"
                      style="width: 35px"
                    ></q-img>
                    <q-img
                      v-show="selectedTab == 'buddy'"
                      src="images/buddy-active.png"
                      style="width: 35px"
                    ></q-img>
                  </div>
                  <span
                    class="text-weight-bold"
                    :class="
                      selectedTab == 'buddy' ? 'text-white' : 'my-text-brown'
                    "
                  >
                    Buddy & Accessories
                  </span>
                </div>
              </div>
              <div
                class="relative-position"
                style="
                  background-color: #f6d588;
                  border-radius: 0px 0px 50px 50px;
                  min-height: 390px;
                  width: 97%;
                  top: 9px;
                  overflow: hidden;
                "
              >
                <!-- Clothes & Hair -->
                <div
                  class="relative-position row no-wrap box-scrolling"
                  align="left"
                  :class="indexName == 'body' ? 'box-inventory-body' : ''"
                  v-for="(itemArr, indexName) in inventoryList"
                  :id="indexName"
                  v-show="selectedTab == 'clothes'"
                >
                  <div class="col-1 box-arrow-btn-left">
                    <q-btn
                      v-if="
                        (indexName == 'head' && isHasScrollHead) ||
                        (indexName == 'body' && isHasScrollBody) ||
                        (indexName == 'footer' && isHasScrollFooter)
                      "
                      :disable="
                        (indexName == 'head' && scrollHead <= 0) ||
                        (indexName == 'body' && scrollBody <= 0) ||
                        (indexName == 'footer' && scrollFooter <= 0)
                      "
                      :class="
                        (indexName == 'head' && scrollHead <= 0) ||
                        (indexName == 'body' && scrollBody <= 0) ||
                        (indexName == 'footer' && scrollFooter <= 0)
                          ? 'text-grey-5 text-bold'
                          : ''
                      "
                      class="fit"
                      flat
                      @click="funcScrollTo(indexName, 'left')"
                      style="border-radius: 0px"
                    >
                      <q-img
                        v-if="
                          (indexName == 'head' && scrollHead <= 0) ||
                          (indexName == 'body' && scrollBody <= 0) ||
                          (indexName == 'footer' && scrollFooter <= 0)
                            ? 'text-grey-5 text-bold'
                            : ''
                        "
                        src="images/inven-previous-disable.png"
                      >
                      </q-img>
                      <q-img
                        v-else
                        src="images/inven-previous-enable.png"
                      ></q-img>
                    </q-btn>
                  </div>
                  <div
                    align="left"
                    class="q-mx-xs q-py-md q-px-xs"
                    v-for="(item, index) in itemArr"
                  >
                    <div
                      class="cursor-pointer"
                      :class="[
                        indexName == 'head'
                          ? characterData.head == item.itemName
                            ? 'btn-item-selected'
                            : 'btn-item'
                          : 'btn-item',
                        indexName == 'body'
                          ? characterData.body == item.itemName
                            ? 'btn-item-selected'
                            : 'btn-item'
                          : 'btn-item',
                        indexName == 'footer'
                          ? characterData.footer == item.itemName
                            ? 'btn-item-selected'
                            : 'btn-item'
                          : 'btn-item',
                      ]"
                      @click="$emit('callback-selecteditem', item, indexName)"
                    >
                      <div>
                        <q-img src="images/item-frame.png">
                          <q-img
                            class="absolute-center"
                            style="width: 90%"
                            :src="item.imgURL + '?' + genCode"
                          ></q-img>
                        </q-img>
                      </div>
                    </div>
                  </div>
                  <div class="col-1 box-arrow-btn-right">
                    <q-btn
                      v-if="
                        (indexName == 'head' && isHasScrollHead) ||
                        (indexName == 'body' && isHasScrollBody) ||
                        (indexName == 'footer' && isHasScrollFooter)
                      "
                      :class="
                        (indexName == 'head' && isLastScrollHead) ||
                        (indexName == 'body' && isLastScrollBody) ||
                        (indexName == 'footer' && isLastScrollFooter)
                          ? 'text-grey-5 text-bold'
                          : ''
                      "
                      :disable="
                        (indexName == 'head' && isLastScrollHead) ||
                        (indexName == 'body' && isLastScrollBody) ||
                        (indexName == 'footer' && isLastScrollFooter)
                      "
                      class="fit"
                      flat
                      @click="funcScrollTo(indexName, 'right')"
                      style="border-radius: 0px"
                    >
                      <!-- <q-icon name="fas fa-chevron-right"></q-icon> -->

                      <q-img
                        v-if="
                          (indexName == 'head' && isLastScrollHead) ||
                          (indexName == 'body' && isLastScrollBody) ||
                          (indexName == 'footer' && isLastScrollFooter)
                            ? 'text-grey-5 text-bold'
                            : ''
                        "
                        src="images/inven-next-disable.png"
                      >
                      </q-img>

                      <q-img v-else src="images/inven-next-enable.png"> </q-img>
                    </q-btn>
                  </div>

                  <q-resize-observer @resize="funcOnResizeBox" />
                </div>

                <!-- buddy and accessories tab -->
              </div>
            </div>
          </q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import character from "../character_main/character.vue";
import { ref } from "vue";
import { genCodeClearCatch } from "../../router/index";
export default {
  components: {
    character,
  },
  props: {
    characterData: {
      type: Object,
      default: () => {},
    },
    inventoryList: {
      type: Object,
      default: () => {},
    },
    propsList: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["callback-selecteditem"],
  setup(props) {
    const selectedType = ref("box");
    const selectedTab = ref("clothes");

    const genCode = ref(genCodeClearCatch);

    // Box
    const scrollHead = ref(0);
    const scrollBody = ref(0);
    const scrollFooter = ref(0);

    const lastScrollHead = ref(0);
    const lastScrollBody = ref(0);
    const lastScrollFooter = ref(0);

    const isLastScrollHead = ref(false);
    const isLastScrollBody = ref(false);
    const isLastScrollFooter = ref(false);

    // Props
    const scrollPet = ref(0);
    const scrollOther = ref(0);

    const lastScrollPet = ref(0);
    const lastScrollOther = ref(0);

    const isLastScrollPet = ref(0);
    const isLastScrollOther = ref(0);

    const funcScrollTo = (type, scroll) => {
      let el = document.getElementById(type);
      el.style.scrollBehavior = "smooth";

      let x = el.scrollLeft;

      if (scroll == "right") {
        x = el.scrollLeft += 200;

        if (type == "head") {
          scrollHead.value = x;
          lastScrollHead.value = el.scrollWidth - el.scrollLeft;

          if (lastScrollHead.value - el.offsetWidth == 0) {
            isLastScrollHead.value = true;
          }
        } else if (type == "body") {
          scrollBody.value = x;
          lastScrollBody.value = el.scrollWidth - el.scrollLeft;

          if (lastScrollBody.value - el.offsetWidth == 0) {
            isLastScrollBody.value = true;
          }
        } else if (type == "footer") {
          scrollFooter.value = x;
          lastScrollFooter.value = el.scrollWidth - el.scrollLeft;

          if (lastScrollFooter.value - el.offsetWidth == 0) {
            isLastScrollFooter.value = true;
          }
        } else if (type == "pet") {
          scrollPet.value = x;
          lastScrollPet.value = el.scrollWidth - el.scrollLeft;

          if (lastScrollPet.value - el.offsetWidth == 0) {
            isLastScrollPet.value = true;
          }
        } else if (type == "other") {
          scrollOther.value = x;
          lastScrollOther.value = el.scrollWidth - el.scrollLeft;

          if (lastScrollOther.value - el.offsetWidth == 0) {
            isLastScrollOther.value = true;
          }
        }
      } else {
        x = el.scrollLeft -= 200;

        if (type == "head") {
          scrollHead.value = x;
          lastScrollHead.value = el.scrollWidth - el.scrollLeft;
          if (lastScrollHead.value - el.offsetWidth == 0) {
            isLastScrollHead.value = false;
          }
        } else if (type == "body") {
          scrollBody.value = x;
          lastScrollBody.value = el.scrollWidth - el.scrollLeft;

          if (lastScrollBody.value - el.offsetWidth == 0) {
            isLastScrollBody.value = false;
          }
        } else if (type == "footer") {
          scrollFooter.value = x;
          lastScrollFooter.value = el.scrollWidth - el.scrollLeft;

          if (lastScrollFooter.value - el.offsetWidth == 0) {
            isLastScrollFooter.value = false;
          }
        } else if (type == "pet") {
          scrollPet.value = x;
          lastScrollPet.value = el.scrollWidth - el.scrollLeft;

          if (lastScrollPet.value - el.offsetWidth == 0) {
            isLastScrollPet.value = false;
          }
        } else if (type == "other") {
          scrollOther.value = x;
          lastScrollOther.value = el.scrollWidth - el.scrollLeft;

          if (lastScrollOther.value - el.offsetWidth == 0) {
            isLastScrollOther.value = false;
          }
        }
      }
    };

    const isHasScrollHead = ref(false);
    const isHasScrollBody = ref(false);
    const isHasScrollFooter = ref(false);
    const isHasScrollPet = ref(false);
    const isHasScrollOther = ref(false);

    const funcOnResizeBox = (size) => {
      let elHead = document.getElementById("head");
      let elBody = document.getElementById("body");
      let elFooter = document.getElementById("footer");

      if (elHead.scrollWidth > size.width) {
        isHasScrollHead.value = true;
      } else {
        isHasScrollHead.value = false;
      }

      if (elBody.scrollWidth > size.width) {
        isHasScrollBody.value = true;
      } else {
        isHasScrollBody.value = false;
      }

      if (elFooter.scrollWidth > size.width) {
        isHasScrollFooter.value = true;
      } else {
        isHasScrollFooter.value = false;
      }
    };

    const funcOnResizeProps = (size) => {
      let elPet = document.getElementById("pet");
      let elOther = document.getElementById("other");

      if (elPet.scrollWidth > size.width) {
        isHasScrollPet.value = true;
      } else {
        isHasScrollPet.value = false;
      }

      if (elOther.scrollWidth > size.width) {
        isHasScrollOther.value = true;
      } else {
        isHasScrollOther.value = false;
      }
    };

    return {
      selectedType,
      genCode,

      // scroll
      scrollHead,
      scrollBody,
      scrollFooter,
      scrollPet,
      scrollOther,

      // Function
      funcScrollTo,
      funcOnResizeBox,
      funcOnResizeProps,

      // Boolean
      isHasScrollHead,
      isLastScrollHead,

      isHasScrollBody,
      isLastScrollBody,

      isHasScrollFooter,
      isLastScrollFooter,

      isHasScrollPet,
      isLastScrollPet,

      isHasScrollOther,
      isLastScrollOther,
      selectedTab,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-menu-active {
  background-color: #9f4d00;
}
.bg-equipment {
  min-height: 100vh;
  max-height: fit-content;
  background-image: url("/images/bg-equipment.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #ab6f4f;
}

.bg-outside {
  background-color: #ab6f4f;
}

.box-btn-type-main {
  max-width: 800px;
  width: 100%;
}

.box-btn-type {
  width: 120px;
  padding: 20px 0px 10px 0px;
  border-radius: 10px 10px 0px 0px;
}

.box-btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: -0%;
}

.box-btn-type[data-selected="active"],
.box-btn-icon[data-selected="active"] {
  background-color: #894403;
  color: #fff;
}

.box-btn-type[data-selected="noactive"],
.box-btn-icon[data-selected="noactive"] {
  background: #ffc630;
  color: #000;
}

.box-btn-type[data-selected="noactive"] {
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
}

.box-inventory-main {
  width: 95%;
  background-color: #f6d588;
}

.box-inventory-height {
  max-height: 50vh;
  min-height: 380px;
  overflow: auto;
}

/* width */
.box-inventory-height::-webkit-scrollbar {
  width: 7px;
  height: 0px;
}

/* Track */
.box-inventory-height::-webkit-scrollbar-track {
  background: #f6d588;
}

/* Handle */
.box-inventory-height::-webkit-scrollbar-thumb {
  background: #894403;
}

.box-inventory-body {
  // Border Top
  border-top-color: #894403;
  border-top-width: 2px;
  border-top-style: solid;

  // Border Bottom
  border-bottom-color: #894403;
  border-bottom-width: 2px;
  border-bottom-style: solid;
}

.btn-item {
  width: 100px;
  height: 100px;
  border: 5px solid#A1AEC7;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.btn-item-selected {
  width: 100px;
  height: 100px;
  border: 5px solid#9F4D00;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

// .q-tabs--not-scrollable .q-tabs__arrow {
//   display: block !important;
// }

.box-scrolling {
  width: 100%;
  overflow-x: auto;
  color: #894403;
}

/* width */
.box-scrolling::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

/* Track */
.box-scrolling::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.box-scrolling::-webkit-scrollbar-thumb {
  background: #888;
}

.box-arrow-btn-left {
  position: sticky;
  left: 0;
  width: 60px;
  z-index: 2;
  background-color: #f6d588;
}

.box-arrow-btn-right {
  position: sticky;
  right: 0;
  width: 60px;
  z-index: 2;
  background-color: #f6d588;
}

.my-text-brown {
  color: #9f4d00;
}
</style>
