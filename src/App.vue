<template>
  <v-app>
    <v-container>
      <v-btn
        elevation="3"
        outlined
        rounded
        @click="popupIsActive = true"
        :disabled="popupIsActive"
        >Добавить</v-btn
      >
      <Form
        v-if="popupIsActive"
        @closePopup="popupIsActive = false"
        v-model="users"
        :ifUsersExist="ifUsersExist"
      />
      <v-data-table
        class="mt-16"
        v-if="ifUsersExist"
        :headers="headers"
        :items="users"
      ></v-data-table>
    </v-container>
  </v-app>
</template>

<script>
import Form from "@/components/Form.vue";
export default {
  name: "App",
  data() {
    return {
      users: [],
      popupIsActive: false,
      headers: [
        { text: "Имя", value: "name" },
        { text: "Телефон", value: "phone" },
      ],
    };
  },
  components: {
    Form,
  },
  computed: {
    ifUsersExist() {
      return this.users.length > 0;
    },
  },
  mounted() {
    if (localStorage.getItem("users")) {
      try {
        this.users = JSON.parse(localStorage.getItem("users"));
      } catch (e) {
        this.users = [];
      }
    }
  },
};
</script>


