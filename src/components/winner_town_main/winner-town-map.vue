<template>
  <div class="relative-position fit">
    <q-img
      src="/images/winner_town_main/winner-town-map.webp"
      class="fit"
      fit="cover"
      no-spinner
      no-transition
    ></q-img>

    <div class="absolute box-cup-coffee" :class="{'mobile':isMobile}">
      <q-img class="fit" fit="cover" src="/images/winner_town_main/animation-cup-coffee.gif" no-spinner no-transition></q-img>
    </div>

    <div class="absolute box-fountain" :class="{'mobile':isMobile}">
      <q-img class="fit" fit="cover" src="/images/winner_town_main/animation-fountain.gif" no-spinner no-transition></q-img>
    </div>

    <div class="absolute box-beer" :class="{'mobile':isMobile}">
      <q-img class="fit" fit="cover" src="/images/winner_town_main/animation-beer.gif" no-spinner no-transition></q-img>
    </div>

    <div class="absolute box-npc-main npc-1" :class="{'mobile':isMobile}">
      <div class="relative-position" :style="`transform:translate(${npc1.left}px, ${npc1.top}px) rotateY(${npc1.isFilp ? '200' : '0'}deg);`">
        <q-img class="fit" fit="cover" src="/images/winner_town_main/character-npc-1.gif" no-spinner no-transition></q-img>
      </div>
    </div>

    <div class="absolute box-npc-main npc-2" :class="{'mobile':isMobile}">
      <div class="relative-position" :style="`transform:translate(${npc2.left}px, ${npc2.top}px) rotateY(${npc2.isFilp ? '200' : '0'}deg);`">
        <q-img class="fit" fit="cover" src="/images/winner_town_main/character-npc-2.gif" no-spinner no-transition></q-img>
      </div>
    </div>

    <div class="absolute box-npc-main npc-coffee" :class="{'mobile':isMobile}">
      <div class="relative-position">
        <q-img class="fit" fit="cover" src="/images/winner_town_main/character-npc-coffee.webp" no-spinner no-transition></q-img>
      </div>
    </div>

    <div class="absolute box-npc-main npc-bear" :class="{'mobile':isMobile}">
      <div class="relative-position">
        <q-img class="fit" fit="cover" src="/images/winner_town_main/character-npc-bear.webp" no-spinner no-transition></q-img>
      </div>
    </div>

    <div
      class="absolute box-npc-main npc-main"
      :class="{'mobile':isMobile}"
      role="button"
      tabindex="0"
      @pointerdown.stop="handleNpcPointerDown"
      @pointerup.stop="handleNpcPointerUp"
      @click.stop="funcHandleNpc('traveller')"
    >
      <div class="relative-position" style="pointer-events: none;">
        <q-img class="fit" fit="cover" src="/images/winner_town_main/character-npc-main.webp" no-spinner no-transition style="pointer-events: none;"></q-img>

        <div class="absolute box-chat-main" :class="{'mobile':isMobile}">
          <div class="relative-position fit">
            <q-img class="fit" fit="cover" src="/images/winner_town_main/box-chat-main.webp" no-spinner no-transition></q-img>

            <div class="absolute-center icon-main" :class="{'mobile':isMobile}">
              <q-img class="animate-hand fit" fit="cover" src="/images/winner_town_main/icon-hand.webp" no-spinner no-transition></q-img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { useStudentStore } from 'src/stores/student';
import { useSystemStore } from 'src/stores/system';
import { onMounted, onUnmounted, ref } from 'vue';

const $q = useQuasar();

const emits = defineEmits(['callback-handleNpc']);

const studentStore = useStudentStore();
const systemStore = useSystemStore();

const isMobile = ref($q.platform.is.mobile);

const npc1 = ref({
  top: 0,
  left: 0,
  isFilp: false,
});

const npc2 = ref({
  top:0,
  left:0,
  isFilp:false,
})

// Animation state
let animationFrameId = null;
let startTime = null;
let lastTime = 0;

const props = defineProps({
  background: {
    type: String,
    default: "",
  },
});

const getCookieData = (name) => {
  try {
    // ใช้ localStorage แทน cookie
    const encryptedData = localStorage.getItem(name);
    if (encryptedData) {
      try {
        const decrypt_data = systemStore.decryptJSON(encryptedData);

        // ตรวจสอบวันหมดอายุ โดยใช้ timestamp จากระบบแทนเวลาท้องถิ่น
        if (decrypt_data.expiresAt) {
          // ใช้ systemStore.datetime.timestamp ถ้ามีค่า (timestamp จากระบบ)
          // ถ้าไม่มีให้ fallback ไปใช้ Date.now()
          const now = systemStore.datetime?.timestamp || Date.now();
          if (decrypt_data.expiresAt < now) {
            // ข้อมูลหมดอายุแล้ว ให้ลบทิ้ง
            localStorage.removeItem(name);
            console.log(`🗑️ Removed expired localStorage data: ${name}`);
            return null;
          }
        }

        // ลบ expiresAt ออกก่อน return เพื่อไม่ให้ส่งไปในข้อมูล
        const { expiresAt, ...dataWithoutExpiry } = decrypt_data;
        return dataWithoutExpiry;
      } catch (error) {
        console.error('Error decrypting localStorage data:', error);
        // ถ้า decrypt ไม่ได้ อาจเป็นข้อมูลเสียหาย ให้ลบทิ้ง
        localStorage.removeItem(name);
        return null;
      }
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  return null;
}

const funcHandleNpc = (name) => {
  console.clear();

  let cookie_name = `odc_wt_npc_${name}_${studentStore.studentId}`;

  let set_data = {
    ssid:"",
    name:name,
    data:[],
    turnCount:0,
    maxTurns:10,
    isCompleted:false,
  }

  console.log("*** cookie name",cookie_name);

  let get_cookie_data = getCookieData(cookie_name);

  console.log("*** get_cookie_data",get_cookie_data);

  if(get_cookie_data){
    set_data = {
      name:name,
      ...get_cookie_data,
    }
  }

  emits('callback-handleNpc', set_data);
}

let npcMainPointerDown = false;

const handleNpcPointerDown = (e) => {
  npcMainPointerDown = true;
  e.stopPropagation();
};

const handleNpcPointerUp = (e) => {
  if (npcMainPointerDown) {
    funcHandleNpc('main');
    npcMainPointerDown = false;
  }
  e.stopPropagation();
};

let speed = 0.1;

const checkNPC1 = () => {
  if(npc1.value.isFilp) {
    npc1.value.top -= speed;
    npc1.value.left += speed;

    if(npc1.value.top <= 0 && npc1.value.left >= 0) {
      npc1.value.top = 0;
      npc1.value.left = 0;
      npc1.value.isFilp = false;
    }

  }else{
    if(npc1.value.top >= 60 && npc1.value.left <= 60) {
      npc1.value.top = 60;
      npc1.value.left = -60;
      npc1.value.isFilp = true;
    }

    npc1.value.top += speed;
    npc1.value.left -= speed;
  }
}

const checkNPC2 = () => {

  if(npc2.value.isFilp){
    npc2.value.top -= 0.02;
    npc2.value.left -= 0.04;

    if(npc2.value.top <= 0 && npc2.value.left <= 0) {
      npc2.value.top = 0;
      npc2.value.left = 0;
      npc2.value.isFilp = false;
    }
  }else{
    if(npc2.value.top >= 15 && npc2.value.left >= 30) {
      npc2.value.top = 15;
      npc2.value.left = 30;
      npc2.value.isFilp = true;
    }

    npc2.value.top += 0.02;
    npc2.value.left += 0.04;
  }
}

const animateNPC = (currentTime) => {
  // console.clear();
  if (!startTime) {
    startTime = currentTime;
    lastTime = currentTime;
  }

  checkNPC1();
  checkNPC2();

  animationFrameId = requestAnimationFrame(animateNPC);
};

onMounted(() => {
  // Start animation loop
  animationFrameId = requestAnimationFrame(animateNPC);
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style lang="scss" scoped>
.box-cup-coffee{
  top:clamp(485px,48.5cqw,776px);
  left:clamp(729.375px,72.9375cqw,1167px);
  width:clamp(70.625px,7.0625cqw,113px);

  &.mobile{
    top:697px;
    left:646px;
    width:93px;
  }
}

.box-beer{
  top:clamp(621.875px,62.1875cqw,995px);
  left:clamp(653.125px,65.3125cqw,1045px);
  width:clamp(175px,17.5cqw,280px);

  &.mobile{
    top:880px;
    left:542px;
    width:230px;
  }
}

.box-fountain{
  top:clamp(398.125px,39.8125cqw,637px);
  left:clamp(1124.375px,112.4375cqw,1799px);
  width:clamp(103.125px,10.3125cqw,165px);

  &.mobile{
    top:585px;
    left:1163.5px;
    width:135px;
  }
}

.box-npc-main{

  &.npc-main{
    top:clamp(496.875px,49.6875cqw,795px);
    left:clamp(1068.75px,106.875cqw,1710px);
    width:clamp(50px,5cqw,80px);
    cursor:pointer;
    z-index: 10;
    pointer-events: auto;

    &.mobile{
      top:715px;
      left:1090px;
      width:65px;
    }

    & .box-chat-main{
      top:clamp(-52px,-3.25cqw,-32.5px);
      right:clamp(-78px,-4.875cqw,-48.75px);
      width:clamp(46.875px,4.6875cqw,75px);
      pointer-events: none;

      &.mobile{
        top: -45px;
        right: -65px;
        width: 60px;
      }

      & .icon-main{
        width:100%;
        pointer-events: none;

        & .animate-hand{
          animation:shake 0.3s ease-in-out infinite alternate-reverse;
          transform-origin: center bottom;
          pointer-events: none;

          @keyframes shake {
            0% {
              transform: rotate(-1deg);
            }
            100% {
              transform: rotate(1deg);
            }
          }
        }
      }
    }
  }

  &.npc-1{
    width:clamp(50px,5cqw,80px);
    top:clamp(409.375px,40.9375cqw,655px);
    left:clamp(1025px,102.5cqw,1640px);

    &.mobile{
      top:590px;
      left:1030px;
      width:65px;
    }
  }

  &.npc-2{
    top:clamp(625px,62.5cqw,1000px);
    left:clamp(1293.75px,129.375cqw,2070px);
    width:clamp(50px,5cqw,80px);

    &.mobile{
      top:870px;
      left:1370px;
      width:65px;
    }
  }

  &.npc-coffee{
    top:clamp(628.125px,62.8125cqw,1005px);
    left:clamp(837.5px,83.75cqw,1340px);
    width:clamp(50px,5cqw,80px);

    &.mobile{
      top:885px;
      left:780px;
      width:70px;
    }
  }

  &.npc-bear{
    top:clamp(353.125px,35.3125cqw,565px);
    left:clamp(962.5px,96.25cqw,1540px);
    width:clamp(50px,5cqw,80px);

    &.mobile{
      top:520px;
      left:950px;
      width:70px;
    }
  }
}
</style>
