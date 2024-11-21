import { createRouter, createWebHistory } from "vue-router";
import {
  Account,
  HomePage,
  DataOverview,
  EquityCode,
  QuestionFeedback,
  Consulting,
  ExportBackup,
  Notify
} from "@/pages";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/data-overview",
      name: "data-overview",
      component: DataOverview
    },
    {
      path: "/equity-code",
      name: "equity-code",
      component: EquityCode
    },
    {
      path: "/question-feedback",
      name: "question-feedback",
      component: QuestionFeedback
    },
    {
      path: "/account",
      name: "account",
      component: Account
    },
    {
      path: "/consulting",
      name: "consulting",
      component: Consulting
    },
    {
      path: "/export-backup",
      name: "export-backup",
      component: ExportBackup
    },
    {
      path: "/notify",
      name: "notify",
      component: Notify
    }
  ]
});

export default router;
