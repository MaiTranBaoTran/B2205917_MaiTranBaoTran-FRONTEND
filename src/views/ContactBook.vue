<template>
  <div class="page row">
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

      <div class="d-flex justify-content-around align-items-center mt-4">
        <button class="btn btn-primary" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button class="btn btn-success" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>

        <button class="btn btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>

    <div class="col-8" v-if="activeContact">
      <h4 class="text-center">Chi tiết liên hệ</h4>

      <ContactCard :contact="activeContact" />

      <div class="mt-4 d-flex justify-content-center">
        <button class="btn btn-warning" @click="goToEditContact">
          <i class="fas fa-edit"></i> Hiệu chỉnh
        </button>
      </div>
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
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },

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

      return this.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(this.searchText.toLowerCase())
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

    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },

    goToEditContact() {
      if (this.activeContact) {
        this.$router.push({
          name: "contact.edit",
          params: { id: this.activeContact._id },
        });
      }
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
</style>
