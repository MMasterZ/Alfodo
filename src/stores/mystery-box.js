import axios from "axios"
import { defineStore } from "pinia"
import { useStudentStore } from "./student"
import { useSystemStore } from "./system"
import { useInventoryStore } from "./inventory"

export const useMysteryBoxStore = defineStore('mysteryBoxStore', {
  state: () => ({
    mystery:{
      data:null,
      isEncrypted:false,
    },
    mysteryBoxStatus:{
      data:null,
      isLoaded:false,
    }
  }),
  getters:{
    // #region mystery box data
    mysteryBoxData: state => {
      const systemStore = useSystemStore()
      if(state.mystery.isEncrypted){
        let tempDecrypt = systemStore.decryptJSON(state.mystery.data)
        return tempDecrypt
      }
      return null
    },
    // #endregion

    // #region Standard Data
    standardData: state => {
      const systemStore = useSystemStore()

      let newData = null

      if(state.mystery.isEncrypted){

        let tempDecrypt = systemStore.decryptJSON(state.mystery.data)

        if(tempDecrypt){

          newData = {
            name:"standard",
            id:tempDecrypt.mysteryBoxStandardId,
            informationDetails: tempDecrypt.standardDetails,
            guaranteePoint:tempDecrypt.standardGuaranteePoint,
            banner:tempDecrypt.standardImageCover,
            rateDetail:tempDecrypt.standardRateDetail,
            maxGuaranteePoint:tempDecrypt.standardMaxGuaranteePoint,
            price:'0',
            currency:"coin",
            type:"standard",
            ...tempDecrypt.standardPrice,
          }

        }

      }

      return newData || null
    },
    // #endregion

    // #region Premium Data
    premiumData: state => {
      const systemStore = useSystemStore()

      let newData = null

      if(state.mystery.isEncrypted){

        let tempDecrypt = systemStore.decryptJSON(state.mystery.data)

        if(tempDecrypt){

          newData = {
            name:"premium",
            id:tempDecrypt.mysteryBoxPremiumId,
            informationDetails: tempDecrypt.premiumDetails,
            guaranteePoint:tempDecrypt.premiumGuaranteePoint,
            rateDetail:tempDecrypt.premiumRateDetail,
            maxGuaranteePoint:tempDecrypt.premiumMaxGuaranteePoint,
            price:'0',
            currency:"key",
            type:"premium",
            remaining:tempDecrypt.remaining,
            limitedList:[],
            ...tempDecrypt.premiumPrice,
          }

          if(tempDecrypt.limitedItemDisplay.length){

            let tempLimited = [...tempDecrypt.limitedItemDisplay]

            let minLimitedList = 0
            let maxLimitedList = 3
            let numOfLimitedList = 3
            let totalLimitedList = Math.round(tempLimited.length / numOfLimitedList)

            let tempLimitedListPage = []
            for (let i = 0; i < totalLimitedList; i++) {

              let temp = tempLimited.slice(minLimitedList,maxLimitedList)

              tempLimitedListPage.push(temp)

              minLimitedList += numOfLimitedList
              maxLimitedList += numOfLimitedList
            }

            newData.limitedList = tempLimitedListPage

          }

        }

      }

      return newData || null
    },
    // #endregion

    // #region Limited Rate Up Data
    limitedRateData: state => {

      const systemStore = useSystemStore()

      let newData = null

      if(state.mystery.isEncrypted){
        let tempDecrypt = systemStore.decryptJSON(state.mystery.data)

        if(tempDecrypt){

          newData = {
            limitedPoint: tempDecrypt.limitedPoint,
            rateUpList: tempDecrypt.rateUpItemSetSlider,
            exchangableCostumes: tempDecrypt.exchangableCostumes,
            informationDetails: tempDecrypt.rateUpDetails || '',
            rateUpCostumesPageList:[]
          }

          let tempRateUpList = []
          for (let i = 0; i < newData.rateUpList.length; i++) {
            let data = newData.rateUpList[i]

            let tempNewRateUpList = [{...data.head},
              {...data.body},
              {...data.footer},
              {...data.other},
              {...data.pet}]

            tempRateUpList.push(tempNewRateUpList)
          }

          newData.rateUpList = tempRateUpList

          if(tempDecrypt.exchangableCostumes.length){

            let tempExchange = [{
              amount:300,
              currency:"coin",
              itemName:"coin",
              itemNameTh:"เหรียญ",
              type:"coin",
              grade:"common",
              rarity:{
                label:'เหรียญ'
              }
            },...tempDecrypt.exchangableCostumes]

            let minExchangeLength = 0
            let maxExchangeLength = 9
            let numOfExchangeLength = 9
            let totalExchangeLength = Math.round(tempExchange.length / numOfExchangeLength)

            let tempRateUpCostumesPage = []
            for (let index = 0; index < totalExchangeLength; index++) {
              let temp = tempExchange.slice(minExchangeLength,maxExchangeLength)

              tempRateUpCostumesPage.push(temp)
              minExchangeLength += numOfExchangeLength
              maxExchangeLength += numOfExchangeLength
            }

            newData.rateUpCostumesPageList = tempRateUpCostumesPage
          }

        }
      }

      return newData || null

    },
    // #endregion

    // #region Is First Time
    isFirstTime: state => {
      const systemStore = useSystemStore()
      if(state.mystery.isEncrypted){
        let tempDecrypt = systemStore.decryptJSON(state.mystery.data)
        // return false
        return tempDecrypt.isFirstTime
      }
      // }
      return false
    },
    // #endregion

    // #region Is Check Confirm Standard Box Gacha
    isShowStandardWarningDialog: state => {
      const systemStore = useSystemStore()

      let isCheck = false

      if(state.mystery.isEncrypted){
        let tempDecrypt = systemStore.decryptJSON(state.mystery.data)
        isCheck = tempDecrypt.isShowStandardWarningDialog
      }

      return isCheck
    },
    // #endregion

    // #region Is Check Confirm Standard Box Gacha
    isShowPremiumWarningDialog: state => {

      const systemStore = useSystemStore()

      let isCheck = false

      if(state.mystery.isEncrypted){
        let tempDecrypt = systemStore.decryptJSON(state.mystery.data)
        isCheck = tempDecrypt.isShowPremiumWarningDialog
      }

      return isCheck

    },
    // #endregion

    // #region is Open Mystery Box
    isOpenMysteryBox: state => {

      const systemStore = useSystemStore()

      let isCheck = false

      if(state.mysteryBoxStatus.isLoaded){
        let tempDecrypt = systemStore.decryptJSON(state.mysteryBoxStatus.data)
        isCheck = tempDecrypt.status
      }

      return isCheck

    }
    // #endregion
  },
  actions:{
    // ***** Function *****

    // #region Get Mystery Box Status
    async checkMysteryBoxStatusOpen(){

      const systemStore = useSystemStore()

      if(this.mysteryBoxStatus.isLoaded) return

      try{

        const response = await axios.get(`${process.env.NEWAPI_ASIA}/mysteryBox-getMysteryBoxStatus`)

        if(response.data.message !== 'success'){
          throw new Error(response)
        }

        let tempEncrypt = systemStore.encryptJSON(response.data)

        this.$patch({
          mysteryBoxStatus:{
            data:tempEncrypt,
            isLoaded:true
          }
        })

        systemStore.systemLog({
          api: 'mysteryBox-getMysteryBoxStatus',
          status: "Success get Mystery Box status",
          store: this.$id
        })

        return 'success'

      }catch(e){

        systemStore.systemLog({
          api: 'mysteryBox-getMysteryBoxStatus',
          status: "Error get Mystery Box status",
          store: this.$id,
          description: e,
          isError: true,
        });

        return 'error'
      }

    },
    // #endregion

    // #region Get mystery box data
    async getMysteryBoxData(){

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()

      try{

        const APIURL = `${process.env.NEWAPI_ASIA}/mysteryBox-getMysteryBoxData?studentId=${studentStore.studentId}`

        const response = await axios.get(APIURL)

        if(response.data.message !== 'success'){
          throw new Error(response.data)
        }

        let tempEncrypt = systemStore.encryptJSON(response.data)

        this.$patch({
          mystery:{
            data: tempEncrypt,
            isEncrypted: true
          }
        })

        systemStore.systemLog({
          api: 'mysteryBox-getMysteryBoxData',
          get: {
            studentId: studentStore.studentId
          },
          status: "Success get Mystery Box Data",
          store: this.$id
        });

        return 'success'

      }catch(e){

        systemStore.systemLog({
          api: 'mysteryBox-getMysteryBoxData',
          status: "Error get Mystery Box Data",
          get:{
            studentId: studentStore.studentId
          },
          store: this.$id,
          description: e,
          isError: true,
        });

        return 'error'

      }

    },
    // #endregion

    // #region Random Mystery Box
    async funcRandomMysteryBox(type,mysteryBoxId) {

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()
      const inventoryStore = useInventoryStore()

      const APIURL = `${process.env.NEWAPI_ASIA}/mysteryBox-random`

      const POSTDATA = {
        type:type,
        studentId:studentStore.studentId,
        mysteryBoxId:mysteryBoxId,
      }

      try{

        const response = await axios.post(APIURL,POSTDATA)

        const responseData = response.data

        if(responseData.message == "coin is not enough" || responseData.message == "premium key is not enough"){
          throw new Error(responseData.message)
        }

        if(responseData.message == 'mystery box is not available'){
          throw new Error(responseData.message)
        }

        let isNewReward = false
        let isExchangeReward = false

        switch (responseData.message) {
          case "success get coin": // ได้เหรียญ
            isNewReward = true
            studentStore.setCurrentCoin(response.data.remainingCoin)
            break;
          case "duplicate item": // ถ้ามีของที่เคยได้แล้วเฉพาะที่ไม่ใช่ Limited
            studentStore.setCurrentCoin(response.data.remainingCoin)
            break;
          case "duplicate limited item": // ถ้ามีของที่เคยได้แล้วและเป็น Limited จะเพิ่ม Limited Point
              this.setGuaranteeLimitedPoint(responseData.limitedPoint)
            break;
          case "duplicate limited item full limited point": // ถ้ามีของที่เคยได้แล้วและเป็น Limited จะไม่เพิ่ม Limited Point
          isExchangeReward = true
            this.setGuaranteeLimitedPoint(responseData.limitedPoint)
            break;
          case "guarantee item": // จะได้ของที่ยังไม่ได้เสมอ
            isNewReward = true
            // กรณีที่เป็น premium จะได้ของที่ยังไม่ได้เสมอยกเว้น premium key จะไม่ถูกเก็บไปยัง Inventory
            if(type == 'premium'){
              await inventoryStore.setInventory([{isSeen:false,...responseData.item}])
            }else{
              studentStore.setCurrentPremiumKey(response.data.remainingKey)
            }

            studentStore.setCurrentCoin(response.data.remainingCoin)
            break;
          case "random success": // ได้ของที่ยังไม่ได้เสมอยกเว้น premium จะเป็น type อื่นเท่านั้น
            isNewReward = true
            await inventoryStore.setInventory([{isSeen:false,...responseData.item}])
            break
          default:
            break;
        }

        if(responseData.limitedPoint >= 10){
          isExchangeReward = true
        }

        if(type == 'standard'){
          this.setGuaranteePoint(type,responseData.standardGuaranteePoint)
          studentStore.setCurrentCoin(response.data.remainingCoin)
        }else{
          studentStore.setCurrentPremiumKey(response.data.remainingKey)
          this.setGuaranteePoint(type,responseData.premiumGuaranteePoint)
        }

        responseData.isNewReward = isNewReward
        responseData.isExchangeReward = isExchangeReward

        systemStore.systemLog({
          api: 'mysteryBox-random',
          post: POSTDATA,
          status: "Success Random Mystery Box",
          store: this.$id
        });

        responseData.message = 'success'

        return responseData

      }catch(e){

        systemStore.systemLog({
          api: 'mysteryBox-random',
          status: "Error Random Mystery Box",
          post: POSTDATA,
          store: this.$id,
          description: e,
          isError: true,
        })

        return 'error'
      }
    },
    // #endregion

    // #region Exchange Limited Item
    async exchangeLimitedItem(item){

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()
      const inventoryStore = useInventoryStore()

      const APIURL = `${process.env.NEWAPI_ASIA}/mysteryBox-exchangeLimitedItem`

      const POSTDATA = {
        studentId: studentStore.studentId,
        itemId: item.itemId
      }

      try{

        const response = await axios.post(APIURL,POSTDATA)

        if(response.data.message != 'success'){
          throw new Error('error')
        }

        this.setGuaranteeLimitedPoint(response.data.limitedPoint)

        await inventoryStore.setInventory([{...item}])

        systemStore.systemLog({
          store: this.$id,
          api: 'mysteryBox-exchangeLimitedItem',
          post: POSTDATA,
          status: "Success Exchange Limited Item",
        })

        return 'success'

      }catch(e){

        systemStore.systemLog({
          store: this.$id,
          api: 'mysteryBox-exchangeLimitedItem',
          post: POSTDATA,
          status: "Error Exchange Limited Item",
          description: e,
          isError: true
        })

        return 'error'
      }
    },
    // #endregion

    // #region Exchange Coin
    async exchangeCoin(){

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()

      const APIURL = `${process.env.NEWAPI_ASIA}/mysteryBox-exchangeCoin`

      const POSTDATA = {
        studentId: studentStore.studentId
      }

      try{

        const response = await axios.post(APIURL,POSTDATA)

        if(response.data.message != 'success'){
          throw new Error('error')
        }

        this.setGuaranteeLimitedPoint(response.data.limitedPoint)
        studentStore.setCurrentCoin(response.data.remainingCoin)

        systemStore.systemLog({
          store: this.$id,
          api: 'mysteryBox-exchangeCoin',
          post: POSTDATA,
          status: "Success Exchange Coin",
        })

        return 'success'

      }catch(e){

        systemStore.systemLog({
          store: this.$id,
          api: 'mysteryBox-exchangeCoin',
          post: POSTDATA,
          status: "Error Exchange Coin",
          description: e,
          isError: true
        })

        return 'error'

      }

    },
    // #endregion

    // #region Save Confirm Open Box
    async saveSkipWarningDialog(type){

      const studentStore = useStudentStore()
      const systemStore = useSystemStore()


      const APIURL = `${process.env.NEWAPI_ASIA}/mysteryBox-doNotShowWarningAgain`

      const POSTDATA = {
        studentId: studentStore.studentId,
        type:type
      }

      try{

        const response = await axios.post(APIURL,POSTDATA)

        if(response.data.message != 'success'){
          throw new Error('error')
        }

        let tempDecrypt = systemStore.decryptJSON(this.mystery.data)

        if(tempDecrypt){
          if(type == 'standard'){
            tempDecrypt.isShowStandardWarningDialog = false
          }else{
            tempDecrypt.isShowPremiumWarningDialog = false
          }
        }

        let tempEncrypt = systemStore.encryptJSON(tempDecrypt)

        this.$patch({
          mystery:{
            data:tempEncrypt
          }
        })

        systemStore.systemLog({
          store: this.$id,
          api: 'mysteryBox-doNotShowWarningAgain',
          post: POSTDATA,
          status: "Success Check Confirm Open Box",
        })

        return 'success'

      }catch(e){
        systemStore.systemLog({
          store: this.$id,
          api: 'mysteryBox-doNotShowWarningAgain',
          post: POSTDATA,
          status: "Error Check Confirm Open Box",
          description: e,
          isError: true
        })
        return 'error'
      }

    },
    // #endregion

    // ***** Setters *****

    // #region Set Guarantee Point
    setGuaranteePoint(type,point){

      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(this.mystery.data)

      if(tempDecrypt){
        if(type == 'standard'){
          tempDecrypt.standardGuaranteePoint = point
        }else if(type == 'premium'){
          tempDecrypt.premiumGuaranteePoint = point
        }
      }

      let tempEncrypt = systemStore.encryptJSON(tempDecrypt)

      this.$patch({
        mystery:{
          data:tempEncrypt
        }
      })
    },
    // #endregion

    // #region Set Guarantee Limited Point
    setGuaranteeLimitedPoint(point){

        const systemStore = useSystemStore()

        let tempDecrypt = systemStore.decryptJSON(this.mystery.data)

        if(tempDecrypt){
          tempDecrypt.limitedPoint = point
        }

        let tempEncrypt = systemStore.encryptJSON(tempDecrypt)

        this.$patch({
          mystery:{
            data:tempEncrypt
          }
        })

    },
    // #endregion

    // #region set Finish Tutorial
    setFinishTutorial(){

      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(this.mystery.data)

      if(tempDecrypt){
        tempDecrypt.isFirstTime = false
      }

      let tempEncrypt = systemStore.encryptJSON(tempDecrypt)

      this.$patch({
        mystery:{
          data:tempEncrypt
        }
      })

    }
    // #endregion
  }
})
