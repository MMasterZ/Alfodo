import axios from 'axios'
import { defineStore } from 'pinia'
import { useStudentStore } from 'src/stores/student'
import { useSystemStore } from 'src/stores/system'
import { useInventoryStore } from 'src/stores/inventory'

const month_th = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
]

const month_mini_th = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
]

let serverTime = null

export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    news: {
      data: [],
      isLoaded: false,
      isEncrypted:false
    },
    mailbox:{
      data:[],
      isLoaded:false,
      isEncrypted:false
    },
  }),
  getters: {

    // news
    newsList: state => {

      const systemStore = useSystemStore()

      let temp = []

      if(state.news.isEncrypted){

        let tempDecrypt = systemStore.decryptJSON(state.news.data)

        temp = tempDecrypt

      }

      return temp
    },

    // mailbox
    mailboxList: state => {
      const systemStore = useSystemStore()
      const inventoryStore = useInventoryStore()

      let temp = []

      if(state.mailbox.isEncrypted){

        let tempDecrypt =  systemStore.decryptJSON(state.mailbox.data)

        tempDecrypt = tempDecrypt.filter(item => {
          return !item.isDelete
        })

        tempDecrypt.map(x => {

          if(x.type == 'giftbox'){

            x.item.map(xx => {

              if(xx.type != 'coin' && xx.type != 'key'){
                let findItem = inventoryStore.list.find(y => y.itemName == xx.itemName)

                if(findItem){
                  xx.isDuplicate = true
                }

              }

            })

            x.item.sort((a,b) => {
              const order = [
                'key',
                'coin',
                'limited pet',
                'limited other',
                'limited head',
                'limited body',
                'limited footer',
                'common pet',
                'common other',
                'common head',
                'common body',
                'common footer',
              ]

              const getTypeOrder = (item) => {
                if(item.type == 'coin' || item.type == 'key'){
                  return order.indexOf(item.type)
                }else if(item.grade){
                  return order.indexOf(`${item.grade} ${item.type}`)
                }
                return order.length + 1
              }

              const aIndex = getTypeOrder(a)
              const bIndex = getTypeOrder(b)

              if (aIndex === -1) return 1;
              if (bIndex === -1) return -1;

              return aIndex - bIndex;
            })

          }

          return x

        })

        temp = tempDecrypt

      }

      return temp
    },

    // mailbox item
    mailboxItem: state =>  {
      const systemStore = useSystemStore()

      const inventoryStore = useInventoryStore()

      let temp = []

      if(state.mailbox.isEncrypted){

        let tempDecrypt =  systemStore.decryptJSON(state.mailbox.data)

        let tempHaveItem = tempDecrypt.filter(item => item.type === 'giftbox' && !item.isReceivedReward)

        let tempItem = []
        let listOfDuplicate = []

        for (let i = 0; i < tempHaveItem.length; i++) {
          let item = tempHaveItem[i]

          item.item.map(x => {

            if(x.type == 'coin' || x.type == 'key'){
              x.amount = Number(x.amount)
            }else{

              let findItemInventory = inventoryStore.list.find(z => x.itemName === z.itemName)

              if(findItemInventory){
                x.isDuplicate = true
              }else{

                let findDuplicate = listOfDuplicate.find(y => y == x.itemName)

                if(findDuplicate){
                  x.isDuplicate = true
                }else{
                  listOfDuplicate.push(x.itemName)
                }

              }

            }

            return x
          })

          tempItem = [...tempItem, ...item.item]
        }

        tempItem.forEach(res => {

            if(res.type == 'coin'){

              let findCoin = temp.find(x => x.type == 'coin')

              if(findCoin){
                findCoin.amount += Number(res.amount)
              }else{
                temp = [...temp, res]
              }

            }else if(res.type == 'key'){

              let findKey = temp.find(x => x.type == 'key')

              if(findKey){
                findKey.amount += Number(res.amount)
              }else{
                temp = [...temp, res]
              }
            }else{

              temp = [...temp, res]
            }

        })

        temp.sort((a,b) => {
          const order = [
            'key',
            'coin',
            'limited pet',
            'limited other',
            'limited head',
            'limited body',
            'limited footer',
            'common pet',
            'common other',
            'common head',
            'common body',
            'common footer',
          ]

          const getTypeOrder = (item) => {
            if(item.type == 'coin' || item.type == 'key'){
              return order.indexOf(item.type)
            }else if(item.grade){
              return order.indexOf(`${item.grade} ${item.type}`)
            }
            return order.length + 1
          }

          const aIndex = getTypeOrder(a)
          const bIndex = getTypeOrder(b)

          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;

          return aIndex - bIndex;
        })

      }



      return temp

    },

    // Read News and Mailbox
    isReadAll: state => {

      const systemStore = useSystemStore()

      let isCompleteMailbox = true
      if(state.mailbox.isEncrypted){

        let tempDecrypt =  systemStore.decryptJSON(state.mailbox.data)

        isCompleteMailbox = tempDecrypt.every(x => x.type == 'message' && x.isRead || x.type == 'giftbox' && x.isReceivedReward)

      }

      let isCompleteNews = true
      if(state.news.isEncrypted){

        let tempDecrypt =  systemStore.decryptJSON(state.news.data)

        isCompleteNews = tempDecrypt.every(
          x => x.isRead
        )

      }

      return isCompleteMailbox && isCompleteNews ? true : false
    },

  },
  actions: {

    // #region Get News
    async getNews() {
      // if (this.news.isLoaded) return

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()

      try {

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/news-getNewsByStudentTypeV2?studentType=${studentStore.studentType}&studentId=${studentStore.studentId}`

        // const APIURL = `http://192.168.1.50:5001/winnerenglish2-e0f1b/us-central1/news-getNewsByStudentTypeV2?studentType=${studentStore.studentType}&studentId=${studentStore.studentId}`

        const response = await axios.get(APIURL)

        if(response.status != 200){
          throw new Error('Error Get News')
        }

        let temp = response.data

        temp.forEach(item => {
          let date = systemStore.formatDate(item.timestamp
          )
          item.date = date
        })

        temp.sort((a, b) => {
          return a.date.timestamp > b.date.timestamp ? -1 : 1
        })

        let tempEncrypt = systemStore.encryptJSON(temp)

        this.$patch({
          news: {
            data: tempEncrypt,
            isLoaded: true,
            isEncrypted: true
          }
        })

        systemStore.systemLog({
          api: "news-getNewsByStudentType",
          store: this.$id,
          status: "Success Get News",
          get: {
            studentType: studentStore.studentType
          },
          response: temp
        })

        return 'success'

      } catch (e) {
        systemStore.systemLog({
          api: "news-getNewsByStudentType",
          store: this.$id,
          status: "Error Get News",
          description: e,
          isError: true
        })

        return 'error'

      }
    },
    // #endregion

    // #region Get Mailbox
    async getMailbox() {

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()
      const inventoryStore = useInventoryStore()

      try{

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/mailbox-get?studentId=${studentStore.studentId}&schoolId=${studentStore.schoolId}`

        const response = await axios.get(APIURL)

        if(response.data.message != 'success'){
          throw new Error('Error Get Mailbox')
        }

        if(response.data.mailbox.length){

          let tempMailbox = response.data.mailbox

          tempMailbox.forEach(res => {

            let date = new Date(`${res.sendDate.date} ${res.sendDate.time}:00`)

            res.item.map(x => {

              let findItem = inventoryStore.list.find(y => y.itemName == x.itemName)

              if(findItem){
                x.isDuplicate = true
              }

            })

            res.isTimeout = false

            res.startDate = `${date.getDate()} ${month_mini_th[date.getMonth()]} ${date.getFullYear() + 543}`

            res.timestamp = date.getTime()

          })

          tempMailbox.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)

          let tempEncrypt = systemStore.encryptJSON(tempMailbox)

          this.$patch({
            mailbox: {
              data: tempEncrypt,
              isLoaded: true,
              isEncrypted: true
            }
          })

        }

        systemStore.systemLog({
          api: "mailbox-get",
          store: this.$id,
          status: "Success Get Mailbox",
          get: {
            studentId: studentStore.studentId,
            schoolId: studentStore.schoolId
          },
          response: response.data
        })

        return 'success'

      }catch(e){

        systemStore.systemLog({
          api: "mailbox-get",
          store: this.$id,
          status: "Error Get Mailbox",
          description: e,
          isError: true
        })

        return 'error'

      }


    },
    // #endregion

    // #region Read News
    async readNews(val) {

      if(val.isRead) return 'success'

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()

      const POSTDATA = {
        newsId: val.id,
        studentId: studentStore.studentId
      }

      try{

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/news-read`

        const response = await axios.post(APIURL,POSTDATA)

        if(response.data.message != 'success'){
          throw new Error('Error Read News')
        }

        let tempDecrypt = systemStore.decryptJSON(this.news.data)

        let temp = [...tempDecrypt]

        let findNews = temp.find(x => x.id === val.id)

        if(findNews){

          findNews.isRead = true

          let tempEncrypt = systemStore.encryptJSON(temp)

          this.$patch({
            news: {
              data: tempEncrypt,
            }
          })
        }

        systemStore.systemLog({
          api: "news-read",
          store: this.$id,
          status: "Success Read News",
          post: POSTDATA,
          response: response.data
        })

        return 'success'

      }catch(e){

        systemStore.systemLog({
          api: "news-read",
          store: this.$id,
          status: "Error Read News",
          post: POSTDATA,
          description: e,
          isError: true
        })

        return 'error'

      }

    },
    // #endregion

    // #region Claim all mailbox
    async claimAllMailbox() {

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()
      const inventoryStore = useInventoryStore()

      let findGiftbox = this.mailboxList.filter(x => x.type == 'giftbox' && !x.isReceivedReward)

      let tempPostGiftBox = []

      if(findGiftbox.length){

        tempPostGiftBox = [...findGiftbox]

        tempPostGiftBox = tempPostGiftBox.map(x => {
          return {
            mailLogId:x.logId,
            mailBoxId:x.mailboxId,
            items:x.item
          }
        })

      }

      const POSTDATA = {
        mails:tempPostGiftBox || [],
        studentId:studentStore.studentId
      }

      try{

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/mailbox-claimItem`

        const response = await axios.post(APIURL,POSTDATA)

        if(response.data.message != 'success'){
          throw new Error("Error Claim reward all")
        }

        let findItemForInventory = findGiftbox.map(x => x.item.filter(y => y.type != 'coin' && y.type != 'key'))

        findItemForInventory = findItemForInventory.flat();

        if(findItemForInventory.length){
          inventoryStore.setInventory(findItemForInventory)
        }

        let tempDecrypt = systemStore.decryptJSON(this.mailbox.data)

        let temp = [...tempDecrypt]

        if(temp.length){
          temp.map((item,index) => {

            let findLogId = findGiftbox.find(x => x.logId == item.logId)

            if(findLogId){
              item.isReceivedReward = true
              item.isRead = true
              if(item.isSelected){
                item.isSelected = true
              }else{
                item.isSelected = false
              }
            }

            return item
          })

          let tempEncrypt = systemStore.encryptJSON(temp)

          this.$patch({
            mailbox: {
              data: tempEncrypt,
            }
          })

        }

        await studentStore.getStudentData()

        systemStore.systemLog({
          store:this.$id,
          api:"mailbox-claimItem",
          post:POSTDATA,
          response:response.data,
          status:'Success Claim reward all'
        })

        return 'success'

      }catch(e){

        systemStore.systemLog({
          store:this.$id,
          api:"mailbox-claimItem",
          post:POSTDATA,
          status:"Error Claim rewrad all",
          description:e,
          isError:true
        })

        return "error"

      }

    },
    // #endregion

    // #region Claim reward
    async claimReward(val){

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()
      const inventoryStore = useInventoryStore()

      let POSTDATA = {
        mails:[{
          mailLogId:val.logId,
          mailBoxId:val.mailboxId,
          items:val.item
        }],
        studentId:studentStore.studentId
      }

      try{

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/mailbox-claimItem`

        const response = await axios.post(APIURL,POSTDATA)

        if(response.data.message != 'success'){
          throw new Error('Error Claim Reward')
        }

        let findItemInventory = val.item.filter(x => x.type != 'coin' && x.type != 'key')

        if(findItemInventory.length){
          inventoryStore.setInventory(findItemInventory)
        }

        let tempDecrypt = systemStore.decryptJSON(this.mailbox.data)

        let temp = [...tempDecrypt]

        let findMailbox = temp.find(x => x.logId == val.logId)

        if(findMailbox){

          findMailbox.isReceivedReward = true
          findMailbox.isSelected = true

          let tempEncrypt = systemStore.encryptJSON(temp)

          this.$patch({
            mailbox: {
              data: tempEncrypt,
            }
          })

        }

        await studentStore.getStudentData()

        systemStore.systemLog({
          api: "mailbox-claimItem",
          store: this.$id,
          status: "Success Claim Item Mailbox",
          post: POSTDATA,
          response:response.data
        })

        return "success"

      }catch(e){

        systemStore.systemLog({
          api: "mailbox-claimItem",
          store: this.$id,
          post: POSTDATA,
          status: "Error Claim Item Mailbox",
          description: e,
          isError: true
        })

        return 'error'

      }

    },
    // #endregion

    // #region Read mailbox
    async readMailbox(val) {

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()

      try{

        if(val.isRead) {
          return 'success'
        }

        this.setReadMailbox({logId:val.logId,isRead: true,isSelected:true})

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/mailbox-readMail?mailLogId=${val.logId}&studentId=${studentStore.studentId}`

        const response = await axios.get(APIURL)

        if(response.data.message != 'success'){
          throw new Error('Error Read Mailbox')
        }

        systemStore.systemLog({
          api: "mailbox-readMail",
          store: this.$id,
          status: "Success Read Mailbox",
          get: {
            mailLogId: val.logId,
            studentId:studentStore.studentId
          },
          response: response.data
        })

        return 'success'

      }catch(e){

        setTimeout(() => {
          this.setReadMailbox({logId:val.logId,isRead: false,isSelected:false})
        }, 5);

        systemStore.systemLog({
          api: "mailbox-readMail",
          store: this.$id,
          get:{
            mailLogId:val.logId,
            studentId:studentStore.studentId
          },
          status: "Error Read Mailbox",
          description: e,
          isError: true
        })

        return 'error'

      }

    },
    // #endregion

    // #region Delete all mailbox
    async deleteAllMailbox(){

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()

      let tempMailbox = this.mailboxList.filter(x => (x.type == 'message' && x.isRead && !x.isDelete) || (x.type == 'giftbox' && x.isReceivedReward && !x.isDelete && x.isRead))

      if(tempMailbox.length){
        tempMailbox = tempMailbox.map(x => x.logId)
      }

      const POSTDATA = {
        mailLogId:tempMailbox,
        studentId:studentStore.studentId,
      }

      try{

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/mailbox-deleteMail`

        const response = await axios.post(APIURL,POSTDATA)

        if(response.data.message != 'success'){
          throw new Error("Error Delete all mailbox")
        }

        let tempDecrypt = systemStore.decryptJSON(this.mailbox.data)

        let temp = [...tempDecrypt]

        if(temp.length){
          temp.map(x => {
            if(tempMailbox.includes(x.logId)){
              x.isDelete = true
              x.isSelected = false
            }
            return x
          })
        }

        let tempEncrypt = systemStore.encryptJSON(temp)

        this.$patch({
          mailbox: {
            data: tempEncrypt,
          }
        })

        systemStore.systemLog({
          api: "mailbox-deleteMail",
          store: this.$id,
          status: "Success Delete All Mailbox",
          post: POSTDATA,
          response: response.data
        })

        return 'success'

      }catch(e){

        systemStore.systemLog({
          api: "mailbox-deleteMail",
          store: this.$id,
          post: POSTDATA,
          status: "Error Delete All Mailbox",
          description: e,
          isError: true
        })

        return "error"

      }

    },
    // #endregion

    // #region Delete mailbox
    async deleteMailbox(val) {

      const systemStore = useSystemStore()
      const studentStore = useStudentStore()

      const POSTDATA = {
        mailLogId:[val.logId],
        studentId:studentStore.studentId
      }

      try{

        const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/mailbox-deleteMail`

        const response = await axios.post(APIURL,POSTDATA)

        if(response.data.message != 'success'){
          throw new Error('Error Delete Mailbox')
        }

        let tempDecrypt = systemStore.decryptJSON(this.mailbox.data)

        let temp = [...tempDecrypt]

        let findDeleteMail = temp.find(x => x.logId == val.logId)

        if(findDeleteMail.isSelected){
          findDeleteMail.isSelected = false
        }

        if(findDeleteMail){
          findDeleteMail.isDelete = true
        }

        let tempEncrypt = systemStore.encryptJSON(temp)

        this.$patch({
          mailbox: {
            data: tempEncrypt,
          }
        })

        systemStore.systemLog({
          api: "mailbox-deleteMail",
          store: this.$id,
          status: "Success Delete Mailbox",
          post: POSTDATA,
          response: response.data
        })

        return 'success'

      }catch(e){

        systemStore.systemLog({
          api: "mailbox-deleteMail",
          store: this.$id,
          post: POSTDATA,
          status: "Error Delete Mailbox",
          description: e,
          isError: true
        })

        return 'error'

      }

    },
    // #endregion

    // #region Clear Selected
    clearSelected(){

      const systemStore = useSystemStore()

      if(this.mailbox.isEncrypted){

        let tempDecrypt = systemStore.decryptJSON(this.mailbox.data)

        let temp = [...tempDecrypt]

        temp.forEach(item => {
          item.isSelected = false
        })

        let tempEncrypt = systemStore.encryptJSON(temp)

        this.$patch({
          mailbox: {
            data: tempEncrypt,
          }
        })

      }

    },
    // #endregion

    // #region ***** Setters *****

    // #region Set Read Mailbox
    setReadMailbox({logId,isRead,isSelected}){

      const systemStore = useSystemStore()

      let tempDecrypt = systemStore.decryptJSON(this.mailbox.data)

      let temp = [...tempDecrypt]

      let findItem = temp.find(x => x.logId == logId)

      if(findItem){
        findItem.isRead = isRead
        findItem.isSelected = isSelected
      }

      let tempEncrypt = systemStore.encryptJSON(temp)

      this.$patch({
        mailbox: {
          data: tempEncrypt,
        }
      })

    },
    // #endregion

    // #endregion ****** Setters ******
  }
})
