<template>
  <div class="page row">
    <!-- Cột trái -->
    <div class="col-4">
      <h4 class="text-center">Danh bạ</h4>

      <InputSearch v-model="searchText" />

      <div class="mt-3">
        <b>Danh sách liên hệ</b>
      </div>

      <ContactList
        v-if="filteredContacts.length > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />

      <div v-else class="text-center text-danger small">
        Không có liên hệ nào phù hợp.
      </div>

      <!-- Nhóm nút dưới -->
      <div class="action-buttons mt-4">
        <router-link class="btn-custom add" :to="{ name: 'contact.add' }">
          <i class="fas fa-plus"></i> Thêm mới
        </router-link>

        <button class="btn-custom refresh" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>

        <button class="btn-custom delete" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>

    <!-- Cột phải -->
    <div class="col-8" v-if="activeContact">
      <h4 class="text-center">Chi tiết liên hệ</h4>

      <ContactCard :contact="activeContact" />

      <router-link
        :to="{
          name: 'contact.edit',
          params: { id: activeContact._id },
        }"
      >
        <span class="mt-2 badge badge-warning custom-edit">
          <i class="fas fa-edit"></i> Hiệu chỉnh
        </span>
      </router-link>
    </div>

    <div class="col-8 text-center text-muted" v-else>
      <i>Chọn liên hệ để xem chi tiết</i>
    </div>
  </div>
</template>

<script>
import ContactCard from "../components/ContactCard.vue";
import InputSearch from "../components/InputSearch.vue";
import ContactList from "../components/ContactList.vue";
import ContactService from "../services/contact.service";

export default {
  components: { ContactCard, InputSearch, ContactList },

  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },

  computed: {
    activeContact() {
      return this.activeIndex < 0
        ? null
        : this.filteredContacts[this.activeIndex];
    },

    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((c) =>
        c.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },

  methods: {
    async refreshList() {
      this.contacts = await ContactService.getAll();
      this.activeIndex = -1;
    },

    async removeAllContacts() {
      await ContactService.deleteAll();
      this.refreshList();
    },
  },

  async created() {
    this.refreshList();
  },
};
</script>

<style>
.page {
  max-width: 1000px;
  margin: auto;
}

/* Giữ style giống bài mẫu */
.action-buttons {
  display: flex;
  justify-content: space-between;
}

.btn-custom {
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  border: none;
  text-decoration: none;
}

.btn-custom.add {
  background-color: #28a745;
}

.btn-custom.refresh {
  background-color: #17a2b8;
}

.btn-custom.delete {
  background-color: #dc3545;
}

.btn-custom:hover {
  opacity: 0.85;
  transition: 0.2s;
}

/* Badge hiệu chỉnh */
.custom-edit {
  cursor: pointer;
}
</style>
