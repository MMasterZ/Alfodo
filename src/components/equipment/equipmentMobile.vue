<template>
  <div class="row window-height">
    <div
      align="center"
      class="
        bg-equipment-mobile
        col-12
        self-start
        q-pa-md
        row
        justify-center
        relative-position
      "
    >
      <div class="absolute-top-left q-pa-md">
        <q-btn round class="bg-amber-5" push @click="$router.replace('/lobby')">
          <q-img src="/images/btn-back-to-lobby.png"></q-img>
        </q-btn>
      </div>
      <div class="col-12">
        <q-img
          fit="cover"
          style="max-width: 200px; width: 50%"
          src="/images/label-equipment.png"
        ></q-img>
      </div>

      <div
        class="col-10"
        style="max-width: 400px; width: 80%; margin-bottom: 15%"
        align="center"
      >
        <character
          :bodycolor="characterData.color"
          :equipment="characterData"
        ></character>
      </div>
    </div>

    <div class="col-12 self-end relative-position">
      <!-- Menu Invertory -->
      <div class="absolute-top box-invertory-menu-mobile row">
        <!-- Button Box Inventory -->
        <div
          v-ripple
          class="col-3 cursor-pointer relative-position box-btn-type"
          :data-selected="selectedType == 'box' ? 'active' : 'noactive'"
          @click="selectedType = 'box'"
          align="center"
        >
          <div
            class="absolute-center box-btn-icon q-pa-xs"
            :data-selected="selectedType == 'box' ? 'active' : 'noactive'"
          >
            <q-img
              width="100%"
              src="/images/icon-box.png"
            ></q-img>
          </div>
          <span class="relative-position z-top f14"> อุปกรณ์สวมใส่ </span>
        </div>

        <!-- Button Box Pet -->
        <div
          v-if="propsList.pet.length"
          v-ripple
          class="col-3 cursor-pointer relative-position box-btn-type"
          :data-selected="selectedType == 'props' ? 'active' : 'noactive'"
          @click="selectedType = 'props'"
          align="center"
        >
          <div
            class="absolute-center box-btn-icon q-pa-xs"
            :data-selected="selectedType == 'props' ? 'active' : 'noactive'"
          >
            <q-img width="100%" src="/images/icon-pet.png"></q-img>
          </div>
          <span class="relative-position z-top f12"> ตกแต่ง </span>
        </div>

        <!-- Button Box Ticket -->
        <!-- <div
          v-ripple
          class="col cursor-pointer relative-position box-btn-type"
          :data-selected="selectedType == 'ticket' ? 'active' : 'noactive'"
          @click="selectedType = 'ticket'"
          align="center"
        >
          <div
            class="absolute-center box-btn-icon q-pa-xs"
            :data-selected="selectedType == 'ticket' ? 'active' : 'noactive'"
          >
            <q-img width="100%" src="/images/icon-ticket.png"></q-img>
          </div>
          <span class="relative-position z-top f12"> ตั๋ว </span>
        </div> -->
      </div>

      <!-- Invertory Box Equipment -->
      <div class="box-invertory-main-mobile" v-if="selectedType == 'box'">
        <div v-for="(itemArr, indexName) in inventoryList">
          <div
            class="box-inventory-box row no-wrap q-py-sm"
            :class="indexName == 'body' ? 'box-inventory-body-mobile' : ''"
          >
            <div
              class="col-2 q-mx-sm"
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
              v-for="(item, index) in itemArr"
            >
              <div>
                <q-img
                  style="width: 100%; height: 100%"
                  :src="item.imgURL + '?' + genCode"
                  fit="contain"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Invertory Box Props -->
      <div class="box-invertory-main-mobile" v-if="selectedType == 'props'">
        <div v-for="(itemArr, indexName) in propsList">
          <div
            class="box-inventory-box row no-wrap q-py-sm"
            :class="indexName == 'other' ? 'box-inventory-body-mobile' : ''"
          >
            <div
              class="col-2 q-mx-sm"
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
              v-for="(item, index) in itemArr"
            >
              <div>
                <q-img
                  style="width: 100%; height: 100%"
                  :src="item.imgURL + '?' + genCode"
                  fit="contain"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Invertory Box Ticket List -->
      <!-- <div class="box-invertory-main-mobile" v-if="selectedType == 'ticket'">
        <div class="row">
          <div class="btn-item q-ma-sm" v-for="i in 5"></div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import character from "../../components/character.vue";
import { ref } from "vue";
import { genCodeClearCatch } from "src/router";
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

    return { selectedType, genCode };
  },
};
</script>

<style lang="scss" scoped>
.bg-equipment-mobile {
  width: 100%;
  min-height: 50vh;
  max-height: fit-content;
  background-image: url("/images/bg-equipment-mobile.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.box-invertory-menu-mobile {
  top: -50px;
  width: 100%;
}

.btn-item {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border: 5px solid#fff;
  border-radius: 10px;
  box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
}

.btn-item-selected {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border: 5px solid#FF9200;
  border-radius: 10px;
  box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
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

.box-inventory-box {
  width: 100%;
  overflow-x: auto;
}

/* width */
.box-inventory-box::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

/* Track */
.box-inventory-box::-webkit-scrollbar-track {
  background: #ffad61;
}

/* Handle */
.box-inventory-box::-webkit-scrollbar-thumb {
  background: #894403;
}

.box-invertory-main-mobile {
  width: 100%;
  min-height: 50vh;
  max-height: fit-content;
  background-color: #f6d588;
  border-top: 10px solid#894403;
}

// /* width */
// .box-invertory-main-mobile::-webkit-scrollbar {
//   width: 5px;
//   height: 0px;
// }

// /* Track */
// .box-invertory-main-mobile::-webkit-scrollbar-track {
//   background: #ffad61;
// }

// /* Handle */
// .box-invertory-main-mobile::-webkit-scrollbar-thumb {
//   background: #894403;
// }

.box-inventory-body-mobile {
  border-top: 5px solid #894403;
  border-bottom: 5px solid #894403;
}
</style>
