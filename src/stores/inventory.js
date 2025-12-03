import axios from 'axios'
import { defineStore } from 'pinia'
import { useStudentStore } from './student'
import { useSystemStore } from './system'

export const useInventoryStore = defineStore('inventoryStore', {
  state: () => ({
    inventory: {
      data: [],
      isLoaded: false,
      isEncrypted:false,
      isUpdate: false,
      isNewItem:false,
    }
  }),
  getters: {
    // #region Head
    head: state => {
      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(state.inventory.data)

      if (tempDecrypt) {

        tempDecrypt = tempDecrypt.head.map(x => {
          if (!x.itemNameTh) {
            x.itemNameTh = ''
          }
          return x
        })

        return tempDecrypt
      }

      return null
    },
    // #endregion

    // #region Body
    body: state => {
      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(state.inventory.data)

      if (tempDecrypt) {
        tempDecrypt = tempDecrypt.body.map(x => {
          if (!x.itemNameTh) {
            x.itemNameTh = ''
          }
          x.timestamp = x.timestamp || 0
          return x
        })
        return tempDecrypt
      }

      return null
    },
    // #endregion

    // #region Footer
    footer: state => {
      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(state.inventory.data)

      if (tempDecrypt) {
        tempDecrypt = tempDecrypt.footer.map(x => {
          if (!x.itemNameTh) {
            x.itemNameTh = ''
          }
          x.timestamp = x.timestamp || 0
          return x
        })
        return tempDecrypt
      }

      return null
    },
    // #endregion

    // #region Pet
    pet: state => {
      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(state.inventory.data)

      if (tempDecrypt) {
        tempDecrypt = tempDecrypt.pet.map(x => {
          if (!x.itemNameTh) {
            x.itemNameTh = ''
          }
          x.timestamp = x.timestamp || 0
          return x
        })
        return tempDecrypt
      }

      return null
    },
    // #endregion

    // #region Other
    other: state => {
      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(state.inventory.data)

      if (tempDecrypt) {
        tempDecrypt = tempDecrypt.other.map(x => {
          if (!x.itemNameTh) {
            x.itemNameTh = ''
          }
          x.timestamp = x.timestamp || 0
          return x
        })
        return tempDecrypt
      }

      return null
    },
    // #endregion

    // #region Loading
    isLoading: state => {
      if (state.inventory.isUpdate) return true
      else return false
    },
    // #endregion

    // #region Loaded
    isLoaded: state => state.inventory.isLoaded,
    // #endregion

    // #region List
    list: state => {

      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(state.inventory.data)

      const PATH = "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory"

      let temp = []

      if (tempDecrypt) {

        let head = tempDecrypt.head
        head.map(x => x.type = 'head')

        let body = tempDecrypt.body
        body.map(x => x.type = 'body')

        let footer = tempDecrypt.footer
        footer.map(x => x.type = 'footer')

        let pet = tempDecrypt.pet
        pet.map(x => x.type = 'pet')

        let other = tempDecrypt.other
        other.map(x => x.type = 'other')

        temp = [...head, ...body, ...footer, ...pet, ...other]

        if (temp.length) temp.map(x => {
          x.itemNameTh = x.itemNameTh || ''
          x.path = `${PATH}/${x.itemName}.png`
          x.timestamp = x.timestamp || 0,
          x.isLimited = x.grade == 'limited' ? true : false
          x.grade = x.grade || 'common'

          let date = new Date(x.timestamp)
          let day = date.getDate()
          let month = date.getMonth() + 1
          let year = date.getFullYear()
          let fullDate = `${day}/${month}/${year}`

          x.fullDate = fullDate

          return x
        })

        temp = state.updateSortInventory(temp)

      }

      return temp
    },
    // #endregion

    // #region Is New Item
    isNewItem: state => {
      let temp = state.list
      let isCheck = false
      if(temp.length){
        temp = temp.filter(x => x.isSeen == false)
        if(temp.length){
          isCheck = true
        }
      }

      return isCheck
    }
    // #endregion
  },

  actions: {
    // ******* Function *******
    // #region Add Inventory
    async addInventory() {
      const studentStore = useStudentStore()
      const systemStore = useSystemStore()
      try {

        const APIURL = `${process.env.NEWAPI_ASIA}/inventory-addInventoryOnCreateCharacter`

        const POSTDATA = {
          studentId: studentStore.studentId,
          items: [{
            ...studentStore.characterData.head,
            type: 'head'
          },
          {
            ...studentStore.characterData.body,
            type: 'body'
          },
          {
            ...studentStore.characterData.footer,
            type: 'footer'
          }
          ]
        }

        await axios.post(APIURL, POSTDATA)

        this.inventory.isUpdate = true

        systemStore.systemLog({
          api: "inventory-addInventoryOnCreateCharacter",
          store: this.$id,
          status: "Success Add Inventory",
          post: POSTDATA,
          response: "Success"
        })
      } catch (e) {

        systemStore.systemLog({
          api: "inventory-addInventoryOnCreateCharacter",
          store: this.$id,
          status: "Error Add Inventory",
          description: e,
          isError: true
        })

        return e
      }
    },
    // #endregion

    // #region Get Inventory
    async getInventory() {

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()

      if(this.inventory.isLoaded) return 'success'

      try {

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/inventory-getInventoryByStudentIdV3?studentId=${studentStore.studentId}`

        const response = await axios.get(APIURL)

        if (response.status == 200) {

          let tempEncrypted = systemStore.encryptJSON(response.data)

          this.$patch({
            inventory: {
              data: tempEncrypted,
              isEncrypted: true,
              isLoaded: true,
            }
          })

          systemStore.systemLog({
            api: "inventory-getInventoryByStudentIdV3",
            store: this.$id,
            status: "Success Get Inventory V3",
            get: {
              studentId: studentStore.studentId
            },
            response: response.data
          })

          return 'success'

        } else {
          throw new Error('Error Get Inventory')
        }

      } catch (e) {
        systemStore.systemLog({
          api: "inventory-getInventoryByStudentIdV3",
          store: this.$id,
          status: "Error Get Inventory V3",
          description: e,
          isError: true
        })

        return 'error'
      }
    },
    // #endregion

    // #region Check Inventory
    checkItemInInventory(item){

      let findItem = this.list.find(x => x.itemName == item.itemName)

      if(findItem){
        return true
      }

      return false
    },
    // #endregion

    // #region Update Is Seen
    async updateIsSeen(type) {

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()

      const APIURL = `${process.env.NEWAPI_ASIA}/inventory-updateIsSeen?studentId=${studentStore.studentId}&type=${type}`

      try {

        const response = await axios.get(APIURL)

        if(response.data.message != 'success'){
          throw new Error('error')
        }

        this.setUpdateIsSeen(type)

        systemStore.systemLog({
          api: "inventory-updateIsSeen",
          store: this.$id,
          status: "Success Update Is Seen",
          get:{
            studentId: studentStore.studentId,
            type: type
          },
          response: "Success"
        })

        return "success"

      } catch (e) {

        systemStore.systemLog({
          api: "inventory-updateIsSeen",
          store: this.$id,
          get:{
            studentId: studentStore.studentId,
            type: type
          },
          status: "Error Update Is Seen",
          description: e,
          isError: true
        })

        return "error"
      }
    },
    // #endregion

    // ******* Setter *******

    // #region Set Inventory
    async setInventory(items) {
      const systemStore = useSystemStore()

      try{

        let responseTime = await systemStore.getServerTime()

        if(responseTime.message != 'success'){
          throw new Error('error get time')
        }

        let tempDecrypt = systemStore.decryptJSON(this.inventory.data)

        items.forEach(async res => {

          let newData = {
            isFront: res.isFront || false,
            isBack: res.isBack || false,
            itemName: res.itemName,
            itemNameTh: res.itemNameTh || "",
            id: res.itemId || "",
            FPS: res.FPS || 0,
            duration: res.duration || 0,
            grade: res.grade || "common",
            isSeen: res.isSeen || false,
            timestamp: responseTime.data.timestamp || 0,
          }

          let checkInventoryId = this.list.find(
            x => x.id == res.itemId || x.itemName == res.itemName
          )

          if (checkInventoryId) return

          tempDecrypt[res.type].push(newData)
        })

        let tempEncrypted = systemStore.encryptJSON(tempDecrypt)

        this.$patch({
          inventory: {
            data: tempEncrypted,
            isNewItem: true
          }
        })

      }catch(e){
        systemStore.systemLog({
          api: "inventory-setInventory",
          store: this.$id,
          status: "Error Set Inventory",
          description: e,
          isError: true
        })
      }
    },
    // #endregion

    // #region Set Update Is Seen
    setUpdateIsSeen(type){

      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(this.inventory.data)

      if (tempDecrypt) {
        tempDecrypt[type].map(x => x.isSeen = true)
      }

      let tempEncrypted = systemStore.encryptJSON(tempDecrypt)

      this.$patch({
        inventory: {
          data: tempEncrypted,
        }
      })

    },
    // #endregion

    // #region sort Inventory
    updateSortInventory(array){
      array.sort((a,b) => {
        if (a.isSeen !== b.isSeen) {
          return a.isSeen ? 1 : -1;
        }

        if (a.isLimited !== b.isLimited) {
            return a.isLimited ? -1 : 1;
        }

        // if(a.timestamp == 0 || b.timestamp == 0){
        //   return a.timestamp == 0 ? -1 : 1;
        // }

        return a.timestamp < b.timestamp ? 1 : -1;
      })

      return array
    },
    // #endregion

    // ******* Setter *******

  }
})
