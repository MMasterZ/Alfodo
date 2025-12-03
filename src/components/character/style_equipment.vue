<template>
  <defs>
    <!-- Shadow Main Style -->
    <!-- <filter
      id="Skeleton_main_shadow"
      x="0"
      y="0"
      width="100%"
      height="100%"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
      />
      <feOffset dy="4" />
      <feGaussianBlur stdDeviation="2" />
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
    </filter>

    <filter
      id="Shadow_footer_main"
      x="119.022"
      y="340.782"
      width="182"
      height="39"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
      />
      <feOffset dy="4" />
      <feGaussianBlur stdDeviation="2" />
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
    </filter> -->

    <!-- Box Wing -----------------------------  -->
    <!-- Style Wing -->
    <g v-for="(item, index) in wingDefs.wings">
      <g v-html="item.style" v-if="item.name == 'wing-01'"></g>
    </g>

    <!-- Box Face ----------------------------- -->
    <!-- Style Eyes -->
    <g v-for="(item, index) in eyesDefs.list">
      <g v-html="item.style" v-if="item.name == 'eyes-still-01'"></g>
    </g>

    <!-- Style Eyebrow -->
    <g v-for="(item, index) in eyebrowDefs.list">
      <g v-html="item.style" v-if="item.name == 'eyebrow-set-01'"></g>
    </g>
    <!-- Box Face ----------------------------- -->

    <!-- Box Header -----------------------------  -->
    <!-- Style Header -->
    <g v-for="(item, index) in headerDefs.fronts">
      <g v-html="item.style" v-if="character.head == item.name"></g>
    </g>

    <!-- Style Header -->
    <g v-for="(item, index) in headerDefs.backs">
      <g v-html="item.style" v-if="character.head == item.name"></g>
    </g>
    <!-- Box Header -----------------------------  -->

    <!-- Box Body -----------------------------  -->
    <!-- Style Body -->
    <g v-for="(item, index) in bodyDefs.fronts">
      <g v-html="item.style" v-if="character.body == item.name"></g>
    </g>

    <!-- Style Body -->
    <g v-for="(item, index) in bodyDefs.backs">
      <g v-html="item.style" v-if="character.body == item.name"></g>
    </g>

    <!-- Box Body -----------------------------  -->

    <!-- Box Footer -----------------------------  -->
    <!-- Style Footer -->
    <g v-for="(item, index) in footerDefs.fronts">
      <g v-html="item.style" v-if="character.footer == item.name"></g>
    </g>

    <!-- Style Footer -->
    <g v-for="(item, index) in footerDefs.backs">
      <g v-html="item.style" v-if="character.footer == item.name"></g>
    </g>
    <!-- Box Footer -----------------------------  -->

    <!-- Linear Gradient ----------------------------------------------------------- -->
    <!-- harly_hair_back -->
    <linearGradient
      id="harly_hair_01_back_01"
      x1="279.261"
      y1="44.0416"
      x2="279.261"
      y2="234.09"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0.578125" stop-color="#FFE5A2" />
      <stop offset="1" stop-color="#2C67FF" />
    </linearGradient>
    <linearGradient
      id="harly_hair_01_back_02"
      x1="141.108"
      y1="44.0416"
      x2="141.108"
      y2="234.09"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0.578125" stop-color="#FFE5A2" />
      <stop offset="1" stop-color="#FF2CAA" />
    </linearGradient>

    <!-- astronaut_shirt_01_linear -->
    <linearGradient
      id="astronaut_shirt_01_linear"
      x1="246.948"
      y1="211.989"
      x2="246.948"
      y2="224.261"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FAFAFA" />
      <stop offset="1" stop-color="#ABABAB" />
    </linearGradient>

    <!-- firefighter_hat_linear -->
    <linearGradient
      id="firefighter_hat_linear_01"
      x1="207.164"
      y1="17.4312"
      x2="207.164"
      y2="52.6418"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#D3D3D3" />
      <stop offset="1" stop-color="#AFAFAF" />
    </linearGradient>

    <!-- harly_pants -->
    <linearGradient
      id="harly_pants_linear_01"
      x1="208.469"
      y1="261.536"
      x2="208.469"
      y2="293.036"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#006FE0" />
      <stop offset="1" stop-color="#20009F" />
    </linearGradient>
    <linearGradient
      id="harly_pants_linear_02"
      x1="208.469"
      y1="261.536"
      x2="208.469"
      y2="293.036"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FF475B" />
      <stop offset="1" stop-color="#B80014" />
    </linearGradient>

    <!-- harly_top -->
    <linearGradient
      id="harly_top_linear_01"
      x1="209.017"
      y1="178.815"
      x2="209.017"
      y2="185.84"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FFED4F" />
      <stop offset="1" stop-color="#FFC630" />
    </linearGradient>

    <!-- japanese_skirt_2_linear -->
    <linearGradient
      id="japanese_skirt_2_linear"
      x1="207.966"
      y1="261.479"
      x2="207.966"
      y2="301.994"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#313187" />
      <stop offset="0.890625" stop-color="#83B3F8" />
    </linearGradient>

    <!-- chef_shirt_radial -->
    <radialGradient
      id="chef_shirt_radial_01"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(204.527 212.498) rotate(90) scale(2.5)"
    >
      <stop stop-color="#767A80" />
      <stop offset="1" stop-color="#42454A" />
    </radialGradient>
    <radialGradient
      id="chef_shirt_radial_02"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(204.527 225.498) rotate(90) scale(2.5)"
    >
      <stop stop-color="#767A80" />
      <stop offset="1" stop-color="#42454A" />
    </radialGradient>
    <radialGradient
      id="chef_shirt_radial_03"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(204.527 239.498) rotate(90) scale(2.5)"
    >
      <stop stop-color="#767A80" />
      <stop offset="1" stop-color="#42454A" />
    </radialGradient>
    <radialGradient
      id="chef_shirt_radial_04"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(203.527 252.498) rotate(90) scale(2.5)"
    >
      <stop stop-color="#767A80" />
      <stop offset="1" stop-color="#42454A" />
    </radialGradient>
    <radialGradient
      id="chef_shirt_radial_05"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(211.527 212.498) rotate(90) scale(2.5)"
    >
      <stop stop-color="#767A80" />
      <stop offset="1" stop-color="#42454A" />
    </radialGradient>
    <radialGradient
      id="chef_shirt_radial_06"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(211.527 225.498) rotate(90) scale(2.5)"
    >
      <stop stop-color="#767A80" />
      <stop offset="1" stop-color="#42454A" />
    </radialGradient>
    <radialGradient
      id="chef_shirt_radial_07"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(211.527 239.498) rotate(90) scale(2.5)"
    >
      <stop stop-color="#767A80" />
      <stop offset="1" stop-color="#42454A" />
    </radialGradient>
    <radialGradient
      id="chef_shirt_radial_08"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(212.527 252.498) rotate(90) scale(2.5)"
    >
      <stop stop-color="#767A80" />
      <stop offset="1" stop-color="#42454A" />
    </radialGradient>

    <!-- Props Other -->
    <!-- Neko Animal -->
    <linearGradient
      id="neko_paint_linear_1"
      x1="313.012"
      y1="226.644"
      x2="313.012"
      y2="241.288"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FFA5A5" />
      <stop offset="1" stop-color="#E27070" />
    </linearGradient>
    <linearGradient
      id="neko_paint_linear_2"
      x1="373.216"
      y1="226.644"
      x2="373.216"
      y2="241.288"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FFA5A5" />
      <stop offset="1" stop-color="#E27070" />
    </linearGradient>

    <!-- Christmastree hair 02 -->
    <linearGradient
      id="christmastree_hair_02_paint_linear_01"
      x1="274.806"
      y1="5.84052"
      x2="260.841"
      y2="29.5039"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FFD843" />
      <stop offset="0.515625" stop-color="#FFC800" />
      <stop offset="1" stop-color="#FF8D00" />
    </linearGradient>

    <!-- Reindeer Shirt -->
    <linearGradient
      id="reindeer_shirt_01_paint_01_linear"
      x1="208.848"
      y1="189.831"
      x2="208.848"
      y2="207.462"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FFEA2E" />
      <stop offset="1" stop-color="#FFAA2E" />
    </linearGradient>

    <linearGradient
      id="paint0_linear_2964_4"
      x1="208.782"
      y1="192.256"
      x2="208.782"
      y2="376.581"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0.145833" stop-color="white" stop-opacity="0" />
      <stop offset="1" stop-color="#FFE951" />
    </linearGradient>
    <radialGradient
      id="paint1_radial_2964_4"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(216.272 277.971) rotate(90) scale(9.73509)"
    >
      <stop stop-color="white" />
      <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
    </radialGradient>
    <radialGradient
      id="paint2_radial_2964_4"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(157.213 290.819) rotate(90) scale(3.11291)"
    >
      <stop stop-color="white" />
      <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
    </radialGradient>
    <linearGradient
      id="paint3_linear_2964_4"
      x1="110.333"
      y1="186.979"
      x2="110.333"
      y2="231.809"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="white" stop-opacity="0" />
      <stop offset="1" stop-color="white" />
    </linearGradient>
    <linearGradient
      id="paint4_linear_2964_4"
      x1="110.194"
      y1="236.176"
      x2="110.194"
      y2="246.572"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="white" stop-opacity="0" />
      <stop offset="1" stop-color="white" />
    </linearGradient>
    <linearGradient
      id="paint5_linear_2964_4"
      x1="110.194"
      y1="250.649"
      x2="110.194"
      y2="254.13"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="white" stop-opacity="0" />
      <stop offset="1" stop-color="white" />
    </linearGradient>

    <!-- Character Shadow -->
    <clipPath id="Character_shadow_main">
      <rect width="420" height="380" fill="white" />
    </clipPath>
  </defs>
</template>

<script>
import eyesSet from "/eyes-set";
import eyebrowSet from "/eyebrow-set";
import headerSet from "/header-set";
import bodySet from "/body-set";
import footerSet from "/footer-set";
import wingSet from "/wing-set";
import { ref } from "vue";
export default {
  props: {
    character: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const eyesDefs = ref(eyesSet);
    const eyebrowDefs = ref(eyebrowSet);
    const headerDefs = ref(headerSet);
    const bodyDefs = ref(bodySet);
    const footerDefs = ref(footerSet);
    const wingDefs = ref(wingSet);

    return {
      eyesDefs,
      eyebrowDefs,
      headerDefs,
      bodyDefs,
      footerDefs,
      wingDefs,
    };
  },
};
</script>

<style lang="scss" scoped></style>
