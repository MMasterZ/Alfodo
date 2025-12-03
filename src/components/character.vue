<template>
  <svg
    width="420"
    height="380"
    viewBox="0 0 420 380"
    fill="none"
    style="width: 100%; height: 100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- clip-path="url(#Character_shadow_main)" -->
    <g>
      <!-- Shadow -->
      <g>
        <ellipse
          cx="210.022"
          cy="356.282"
          rx="87"
          ry="15.5"
          fill="black"
          fill-opacity="0.3"
        />
      </g>

      <!-- Character -->
      <!-- Skeleton -->
      <g>
        <!-- Porps Back -->
        <g>
          <g v-for="(item, index) in petSetList.list">
            <g v-html="item.item" v-if="character.pet == item.name"></g>
          </g>
        </g>

        <!-- Wing -->
        <!-- <g v-for="(item, index) in wingSetList.wings">
          <g v-html="item.item" v-if="item.name == 'wing-set-02'"></g>
        </g> -->

        <!-- Footer -->
        <g>
          <!-- footer Equipment Back ------------------ -->
          <g v-for="(item, index) in footerSetList.backs">
            <g v-html="item.item" v-if="character.footer == item.name"></g>
          </g>

          <!-- Footer Color -->
          <g id="footer-color">
            <path
              d="M235.022 260.782H181.522L173.022 362.282H193.522L199.522 286.282H217.522L224.022 362.282H244.022L235.022 260.782Z"
              fill="#FFBD8D"
            />
            <path
              d="M218.461 361.782C231.661 363.782 244.961 362.615 249.961 361.782C249.961 346.282 240.376 344.782 234.023 344.782C219.023 344.782 218.461 355.282 218.461 361.782Z"
              fill="#FFBD8D"
            />
            <path
              d="M198.522 361.782C185.322 363.782 172.022 362.615 167.022 361.782C167.022 346.282 176.608 344.782 182.961 344.782C197.961 344.782 198.522 355.282 198.522 361.782Z"
              fill="#FFBD8D"
            />
            <path
              d="M235.022 260.782H181.522L179.022 292.282H199.022L199.522 286.282H217.522L218.022 292.282H237.522L235.022 260.782Z"
              fill="#FFBD8D"
            />
          </g>

          <!-- Footer Equipment Front ------------------ -->
          <g v-for="(item, index) in footerSetList.fronts">
            <g v-html="item.item" v-if="character.footer == item.name"></g>
          </g>
        </g>

        <!-- Header Back -->
        <g>
          <g v-for="(item, index) in headerSetList.backs">
            <g v-html="item.item" v-if="character.head == item.name"></g>
          </g>
        </g>

        <!-- Body -->
        <g>
          <!-- Body Equipment Back ------------------ -->
          <g v-for="(item, index) in bodySetList.backs">
            <g v-html="item.item" v-if="character.body == item.name"></g>
          </g>

          <!-- Body Color -->
          <g id="body-color">
            <path
              d="M250.022 220.782L232.522 225.282L235.022 260.782H181.522L183.522 225.282L166.022 220.782C172.022 189.182 191.856 181.949 201.022 182.282H217.022C240.222 183.882 248.689 208.615 250.022 220.782Z"
              fill="#FFBD8D"
            />
            <path
              d="M201.022 185.782V175.282H217.022V185.782C216.622 190.182 211.189 191.282 208.522 191.282C202.522 190.482 201.022 187.282 201.022 185.782Z"
              fill="#FFBD8D"
            />
            <path
              d="M250.039 220.782L237.022 223.989L249.141 261.563C246.628 262.663 246.298 267.214 246.448 269.353L247.341 278.282C247.341 281.581 250.034 282.1 251.381 281.948C254.253 281.214 254.672 279.198 254.522 278.282L254.078 274.393C253.719 272.56 255.125 272.408 255.874 272.56L259.913 284.474C260.631 287.773 263.803 287.987 265.299 287.681C267.813 286.948 268.142 284.627 267.992 283.557L265.299 271.186C263.504 263.121 259.763 258.967 258.118 257.897L250.039 220.782Z"
              fill="#FFBD8D"
            />
            <path
              d="M166.006 220.782L179.022 223.989L166.904 261.563C169.417 262.663 169.747 267.214 169.597 269.353L168.704 278.282C168.704 281.581 166.011 282.1 164.664 281.948C161.792 281.214 161.373 279.198 161.522 278.282L161.967 274.393C162.326 272.56 160.919 272.408 160.171 272.56L156.132 284.474C155.414 287.773 152.242 287.987 150.746 287.681C148.232 286.948 147.903 284.627 148.053 283.557L150.746 271.186C152.541 263.121 156.281 258.967 157.927 257.897L166.006 220.782Z"
              fill="#FFBD8D"
            />
          </g>

          <!-- Body Front ------------------ -->
          <g v-for="(item, index) in bodySetList.fronts">
            <g v-html="item.item" v-if="character.body == item.name"></g>
          </g>

          <!-- Footer up to body ------------------ -->
          <g v-for="(item, index) in footerSetList.fronts2">
            <g v-html="item.item" v-if="character.footer == item.name"></g>
          </g>
        </g>

        <!-- Header Color -->
        <g id="header-color">
          <path
            d="M284.022 122.782C280.422 112.382 270.856 112.115 266.522 113.282C266.522 126.882 262.189 140.282 260.022 145.282C282.022 147.282 286.022 130.282 284.022 122.782Z"
            fill="#FFBD8D"
          />
          <path
            d="M132.545 122.754C136.145 112.354 145.712 112.087 150.045 113.254C150.045 126.854 154.378 140.254 156.545 145.254C134.545 147.254 130.336 130.782 132.545 122.754Z"
            fill="#FFBD8D"
          />
          <path
            d="M272.336 108.282C272.336 146.666 252.336 177.782 208.336 177.782C167.336 177.782 144.336 146.666 144.336 108.282C144.336 69.8981 172.99 38.7819 208.336 38.7819C243.682 38.7819 272.336 69.8981 272.336 108.282Z"
            fill="#FFBD8D"
          />
        </g>

        <!-- Note -->
        <g>
          <g v-for="(item, index) in noteSetList.list">
            <g v-html="item.item" v-if="item.name == 'note-default'"></g>
          </g>
        </g>

        <!-- Mouth -->
        <g>
          <g v-for="(item, index) in mouthSetList.list">
            <g v-html="item.item" v-if="item.name == 'mouth-default'"></g>
          </g>
        </g>

        <!-- Cheek -->
        <g>
          <ellipse
            cx="248.585"
            cy="147.907"
            rx="10"
            ry="5.5"
            fill="#FF9472"
            fill-opacity="0.5"
          />
          <ellipse
            cx="172.585"
            cy="147.907"
            rx="10"
            ry="5.5"
            fill="#FF9472"
            fill-opacity="0.5"
          />
        </g>

        <!-- Eyes -->
        <g>
          <g v-for="(item, index) in eyesSetList.list">
            <g v-html="item.item" v-if="item.name == 'eyes-default'"></g>
          </g>
        </g>

        <!-- Eyebrow -->
        <g>
          <g v-for="(item, index) in eyebrowSetList.list">
            <g v-html="item.item" v-if="item.name == 'eyesbrow-default'"></g>
          </g>
        </g>

        <!-- Header Ear Color -->
        <!-- Ear Colors -->
        <g>
          <path
            d="M279.325 126.602C277.264 121.184 271.787 121.045 269.307 121.653C269.307 128.738 266.826 135.718 265.585 138.323C278.18 139.365 280.47 130.509 279.325 126.602Z"
            fill="#FE7269"
          />
          <path
            d="M138.862 126.601C140.771 121.184 145.842 121.045 148.14 121.653C148.14 128.737 150.437 135.716 151.585 138.32C139.923 139.362 137.692 130.782 138.862 126.601Z"
            fill="#FE7269"
          />
        </g>

        <!-- Header Equipment Front ------------------ -->
        <g v-for="(item, index) in headerSetList.fronts">
          <g v-html="item.item" v-if="character.head == item.name"></g>
        </g>

        <!-- Porps Front -->
        <g>
          <g v-for="(item, index) in petSetList.fronts">
            <g v-html="item.item" v-if="character.pet == item.name"></g>
          </g>
        </g>

        <!-- Porps Other -->
        <g>
          <g v-for="(item, index) in otherSetList.list">
            <g v-html="item.item" v-if="character.other == item.name"></g>
          </g>
        </g>
      </g>

      <!-- Aura -->
      <!-- <g>
        <g>
          <path
            id="Rectangle 4858"
            d="M321.564 192.256H96V358.033C98.8528 364.08 125.466 376.256 209.097 376.581C245.357 375.727 318.614 370.821 321.564 358.033V192.256Z"
            fill="url(#paint0_linear_2964_4)"
          />
          <g id="bubble">
            <circle
              v-for="i in 50"
              :cx="Math.floor(Math.random() * 200) + 110"
              :cy="350"
              :r="Math.floor(Math.random() * 4) + 3"
              fill="#ffffff"
            />

          </g>
          <g id="line">
            <g>
              <path
                d="M109.833 186.979V231.809"
                stroke="url(#paint3_linear_2964_4)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M109.694 236.176V246.572"
                stroke="url(#paint4_linear_2964_4)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M109.694 250.649L109.694 254.13"
                stroke="url(#paint5_linear_2964_4)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>
        </g>
      </g> -->
    </g>

    <!-- Style Equipment Over All -->
    <style-equipment :character="character"></style-equipment>
  </svg>
</template>

<script>
import { onMounted, watch } from "vue";
import headerList from "/public/header-set";
import eyesList from "/public/eyes-set";
import mouthList from "/public/mouth-set";
import noteList from "/public/note-set";
import eyebrowList from "/public/eyebrow-set";
import footerList from "/public/footer-set";
import bodyList from "/public/body-set";
import wingList from "/public/wing-set";
import petList from "/public/pet-set";
import otherList from "/public/other-set";
import styleEquipment from "../components/character/style_equipment.vue";
import { ref, computed } from "vue";
export default {
  components: {
    styleEquipment,
  },
  props: {
    character: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const headerSetList = ref(headerList);
    const footerSetList = ref(footerList);
    const bodySetList = ref(bodyList);
    const wingSetList = ref(wingList);
    // const faceSetList = ref(faceList);

    // Face
    const eyesSetList = ref(eyesList);
    const mouthSetList = ref(mouthList);
    const noteSetList = ref(noteList);
    const eyebrowSetList = ref(eyebrowList);

    // Pet
    const petSetList = ref(petList);

    // Props
    const otherSetList = ref(otherList);

    // const LightenDarkenColor = (col, amt) => {
    //   var usePound = false;
    //   if (col[0] == "#") {
    //     col = col.slice(1);
    //     usePound = true;
    //   }

    //   var num = parseInt(col, 16);

    //   var r = (num >> 16) + amt;
    //   if (r > 255) r = 255;
    //   else if (r < 0) r = 0;
    //   var b = ((num >> 8) & 0x00ff) + amt;
    //   if (b > 255) b = 255;
    //   else if (b < 0) b = 0;
    //   var g = (num & 0x0000ff) + amt;
    //   if (g > 255) g = 255;
    //   else if (g < 0) g = 0;

    //   return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    // };

    const changeColor = async () => {
      // let earColor = await LightenDarkenColor(props.bodycolor, 20);

      // let elEar = document.getElementById("ear-color");
      // for (let i = 0; i < elEar.children.length; i++) {
      //   elEar.children[i].attributes.fill.value = earColor;
      // }

      let elHeader = document.getElementById("header-color");
      for (let i = 0; i < elHeader.children.length; i++) {
        elHeader.children[i].attributes.fill.value = props.character.color;
      }

      let elBody = document.getElementById("body-color");
      for (let i = 0; i < elBody.children.length; i++) {
        elBody.children[i].attributes.fill.value = props.character.color;
      }

      let elFooter = document.getElementById("footer-color");
      for (let i = 0; i < elFooter.children.length; i++) {
        elFooter.children[i].attributes.fill.value = props.character.color;
      }
    };

    // watch(
    //   () => props.bodycolor,
    //   () => {
    //     changeColor();
    //   }
    // );

    // const showFace = computed(() => {
    //   let findEye = faceSetList.value.list.filter((x) => x.name == props.character.face);

    //   if (findEye.length) {
    //     return findEye[0];
    //   } else {
    //     return faceSetList.value.list.filter((x) => x.name == "")[0];
    //   }
    // });

    onMounted(async () => {
      await changeColor();
    });

    return {
      // Face
      eyesSetList,
      mouthSetList,
      noteSetList,
      eyebrowSetList,

      // Customer
      headerSetList,
      footerSetList,
      bodySetList,
      wingSetList,

      // Pet
      petSetList,

      // Porps
      otherSetList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("../css/animation-eyes.css");
@import url("../css/animation-wing.css");
@import url("../css/animation-props.css");
@import url("../css/animation-pet.css");

.animation-aura {
  animation: aura 0.7s ease-in-out infinite alternate;
  transform-box: fill-box;
  transform-origin: bottom;
}

@keyframes aura {
  0% {
    transform: skew(1deg);
  }
  50% {
    transform: scaleY(0.9);
  }
  100% {
    transform: skew(-1deg);
  }
}
</style>
