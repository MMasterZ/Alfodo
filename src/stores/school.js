import axios from "axios";
import { defineStore } from "pinia";
import { useStudentStore } from "./student";
import { useSystemStore } from "./system";

export const useSchoolStore = defineStore("schoolStore", {
  state: () => ({
    school: {
      data: {},
      isLoaded: false,
    },
  }),
  getters: {
    schoolName: (state) => state.school.data.schoolName,
    isPretest: (state) => state.school.data.pretestStatus,
    isPosttest: (state) => state.school.data.posttestStatus,
    isEnableBuddy: (state) => state.school.data.buddyStatus || false,
  },
  actions: {
    async getSchool() {
      if (this.school.isLoaded) return;

      const systemStore = useSystemStore()

      try {
        const studentStore = useStudentStore();

        const APIURL = `${process.env.NEWAPI_ASIA}/school-getSchool?schoolId=${studentStore.schoolId}&courseId=${studentStore.courseId}`;

        const response = await axios.get(APIURL);

        this.$patch({
          school: {
            data: response.data,
            isLoaded: true,
          },
        });

        if (!response.data.status) {
          return "School is not active";
        }

        systemStore.systemLog({
          api: "school-getSchool",
          store: this.$id,
          status: "Success Get School",
          get: {
            schoolId: studentStore.schoolId,
            courseId: studentStore.courseId,
          },
          response: response.data,
        })

        return 'success'
      } catch (e) {
        systemStore.systemLog({
          api: "school-getSchool",
          store: this.$id,
          status: "Error Get School",
          description: e,
          isError: true
        })

        return 'error';
      }
    },
  },
});
