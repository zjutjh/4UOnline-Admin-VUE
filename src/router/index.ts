import { createRouter, createWebHistory } from "vue-router";
import {
  Account,
  HomePage,
  DataOverview,
  EquityCode,
  QuestionFeedback,
  Consulting,
  ExportBackup,
  Notify,
  Login,
  MainPageFrame,
  Clear
} from "@/pages";

import {
  Activity,
  Announcement,
  LostFound,
  Website
} from "@/pages/Notify";

import { useLoginStore } from "@/stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/main",
      name: "main",
      component: MainPageFrame,
      children: [
        {
          path: "",
          name: "home",
          component: HomePage
        },
        {
          path: "clear",
          name: "clear",
          component: Clear
        },
        {
          path: "data-overview",
          name: "data-overview",
          component: DataOverview
        },
        {
          path: "equity-code",
          name: "equity-code",
          component: EquityCode
        },
        {
          path: "question-feedback",
          name: "question-feedback",
          component: QuestionFeedback
        },
        {
          path: "account",
          name: "account",
          component: Account
        },
        {
          path: "consulting",
          name: "consulting",
          component: Consulting
        },
        {
          path: "export-backup",
          name: "export-backup",
          component: ExportBackup
        },
        {
          path: "notify",
          name: "notify",
          component: Notify,
          children: [
            {
              path: "activity",
              name: "activity",
              component: Activity
            },
            {
              path: "announcement",
              name: "announcement",
              component: Announcement
            },
            {
              path: "lostfound",
              name: "lostfound",
              component: LostFound
            },
            {
              path: "website",
              name: "website",
              component: Website
            }
          ]
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();
  if (to.path !== "/login" && loginStore.state === false) {
    next("/login");
  } else if (to.path === "/") {
    next("/main");
  } else {
    next();
  }
});

export default router;
