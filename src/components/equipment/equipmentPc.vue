<template>
  <div class="box-container-main bg-equipment relative-position row">
    <div align="center" class="col-12 q-pa-md relative-position">
      <div class="absolute-top-left q-pa-md">
        <q-btn round class="bg-amber-5" push @click="$router.replace('/lobby')">
          <q-img src="/images/btn-back-to-lobby.png"></q-img>
        </q-btn>
      </div>
      <!-- <q-img
        fit="cover"
        width="200px"
        src="/images/label-equipment.png"
      ></q-img> -->
    </div>

    <div class="col-12 row">
      <!-- <div class="col-1" style="width: 50px"></div> -->
      <div class="col-5">
        <character
          style="width: 100%"
          :bodycolor="characterData.color"
          :equipment="characterData"
        ></character>
        <div style="height: 30px"></div>
      </div>
      <div
        class="col self-start q-pa-md"
        style="min-height: 600px"
        align="center"
      >
        <!-- Button Selected Mode -->
        <div class="row box-btn-type-main">
          <!-- Button Box Inventory -->
          <div
            v-ripple
            class="cursor-pointer relative-position box-btn-type"
            :data-selected="selectedType == 'box' ? 'active' : 'noactive'"
            @click="selectedType = 'box'"
          >
            <div
              class="absolute-center box-btn-icon q-pa-xs"
              :data-selected="selectedType == 'box' ? 'active' : 'noactive'"
            >
              <q-img width="100%" src="/images/icon-box.png"></q-img>
            </div>
            <span class="relative-position z-top"> อุปกรณ์สวมใส่ </span>
          </div>

          <!-- Button Box Pet -->
          <div
            v-if="propsList.pet.length"
            v-ripple
            class="cursor-pointer relative-position box-btn-type"
            :data-selected="selectedType == 'props' ? 'active' : 'noactive'"
            @click="selectedType = 'props'"
          >
            <div
              class="absolute-center box-btn-icon q-pa-xs"
              :data-selected="selectedType == 'props' ? 'active' : 'noactive'"
            >
              <q-img width="100%" src="/images/icon-pet.png"></q-img>
            </div>
            <span class="relative-position z-top"> ตกแต่ง </span>
          </div>

          <!-- Button Box Ticket -->
          <!-- <div
              v-ripple
              class="cursor-pointer relative-position box-btn-type"
              :data-selected="selectedType == 'ticket' ? 'active' : 'noactive'"
              @click="selectedType = 'ticket'"
            >
              <div
                class="absolute-center box-btn-icon q-pa-xs"
                :data-selected="selectedType == 'ticket' ? 'active' : 'noactive'"
              >
                <q-img width="100%" src="/images/icon-ticket.png"></q-img>
              </div>
              <span class="relative-position z-top"> ตั๋ว </span>
            </div> -->
        </div>

        <div class="box-inventory-main row">
          <!-- Inventory Equipment Box -->
          <div
            class="relative-position col-12 box-inventory-height"
            v-if="selectedType == 'box'"
          >
            <div
              class="relative-position row no-wrap box-scrolling"
              align="left"
              :class="indexName == 'body' ? 'box-inventory-body' : ''"
              v-for="(itemArr, indexName) in inventoryList"
              :id="indexName"
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
                  <q-icon name="fas fa-chevron-left"></q-icon>
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
                  <q-img
                    style="width: 100%; height: 100%"
                    fit="contain"
                    :src="item.imgURL + '?' + genCode"
                  ></q-img>
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
                  <q-icon name="fas fa-chevron-right"></q-icon>
                </q-btn>
              </div>

              <q-resize-observer @resize="funcOnResizeBox" />
            </div>
          </div>

          <!-- Inventory Equipment Props -->
          <div
            class="relative-position col-12 box-inventory-height"
            v-if="selectedType == 'props'"
          >
            <div
              class="relative-position row no-wrap box-scrolling"
              align="left"
              :class="indexName == 'other' ? 'box-inventory-body' : ''"
              v-for="(itemArr, indexName) in propsList"
              :id="indexName"
            >
              <div class="col-1 box-arrow-btn-left">
                <q-btn
                  v-if="
                    (indexName == 'pet' && isHasScrollPet) ||
                    (indexName == 'other' && isHasScrollOther)
                  "
                  :disable="
                    (indexName == 'pet' && scrollPet <= 0) ||
                    (indexName == 'other' && scrollOther <= 0)
                  "
                  :class="
                    (indexName == 'pet' && scrollPet <= 0) ||
                    (indexName == 'other' && scrollOther <= 0)
                      ? 'text-grey-5 text-bold'
                      : ''
                  "
                  class="fit"
                  flat
                  @click="funcScrollTo(indexName, 'left')"
                  style="border-radius: 0px"
                >
                  <q-icon name="fas fa-chevron-left"></q-icon>
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
                    indexName == 'pet'
                      ? characterData.pet == item.itemName
                        ? 'btn-item-selected'
                        : 'btn-item'
                      : 'btn-item',
                    indexName == 'other'
                      ? characterData.other == item.itemName
                        ? 'btn-item-selected'
                        : 'btn-item'
                      : 'btn-item',
                  ]"
                  @click="$emit('callback-selecteditem', item, indexName)"
                >
                  <q-img
                    style="width: 100%; height: 100%"
                    fit="contain"
                    :src="item.imgURL + '?' + genCode"
                  ></q-img>
                </div>
              </div>
              <div class="col-1 box-arrow-btn-right">
                <q-btn
                  v-if="
                    (indexName == 'pet' && isHasScrollPet) ||
                    (indexName == 'other' && isHasScrollOther)
                  "
                  :class="
                    (indexName == 'pet' && isLastScrollPet) ||
                    (indexName == 'other' && isLastScrollOther)
                      ? 'text-grey-5 text-bold'
                      : ''
                  "
                  :disable="
                    (indexName == 'pet' && isLastScrollPet) ||
                    (indexName == 'other' && isLastScrollOther)
                  "
                  class="fit"
                  flat
                  @click="funcScrollTo(indexName, 'right')"
                  style="border-radius: 0px"
                >
                  <q-icon name="fas fa-chevron-right"></q-icon>
                </q-btn>
              </div>

              <q-resize-observer @resize="funcOnResizeProps" />
            </div>
          </div>

          <!-- Pet -->
          <!-- <div class="col-12 box-inventory-height" v-if="selectedType == 'pet'">
            <div class="row">
              <div class="q-ma-sm" v-for="(item, index) in propsList.pet">
                <div align="left">
                  <div
                    class="cursor-pointer"
                    :class="
                      characterData.pet == item.itemName
                        ? 'btn-item-selected'
                        : 'btn-item'
                    "
                    @click="$emit('callback-selecteditem', item, 'pet')"
                  >
                    <q-img
                      style="width: 100%; height: 100%"
                      fit="contain"
                      :src="item.imgURL + '?' + genCode"
                    ></q-img>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- Ticket -->
          <!-- <div class="col-12 box-inventory-height" v-if="selectedType == 'ticket'">
            <div class="row wrap">
              <div class="col-3 self-start btn-item q-ma-sm" v-for="i in 7"></div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import character from "../../components/character.vue";
import { ref, computed } from "vue";
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
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-equipment {
  min-height: 100vh;
  max-height: fit-content;
  background-image: url("/images/bg-equipment.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #fbf0d9;
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
  max-width: 800px;
  width: 100%;
  background-color: #f6d588;
  // Border Top
  border-top-color: #894403;
  border-top-width: 20px;
  border-top-style: solid;
  border-top-right-radius: 10px;

  // Border Bottom
  border-bottom-color: #894403;
  border-bottom-width: 15px;
  border-bottom-style: solid;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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
  width: 125px;
  height: 125px;
  border: 5px solid#fff;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.btn-item-selected {
  width: 125px;
  height: 125px;
  border: 5px solid#FF9200;
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
  width: 50px;
  z-index: 2;
  background-color: #f6d588;
}

.box-arrow-btn-right {
  position: sticky;
  right: 0;
  width: 50px;
  z-index: 2;
  background-color: #f6d588;
}
</style>
