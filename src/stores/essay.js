import { defineStore } from 'pinia'
import { useSystemStore } from './system'
import { useCourseStore } from './course'
import { useStudentStore } from './student'
import axios from 'axios'

// #region Lesson 1
let lesson_1 = {
  dragAndDrop:{
    correct_word:"ESSAY",
    choices:["E", "S", "S", "A", "Y"],
  },
  multipleChoice:[
    {
      question:"What is an Essay?",
      choices:[
        {
          index:0,
          text:"เรียงความภาษาอังกฤษที่มีโครงสร้างเป็นลำดับ"
        },
        {
          index:1,
          text:"เรียงความภาษาอังกฤษที่ไม่มีโครงสร้างเป็นลำดับ"
        },
      ],
      correctAnswer: 0,
    }
  ],
  matchChoice:[
    {
      question:"Introduction",
      choices:[
        {
          index:0,
          text:"บทนำ"
        },
        {
          index:1,
          text:"เนื้อหา"
        },
      ],
      correctAnswer: 0,
    },
    {
      question:"Body",
      choices:[
        {
          index:0,
          text:"บทสรุป"
        },
        {
          index:1,
          text:"เนื้อหา"
        },
      ],
      correctAnswer: 1,
    },
    {
      question:"Conclusion",
      choices:[
        {
          index:0,
          text:"เนื้อหา"
        },
        {
          index:1,
          text:"บทสรุป"
        },
      ],
      correctAnswer: 1,
    }
  ]
}
// #endregion

// #region Lesson 2
let lesson_2 = {
  multipleChoice:[
    {
      question:"จุดประสงค์ของบทนำในเรียงความคืออะไร?",
      choices:[
        {
          index:0,
          text:"เพื่อเขียนอธิบายเกี่ยวกับสิ่งที่ชอบ"
        },
        {
          index:1,
          text:"เพื่อแนะนำหัวข้อและดึงความสนใจของผู้อ่าน"
        },
      ],
      correctAnswer: 1,
    },
    {
      question:"ข้อใดต่อไปนี้ไม่ใช่ส่วนประกอบของบทนำ?",
      choices:[
        {
          index:0,
          text:"Supporting Details"
        },
        {
          index:1,
          text:"Opening Sentence"
        },
        {
          index:2,
          text:"Thesis Statement"
        },
        {
          index:3,
          text:"Context"
        },
      ],
      correctAnswer: 0,
    }
  ]
}
// #endregion

// #region Lesson 3
let lesson_3 = {
  matchChoice:[
    {
      question:"Topic Sentence",
      choices:[
        {
          index:0,
          text:"ประโยคนำ"
        },
        {
          index:1,
          text:"ประโยคสนับสนุน"
        },
      ],
      correctAnswer: 0,
    },
    {
      question:"Supporting Details",
      choices:[
        {
          index:0,
          text:"ยกตัวอย่าง"
        },
        {
          index:1,
          text:"ประโยคสนับสนุน"
        },
      ],
      correctAnswer: 1,
    },
    {
      question:"Example",
      choices:[
        {
          index:0,
          text:"ประโยคนำ"
        },
        {
          index:1,
          text:"ประโยคตัวอย่าง"
        },
      ],
      correctAnswer: 1,
    },
  ]
}
// #endregion

// #region Lesson 4
let lesson_4 = {
  jigsaw:{
    temp_questions: [
      {
        index: 0,
        text: "Restate Thesis <br/> Statement",
        type:"question",
        isDrag:false,
        position:{
          x:0,
          y:0,
        },
        answer: null,
        isCorrectAnswer:false,
        correctAnswer:1,
      },
      {
        index: 1,
        text: "Summary",
        type:"question",
        isDrag:false,
        position:{
          x:0,
          y:0,
        },
        answer: null,
        isCorrectAnswer:false,
        correctAnswer:0,
      },
      {
        index: 2,
        text: "Closing  Sentence",
        type:"question",
        isDrag:false,
        position:{
          x:0,
          y:0,
        },
        answer: null,
        isCorrectAnswer:false,
        correctAnswer:2,

      },
    ],
    temp_answers: [
      {
        index: 0,
        text: "ทบทวนประเด็นหลัก <br/> ที่กล่าวไว้",
        type:"answer",
        isDrag:false,
      },
      {
        index: 1,
        text: "เขียนซ้ำแนวคิด <br/> หลักในรูปแบบใหม่",
        type:"answer",
        isDrag:false,
      },
      {
        index: 2,
        text: "บอกความรู้สึก/สิ่งที่ต้องการ <br/> สื่อเป็นประโยคสุดท้าย",
        type:"answer",
        isDrag:false,
      },
    ],
  }
}
// #endregion

// #region Lesson 5
let lesson_5 = {
  multipleChoice:[
    {
      question:"ข้อใดเป็นคำเชื่อมที่ใช้แสดงความตรงข้าม",
      choices:[
        {
          index:0,
          text:"และ (and)"
        },
        {
          index:1,
          text:"แต่ (but)"
        },
        {
          index:2,
          text:"เพราะว่า (because)"
        },
      ],
      correctAnswer: 1,
    },
    {
      question:"ข้อใดเป็นคำเชื่อมที่ใช้เพื่อแสดงผลลัพธ์?",
      choices:[
        {
          index:0,
          text:"นอกจากนี้ (also)"
        },
        {
          index:1,
          text:"แต่ (but)"
        },
        {
          index:2,
          text:"ดังนั้น (so)"
        },
      ],
      correctAnswer: 2,
    },
    {
      question:`คำว่า "In conclusion" ควรใช้เมื่อใด?`,
      choices:[
        {
          index:0,
          text:"เมื่อจะตั้งคำถาม"
        },
        {
          index:1,
          text:"เมื่อต้องการยกตัวอย่าง"
        },
        {
          index:2,
          text:"เมื่อต้องการสรุปตอนท้ายย่อหน้า"
        },
      ],
      correctAnswer: 2,
    },
  ]
}
// #endregion

// #region Tutorial
let tutorial_lesson_1 = {
  title:"Essay คืออะไร?",
  list:[
    {
      text:`สวัสดีทุกคน! วันนี้เราจะมารู้จักกับ Essay หรือ <br/> ‘เรียงความภาษาอังกฤษ’ กันนะครับ <br/>
      ฟังชื่อแล้วดูเหมือนยากใช่ไหม? แต่จริง ๆ แล้วไม่ยากเลย <br/> ถ้าเรารู้เคล็ดลับและโครงสร้าง`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`Essay ก็คือการเล่าเรื่องหรืออธิบาย <br/>
      ความคิดของเราเป็นภาษาอังกฤษที่มีโครงสร้างเป็นลำดับ`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`แต่ไม่ใช่เขียนประโยคปน ๆ กันไปนะ มันต้องมีโครงสร้าง <br/>
      เหมือนบ้านที่มี ‘ประตู – ห้องนั่งเล่น – และทางออก’`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`หรือพูดง่าย ๆ ว่า ต้องมี บทนำ (Introduction) – เนื้อหา <br>
      (Body) – และ บทสรุป (Conclusion)`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`เดี๋ยวเรามาดูตัวอย่าง Essay กันนะ หัวข้อเรื่อง <br>
      My Favourite Animal
      <div class="relative-position box-detail-tutorial" data-text="Introduction">
        &nbsp;&nbsp;&nbsp; Many people have a favourite animal. Some people like cats, birds, or fish. My favourite animal is the dog because it is clever and friendly.
      </div>

      <div class="relative-position box-detail-tutorial" data-text="Body">
        &nbsp;&nbsp;&nbsp; Dogs can learn many things and like to be with people. They can sit and stay, and they enjoy being around their owners. For example, my uncle’s dog waits at the gate and runs to him when he comes home.
      </div>

      <div class="relative-position box-detail-tutorial" data-text="Conclusion">
        &nbsp;&nbsp;&nbsp; In conclusion, dogs are special because they are smart and friendly. They can do many things and be nice. That’s why dogs are my favourite animal.
      </div>
      `,
      isLongMessage:true,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      <div class="relative-position box-detail-tutorial" data-text="Introduction">
        &nbsp;&nbsp;&nbsp; Many people have a favourite animal. Some people like cats, birds, or fish. My favourite animal is the dog because it is clever and friendly.
      </div>

      ลองสังเกตนะครับ… <br>
      ย่อหน้าแรก คือ Introduction บอกหัวข้อว่าเรื่องนี้เกี่ยว
      กับสัตว์ที่ชอบ พร้อมเหตุผลสั้น ๆ
      `,
      isLongMessage:true,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      <div class="relative-position box-detail-tutorial" data-text="Body">
        &nbsp;&nbsp;&nbsp; Dogs can learn many things and like to be with people. They can sit and stay, and they enjoy being around their owners. For example, my uncle’s dog waits at the gate and runs to him when he comes home.
      </div>

      ย่อหน้าที่สอง คือ Body อธิบายรายละเอียดว่าทำไมถึงชอบ
      สัตว์ชนิดนั้น และมีตัวอย่างประกอบ
      `,
      isLongMessage:true,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      <div class="relative-position box-detail-tutorial" data-text="Conclusion">
        &nbsp;&nbsp;&nbsp; In conclusion, dogs are special because they are smart and friendly. They can do many things and be nice. That’s why dogs are my favourite animal.
      </div>

      ย่อหน้าสุดท้าย คือ Conclusion สรุปอีกครั้งว่าพิเศษ
      อย่างไร และย้ำว่ามันคือสัตว์ที่เราชอบที่สุดเห็นไหมครับว่า Essay มีโครงสร้างชัดเจน อ่านแล้วเข้าใจง่าย <br>
      ทีนี้…เรามาลองเจาะลึกแต่ละส่วนกันนะครับ<br>เริ่มจากส่วนแรกเลย…
      `,
      isLongMessage:true,
      isListen:false,
      isVideo:false,
    }
  ],
  listMobile:[
    {
      text:`สวัสดีทุกคน! วันนี้เราจะมารู้จักกับ Essay หรือ ‘เรียงความภาษาอังกฤษ’ กันนะครับฟังชื่อแล้วดูเหมือนยากใช่ไหม? แต่จริงๆ แล้วไม่ยากเลย ถ้าเรารู้เคล็ดลับ และ โครงสร้าง`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`Essay ก็คือการเล่าเรื่องหรืออธิบาย
      ความคิดของเราเป็นภาษาอังกฤษที่มี
      โครงสร้างเป็นลำดับ`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`แต่ไม่ใช่เขียนประโยคปน ๆ กันไปนะ มันต้องมีโครงสร้างเหมือนบ้านที่มี ‘ประตู – ห้องนั่งเล่น – และทางออก’`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`หรือพูดง่าย ๆ ว่า ต้องมี
      บทนำ (Introduction) – เนื้อหา (Body) – และ บทสรุป (Conclusion) นั้นเอง`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`เดี๋ยวเรามาดูตัวอย่าง Essay กันนะ หัวข้อเรื่อง My Favourite Animal
      <div style="margin-top:20px;"></div>
      <div class="relative-position box-detail-tutorial long" data-text="Introduction">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Many people have a favourite animal. Some people like cats, birds, or fish. My favourite animal is the dog because it is clever and friendly.
      </div>

      <div class="relative-position box-detail-tutorial long" data-text="Body">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dogs can learn many things and like to be with people. They can sit and stay, and they enjoy being around their owners. For example, my uncle’s dog waits at the gate and runs to him when he comes home.
      </div>

      <div class="relative-position box-detail-tutorial long" data-text="Conclusion">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In conclusion, dogs are special because they are smart and friendly. They can do many things and be nice. That’s why dogs are my favourite animal.
      </div>
      `,
      isLongMessage:true,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      <div class="relative-position box-detail-tutorial long" data-text="Introduction">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Many people have a favourite animal. Some people like cats, birds, or fish. My favourite animal is the dog because it is clever and friendly.
      </div>
      ลองสังเกตนะครับ… <br>
      ย่อหน้าแรก คือ Introduction บอกหัวข้อ <br>
      ว่าเรื่องนี้เกี่ยวกับสัตว์ที่ชอบ พร้อมเหตุผล <br>
      สั้น ๆ
      `,
      isLongMessage:true,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      <div class="relative-position box-detail-tutorial long" data-text="Body">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dogs can learn many things and like to be with people. They can sit and stay, and they enjoy being around their owners. For example, my uncle’s dog waits at the gate and runs to him when he comes home.
      </div>
      ย่อหน้าที่สอง คือ Body อธิบาย <br>
      รายละเอียดว่าทำไมถึงชอบสัตว์ชนิดนั้น <br>
      และมีตัวอย่างประกอบ
      `,
      isLongMessage:true,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      <div class="relative-position box-detail-tutorial long" data-text="Conclusion">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; In conclusion, dogs are special because they are smart and friendly. They can do many things and be nice. That’s why dogs are my favourite animal.
      </div>
      ย่อหน้าสุดท้าย คือ Conclusion <br> สรุปอีกครั้งว่าพิเศษอย่างไร <br>
      และย้ำว่ามันคือสัตว์ที่เราชอบที่สุด <br>
      เห็นไหมครับว่า Essay มีโครงสร้างชัดเจน <br>
      อ่านแล้วเข้าใจง่าย”
      <br>
      <br>
      ทีนี้…เรามาทำกิจกรรมกันดีกว่าเมี้ยว <br>
      ไม่ยากหรอกมาเถอะ…
      `,
      isLongMessage:true,
      isListen:false,
      isVideo:false,
    },
  ],
}

let tutorial_lesson_2 = {
  title:"บทนำ (Introduction)",
  list:[
    {
      text:`หน้าที่ของบทนำคือ…ดึงความสนใจ! <br>
      เหมือนเวลาเพื่อนเล่าเรื่องแล้วเปิดด้วยประโยคที่ทำให้เรา <br>
      อยากฟังต่อ เช่น`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`‘คุณเคยเจอเหตุการณ์แปลก ๆ <br>
      ในบ้านตอนกลางคืนบ้างไหม?’ <br>
      เห็นไหม แค่นี้ก็อยากรู้แล้วว่าเรื่องจะไปทางไหน`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`ในบทนำมี 3 ส่วน คือ <br>
        <b style="font-family: 'mali-b';">1. Opening Sentence (ประโยคเปิดเรื่อง) </b> <br>
        <div style="padding-left:clamp(16.25px,1.625cqw,26px);">ประโยคที่ดึงความสนใจ เช่น คำถาม ความคิดเห็น  <br>
        หรือประสบการณ์
        </div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
        <b style="font-family: 'mali-b';">2. Context (บริบท) </b> <br>
        <div style="padding-left:clamp(16.25px,1.625cqw,26px);">เล่าพื้นหลังหรือบริบทให้ผู้อ่านเข้าใจหัวข้อ</div>
        <b style="font-family: 'mali-b';">3. Thesis Statement (แนวคิดหลัก) </b> <br>
        <div style="padding-left:clamp(16.25px,1.625cqw,26px);">ประโยคที่บอกว่าเราจะเขียนเกี่ยวกับอะไร</div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
  ],
  listMobile:[
    {
      text:`
      หน้าที่ของบทนำคือ…ดึงความสนใจ!<br>
      เหมือนเวลาเพื่อนเล่าเรื่องแล้วเปิดด้วย<br>
      ประโยคที่ทำให้เราอยากฟังต่อ เช่น`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      ‘คุณเคยเจอเหตุการณ์แปลกๆ ในบ้าน <br>
      ตอนกลางคืนบ้างไหม?’ เห็นไหม <br>
      แค่นี้ก็อยากรู้แล้วว่าเรื่องจะไปทางไหน`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      ในบทนำมี 3 ส่วน คือ <br>
      <b style="font-family: 'mali-b';">2. Opening Sentence</b> <br>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);"> <b>(ประโยคเปิดเรื่อง) </b> <br>
        ประโยคที่ดึงความสนใจ เช่น คำถาม <br> ความคิดเห็น หรือประสบการณ์
      </div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      2.<b style="font-family: 'mali-b';"> Context (บริบท) </b> <br>
      <div>เล่าพื้นหลังหรือบริบทให้ผู้อ่านเข้าใจหัวข้อ</div>
      3.<b style="font-family: 'mali-b';"> Thesis Statement (แนวคิดหลัก) </b> <br>
      <div>ประโยคที่บอกว่าเราจะเขียนเกี่ยวกับอะไร</div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
  ],
}

let tutorial_lesson_3 = {
  title:"เนื้อหา (Body)",
  list:[
    {
      text:`นี่คือหัวใจของ Essay เลยนะ <br>
      ตรงนี้เราจะขยายความคิดหลักที่บอกไว้ในบทนำ <br>
      ย่อหน้าในเนื้อหาจะมี 3 ส่วนเช่นกัน <br>
      <b style="font-family: 'mali-b';">1. Topic Sentence (ประโยคนำ) </b> <br>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);">ประโยคที่บอกหัวข้อของย่อหน้านั้น</div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      <b style="font-family: 'mali-b';">2. Supporting Details (ประโยคสนับสนุน) </b> <br>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);">เหตุผลหรือคำอธิบายที่ช่วยสนับสนุน</div>
      <b style="font-family: 'mali-b';">3. Example (ประโยคตัวอย่าง) </b>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);">ตัวอย่างจริงๆ  ที่ทำให้ผู้อ่านเห็นภาพชัดขึ้น</div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      จำไว้นะ…ตัวอย่างช่วยให้ Essay ของเรามีชีวิตชีวา <br>
      สมจริงและมีน้ำหนักมากขึ้น เหมือนทาสีให้บ้านของเรา <br>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
  ],
  listMobile:[
    {
      text:`
      นี่คือหัวใจของ Essay เลยนะ <br>
      ตรงนี้เราจะขยายความคิดหลักที่บอกไว้ใน <br>
      บทนำ ย่อหน้าในเนื้อหาจะมี 3ส่วนเช่นกัน
      <br>
      <b style="font-family: 'mali-b';">1. Topic Sentence (ประโยคนำ) </b> <br>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);"> ประโยคที่บอกหัวข้อของย่อหน้านั้น
      </div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      <b style="font-family: 'mali-b';">2. Supporting Details(ประโยคสนับสนุน) </b> <br>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);"> เหตุผลหรือคำอธิบายที่ช่วยสนับสนุน
      </div>

      <b style="font-family: 'mali-b';">3. Example(ประโยคตัวอย่าง)</b>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);">ตัวอย่าง
     จริงๆ ที่ทำให้ผู้อ่านเห็นภาพชัดขึ้น
      </div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      จำไว้นะ…ตัวอย่างช่วยให้ Essay ของเรา <br>
      มีชีวิตชีวา สมจริงและมีน้ำหนักมากขึ้น เหมือนทาสีให้บ้านของเรา
      <br>
      <br>
      สุดท้าย…
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    }
  ],
}

let tutorial_lesson_4 = {
  title:"บทสรุป (Conclusion)",
  list:[
    {
      text:`คือการรวบรวมสิ่งที่เราเล่ามาทั้งหมดให้กระชับและชัดเจน <br/>
      ในบทสรุปมักมี 3 ส่วน <br/>
      <b style="font-family: 'mali-b';">1. Restate Thesis (การพูดซ้ำแนวคิดหลัก) </b> <br/>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);">ย้ำแนวคิดหลักอีกครั้ง (แต่ใช้คำพูดใหม่)</div>`,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      <b style="font-family: 'mali-b';">2. Summary (การสรุปเนื้อหา) </b> <br>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);"> สรุปประเด็นสำคัญ </div>
      <b style="font-family: 'mali-b';">3. Closing Sentence (ประโยคปิดท้าย) </b> <br>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);">ประโยคปิดท้ายให้ผู้อ่านประทับใจ เช่น ความรู้สึก หรือข้อคิด</div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      เรามาลองทำแบบฝึกหัดเพื่อทดสอบความเข้าใจในเรื่อง  <br>
      บทสรุป (Conclusion) ถ้าพร้อมแล้ว กดปุ่มสีม่วงได้เลย!!!
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
  ],
  listMobile:[
    {
      text:`
      คือการรวบรวมสิ่งที่เราเล่ามาทั้งหมดให้ <br>
      กระชับและชัดเจน ในบทสรุปมักมี 3 ส่วน <br>
      <b style="font-family: 'mali-b';">1. Restate Thesis(การพูดซ้ำแนวคิดหลัก) </b> <br>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);"> ย้ำแนวคิดหลักอีกครั้ง(แต่ใช้คำพูดใหม่)
      </div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      <b style="font-family: 'mali-b';">2. Summary (การสรุปเนื้อหา) </b> <br>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);"> สรุปประเด็นสำคัญ
      </div>

      <b style="font-family: 'mali-b';">3. Closing Sentence (ประโยคปิดท้าย)</b>
      <div style="padding-left:clamp(16.25px,1.625cqw,26px);">ประโยคปิดท้ายให้ผู้อ่านประทับใจ <br> เช่น ความรู้สึก หรือข้อคิด
      </div>
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    },
    {
      text:`
      เรามาลองทำแบบฝึกหัดเพื่อทดสอบความ <br>
      เข้าใจเรื่อง บทสรุป (Conclusion) <br>
      ถ้าพร้อมแล้ว กดปุ่มสีม่วงได้เลย!!!
      `,
      isLongMessage:false,
      isListen:false,
      isVideo:false,
    }
  ],
}

let tutorial_lesson_5 = {
  title:"คำเชื่อม (Linking Words)",
  list:[
    // {
    //   text:`การเขียน Essay ที่ดี ไม่ใช่แค่เอาประโยคมาต่อกันเฉย ๆ <br>
    //   แต่ต้องทำให้ ความคิดในแต่ละประโยคเชื่อมโยงกัน <br>
    //   อย่างราบรื่น เหมือนเรากำลังเล่าเรื่องให้เพื่อนฟัง`,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`ถ้าพูดกระโดดไปมา เพื่อนก็จะงงใช่ไหมครับ? <br>
    //   ดังนั้น ‘คำเชื่อม’ จะเป็นเหมือนสะพานที่เชื่อมประโยคกับ <br>
    //   ประโยคให้ต่อกันได้ดี`,
    //   isLongMessage:false,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`คำเชื่อมมีหลายแบบ และแต่ละแบบก็ใช้ต่างกัน <br>
    //   คำเชื่อมแรกคือคำเชื่อม <b>แสดงเหตุผล (Reason)</b> <br>
    //   เช่น because, as <br>
    //   ขอยกตัวอย่างนะครับ…
    //   <div class="relative-position box-detail-tutorial" style="padding:clamp(9.375px,0.9375cqw,15px);font-size:clamp(12.5px,1.25cqw,20px);line-height:clamp(18.75px,1.875cqw,30px)">
    //     I enjoy reading comic books <b>because</b> they are fun and easy to understand. <br>
    //     ( ฉันชอบอ่านหนังสือการ์ตูน เพราะมันสนุกและเข้าใจง่าย )
    //   </div>
    //   คำว่า because ทำหน้าที่บอกเหตุผลว่าทำไมผู้เขียนถึงชอบ <br/>
    //   อ่านหนังสือการ์ตูน
    //   `,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`คำเชื่อมถัดมาคือ <b>เสริมความคิด (Adding ideas)</b> เช่น also,<br>
    //   and, in addition, too <br>
    //   ตัวอย่างเช่น..
    //   <div class="relative-position box-detail-tutorial" style="padding:clamp(9.375px,0.9375cqw,15px);font-size:clamp(12.5px,1.25cqw,20px);line-height:clamp(18.75px,1.875cqw,30px)">
    //     I help my mom clean the kitchen, <b>and</b> I <b>also</b> water the plants. <br>
    //     ( ฉันช่วยแม่ทำความสะอาดห้องครัว และฉันยังรดน้ำต้นไม้ด้วย )
    //   </div>
    //   <br>
    //   and ใช้เชื่อมความคิดที่ไปในทิศทางเดียวกัน ส่วน also <br/>
    //   ใช้เพิ่มอีกหนึ่งสิ่งที่ผู้เขียนทำ
    //   `,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`นอกจากนี้ เรายังมีคำเชื่อม <b>แสดงเวลา (Time)</b> เช่น when,<br>
    //   then, before, after, next, first, finally <br>
    //   และคำเชื่อม <b>สรุปความคิด (Conclusion)</b> เช่น in <br>
    //   conclusion, to sum up`,
    //   isLongMessage:false,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`เวลาเราอยากยกตัวอย่างเหตุการณ์หรือสิ่งต่าง ๆ <br>
    //   เราสามารถใช้คำเชื่อม <b>ให้ตัวอย่าง (Giving examples)</b> เช่น <br>
    //   for example, such as, like <br>
    //   ตัวอย่างประโยค <br>
    //   <div class="relative-position box-detail-tutorial" style="padding:clamp(9.375px,0.9375cqw,15px)">
    //     There are many fun activities to do in my free time. <b>For example</b>, I <br>
    //     like drawing and listening to music. <br>
    //     ( มีกิจกรรมสนุก ๆ หลายอย่างให้ทำในเวลาว่างของฉัน ตัวอย่างเช่น <br/> ฉันชอบวาดรูปและฟังเพลง )
    //   </div>
    //   <br>
    //   คำว่า For example ใช้เพื่อนำเสนอ ‘ตัวอย่าง’ ของกิจกรรม <br/>
    //   ที่สนุก
    //   `,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`และถ้าอยากแสดงความแตกต่างหรือผลลัพธ์ <br>
    //   เรามีคำเชื่อมอีก 2 แบบคือ… <br>
    //   <b style="font-family: Mali-B;">• แสดงการเปรียบเทียบ/ความตรงข้าม (Contrast)</b> เช่น <br>
    //   <div style="padding-left:clamp(16.25px,1.625cqw,26px);">but, however, although</div>
    //   <b style="font-family: Mali-B;">• แสดงผลลัพธ์ (Result) </b> เช่น so, therefore
    //   `,
    //   isLongMessage:false,
    //   isListen:false,
    //   isVideo:false,
    // },
    // #region Video
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/dbh2JQssBzQ',
      poster:'https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/video/tutorial/essay-tutorial-poster-1.webp',
      youtubeId:"dbh2JQssBzQ",
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/va9zedTxdUU',
      poster:'https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/video/tutorial/essay-tutorial-poster-2.webp',
      youtubeId:"va9zedTxdUU",
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/bLvUR26FNcg',
      poster:'https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/video/tutorial/essay-tutorial-poster-3.webp',
      youtubeId:"bLvUR26FNcg"
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/nSuDT0eERt8',
      poster:'https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/video/tutorial/essay-tutorial-poster-4.webp',
      youtubeId:"nSuDT0eERt8"
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/2p7M48oOsTg',
      poster:'https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/video/tutorial/essay-tutorial-poster-5.webp',
      youtubeId:"2p7M48oOsTg"
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/lDq-udczXms',
      poster:'https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/video/tutorial/essay-tutorial-poster-6.webp',
      youtubeId:"lDq-udczXms",
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/gsakEViAU-U',
      poster:'https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/video/tutorial/essay-tutorial-poster-7.webp',
      youtubeId:"gsakEViAU-U",
    },
    // #endregion
    // {
    //   text:`วันนี้เราเห็นแล้วว่า Essay ไม่ยากเลย! <br>
    //   แค่จำ 3 ส่วนให้แม่น Introduction, Body, Conclusion <br>
    //   แล้วใช้ คำเชื่อม (Linking Words) ให้ประโยคไหลลื่น <br>`,
    //   isLongMessage:false,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`พูดง่าย ๆ ก็คือ...<br>
    //   <b>โครงสร้าง + คำเชื่อม = เรียงความที่ด</b><br>
    //   คราวหน้า มาลองเขียนของตัวเองดูสิ~ <br>
    //   ครูนกเชื่อว่าของทุกคนต้อง น่าอ่านสุด ๆ เลย`,
    //   isLongMessage:false,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`เอาล่ะ! ต่อไปครูนกมี ตารางสรุป Linking Words มาฝาก <br>
    //   เด็กๆ จะได้เลือกใช้ให้เหมาะกับ Essay ของตัวเองนะ~ <br>

    //   <div class="box-table-tutorial" align="center">
    //     <div class="table-row">
    //       <div class="table-header">
    //         หน้าที่ของคำเชื่อม
    //       </div>
    //       <div class="table-header">
    //         คำเชื่อม
    //       </div>
    //     </div>
    //     <div class="table-row">
    //       <div class="table-content">
    //         แสดงเหตุผล (Reason)
    //       </div>
    //       <div class="table-content">
    //         because, as
    //       </div>
    //     </div>
    //     <div class="table-row">
    //       <div class="table-content">
    //         เสริมความคิด (Adding ideas)
    //       </div>
    //       <div class="table-content">
    //         also, and, in addition, too
    //       </div>
    //     </div>
    //     <div class="table-row">
    //       <div class="table-content">
    //         แสดงเวลา (Time)
    //       </div>
    //       <div class="table-content">
    //         when, then, before, after, next, first, finally
    //       </div>
    //     </div>
    //     <div class="table-row">
    //       <div class="table-content">
    //         สรุปความคิด (Conclusion)
    //       </div>
    //       <div class="table-content">
    //         in conclusion, to sum up
    //       </div>
    //     </div>
    //     <div class="table-row">
    //       <div class="table-content">
    //         ให้ตัวอย่าง (Giving examples)
    //       </div>
    //       <div class="table-content">
    //         for example, such as, like
    //       </div>
    //     </div>
    //     <div class="table-row">
    //       <div class="table-content">
    //         แสดงการเปรียบเทียบ/ความตรงข้าม (Contrast)
    //       </div>
    //       <div class="table-content">
    //         but, however, although
    //       </div>
    //     </div>
    //     <div class="table-row">
    //       <div class="table-content">
    //         แสดงผลลัพธ์ (Result)
    //       </div>
    //       <div class="table-content">
    //         so, therefore
    //       </div>
    //     </div>
    //   </div>
    //   `,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:false,
    // },
  ],
  listMobile:[
    // {
    //   text:`การเขียน Essay ที่ดี ไม่ใช่แค่เอาประโยค
    //   มาต่อกันเฉย ๆ แต่ต้องทำให้ ความคิดใน
    //   แต่ละประโยคเชื่อมโยงกันอย่างราบรื่น เหมือนเรากำลังเล่าเรื่องให้เพื่อนฟัง
    //   `,
    //   isLongMessage:false,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`
    //   ถ้าพูดกระโดดไปมา เพื่อนก็จะงงใช่ไหม <br>
    //   ครับ? ดังนั้น ‘คำเชื่อม’ จะเป็นเหมือน <br>
    //   สะพานที่เชื่อมประโยคกับประโยคให้ต่อ <br>
    //   กันได้ดี
    //   `,
    //   isLongMessage:false,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`
    //   คำเชื่อมมีหลายแบบ และแต่ละแบบก็ใช้ <br>
    //   ต่างกัน คำเชื่อมแรกคือคำเชื่อม<b>แสดง <br>
    //   เหตุผล (Reason)</b> เช่น because, as <br>
    //   ขอยกตัวอย่างนะครับ… <br>
    //   <div class="relative-position box-detail-tutorial long" style="font-size:12px;">
    //     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I enjoy reading comic books <b>because</b> they <br>
    //     are fun and easy to understand. <br>
    //     ( ฉันชอบอ่านหนังสือการ์ตูน เพราะมันสนุก และ เข้าใจง่าย )
    //   </div>
    //   คำว่า because ทำหน้าที่บอกเหตุผลว่า
    //   ทำไม ผู้เขียนถึงชอบอ่านหนังสือการ์ตูน
    //   `,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`
    //   คำเชื่อมถัดมาคือ <b>เสริมความคิด (Adding <br>
    //    ideas)</b> เช่น also, and, in addition, too <br>
    //   ตัวอย่างเช่น…

    //   <div class="relative-position box-detail-tutorial long" style="font-size:12px;">
    //     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I help my mom clean the kitchen, <b>and</b> I <br>
    //      <b>also</b> water the plants. <br>
    //      (ฉันช่วยแม่ทำความสะอาดห้องครัว <br> และฉันยังรดน้ำต้นไม้ด้วย)
    //   </div>

    //   and ใช้เชื่อมความคิดที่ไปในทิศทาง <br>
    //   เดียวกัน ส่วน also ใช้เพิ่มอีกหนึ่งสิ่ง <br>
    //   ที่ผู้เขียนทำ
    //   `,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`
    //   นอกจากนี้ เรายังมีคำเชื่อม <b>แสดงเวลา <br>
    //   (Time) </b> เช่น when, then, before, after, <br>
    //   next, first, finally <br>
    //   และคำเชื่อม <b>สรุปความคิด (Conclusion) </b> <br>
    //    เช่น in conclusion, to sum up
    //   `,
    //   isLongMessage:false,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`
    //   เวลาเราอยากยกตัวอย่างเหตุการณ์หรือ <br>
    //   สิ่งต่าง ๆ เราสามารถใช้คำเชื่อม <br>
    //   <b>ให้ตัวอย่าง (Giving examples)</b> เช่น for <br>
    //   example, such as, like ตัวอย่างประโยค

    //   <div class="relative-position box-detail-tutorial long" style="font-size:12px;">
    //     There are many fun activities to do in my <br>
    //      free time. <b>For example</b>, I like drawing and <br>
    //      listening to music. ( มีกิจกรรมสนุกๆ <br>
    //       หลายอย่างให้ทำในเวลาว่าง <br>
    //     ของฉัน ตัวอย่างเช่น ฉันชอบวาดรูปและฟังเพลง )
    //   </div>

    //   คำว่า For example ใช้เพื่อนำเสนอ <br>
    //   ‘ตัวอย่าง’ ของกิจกรรมที่สนุก
    //   `,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`
    //   และถ้าอยากแสดงความแตกต่าง หรือ <br>
    //   ผลลัพธ์ เรามีคำเชื่อมอีก 2 แบบคือ <br>
    //   <b style="font-family: 'mali-b';">• แสดงการเปรียบเทียบ/ความตรงข้าม </b>
    //   <div style="padding-left:clamp(16.25px,1.625cqw,26px);">
    //     <b>(Contrast)</b> เช่น but , however, <br>
    //     although
    //   </div>

    //   <b style="font-family: 'mali-b';">• แสดงผลลัพธ์ (Result) </b> เช่น so,
    //   <div style="padding-left:clamp(16.25px,1.625cqw,26px);">
    //     therefore
    //   </div>

    //   `,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`
    //   แต่ไม่ต้องห่วง ครูมีเพลงช่วยให้จำง่ายๆ
    //   `,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:true,
    // },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: "https://youtu.be/dbh2JQssBzQ",
      youtubeId:"dbh2JQssBzQ",
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/va9zedTxdUU',
      youtubeId:"va9zedTxdUU",
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/bLvUR26FNcg',
      youtubeId:"bLvUR26FNcg",
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/nSuDT0eERt8',
      youtubeId:"nSuDT0eERt8",
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/2p7M48oOsTg',
      youtubeId:"2p7M48oOsTg",
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/lDq-udczXms',
      youtubeId:"lDq-udczXms",
    },
    {
      text:``,
      isLongMessage:true,
      isListen:false,
      isVideo:true,
      url: 'https://youtu.be/gsakEViAU-U',
      youtubeId:"gsakEViAU-U",
    },
    // {
    //   text:`
    //   วันนี้เราเห็นแล้วว่า Essay ไม่ยากเลย! <br>
    //   แค่จำ 3 ส่วนให้แม่น Introduction, Body, <br>
    //   Conclusion แล้วใช้ คำเชื่อม (Linking <br> Words) ให้ประโยคไหลลื่น
    //   `,
    //   isLongMessage:false,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`
    //   พูดง่าย ๆ ก็คือ...<br>
    //   <b>โครงสร้าง + คำเชื่อม = เรียงความที่ด</b> <br>
    //   คราวหน้า มาลองเขียนของตัวเองดูสิ~ <br>
    //   ครูนกเชื่อว่าของทุกคนต้อง น่าอ่านสุด ๆ <br>
    //   เลย
    //   `,
    //   isLongMessage:false,
    //   isListen:false,
    //   isVideo:false,
    // },
    // {
    //   text:`
    //   เอาล่ะ! ต่อไปครูนกมี ตารางสรุป Linking <br>
    //   Words มาฝาก เด็กๆ <br>
    //   จะได้เลือกใช้ให้เหมาะกับ Essay <br>
    //   ของตัวเองนะ~

    //   <div class="box-table-tutorial mobile" align="center">
    //     <div class="table-row mobile">
    //       <div class="table-header mobile">
    //         หน้าที่ของคำเชื่อม
    //       </div>
    //       <div class="table-header mobile">
    //         คำเชื่อม
    //       </div>
    //     </div>

    //     <div class="table-row mobile">
    //       <div class="table-content mobile">
    //         แสดงเหตุผล (Reason)
    //       </div>
    //       <div class="table-content mobile">
    //         because, as
    //       </div>
    //     </div>
    //     <div class="table-row mobile">
    //       <div class="table-content mobile">
    //         เสริมความคิด (Adding ideas)
    //       </div>
    //       <div class="table-content mobile">
    //         also, and, in addition, too
    //       </div>
    //     </div>
    //     <div class="table-row mobile">
    //       <div class="table-content mobile">
    //         แสดงเวลา (Time)
    //       </div>
    //       <div class="table-content mobile">
    //         when, then, before, after, next, first, finally
    //       </div>
    //     </div>
    //     <div class="table-row mobile">
    //       <div class="table-content mobile">
    //         สรุปความคิด (Conclusion)
    //       </div>
    //       <div class="table-content mobile">
    //         in conclusion, to sum up
    //       </div>
    //     </div>
    //     <div class="table-row mobile">
    //       <div class="table-content mobile">
    //         ให้ตัวอย่าง (Giving examples)
    //       </div>
    //       <div class="table-content mobile">
    //         for example, such as, like
    //       </div>
    //     </div>
    //     <div class="table-row mobile">
    //       <div class="table-content mobile">
    //         แสดงการเปรียบเทียบ/ความตรงข้าม (Contrast)
    //       </div>
    //       <div class="table-content mobile">
    //         but, however, although
    //       </div>
    //     </div>
    //     <div class="table-row mobile">
    //       <div class="table-content mobile">
    //         แสดงผลลัพธ์ (Result)
    //       </div>
    //       <div class="table-content mobile">
    //         so, therefore
    //       </div>
    //     </div>
    //   </div>
    //   `,
    //   isLongMessage:true,
    //   isListen:false,
    //   isVideo:false,
    // },
  ],
}
// #endregion

// และถ้าอยากแสดงความแตกต่างหรือผลลัพธ์ เรามีคำเชื่อมอีก 2 แบบคือ…
// แสดงการเปรียบเทียบ/ความตรงข้าม (Contrast) เช่น but, however, although
// แสดงผลลัพธ์ (Result) เช่น so, therefore

export const useEssayStore = defineStore('essayStore', {
  state:() => ({
    essay:{
      data:{
        lessonList:null,
        essaySuccessData:null,
      },
      practiceObject:{
        data:null,
        currentId:null,
        currentTopicId:null,
        writingData:null,
        writingAssessment:null,
      },
      name:"",
    }
  }),
  getters:{
    // #region Lesson List
    lessonList:state => {

      const systemStore = useSystemStore()

      let temp = []

      if(state.essay.data.lessonList){

        let decrypt = systemStore.decryptJSON(state.essay.data.lessonList);

        temp = decrypt;

      }

      return temp || []

    },
    // #endregion

    // #region Lesson Success
    lessonSuccess:state => {

      let isSuccess = state.lessonList.every(x => x.isPassed);

      if(isSuccess){
        return isSuccess;
      }

      return false;

    },
    // #endregion

    // #region Lesson Activity
    lessonActivity:state => {

      const systemStore = useSystemStore();

      if(state.essay.data.essaySuccessData){
        let decrypt_data = systemStore.decryptJSON(state.essay.data.essaySuccessData);

        if(decrypt_data.lesson2Count > 0){
          return true
        }

      }

      return false;
    },
    // #endregion

    // #region Essay Data
    essayData:state => {

      let temp = state.lessonList.find(x => `${x.name}` == `${state.essayName}`);

      return temp || null;
    },
    // #endregion

    // #region Drag And Drop
    dragAndDrop:state => {
      let new_data = null;

      if(state.essay.name == "lesson_1"){
        new_data = lesson_1.dragAndDrop;
      }

      return new_data;

    },
    // #endregion

    // #region Multiple Choice
    multipleChoice:state => {
      let new_data = null

      if(state.essay.name == "lesson_1"){
        new_data = lesson_1.multipleChoice;
      }else if(state.essay.name == "lesson_2"){
        new_data = lesson_2.multipleChoice;
      }else if(state.essay.name == "lesson_5"){
        new_data = lesson_5.multipleChoice;
      }

      return new_data;

    },
    // #endregion

    // #region Match Choice
    matchChoice:state => {
      let new_data = null

      if(state.essay.name == "lesson_1"){
        new_data = lesson_1.matchChoice;
      }else if(state.essay.name == "lesson_3"){
        new_data = lesson_3.matchChoice;
      }

      return new_data;

    },
    // #endregion

    // #region Jigsaw
    jigsaw:state => {
      let new_data = null;

      if(state.essay.name == "lesson_4"){
        new_data = lesson_4.jigsaw;
      }

      return new_data;
    },
    // #endregion

    // #region Essay Name
    essayName:state => {
      return state.essay.name;
    },
    // #endregion

    // #region Essay Lesson Tutorial
    essayLessonTutorial:state => {

      const systemStore = useSystemStore();

      let tutorial_data = {
        isTutorial:false,
      }

      let find_essay_tutorial = state.lessonList.find(x => `${x.name}` == `${state.essayName}`);

      if(find_essay_tutorial){
        tutorial_data = {
          isTutorial:find_essay_tutorial.isTutorial,
          name:state.essayName,
          ...find_essay_tutorial.tutorial,
        }
      }

      return tutorial_data;

    },
    // #endregion

    // #region Practice List Id
    practiceListId:state => {
      const systemStore = useSystemStore();

      let temp = null

      if(state.essay.practiceObject.currentId){
        temp = systemStore.decryptString(state.essay.practiceObject.currentId);
      }

      return temp;

    },
    // #endregion

    // #region Practice List
    practiceList:state => {

      const systemStore = useSystemStore();

      let temp = []

      if(state.essay.practiceObject.data){

        let decryptData = systemStore.decryptJSON(state.essay.practiceObject.data);

        temp = decryptData;

      }

      return temp;
    },
    // #endregion

    // #region Practice List Data
    practiceListData:state => {
      const systemStore = useSystemStore();

      let temp = null;

      if(state.essay.practiceObject.currentId){

        let decrypt_id = systemStore.decryptString(state.essay.practiceObject.currentId);
        let decrypt_list = systemStore.decryptJSON(state.essay.practiceObject.data);

        temp = decrypt_list.find(x => x.essayId == decrypt_id);

      }

      return temp;
    },
    // #endregion

    // #region Practice Id
    practiceId:state => {
      const systemStore = useSystemStore();

      let temp = null

      if(state.essay.practiceObject.currentTopicId){
        temp = systemStore.decryptString(state.essay.practiceObject.currentTopicId);
      }

      return temp;
    },
    // #endregion

    // #region Practice Data
    practiceData:state => {
      const systemStore = useSystemStore();

      let temp = null;

      if(state.essay.practiceObject.currentTopicId){

        let decrypt_id = systemStore.decryptString(state.essay.practiceObject.currentTopicId);

        temp = state.practiceListData.topics.find(x => x.topicId == decrypt_id);

      }

      return temp;
    },
    // #endregion

    // #region Writing Data
    writingData:state => {

      const systemStore = useSystemStore();

      let temp = null;

      if(state.essay.practiceObject.writingData){
        let decryptData = systemStore.decryptJSON(state.essay.practiceObject.writingData);

        temp = decryptData;
      }

      return temp;

    },
    // #endregion

    // #region Writing Assessment Data
    writingAssessmentData:state => {

      const systemStore = useSystemStore();

      let temp = null;

      if(state.essay.practiceObject.writingAssessment){
        let decryptData = systemStore.decryptJSON(state.essay.practiceObject.writingAssessment);

        temp = decryptData;
      }

      return temp;

    },
    // #endregion

    // #region Progress Score
    progressScore:state => {

      let progress = 0

      if(state.practiceListData.bestScore < 50){
        progress = 0;
      }else {
        progress = (state.practiceListData.bestScore - 45) / 50 * 100;
      }

      // if(progress > 95){
      //   progress = 100;
      // }

      // progress = 100;

      // progress = state.practiceListData.bestScore;

      // progress = (75 - 45) / 50 * 100;

      return progress;

    },
    // #endregion

    // #region Essay Success
    essaySuccess:state => {

      const systemStore = useSystemStore();

      let temp = {
        lesson2Count:0,
        lessonCount:0,
        lessonCountPractice:0,
        essayCount:0,
      }

      if(state.essay.data.essaySuccessData){
        let decrypt_data = systemStore.decryptJSON(state.essay.data.essaySuccessData);

        temp = decrypt_data

      }

      return temp

    },
    // #endregion

    // #region Is Get Reward
    isGetReward:state => {
      let isGet = false;

      if(state.practiceListData.rewardList){

        let find_reward = state.practiceListData.rewardList.find(x => {
          if(!x.isReceived){
            if(x.percentage <= state.practiceListData.bestScore){
              return true;
            }
          }

          return false;
        });

        if(find_reward){
          isGet = find_reward;
        }
      }

      return isGet;
    },
    // #endregion

    // #region Is Enable
    isEnable:state => {

      const studentStore = useStudentStore();
      const courseStore = useCourseStore();

      let isShow = true;

      if(studentStore.studentType == 'school'){
        if(Number(courseStore.currentLevel) < 7) isShow = false
      }

      return isShow;

    },
    // #endregion
  },
  actions:{
    // #region Get Data

      // #region Get Essay Practice
      async getEssayPractice(){

        const systemStore = useSystemStore();
        const studentStore = useStudentStore();

        try{

          const API_URL = `${process.env.NEWAPI_ASIA}/essay-getEssayModule?studentId=${studentStore.studentId}`

          const response = await axios.get(API_URL);

          if(response.data.message != 'success'){
            throw new Error(response.data.message);
          }

          let temp = []

          response.data.data.forEach(res => {
            let data = res;

            let newData = {
              ...data,
            }

            temp.push(newData);
          })

          let encryptedData = systemStore.encryptJSON(temp);

          this.essay.practiceObject.data = encryptedData;

          systemStore.systemLog({
            api: "getEssayPractice",
            store: this.$id,
            status: "Success Get Essay Practice",
            response: temp,
          })

          return "success";

        }catch(e){
          systemStore.systemLog({
            api: "getEssayPractice",
            store: this.$id,
            status: "Error Get Essay Practice",
            description: e,
          })
        }
      },
      // #endregion

      // #region Get Essay Lesson Log
      async getEssayLessonLog(){

        const systemStore = useSystemStore();
        const studentStore = useStudentStore();

        try{

          const API_URL = `${process.env.NEWAPI_ASIA}/essay-getLessonLog?studentId=${studentStore.studentId}`

          const response = await axios.get(API_URL);

          if(response.data.message != "success"){
            throw new Error(response.data.message);
          }

          const response_data = response.data.data

          let temp = [];

          for (let i = 0; i < 5; i++) {

            let find_tutorial = null

            if(i == 0){
              find_tutorial = tutorial_lesson_1;
            }else if(i == 1){
              find_tutorial = tutorial_lesson_2;
            }else if(i == 2){
              find_tutorial = tutorial_lesson_3;
            }else if(i == 3){
              find_tutorial = tutorial_lesson_4;
            }else if(i == 4){
              find_tutorial = tutorial_lesson_5;
            }

            let newData = {
              id:i + 1,
              name:`lesson_${i + 1}`,
              isPassed:false,
              isTutorial:false,
              isLock:true,
              tutorial:find_tutorial,
              type:"essayLesson",
            }

            if(i == 0 || response_data.lessonCountPractice >= i){
              newData.isLock = false;
            }

            if(response_data.lessonCount > i){

              newData.isTutorial = true;
            }

            if(response_data.lessonCountPractice > i){
              newData.isPassed = true;
            }

            temp.push(newData);

          }

          let encrypted_success = systemStore.encryptJSON(response.data.data);

          this.essay.data.essaySuccessData = encrypted_success;

          let encryptedData = systemStore.encryptJSON(temp);

          this.essay.data.lessonList = encryptedData;

          systemStore.systemLog({
            api: "getEssayLog",
            store: this.$id,
            status: "Success Get Essay Log",
            response: temp,
          })

          return "success";

        }catch(e){
          systemStore.systemLog({
            api: "getEssayLog",
            store: this.$id,
            status: "Error Get Essay Log",
            description: e,
          })
        }
      },
      // #endregion

      // #region Get Ai Suggestion
      async aiSuggestion(data){

        const systemStore = useSystemStore();
        const studentStore = useStudentStore();

        try{

          if(!data.introduction || !data.body || !data.conclusion) throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลจาก AI");

          const API_URL = `${process.env.NEWAPI_ASIA}/essay-AISuggestion`

          const POST_DATA = {
            studentId: studentStore.studentId,
            essayId: this.practiceListId,
            topic: this.practiceData.topicNameEn,
            introduction: data.introduction.answer,
            body: data.body.answer,
            conclusion: data.conclusion.answer,
            topicId: this.practiceData.topicId,
          }

          const RESPONSE = await axios.post(API_URL,POST_DATA);

          console.log("*** RESPONSE.data",RESPONSE.data);

          if(RESPONSE.data.message != 'success'){
            throw new Error(RESPONSE.data.message);
          }

          this.setAIQuotaUsage();

          systemStore.systemLog({
            api: "aiSuggestion",
            store: this.$id,
            status: "Success AI Suggestion",
            response: RESPONSE,
            post: POST_DATA,
          })

          return {
            data:RESPONSE.data.data,
            message:RESPONSE.data.message,
          }

        }catch(e){
          systemStore.systemLog({
            api: "aiSuggestion",
            store: this.$id,
            status: "*** Error AI Suggestion",
            description: e,
            isError:true,
          })

          return {
            data:null,
            message:e,
          }
        }

      },
      // #endregion

      // #region Get Ai Suggestion Part 2
      async getAiSuggestionPart2(data){

        const systemStore = useSystemStore();
        const studentStore = useStudentStore();

        try{

          if(!data) throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลจาก AI");

          let new_content = {};

          if (data) {
            let temp_content = data[data.selectedType];

            temp_content.forEach(x => {
              let newType = x.questionType;

              // Map question types to object keys
              const typeMapping = {
                "Opening Sentence": 'openingSentence',
                "Context": 'context',
                "Thesis Statement": 'thesisStatement',
                "Topic Sentence": 'topicSentence',
                "Supporting Details": 'supportingDetails',
                "Example": 'example',
                "Restate Thesis": 'restateThesis',
                "Summary": 'summary',
                "Closing Sentence": 'closingSentence'
              };

              newType = typeMapping[newType] || newType;

              let find_answer_question = x.questions;

              find_answer_question = find_answer_question.map(x => `${x.map(xx => `${xx.text}${xx.answer}`)}`).join(" ");

              if (find_answer_question.length) {

                new_content[newType] = find_answer_question;
              }

            });
          }

          const API_URL = `${process.env.NEWAPI_ASIA}/essay-AISuggestionPart2`

          const POST_DATA = {
            studentId: studentStore.studentId,
            essayId: this.practiceListId,
            topic: this.practiceData.topicNameEn,
            topicId: this.practiceData.topicId,
            type:data.selectedType,
            content:new_content,
          }

          const RESPONSE = await axios.post(API_URL,POST_DATA);

          if(RESPONSE.data.message != 'success'){
            throw new Error(RESPONSE.data.message);
          }

          systemStore.systemLog({
            api: "aiSuggestionPart2",
            store: this.$id,
            status: "Success AI Suggestion Part 2",
            response: RESPONSE,
            post: POST_DATA,
          })

          return {
            data:RESPONSE.data.data,
            message:RESPONSE.data.message,
          }

        }catch(e){
          systemStore.systemLog({
            api: "aiSuggestionPart2",
            store: this.$id,
            status: "*** Error AI Suggestion Part 2",
            description: e,
            isError:true,
          })

          return {
            data:null,
            message:e,
          }
        }
      },
      // #endregion

    // #endregion

    // #region Update Data

      // #region Save Lesson Log
      async saveLessonLog(time,lessonId){

        const systemStore = useSystemStore();
        const studentStore = useStudentStore();

        try{

          const API_URL = `${process.env.NEWAPI_ASIA}/essay-saveLessonLog`

          const POST_DATA = {
            studentId: studentStore.studentId,
            lessonId: lessonId,
            schoolId: studentStore.schoolId,
            startTime: time,
            type: "essayLesson",
          }

          const response = await axios.post(API_URL, POST_DATA);

          if(response.data.message != 'success'){
            throw new Error(response.data.message)
          }

          this.setEssayLessonData(response.data.data);

          systemStore.systemLog({
            api: "saveLessonLog",
            store: this.$id,
            status: "Success Save Lesson Log",
            response: response,
            post: POST_DATA,
          })

          return "success";

        }catch(e){

          systemStore.systemLog({
            api: "saveLessonLog",
            store: this.$id,
            status: "*** Error Save Lesson Log",
            description: e,
            isError:true,
          })

          return e

        }

      },
      // #endregion

      // #region Save Lesson Practice Log
      async saveLessonPracticeLog(time){

        const systemStore = useSystemStore();
        const studentStore = useStudentStore();

        try{

          if(this.essayData.isPassed) return "success";

          const API_URL = `${process.env.NEWAPI_ASIA}/essay-saveLessonLog`

          const POST_DATA = {
            studentId: studentStore.studentId,
            lessonId: this.essayData.id,
            schoolId: studentStore.schoolId,
            startTime: time,
            type: "essayLessonPractice",
          }

          const response = await axios.post(API_URL, POST_DATA);

          if(response.data.message != 'success'){
            throw new Error(response.data.message);
          }

          this.setEssayLessonData(response.data.data);

          let decrypt = systemStore.decryptJSON(this.essay.data.lessonList);

          if(decrypt){
            decrypt.map(x => {
              if(response.data.data.lessonCountPractice >= x.id){
                x.isPassed = true;
              }

              if((response.data.data.lessonCountPractice + 1) == x.id){
                x.isLock = false;
              }

              return x;
            })
          }

          let encryptedData = systemStore.encryptJSON(decrypt);

          this.essay.data.lessonList = encryptedData;

          systemStore.systemLog({
            api: "saveLessonLog",
            store: this.$id,
            status: "Success Save Lesson Practice Log",
            response: response,
            post: POST_DATA,
          })

          return "success";

        }catch(e){
          systemStore.systemLog({
            api: "saveLessonLog",
            store: this.$id,
            status: "*** Error Save Lesson Practice Log",
            description: e,
            isError:true,
          })

          return e
        }
      },
      // #endregion

      // #region Save Lesson 2 Practice Log
      async saveLesson2Log(time){

        const systemStore = useSystemStore();
        const studentStore = useStudentStore();

        try{

          const API_URL = `${process.env.NEWAPI_ASIA}/essay-saveLessonLog`

          const POST_DATA = {
            studentId: studentStore.studentId,
            lessonId: 'essayLesson2',
            schoolId: studentStore.schoolId,
            startTime: time,
            type: "essayLesson2",
          }

          const response = await axios.post(API_URL, POST_DATA);

          if(response.data.message != 'success'){
            throw new Error(response.data.message)
          }

          let encrypt = systemStore.encryptJSON(response.data.data);

          this.essay.data.essaySuccessData = encrypt;

          systemStore.systemLog({
            api: "saveLessonLog",
            store: this.$id,
            status: "Success Save Lesson 2 Log",
            response: response,
            post: POST_DATA,
          })

          return "success";

        }catch(e){
          systemStore.systemLog({
            api: "saveLessonLog",
            store: this.$id,
            status: "*** Error Save Lesson 2 Log",
            description: e,
            isError:true,
          })

          return e
        }
      },
      // #endregion

      // #region Save Writing Essay
      async saveWritingEssay(data){

        const systemStore = useSystemStore();
        const studentStore = useStudentStore();

        try{

          const API_URL = `${process.env.NEWAPI_ASIA}/essay-assessment`

          const POST_DATA = {
            studentId:studentStore.studentId,
            essayId:this.practiceListId,
            topic:this.practiceData.topicNameEn,
            introduction:data.introduction.answer,
            body:data.body.answer,
            conclusion:data.conclusion.answer,
            topicId:this.practiceData.topicId,
          }

          const response = await axios.post(API_URL,POST_DATA);

          if(response.data.message != 'success'){
            throw new Error(response.data.message);
          }

          await this.setWritingAssessmentData(response.data.data);

          systemStore.systemLog({
            api: "assessment",
            store: this.$id,
            status: "Success Save Writing Essay",
            response: response,
            post: POST_DATA,
          })

          return 'success'

        }catch(e){

          systemStore.systemLog({
            api: "assessment",
            store: this.$id,
            status: "*** Error Save Writing Essay",
            description: e,
            isError:true,
          })

          return e;

        }

      },
      // #endregion

      // #region Receive Reward
      async receiveReward(data){

        const systemStore = useSystemStore();
        const studentStore = useStudentStore();

        try{

          let items = [...data]

          let tempTime = [...items.map(x => {
            let newData = null
            if(x.reward != null){
              if(!x.isReceived){
                if(x.percentage <= this.practiceListData.bestScore){
                  if(x.reward.type == 'coin' || x.reward.type == 'key'){
                    newData = {
                      amount: x.reward.amount,
                      type: x.reward.type,
                      itemId:x.reward.itemId
                    }
                  } else {
                    newData = {
                      FPS: x.reward.FPS,
                      duration: x.reward.duration,
                      grade: x.reward.grade,
                      isBack: x.reward.isBack,
                      isFront: x.reward.isFront,
                      itemName: x.reward.itemName,
                      itemNameTh: x.reward.itemNameTh,
                      itemId: x.reward.itemId,
                      type: x.reward.type,
                    }
                  }
                }
              }
            }

            return newData || null
          })].filter(x => x != null);

          const API_URL = `${process.env.NEWAPI_ASIA}/essay-receiveReward`

          const POST_DATA = {
            studentId:studentStore.studentId,
            essayId:this.practiceListId,
            items:tempTime
          }

          const RESPONSE = await axios.post(API_URL,POST_DATA);

          if(RESPONSE.data.message != 'success'){
            throw new Error(RESPONSE.data.message);
          }

          let find_key = tempTime.filter(x => x.type == 'key');

          if(find_key.length){
            let total_key = find_key.reduce((acc,curr) => acc + curr.amount,0);
            studentStore.setPremiumKey(total_key);
          }

          let find_data = null

          if(RESPONSE.data.data.receivedItems.length){
            find_data = RESPONSE.data.data.receivedItems.map(x => {
              let newData = null
              if(data.find(y => y.reward.itemId == x)){
                newData = data.find(y => y.reward.itemId == x);
                newData.isReceived = true;
              }
              return newData;
            });

            data.map(x => {
              if(find_data.find(y => y.reward.itemId == x.reward.itemId) && !x.isReceived){
                x.isReceived = true;
              }
              return x;
            })

          }

          this.setReceiveRewardData(data);

          systemStore.systemLog({
            api: "receiveReward",
            store: this.$id,
            status: "Success Receive Reward",
            response: RESPONSE,
          })

          return {
            currentRewardList:data,
            showRewardData:find_data,
            message:'success'
          };
        }catch(e){
          systemStore.systemLog({
            api: "receiveReward",
            store: this.$id,
            status: "*** Error Receive Reward",
            description: e,
            isError:true,
          })

          return {
            currentRewardList:null,
            showRewardData:null,
            message:e.message
          }

        }

      },
      // #endregion

      // #region Backup Essay feedback log
      async backupEssayFeedbackLog(){

        const systemStore = useSystemStore();
        const studentStore = useStudentStore();

        try{

          const API_URL = `${process.env.NEWAPI_ASIA}/essay-backupEssayFeedBackLog`
          // const API_URL = `http://192.168.1.100:5001/winnerenglish2-e0f1b/asia-southeast1/essay-backupEssayFeedBackLog`

          const POST_DATA = {
            studentId:studentStore.studentId,
            topicId:this.practiceId,
          }

          const RESPONSE = await axios.post(API_URL,POST_DATA);

          if(RESPONSE.data.message != 'success'){
            throw new Error(RESPONSE.data.message);
          }

          let decrypt_data = systemStore.decryptJSON(this.essay.practiceObject.data);

          decrypt_data.map(x => {
            if(this.practiceListId == x.essayId){
              x.topics.map(y => {
                if(y.topicId == this.practiceId){
                  y.AIQuotaUsage = 0;
                  y.feedbackContent = null;
                  y.isFinishFeedback = false;
                }
              })
            }
          });

          let encrypted_data = systemStore.encryptJSON(decrypt_data);

          this.essay.practiceObject.data = encrypted_data;

          this.clearWritingData();

          systemStore.systemLog({
            api: "backupEssayFeedBackLog",
            store: this.$id,
            status: "Success Backup essay feedback log",
            response: RESPONSE,
          })

        }catch(e){
          systemStore.systemLog({
            api: "backupEssayFeedBackLog",
            store: this.$id,
            status: "*** Error Backup essay feedback log",
            description: e,
            isError:true,
          })

        }

      },
      // #endregion

      // #endregion

    // #region Setter
    setPracticeList(){
      const systemStore = useSystemStore();

      if(this.essay.practiceObject.data){
        let decryptData = systemStore.decryptJSON(this.essay.practiceObject.data);

        let encryptedData = systemStore.encryptJSON(decryptData);

        this.essay.practiceObject.practiceList = encryptedData;

        systemStore.systemLog({
          api: "setPracticeList",
          store: this.$id,
          status: "Success Set Practice List",
          response: encryptedData,
        })

      }
    },
    setCurrentPracticeListId(id){

      const systemStore = useSystemStore();

      let encryptedData = systemStore.encryptString(id);

      this.essay.practiceObject.currentId = encryptedData;
    },
    setCurrentTopicId(id){

      const systemStore = useSystemStore();

      let encryptedData = systemStore.encryptString(id);

      this.essay.practiceObject.currentTopicId = encryptedData;
    },
    setEssayName(name){
     this.essay.name = name;
    },
    setEssayListen(name){

      const systemStore = useSystemStore();

      if(this.essay.data.lessonList){
        let decryptData = systemStore.decryptJSON(this.essay.data.lessonList);

        decryptData.map(x => {
          if(x.name == name){
            x.isTutorial = true;
          }

          return x
        })

        let encryptedData = systemStore.encryptJSON(decryptData);

        this.essay.data.lessonList = encryptedData;

      }

    },
    setEssayLessonData(data){
      const systemStore = useSystemStore();

      if(this.essay.data.essaySuccessData){
        let encryptedData = systemStore.encryptJSON(data);
        this.essay.data.essaySuccessData = encryptedData;
      }
    },
    setWritingData(data,type){

      const systemStore = useSystemStore();

      let setData = {
        practice1:null,
        practice2:null,
        practice3:null,
      };

      let newType = ""

      if(type == 'practice-1'){
        newType = 'practice1'
      }else if(type == 'practice-2'){
        newType = 'practice2'
      }else if(type == 'practice-3'){
        newType = 'practice3'
      }

      if(this.essay.practiceObject.writingData){
        let decryptData = systemStore.decryptJSON(this.essay.practiceObject.writingData);

        setData.practice1 = decryptData.practice1 || null;
        setData.practice2 = decryptData.practice2 || null;
        setData.practice3 = decryptData.practice3 || null;

      }

      if(data != null){
        setData[newType] = data;

        let encryptedData = systemStore.encryptJSON(setData);

        this.essay.practiceObject.writingData = encryptedData;
      }

    },
    async setWritingAssessmentData(data){

      const systemStore = useSystemStore();

      let decryptData = null

      if(this.essay.practiceObject.writingAssessment){
        decryptData = systemStore.decryptJSON(this.essay.practiceObject.writingAssessment);
      }else{
        decryptData = data;
      }

      if(this.practiceListData){
        if(this.practiceListData.bestScore <= decryptData.totalScore){
          await this.getEssayPractice();
        }
      }

      let encryptedData = systemStore.encryptJSON(decryptData);
      this.essay.practiceObject.writingAssessment = encryptedData;

    },
    setReceiveRewardData(data){
      const systemStore = useSystemStore();

      if(this.essay.practiceObject.data){
        let decrypt_data = systemStore.decryptJSON(this.essay.practiceObject.data);

        decrypt_data.forEach(res => {
          if(res.essayId = this.practiceListId){
            res.rewardList = data;
          }

          return res;
        })

        let encrypted_data = systemStore.encryptJSON(decrypt_data);

        this.essay.practiceObject.data = encrypted_data;
      }

    },
    setAIQuotaUsage(){

      const systemStore = useSystemStore();

      if(this.essay.practiceObject.data){
        let decryptData = systemStore.decryptJSON(this.essay.practiceObject.data);
        decryptData.map(x => {
          if(this.practiceListId == x.essayId){
            x.topics.map(y => {
              if(y.topicId == this.practiceId){
                y.AIQuotaUsage++;
              }
            })
          }
        });

        let encryptedData = systemStore.encryptJSON(decryptData);

        this.essay.practiceObject.data = encryptedData;

      }

    },
    // #endregion

    // #region Set Data
    setData(){
      const systemStore = useSystemStore();

      let decrypt = systemStore.decryptJSON(this.essay.data.lessonList);

      let encrypt = systemStore.encryptJSON(decrypt);

      this.essay.data.lessonList = encrypt;

    },
    setFinishFeedBack(){

      const systemStore = useSystemStore();

      let decrypt_data = systemStore.decryptJSON(this.essay.practiceObject.data);

      decrypt_data.map(x => {
        if(this.practiceListId == x.essayId){
          x.topics.map(y => {
            if(y.topicId == this.practiceId){
              y.isFinishFeedback = true;
            }
            return y
          })
        }
        return x
      })

      let encrypted_data = systemStore.encryptJSON(decrypt_data);

      this.essay.practiceObject.data = encrypted_data;
    },
    // #endregion

    // #region Clear Data

      // #region Writing Data Clear
      clearWritingData(){
        this.essay.practiceObject.writingData = null;
      },
      // #endregion

      clearWritingAssessmentData(){
        this.essay.practiceObject.writingAssessment = null;
      },

    // #endregion
  },
})
