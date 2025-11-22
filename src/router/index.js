import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "../views/ContactBook.vue";

const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },

  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("../views/ContactEdit.vue"), // dùng đường dẫn tương đối
    props: true, // giúp truyền id từ route vào props
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("../views/ContactAdd.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
