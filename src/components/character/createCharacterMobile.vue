<template>
  <div class="box-container-main row justify-center">
    <div
      class="relative-position col-12 self-end"
      style="max-width: 800px; width: 100%"
    >
      <div align="center" class="q-py-md">
        <div class="q-pa-xs" align="center" style="">
          <q-img
            style="max-width: 250px; width: 100%"
            src="/images/character/label-create-character-mobile.png"
          ></q-img>
        </div>
        <!-- <span class="text-white stroke f18">ตั้งชื่อ</span> -->
        <div class="q-my-sm" style="height: 45px">
          <q-input
            dense
            :autofocus="true"
            outlined
            rounded
            bg-color="white"
            input-style="text-align: center;"
            v-model="characterName"
            ref="refsCharactername"
            :rules="[(val) => !!val || '', checkName]"
            maxlength="20"
            placeholder="ตั้งชื่อตัวละคร"
            hide-bottom-space
            style="max-width: 250px; width: 100%"
          ></q-input>
        </div>
      </div>
      <div class="relative-position" align="center">
        <div align="center" class="relative-position">
          <div
            class="absolute-top"
            style="width: 30%; top: 15%; left: 10%; z-index: 2"
            align="left"
          >
            <q-img
              @click="funcChangeEquipment(1, 'decrease')"
              class="cursor-pointer btn-active"
              width="30px"
              src="/images/character/selected-left.png"
            ></q-img>
          </div>
          <div
            class="absolute-center"
            align="left"
            style="width: 30%; left: 25%; z-index: 2"
          >
            <q-img
              @click="funcChangeEquipment(2, 'decrease')"
              class="cursor-pointer btn-active"
              width="30px"
              src="/images/character/selected-left.png"
            ></q-img>
          </div>
          <div
            class="absolute-bottom"
            align="left"
            style="width: 30%; bottom: 15%; left: 10%; z-index: 2"
          >
            <q-img
              @click="funcChangeEquipment(3, 'decrease')"
              class="cursor-pointer btn-active"
              width="30px"
              src="/images/character/selected-left.png"
            ></q-img>
          </div>
          <div class="relative-position" style="max-width: 800px; width: 100%">
            <character :bodycolor="color" :equipment="equipment"></character>
          </div>
          <div
            class="absolute-top"
            align="right"
            style="width: 30%; top: 15%; left: 60%; z-index: 2"
          >
            <q-img
              @click="funcChangeEquipment(1, 'increase')"
              class="cursor-pointer btn-active"
              width="30px"
              src="/images/character/selected-right.png"
            ></q-img>
          </div>
          <div
            class="absolute-center"
            align="right"
            style="width: 30%; left: 75%"
          >
            <q-img
              @click="funcChangeEquipment(2, 'increase')"
              class="cursor-pointer btn-active"
              width="30px"
              src="/images/character/selected-right.png"
            ></q-img>
          </div>
          <div
            class="absolute-bottom"
            align="right"
            style="width: 30%; bottom: 15%; left: 60%"
          >
            <q-img
              @click="funcChangeEquipment(3, 'increase')"
              class="cursor-pointer btn-active"
              width="30px"
              src="/images/character/selected-right.png"
            ></q-img>
          </div>
        </div>
      </div>

      <div class="row justify-center q-pt-sm">
        <div class="self-center q-mx-sm">
          <q-btn
            class="no-pointer-events"
            filled
            push
            round
            :style="`background-color:${color}`"
          >
          </q-btn>
        </div>
        <div class="self-center q-pt-sm">
          <q-img
            class="cursor-pointer"
            width="170px"
            src="/images/character/color-btn.png"
          >
            <div class="transparent fit">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <!-- <q-color no-header no-footer square v-model="color" /> -->
                <q-color v-model="color" no-header no-footer />
              </q-popup-proxy>
            </div>
          </q-img>
        </div>
      </div>

      <div class="q-mt-sm q-py-lg" align="center">
        <q-img
          width="200px"
          @click="funcCreateCharacter()"
          class="cursor-pointer btn-active"
          src="/images/character/create_character_btn.png"
        ></q-img>
      </div>
    </div>
  </div>
</template>

<script>
import character from "../character.vue";
import { ref, reactive } from "vue";
export default {
  components: {
    character,
  },
  props: ["equipment", "color"],
  setup(props, { emit }) {
    // **************** Initial Data *******************
    const characterName = ref("");
    const refsCharactername = ref(null); // Validate name

    const funcChangeEquipment = (type, set) => {
      emit("changeEquipment", { type: type, set: set });
    };

    const checkName = () => {
      let dataName = characterName.value;

      let regex = /\s/g;
      let found = dataName.match(regex);

      if (found != null) {
        return !found.length || "";
      }
    };

    const funcCreateCharacter = () => {
      if (!refsCharactername.value.validate()) {
        // console.log("ยังไม่กรอกข้อมูลแล้ว");
        return;
      }

      let newData = {
        head: props.equipment.head,
        body: props.equipment.body,
        footer: props.equipment.footer,
        level: 1,
        name: characterName.value,
        star: 0,
        color: props.color,
      };

      emit("createCharacter", newData);
    };

    return {
      checkName,
      characterName,
      refsCharactername,
      funcChangeEquipment,
      funcCreateCharacter,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-equipment {
  background-color: #ffe4ce;
}
.stroke {
  text-shadow: rgb(81, 42, 8) 2px 0px 0px,
    rgb(81, 42, 8) 1.75517px 0.958851px 0px,
    rgb(81, 42, 8) 1.0806px 1.68294px 0px,
    rgb(81, 42, 8) 0.141474px 1.99499px 0px,
    rgb(81, 42, 8) -0.832294px 1.81859px 0px,
    rgb(81, 42, 8) -1.60229px 1.19694px 0px,
    rgb(81, 42, 8) -1.97998px 0.28224px 0px,
    rgb(81, 42, 8) -1.87291px -0.701566px 0px,
    rgb(81, 42, 8) -1.30729px -1.5136px 0px,
    rgb(81, 42, 8) -0.421592px -1.95506px 0px,
    rgb(81, 42, 8) 0.567324px -1.91785px 0px,
    rgb(81, 42, 8) 1.41734px -1.41108px 0px,
    rgb(81, 42, 8) 1.92034px -0.558831px 0px;
}

.btn-active:active {
  transition: 0.1s;
  transform: scale(0.9);
}
</style>
