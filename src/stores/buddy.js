import axios from "axios";
import { defineStore } from "pinia";
import { useCourseStore } from "./course";
import { useStudentStore } from "./student";
import { useSystemStore } from "./system";
import levelExpList from "src/js/level-exp";

const levelExp = levelExpList;

export const useBuddyStore = defineStore("buddyStore", {
  state: () => ({
    buddy: {
      uid: "",
      data: {},
      character: {},
      isUpdateCoin: false,
      isUpdateCharacter: false,
      isBuddy: false,
      isCheckOnlineStatus: false,
      logs: {
        username: "",
        password: "",
      },
      practiceData: {
        quota: {},
      },
    },
  }),
  getters: {
    studentId: (state) => state.buddy.uid,
    isBuddy: (state) => state.buddy.isBuddy,
    name: (state) => state.buddy.data.name || "",
    surname: (state) => state.buddy.data.surname || "",
    studentFullName: (state) =>
      `${state.buddy.data.name} ${state.buddy.data.surname}`,
    courseId: (state) => state.buddy.data.currentCourseId,
    schoolId: (state) => state.buddy.data.schoolId,
    character: (state) => state.buddy.character,
    isCreateCharacter: (state) => state.buddy.data.isCreateCharacter,
    quota: (state) => state.buddy.practiceData.quota,
  },
  actions: {
    async login(username, password, isCheckOnlineState) {
      const studentStore = useStudentStore();
      const courseStore = useCourseStore();
      const systemStore = useSystemStore();

      console.clear();

      try {
        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/auth-buddyLoginV2`;

        const POSTDATA = {
          username: username,
          password: password,
          classRoom: courseStore.class,
          schoolId: studentStore.schoolId,
          isCheckOnlineStatus: isCheckOnlineState,
        };

        const response = await axios.post(APIURL, POSTDATA);

        if (response.data.message != "success") {
          throw response.data.message;
        }

        let newData = {
          ...response.data.studentData,
        };

        let currentTier = levelExp[newData.level];

        if (!currentTier) {
          currentTier = "chosen-one-4";
        } else {
          currentTier = currentTier.tier;
        }

        newData.tier = currentTier;

        this.$patch({
          buddy: {
            data: newData,
            uid: newData.uid,
            isBuddy: true,
          },
        });
        systemStore.saveLoginLog(newData.uid);

        if (response.data == "online") {
          return response.data;
        }

        systemStore.systemLog({
          api: "auth-buddyLogin",
          store: this.$id,
          post: POSTDATA,
          response: response.data,
          status: "Success Buddy Login",
        });
      } catch (e) {
        systemStore.systemLog({
          api: "auth-buddyLogin",
          store: this.$id,
          status: "Error Buddy Login",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    async getCharacterInfo() {
      const systemStore = useSystemStore();

      try {
        if (!this.isCreateCharacter) {
          throw "Error";
        }

        const APIURL = `${process.env.NEWAPI}/character-getCharacterInfo?studentId=${this.studentId}`;

        let response = await axios.get(APIURL);

        if (response.data.message == "Student Id not found") {
          this.buddy.character = {
            head: {
              isFront: false,
              isBack: false,
              itemName: "",
            },
            body: {
              isFront: false,
              isBack: false,
              itemName: "",
            },
            footer: {
              isFront: false,
              isBack: false,
              itemName: "",
            },
            pet: {
              isFront: false,
              isBack: false,
              itemName: "",
            },
            other: {
              isFront: false,
              isBack: false,
              itemName: "",
            },
          };
        } else {
          this.buddy.character = {
            ...response.data,
            other: response.data.other || {
              isFront: false,
              isBack: false,
              itemName: "",
            },
          };
        }

        systemStore.systemLog({
          api: "character-getCharacterInfo",
          store: this.$id,
          get: {
            studentId: this.studentId,
          },
          response: response.data,
          status: "Success Get Buddy Character",
        });
      } catch (e) {
        systemStore.systemLog({
          api: "character-getCharacterInfo",
          store: this.$id,
          status: "Error Get Buddy Character",
          description: e,
          isError: true,
        });
        return e;
      }
    },
    async logout() {
      const systemStore = useSystemStore();

      try {
        let POSTDATA = {
          studentId: this.studentId,
        };

        let APIURL = `${process.env.NEWAPI}/auth-logout`;

        await axios.post(APIURL, POSTDATA);

        this.$reset();
        systemStore.systemLog({
          api: "auth-logout",
          store: this.$id,
          post: POSTDATA,
          status: "Success Buddy Logout",
        });
      } catch (e) {
        systemStore.systemLog({
          api: "auth-logout",
          store: this.$id,
          status: "Error Buddy Logout",
          description: e,
          isError: true,
        });
        return e;
      }
    },
  },
});
