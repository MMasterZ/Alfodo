<template>
  <!-- #region Dialog Policy -->
  <q-dialog maximized v-model="isShowDialogTerms" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-terms-container relative-position">
          <div class="box-terms-sub">
            <div align="center" class="q-pt-md">
              <span class="f18 font-mali-b" v-html="showDetails.title"> </span>
            </div>
            <div class="box-terms-details">
              <div class="box-terms-scroll">
                <div class="font-mali-m text-break" v-html="showDetails.content"></div>
              </div>
            </div>
            <div align="center">
              <q-img
                width="274px"
                src="/images/button_main/button-back-long.png"
                @click="funcCloseDialog()"
                class="cursor-pointer"
                v-close-popup
              ></q-img>
            </div>
          </div>

          <div class="absolute-top-right" style="top: -15px; right: -15px">
            <q-btn round flat @click="funcCloseDialog()" v-close-popup>
              <q-img src="/images/icon_main/icon-close.png"></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script>
import { computed } from "vue";
import termsContent from "src/js/terms.js";
export default {
  props: {
    isShowDialogTerms: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "terms",
    },
    isPayment: {
      type: Boolean,
      default: false,
    },
    isRegister: {
      type: Boolean,
      default: false,
    },
    isPackage: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["callback-backToPayment", "callback-closeDialog"],
  setup(props, { emit }) {
    const showDetails = computed(() => {
      let data = {
        title: "",
        content: "",
      };

      data = {
        ...termsContent.list.find((x) => x.type == props.type),
      };

      return data;
    });

    const funcCloseDialog = () => {
      emit("callback-closeDialog");
      emit("callback-backToPayment");
    };

    return {
      // Computed
      showDetails,

      // Function
      funcCloseDialog,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-terms-container {
  min-width: 320px;
  width: 320px;
  max-width: 320px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 6px;
  color: #4a261b;
}

.box-terms-sub {
  width: 100%;
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 0px 0px 12px 0px;
}

.box-terms-details {
  width: 100%;
  padding: 10px;
  margin: 0px 0px 8px 0px;
}

.box-terms-scroll {
  height: 450px;
  background-color: #efd080;
  border-radius: 10px;
  padding: 10px 0px 5px 5px;
  overflow-y: scroll;
}

.box-terms-scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.box-terms-scroll::-webkit-scrollbar-thumb {
  background: #4a261b;
  border-radius: 2px;
}

.box-terms-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.text-break {
  word-break: keep-all;
  line-height: 1.9;
}
</style>
