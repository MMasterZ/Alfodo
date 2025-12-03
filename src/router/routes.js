const routes = [
  // ---------------- ADVENTURE SCHOOL ------------------------
  {
    path: "/splash/:studentId?",
    component: () => import("pages/odyssey-splash.vue"),
    name: "odyssey-splash",
  },
  {
    path: "",
    component: () => import("pages/odyssey-login.vue"),
    name: "odyssey-login",
  },
  // Register
  {
    path: "/register/:platform?/:influencerId?",
    component: () => import("src/pages/register_main.vue"),
    name: "register-main",
  },
  // Create Character
  {
    path: "/create/character",
    component: () => import("src/pages/create_character_main.vue"),
    name: "create-character",
  },

  {
    path: "/testplacement",
    component: () => import("pages/testPlacement.vue"),
    name: "test-placement",
  },
  {
    path: "/chargeComplete",
    component: () => import("pages/charge-complete.vue"),
    name: "charge-complete",
  },

  // e-Exam
  {
    path: "/exam",
    component: () => import("layouts/examLayout.vue"),
    children: [
      {
        path: "/exam/welcome",
        component: () => import("pages/exam/welcome.vue"),
        name: "welcome.vue",
      },
      {
        path: "/exam/test/:examId?",
        component: () => import("pages/exam/exam.vue"),
        name: "exam.vue",
      },
      {
        path: "/exam/finish",
        component: () => import("pages/exam/finish.vue"),
        name: "finishExam",
      },
    ],
  },
  // TEST
  {
    path: "/test/microphone",
    component: () => import("pages/testMicrophone.vue"),
    name: "testmicrophone",
  },

  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     {
  //       path: '/character',
  //       component: () => import('pages/character.vue'),
  //       name: 'character'
  //     }
  //   ]
  // },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // {
      //   path: "/lobby",
      //   component: () => import("pages/lobby.vue"),
      //   name: "lobby",
      // },
      // {
      //   path: '/profile',
      //   component: () => import('pages/profile.vue'),
      //   name: 'profile'
      // },
      // {
      //   path: '/equipment',
      //   component: () => import('pages/equipmentMain.vue'),
      //   name: 'equipment'
      // },
      // {
      //   path: '/shop',
      //   component: () => import('pages/shopMain.vue'),
      //   name: 'shop'
      // },

      //
      {
        path: "/practicemain",
        component: () => import("pages/practiceListMain.vue"),
        name: "practicemain",
      },

      // World ------------------- Vocabulary

      // Flashcard Main
      {
        path: "/flashcard/:practiceListId?",
        component: () => import("pages/flashcardMain.vue"),
        name: "flashcard",
      },

      // Spelling Bee Main
      {
        path: "/spellingbee/:practiceListId?",
        component: () => import("pages/spellingMain.vue"),
        name: "spellingbee",
      },

      // Multiple Vocab Main
      {
        path: "/multiplevocab/:practiceListId?",
        component: () => import("src/pages/multipleVocabMain.vue"),
        name: "multiplevocab",
      },

      // Matching Main
      // {
      //   path: "/matching/:practiceListId?",
      //   component: () => import("pages/matchingMain.vue"),
      //   name: "matching",
      // },

      {
        path: "/matching/:practiceListId?",
        component: () => import("pages/matchingMainNew.vue"),
        name: "matching",
      },

      // World ------------------- Vocabulary

      // World ------------------- Grammar

      // Grammar Lesson
      {
        path: "/vdolesson/:practiceListId?",
        component: () => import("pages/vdoLesson.vue"),
        name: "vdolesson",
      },

      // Grammar Action
      {
        path: "/grammaraction/:practiceListId?",
        component: () => import("pages/grammarActionMain.vue"),
        name: "grammaraction",
      },

      // Grammar Multiple Main
      {
        path: "/grammarmultiple/:practiceListId?",
        component: () => import("src/pages/grammarMultipleMain.vue"),
        name: "grammarmultiple",
      },

      // World ------------------- Grammar

      // World ------------------- Reading

      // Reading Lesson
      {
        path: "/readinglesson/:practiceListId?",
        component: () => import("pages/reading_lesson_main.vue"),
        name: "readinglesson",
      },

      // Reading Multiple Main
      {
        path: "/readingmultiple/:practiceListId?",
        component: () => import("pages/readingMultipleMain.vue"),
        name: "readingmultiple",
      },

      // World ------------------- Reading

      // World ------------------- Writing

      // Translation
      {
        path: "/translation/:practiceListId?",
        component: () => import("pages/translationMain.vue"),
        name: "translation",
      },

      // Cloze Test
      {
        path: "/clozetest/:practiceListId?",
        component: () => import("pages/clozeTestMain.vue"),
        name: "clozetest",
      },

      // World ------------------- Writing

      // World ------------------- Phonics

      //Phonics Lesson
      // {
      //   path: "/phonicslesson/:practiceListId?",
      //   component: () => import("pages/phonicsLessonMain.vue"),
      //   name: "phonicslesson",
      // },

      // Phonics Multiple Main
      {
        path: "/phonicsmultiple/:practiceListId?",
        component: () => import("pages/phonicsMultipleMain.vue"),
        name: "phonicsmultiple",
      },

      // World ------------------- Phonics

      // World ------------------- Listening & Speaking

      // Language Tip Multiple
      {
        path: "/languagetipmultiple/:practiceListId?",
        component: () => import("pages/languagetipMultipleMain.vue"),
        name: "languagetipmultiple",
      },

      // Conversation Lesson
      {
        path: "/conversationlesson/:practiceListId?",
        component: () => import("pages/conversationLessonMain.vue"),
        name: "conversationlesson",
      },

      // Conversation Multiple Main
      {
        path: "/conversationmultiple/:practiceListId?",
        component: () => import("pages/conversationMultipleMain.vue"),
        name: "conversationmultiple",
      },

      //rolePlay Lesson
      {
        path: "/roleplay/:practiceListId?",
        component: () => import("pages/rolePlayMain.vue"),
        name: "roleplay",
      },

      // World ------------------- Listening & Speaking
      // Landing Page
      {
        path: "/landing",
        component: () => import("pages/landing_page_main.vue"),
        name: "landing",
      },
      // Pretest And Posttest
      // {
      //   path: "/prepost/:type",
      //   component: () => import("pages/prepost.vue"),
      //   name: "prepost",
      // },

      // #region Router Pretest And Posttest And Midterm
      {
        path: "/pretest/",
        component: () => import("pages/prepost_main.vue"),
        name: "pretest",
      },
      {
        path: "/posttest/",
        component: () => import("pages/prepost_main.vue"),
        name: "posttest",
      },
      {
        path: "/midterm/",
        component: () => import("pages/prepost_main.vue"),
        name: "midterm",
      },
      // #endregion

      // #region Quiz Midterm and Quiz Posttest
      {
        path: "/quizmid/",
        component: () => import("pages/prepost_main.vue"),
        name: "quizMid",
      },
      {
        path: "/quizpost/",
        component: () => import("pages/prepost_main.vue"),
        name: "quizPost",
      },
      // #endregion

      // Questionnaire
      {
        path: "/questionnaire",
        component: () => import("pages/questionnaire.vue"),
        name: "questionnaire",
      },

      // Lobby Main
      {
        path: "/lobby/:payment?",
        component: () => import("src/pages/lobby_main.vue"),
        name: "lobby-main",
      },

      // Practice List Skill
      {
        path: "/practice/list",
        component: () => import("src/pages/practice_list.vue"),
        name: "practice-list",
      },

      // Practice List Unit
      {
        path: "/practice/unit",
        component: () => import("src/pages/practice_unit.vue"),
        name: "practice-unit",
      },

      // Learning Vocabulary
      {
        path: "/vocabulary/learning",
        component: () => import("src/pages/vocabulary_learning_main.vue"),
        name: "vocabulary-learning",
      },
      // Practice Vocabulary Multiple Choices
      {
        path: "/vocabulary/practice",
        component: () => import("src/pages/vocabulary_practice_main.vue"),
        name: "vocabulary-practice",
      },

      // Equipment Main
      {
        path: "/equipment",
        component: () => import("src/pages/equipment_main.vue"),
        name: "equipment-main",
      },

      // Shop Main
      {
        path: "/shop",
        component: () => import("src/pages/shop_main.vue"),
        name: "shop-main",
      },

      // #region Event main
      {
        path: "/event/speakup",
        component: () => import("src/pages/speakup_main.vue"),
        name: "event-speakup",
      },
      // #endregion
      // {
      //   path: '/event/:type',
      //   component: () => import('src/pages/event_main.vue'),
      //   name: 'event-main'
      // },

      // {
      //   path: '/event/story',
      //   component: () => import('src/pages/event_story.vue'),
      //   name: "event-story"
      // },

      // {
      //   path: '/event/practice',
      //   component: () => import('src/pages/event_practice.vue'),
      //   name: "event-practice"
      // },

      {
        path: "/certificate",
        component: () => import("src/pages/certificate_main.vue"),
        name: "certificate-main",
      },
      {
        path: "/download/certificate/:type/:language/:courseId?",
        component: () => import("src/pages/certificate-pdf.vue"),
        name: "download-certificate",
      },

      // #region Homework
      {
        path: '/homework',
        component: () => import('src/pages/homework_main.vue'),
        name: 'homework-main'
      },
      // #endregion

      // Test New Lobby
      {
        path: "/test-lobby",
        component: () => import("src/pages/test_lobby.vue"),
        name: "test-lobby",
      },

      // #region ---- Section Mini Games ----
      // Piggy Coin
      {
        path: "/minigame/piggycoin",
        component: () => import("src/pages/piggy_coin_main.vue"),
        name: "piggy-coin",
      },
      // #endregion

      // #region Gachapon
      {
        path: "/gachapon",
        component: () => import("src/pages/gachapon_main.vue"),
        name: "gachapon-main",
      },
      // endregion

      // #region Placement test
      {
        path: "/placement/",
        component: () => import("src/pages/placement_main.vue"),
        name: "placement-main",
      },
      // #endregion

      // #region New payment
      {
        path: "/subscribepackage",
        component: () => import("src/pages/subscribe_package.vue"),
        name: "subscribepackage",
      },
      {
        path: "/receipt",
        component: () => import("pages/receipt.vue"),
        name: "receipt",
      },
      // #endregion

      // #region Winner Town
      {
        path: "/wintown",
        component: () => import("src/pages/winner_town_main.vue"),
        name: "wintown",
      },
      // #endregion
      {
        path: "/test2",
        component: () => import("src/pages/test2.vue"),
        name: "test2",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
