// id: 1,
// question: "",
// meaning: "",
// userAnswer: {},
// audioURL: "",
// recorderUrl: "",
// displayText: [],
// type: "",

// // Boolearn
// isQuestion: false,
// isRecorder: false,
// isNextQuestion:false,

const list = [
  {
    id: 1,
    instruction: "",
    question: "Question 1",
    meaning: "คำถามที่ 1",
    answers: [],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "",

    // Boolearn
    isQuestion: true,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 2,
    instruction: "พิมพ์คำตอบเป็นภาษาอังกฤษลงในช่องว่าง",
    question: "Answer: Fill in the blank [].",
    meaning: "คำตอบแบบช่องว่าง []",
    answers: [],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "fillintheblank",

    // Boolearn
    isQuestion: false,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 3,
    instruction: "",
    question: "Question 2",
    meaning: "คำถามที่ 2",
    answers: [],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "",

    // Boolearn
    isQuestion: true,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 4,
    instruction: "เลือกคำตอบที่ต้องการ",
    question: "Answer: Alternative Answer. []",
    meaning: "คำตอบแบบทางเลือก []",
    answers: [
      {
        text: "Northern",
        meaning: "ภาคเหนือ",
        questionOrder: 5,
        isFinish: false,
      },
      {
        text: "Southern",
        meaning: "ภาคใต้",
        questionOrder: 7,
        isFinish: false,
      }, {
        text: "Central",
        meaning: "ภาคกลาง",
        questionOrder: 9,
        isFinish: false,
      },
    ],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "multiplechoice",

    // Boolearn
    isQuestion: false,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 5,
    instruction: "",
    question: "Question 3",
    meaning: "คำถามที่ 3",
    answers: [],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "",

    // Boolearn
    isQuestion: true,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 6,
    instruction: "เลือกคำตอบที่ต้องการ",
    question: "Answer for Question 3 []",
    meaning: "ตอบคำถามข้อที่ 3 []",
    answers: [
      {
        text: "Next to Question 11",
        meaning: "ไปต่อข้อที่ 11",
        questionOrder: 11,
        isFinish: false,
      },
      {
        text: "Next to Question 14",
        meaning: "ไปจ้องข้อที่ 14",
        questionOrder: 14,
        isFinish: false,
      },
    ],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "multiplechoice",

    // Boolearn
    isQuestion: false,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 7,
    instruction: "",
    question: "Question 4",
    meaning: "คำถามที่ 4",
    answers: [],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "",

    // Boolearn
    isQuestion: true,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 8,
    instruction: "เลือกคำตอบที่ต้องการ",
    question: "Answer for Question 4 []",
    meaning: "ตอบคำถามข้อที่ 4 []",
    answers: [
      {
        text: "Finish the sentence for Question 4",
        meaning: "เสร็จสิ้นประโยคข้อที่ 4",
        isFinish: true,
      },
    ],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "multiplechoice",

    // Boolearn
    isQuestion: false,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,

  },
  {
    id: 9,
    instruction: "",
    question: "Question 5",
    meaning: "คำถามที่ 5",
    answers: [],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "",

    // Boolearn
    isQuestion: true,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 10,
    instruction: "เลือกคำตอบที่ต้องการ",
    question: "Answer for Question 5 []",
    meaning: "ตอบคำถามข้อที่ 5 []",
    answers: [
      {
        text: "Finish the sentence for Question 5",
        meaning: "เสร็จสิ้นประโยคข้อที่ 5",
        isFinish: true,

      },
    ],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "multiplechoice",

    // Boolearn
    isQuestion: false,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 11,
    instruction: "",
    question: "Question 6",
    meaning: "คำถามที่ 6",
    answers: [],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "",

    // Boolearn
    isQuestion: true,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 12,
    instruction: "พิมพ์คำตอบเป็นภาษาอังกฤษลงในช่องว่าง",
    question: "Answer: Fill in the blank [].",
    meaning: "คำตอบแบบช่องว่าง []",
    answers: [],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "fillintheblank",

    // Boolearn
    isQuestion: false,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 13,
    instruction: "",
    question: "Question 7 And Finish Content",
    meaning: "คำถามที่ 7 และจบบสนทนา",
    answers: [],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "",

    // Boolearn
    isQuestion: true,
    isRecorder: false,
    isGroup: false,
    isFinishContent: true,
  },
  {
    id: 14,
    instruction: "",
    question: "Question 8",
    meaning: "คำถามที่ 8",
    answers: [],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "",

    // Boolearn
    isQuestion: true,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,
  },
  {
    id: 15,
    instruction: "เลือกคำตอบที่ต้องการ",
    question: "Answer for Question 8 []",
    meaning: "ตอบคำถามข้อที่ 8 []",
    answers: [
      {
        text: "Finish the sentence for Question 8",
        meaning: "เสร็จสิ้นประโยคข้อที่ 8",
        isFinish: true,
      },
    ],
    userAnswer: {},
    audioURL: "",
    recorderUrl: "",
    displayText: [],
    type: "multiplechoice",

    // Boolearn
    isQuestion: false,
    isRecorder: false,
    isGroup: false,
    isFinishContent: false,

    // Counter Speaking
    counterSpeaking: 0,
    scoreSpeaking: 0,

  },

]



export default { list }
