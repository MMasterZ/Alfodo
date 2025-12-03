<template>
  <div
    :class="$q.platform.is.desktop ? 'bg-character-pc' : 'bg-character-mobile'"
  >
    <div class="absolute-top-right q-pa-md z-max" align="right">
      <q-btn size="17px" round class="bg-warning" push dense>
        <q-icon name="logout" @click="isShowSignoutDialog = true" />
      </q-btn>
    </div>

    <character-pc
      v-if="$q.platform.is.desktop && isLoaded"
      :equipment="equipment"
      :color="color"
      @createCharacter="funcCreate"
      @changeEquipment="funcChangeEquipment"
    ></character-pc>

    <character-mobile
      v-if="$q.platform.is.mobile && isLoaded"
      :equipment="equipment"
      :color="color"
      @createCharacter="funcCreate"
      @changeEquipment="funcChangeEquipment"
    ></character-mobile>

    <dialog-sign-out
      :isShowSignoutDialog="isShowSignoutDialog"
      @callback-closedialog="isShowSignoutDialog = false"
      @callback-signout="funcSignout()"
    ></dialog-sign-out>

    <loading :isShowLoading="isShowLoading"></loading>
  </div>
</template>

<script>
import characterPc from "components/character/createCharacterPc.vue";
import characterMobile from "components/character/createCharacterMobile.vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import game from "../hooks/gameHooks.js";
import { ref, onMounted, reactive } from "vue";
import { ts, db, auth, playSoundBackground } from "src/router";
import dialogSignOut from "../components/dialog-signout.vue";
import loading from "../components/dialog-loading.vue";
import updateHooks from "../hooks/updateHooks";
export default {
  props: ["text"],
  components: {
    characterPc,
    characterMobile,
    dialogSignOut,
    loading,
  },
  setup() {
    // ********************** Use quasar **********************
    const $q = useQuasar();
    //**********************  Router **********************
    const router = useRouter();
    const route = useRoute();
    const isShowSignoutDialog = ref(false);
    const isShowLoading = ref(false);

    // ********************** uid **********************
    const uid = ref("");
    const isLoaded = ref(false);

    // Initial Data
    const equipment = reactive({
      head: "hair-01",
      body: "shirt-01",
      footer: "pants-01",
    });

    const color = ref("#FFD4BE");

    const checkCharacter = async (userId) => {
      let response = await game.studentInfomation(userId);

      if (response) {
        equipment.head = response.head;
        equipment.body = response.body;
        equipment.footer = response.footer;
        color.value = response.color;
        router.replace("/lobby");
        return;
      }

      isLoaded.value = true;
      isShowLoading.value = false;
    };

    const funcChangeEquipment = (data) => {
      if (data.type == 1) {
        if (data.set == "decrease") {
          if (equipment.head == "hair-01") {
            equipment.head = "hair-04";
          } else if (equipment.head == "hair-04") {
            equipment.head = "hair-03";
          } else if (equipment.head == "hair-03") {
            equipment.head = "hair-02";
          } else {
            equipment.head = "hair-01";
          }
        } else {
          if (equipment.head == "hair-04") {
            equipment.head = "hair-01";
          } else if (equipment.head == "hair-01") {
            equipment.head = "hair-02";
          } else if (equipment.head == "hair-02") {
            equipment.head = "hair-03";
          } else {
            equipment.head = "hair-04";
          }
        }
      } else if (data.type == 2) {
        if (data.set == "decrease") {
          if (equipment.body == "shirt-01") {
            equipment.body = "shirt-04";
          } else if (equipment.body == "shirt-04") {
            equipment.body = "shirt-03";
          } else if (equipment.body == "shirt-03") {
            equipment.body = "shirt-02";
          } else {
            equipment.body = "shirt-01";
          }
        } else {
          if (equipment.body == "shirt-04") {
            equipment.body = "shirt-01";
          } else if (equipment.body == "shirt-01") {
            equipment.body = "shirt-02";
          } else if (equipment.body == "shirt-02") {
            equipment.body = "shirt-03";
          } else {
            equipment.body = "shirt-04";
          }
        }
      } else if (data.type == 3) {
        if (data.set == "decrease") {
          if (equipment.footer == "pants-01") {
            equipment.footer = "pants-04";
          } else if (equipment.footer == "pants-04") {
            equipment.footer = "pants-03";
          } else if (equipment.footer == "pants-03") {
            equipment.footer = "pants-02";
          } else {
            equipment.footer = "pants-01";
          }
        } else {
          if (equipment.footer == "pants-04") {
            equipment.footer = "pants-01";
          } else if (equipment.footer == "pants-01") {
            equipment.footer = "pants-02";
          } else if (equipment.footer == "pants-02") {
            equipment.footer = "pants-03";
          } else {
            equipment.footer = "pants-04";
          }
        }
      }
    };

    const funcCreate = async (data) => {
      isShowLoading.value = true;

      let hairLists = [
        {
          name: "hair-01",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/hair-01.jpg",
        },
        {
          name: "hair-02",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/hair-02.jpg",
        },
        {
          name: "hair-03",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/hair-03.jpg",
        },
        {
          name: "hair-04",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/hair-04.jpg",
        },
      ];

      let shirtLists = [
        {
          name: "shirt-01",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/shirt-01.jpg",
        },
        {
          name: "shirt-02",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/shirt-02.jpg",
        },
        {
          name: "shirt-03",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/shirt-03.jpg",
        },
        {
          name: "shirt-04",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/shirt-04.jpg",
        },
      ];

      let footerLists = [
        {
          name: "pants-01",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/pants-01.jpg",
        },
        {
          name: "pants-02",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/pants-02.jpg",
        },
        {
          name: "pants-03",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/pants-03.jpg",
        },
        {
          name: "pants-04",
          url: "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/invertory/pants-04.jpg",
        },
      ];

      try {
        let response = await updateHooks.updatecharacter(uid.value, data);

        let findHairUrl = hairLists.filter((x) => x.name == equipment.head)[0]
          .url;
        let findShirtUrl = shirtLists.filter((x) => x.name == equipment.body)[0]
          .url;
        let findPantsUrl = footerLists.filter(
          (x) => x.name == equipment.footer
        )[0].url;

        let tempEquipment = [
          {
            itemName: equipment.head,
            type: "head",
            imgURL: findHairUrl,
          },
          {
            itemName: equipment.body,
            type: "body",
            imgURL: findShirtUrl,
          },
          {
            itemName: equipment.footer,
            type: "footer",
            imgURL: findPantsUrl,
          },
        ];

        await updateHooks.addinventory(uid.value, tempEquipment);

        if (response == "success") {
          router.replace("/lobby");
        }

        isShowLoading.value = false;
      } catch (err) {
        // console.log(`${err} : Hooks Update Character`);
        isShowLoading.value = false;
      }
    };

    const funcSignout = () => {
      firebase
        .auth()
        .signOut()
        .then(function () {
          $router.replace("/");
        })
        .catch(function (error) {
          // An error happened.
        });
    };

    let authListen;
    onMounted(() => {
      isShowLoading.value = true;
      authListen = firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          // User is signed in.
          uid.value = user.uid;
          await checkCharacter(user.uid);
          playSoundBackground(route.name, true);
        } else {
          // User is signed out.
          router.replace("/");
        }
      });
    });

    return {
      // Initial Data
      isShowLoading,
      equipment,
      color,
      isLoaded,
      isShowSignoutDialog,

      // Function
      funcCreate,
      funcChangeEquipment,
      funcSignout,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-character-pc {
  min-height: 100vh;
  max-height: fit-content;
  background-image: url("/images/character/bg-character-pc.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  background-color: #fbf0d9;
}

.bg-character-mobile {
  min-height: 100vh;
  max-height: fit-content;
  background-image: url("/images/character/bg-character-mobile.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-color: #fbf0d9;
}
</style>
