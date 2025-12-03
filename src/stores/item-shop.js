import axios from 'axios'
import { defineStore } from 'pinia'
import { useInventoryStore } from './inventory'
import { useStudentStore } from './student'
import { useSystemStore } from './system'

const pathItem = `https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory`

export const useItemShopStore = defineStore('itemshopStore', {
  state: () => ({
    itemshop: {
      data: [],
      temp: [],
      color: '',
      isLoaded: false,
      isUpdate: false,
      isEncrypted:false,
      isNewItem:false
    }
  }),
  getters: {
    itemListAll: state => {
      let tempData = []
      const systemStore = useSystemStore()
      let tempDecrypt = systemStore.decryptJSON(state.itemshop.data)

      if(tempDecrypt.length){
        return tempData = tempDecrypt
      }

      return tempData
    },
    itemHead: state => {

      const systemStore = useSystemStore()
      let tempDecrypt = systemStore.decryptJSON(state.itemshop.data)
      let temp = []
      if(tempDecrypt.length){
        temp = tempDecrypt.filter(x => x.type == 'head')
        temp = state.hasItem(temp, 'head')
        temp = state.separateItem(temp)
      }

      return temp
    },
    itemBody: state => {
      const systemStore = useSystemStore()
      let tempDecrypt = systemStore.decryptJSON(state.itemshop.data)
      let temp = []
      if(tempDecrypt.length){
        temp = tempDecrypt.filter(x => x.type == 'body')
        temp = state.hasItem(temp, 'body')
        temp = state.separateItem(temp)
      }

      return temp
    },
    itemFooter: state => {
      const systemStore = useSystemStore()
      let tempDecrypt = systemStore.decryptJSON(state.itemshop.data)
      let temp = []
      if(tempDecrypt.length){
        temp = tempDecrypt.filter(x => x.type == 'footer')
        temp = state.hasItem(temp, 'footer')
        temp = state.separateItem(temp)
      }

      return temp
    },
    itemPet: state => {
      const systemStore = useSystemStore()
      let tempDecrypt = systemStore.decryptJSON(state.itemshop.data)
      let temp = []
      if(tempDecrypt.length){
        temp = tempDecrypt.filter(x => x.type == 'pet')
        temp = state.hasItem(temp, 'pet')
        temp = state.separateItem(temp)
      }

      return temp
    },
    itemOther: state => {
      const systemStore = useSystemStore()
      let tempDecrypt = systemStore.decryptJSON(state.itemshop.data)
      let temp = []
      if(tempDecrypt.length){
        temp = tempDecrypt.filter(x => x.type == 'other')
        temp = state.hasItem(temp, 'other')
        temp = state.separateItem(temp)
      }

      return temp
    },

    isNewItem:state => state.itemshop.isNewItem,

    isLoaded:state => state.itemshop.isLoaded
  },
  actions: {
    // #region Get item shop
    async getItemShop() {

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()

      try {
        // let APIURL = `${process.env.NEWAPI_ASIA}itemShop-getItemShopV2`
        let APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/itemShop-getItemShopV2`

        let response = await axios.get(APIURL)

        if(response.data.length == 0){
          throw new Error('error')
        }

        let temp = []

        for (let i = 0; i < response.data.length; i++) {
          let res = response.data[i]

          res.image = `${pathItem}/${res.itemName}.png`

          if(res.dateBalance != 0){
            temp.push(res)
          }
        }

        let isNewItem = false

        let findNewItem = temp.find(x => x.isNew)

        if(findNewItem){
          isNewItem = true

          if(!sessionStorage.getItem('studentIdForFirstShowNewItemInItemShop')){
            sessionStorage.setItem('studentIdForFirstShowNewItemInItemShop', JSON.stringify([studentStore.studentId]))
          }else{

            let tempStudentId = JSON.parse(sessionStorage.getItem('studentIdForFirstShowNewItemInItemShop'))

            let findHaveStudent = tempStudentId.find(x => x == studentStore.studentId)

            if(findHaveStudent){
              isNewItem = false
            }else{
              tempStudentId.push(studentStore.studentId)
              sessionStorage.setItem('studentIdForFirstShowNewItemInItemShop', JSON.stringify(tempStudentId))
            }

          }

        }

        let tempEncrypt = systemStore.encryptJSON(temp)

        this.$patch({
          itemshop: {
            data: tempEncrypt,
            isLoaded: true,
            isEncrypted: true,
            isNewItem: isNewItem
          }
        })

        systemStore.systemLog({
          api: 'itemShop-getItemShopV2',
          store: this.$id,
          status: 'Success Get Item Shop',
          response: response.data
        })

        return "success"
      } catch (e) {
        systemStore.systemLog({
          api: 'itemShop-getItemShopV2',
          store: this.$id,
          status: 'Error Get Item Shop',
          description: e,
          isError: true
        })
        return e
      }
    },
    // #endregion

    // #region Buy item shop
    async buyItemShop(temp, color) {

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()
      const inventoryStore = useInventoryStore()

      let setTempId = temp.map(x => x.itemId)

      const APIURL = `${process.env.NEWAPI_ASIA}/itemShop-buyItemV2`

      const POSTDATA = {
        studentId: studentStore.studentId,
        itemIds: setTempId,
        color: color
      }

      try {

        const response = await axios.post(APIURL, POSTDATA)

        if(response.data != 'success'){
          throw new Error(response.data.message)
        }

        await inventoryStore.setInventory(temp);
        await studentStore.getStudentData()

        systemStore.systemLog({
          api: 'itemShop-buyItemV2',
          store: this.$id,
          post: POSTDATA,
          status: 'Success Buy Item Shop',
        })

        return 'success'
      } catch (e) {
        systemStore.systemLog({
          api: 'itemShop-buyItem',
          store: this.$id,
          post:POSTDATA,
          status: 'Error Buy Item Shop',
          description: e,
          isError: true
        })
        return 'error'
      }
    },
    // #endregion

    // #region Separate item
    separateItem(array) {
      let temp = []

      let setShowNumber = 6
      let totalPage = Math.ceil(array.length / setShowNumber)
      let start = 0
      let end = setShowNumber

      for (let i = 0; i < totalPage; i++) {
        let newSet = array.slice(start, end)
        temp.push(newSet)
        start += setShowNumber
        end += setShowNumber
      }

      return temp
    },
    // #endregion

    // #region Has item
    hasItem(array, type) {
      const inventoryStore = useInventoryStore()

      let temp = array

      temp.forEach(res => {
        let findHasItem = inventoryStore.list.filter(
          x => x.itemName == res.itemName
        )
        if (findHasItem.length) res.isHas = true
        else res.isHas = false
      })

      return temp
    },
    // #endregion

    // Setter
    setBuyItemshop(items, color) {
      this.$patch({
        itemshop: {
          temp: items,
          color: color,
          isUpdate: true
        }
      })
    },
  }
})
