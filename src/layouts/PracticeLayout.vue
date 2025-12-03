<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Layout Page -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { onMounted } from "vue";
export default {
  setup(props) {
    // Initial Data

    // const funcFormatPrice = (price) => {
    //   let formatPrice = price.toString();

    //   if (formatPrice.length > 3) {
    //     const regex = new RegExp(/(\d{3})+$/, "g");

    //     formatPrice = formatPrice.split(regex);
    //     formatPrice = formatPrice.filter((x) => x != "").join(",");
    //   }

    //   return formatPrice;
    // };

    // const funcPayloadNotification = () => {
    //   if (messaging) {
    //     messaging
    //       .requestPermission()
    //       .then(function () {
    //         // console.log('Have permission');
    //         return messaging.getToken();
    //       })
    //       .then(async function (token) {
    //         // console.log(token);
    //         let uid = $q.sessionStorage.getItem("uid");
    //         db.collection("student").doc(uid).update({ fcmToken: token });
    //       })
    //       .catch(function (error) {
    //         // console.log("Error");
    //         console.log(error);
    //       });

    //     messaging.onMessage((payload) => {
    //       $q.notify({
    //         color: "orange-2",
    //         progress: true,
    //         message:
    //           "<span class='fas fa-bell text-bold text-brown' style='font-size:20px;margin-right:10px;'></span> <span class='text-bold text-brown'>ตรวจสอบการชำระเงินเสร็จสิ้นแล้ว</span>",
    //         position: "top-right",
    //         html: true,
    //         multiLine: true,
    //         progressClass: "bg-brown-10",
    //         actions: [
    //           {
    //             label: "ปิด",
    //             color: "yellow-10",
    //             handler: () => {},
    //           },
    //         ],
    //         timeout: 10000,
    //       });
    //       console.log("Message received. ", payload);
    //     });
    //   }
    // };

    onMounted(() => {
      // window.onbeforeunload = function (event) {
      //   var message = "?";
      //   if (typeof event == "undefined") {
      //     event = window.event;
      //   }
      //   if (event) {
      //     event.returnValue = message;
      //   }
      //   return message;
      // };
      // authListen = firebase.auth().onAuthStateChanged(async function (user) {
      //   if (user) {
      //     // ;
      //     // systemStore.playSoundBackground();
      //     // funcPayloadNotification();
      //     // isShowLoading.value = true;
      //     // $q.sessionStorage.set("uid", user.uid);
      //     // await loadStudentData();
      //     if (studentInfo.type == "school" || studentInfo.type == "tutor") {
      //       // await snapSynchronize();
      //     } else {
      //       // await checkStudentOnline(user.uid);
      //     }
      //     // isShowLoading.value = false;
      //   } else {
      //     // User is signed out.
      //     router.replace("/");
      //   }
      // });
    });

    // onBeforeUnmount(() => {
    //   if (tempSync.value) {
    //     tempSync.value();
    //   }

    //   if (authListen) {
    //     authListen();
    //   }

    //   if (newsListen) {
    //     newsListen();
    //   }

    //   console.log("Clear Student Store");
    //   studentStore.$dispose();
    //   studentStore.$reset();
    //   console.log("Clear Practice Store");
    //   practiceStore.$dispose();
    //   practiceStore.$reset();
    //   console.log("Clear School Store");
    //   schoolStore.$dispose();
    //   schoolStore.$reset();
    //   console.log("Clear Course Store");
    //   courseStore.$dispose();
    //   courseStore.$reset();
    //   console.log("Clear News Store");
    //   newsStore.$dispose();
    //   newsStore.$reset();
    //   console.log(" ");
    // });

    return {};
  },
};
</script>

<style lang="scss" scoped>
.btn-close {
  width: 100%;
  background: linear-gradient(180deg, #ffd66a 0%, #ffbd14 100%);
  border-radius: 10px;
  color: #8f4c12;
  font-size: 12px;
}

.btn-purchase {
  max-width: 145px;
  width: 100%;
  background: linear-gradient(180deg, #ffd66a 0%, #ffbd14 100%);
  border-radius: 10px;
  color: #8f4c12;
  font-size: 12px;
}

.btn-signout {
  max-width: 145px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  color: #8f4c12;
  font-size: 12px;
}

.btn-confirm-purchase {
  width: 130px;
  background: linear-gradient(180deg, #ffd66a 0%, #ffbd14 100%);
  border-radius: 10px;
  color: #8f4c12;
  font-size: 12px;
}

.btn-cancel {
  width: 130px;
  background-color: #fff;
  border-radius: 10px;
  color: #8f4c12;
  font-size: 12px;
}

.btn-attach-file {
  background: linear-gradient(180deg, #ffd66a 0%, #ffbd14 100%);
  border-radius: 10px;
  color: #8f4c12;
  font-size: 12px;
}

.box-purchase {
  max-width: 400px;
  min-width: 360px;
  background-color: #f6f3d3;
  border-radius: 10px;
  color: #4e1617;
  margin-top: -20px;
}

.box-header-purchase {
  width: 80%;
  color: #ffc01c;
  background-color: #a36112;
  box-shadow: 0px 5px 0px #7d4707;
  border-radius: 30px;
  margin: auto;
  z-index: 2;
}

.box-course-unit {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  border: 3px solid #fff;
}

.box-course-unit[data-active="true"] {
  border: 3px solid#1278F3;
  z-index: 2;
}

.box-course-unit-last {
  background-color: #a36112;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  border: 3px solid #a36112;
}

.box-course-unit[data-active="true"] {
  border: 3px solid#1278F3;
  z-index: 2;
}

.text-price {
  color: #fff;
  text-shadow: rgb(78, 22, 23) 3px 0px 0px,
    rgb(78, 22, 23) 2.83487px 0.981584px 0px,
    rgb(78, 22, 23) 2.35766px 1.85511px 0px,
    rgb(78, 22, 23) 1.62091px 2.52441px 0px,
    rgb(78, 22, 23) 0.705713px 2.91581px 0px,
    rgb(78, 22, 23) -0.287171px 2.98622px 0px,
    rgb(78, 22, 23) -1.24844px 2.72789px 0px,
    rgb(78, 22, 23) -2.07227px 2.16926px 0px,
    rgb(78, 22, 23) -2.66798px 1.37182px 0px,
    rgb(78, 22, 23) -2.96998px 0.42336px 0px,
    rgb(78, 22, 23) -2.94502px -0.571704px 0px,
    rgb(78, 22, 23) -2.59586px -1.50383px 0px,
    rgb(78, 22, 23) -1.96093px -2.27041px 0px,
    rgb(78, 22, 23) -1.11013px -2.78704px 0px,
    rgb(78, 22, 23) -0.137119px -2.99686px 0px,
    rgb(78, 22, 23) 0.850987px -2.87677px 0px,
    rgb(78, 22, 23) 1.74541px -2.43999px 0px,
    rgb(78, 22, 23) 2.44769px -1.73459px 0px,
    rgb(78, 22, 23) 2.88051px -0.838247px 0px;
}

.text-discount {
  position: relative;
}

.text-discount::after {
  content: "";
  width: 100%;
  height: 1px;
  background: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-3deg);
}

.text-overflow-inline {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bg-brown-discount-precent {
  background-color: #a36112;
}
</style>
