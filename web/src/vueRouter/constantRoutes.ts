import { RouteRecordRaw } from "vue-router";

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/pages/Layout.vue"),
    meta: {
      title: ""
    },
    redirect: "/task",
    children: [
      {
        path: "/task",
        name: "task",
        meta: {
          title: "任务"
        },
        component: () => import("@/pages/Task.vue")
      },
      {
        path: "/notice",
        name: "notice",
        meta: {
          title: "公告"
        },
        component: () => import("@/pages/Notice.vue")
      },
      {
        path: "/company",
        name: "company",
        meta: {
          title: "组织"
        },
        component: () => import("@/pages/Company.vue"),
        redirect: "/company/employee",
        children: [
          {
            path: "/company/employee",
            name: "employee",
            meta: {
              title: "员工信息"
            },
            component: () => import("@/components/Company/Employee.vue")
          },
          {
            path: "/company/info",
            name: "companyInfo",
            meta: {
              title: "组织信息"
            },
            component: () => import("@/components/Company/CompanyInfo.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login.vue"),
    meta: {
      title: "登录"
    }
  }
];
export default constantRoutes;
