<template>
  <form class="form pa-3 mt-6">
    <div class="d-flex align-center justify-space-between mb-9">
      <p class="form__name"> Добавление пользователя</p>
      <p
        class="form__close"
        @click="$emit('closePopup')"
      >x</p>
    </div>
    <div class="d-flex align-center justify-space-between mb-4">
      <p class="form__name">Имя</p>
      <input
        type="text"
        class="form__input pa-2"
        v-model="name"
        placeholder="Введите имя..."
      />
    </div>
    <div class="d-flex align-center justify-space-between mb-4">
      <p class="form__name">Телефон</p>
      <input
        type="text"
        class="form__input pa-2"
        v-model="phone"
        placeholder="Введите телефон..."
      />
    </div>
    <div
      class="d-flex align-center justify-space-between mb-4"
      v-if="ifUsersExist"
    >
      <p class="form__name">Начальник</p>
      <select
        class="form__select form__input pa-2"
        v-model="parentId"
      >
        <option :value="null">Нет начальника</option>
        <option
          v-for="user in users"
          :key="user.id"
          :value="user.id"
        >{{user.name}}</option>
      </select>
    </div>
    <v-btn
      class="form__btn d-flex"
      outlined
      rounded
      @click="addUser()"
    >Сохранить</v-btn>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      phone: "",
      parentId: null,
    };
  },
  props: {
    users: Array,
    ifUsersExist: Boolean,
  },
  methods: {
    addUser() {
      if (!this.name || !this.phone) {
        return;
      }

      const user = {
        name: this.name,
        phone: this.phone,
        id: Math.random().toString(16).slice(2),
        parentId: this.parentId,
      };

      this.users.push(user);

      this.resetForm();
      this.saveUsers();
    },
    saveUsers() {
      const parsedUsers = JSON.stringify(this.users);
      localStorage.setItem("users", parsedUsers);
    },
    resetForm() {
      this.name = "";
      this.phone = "";
    },
  },
};
</script>

<style scoped>
.form {
  width: 500px;
  background-color: #f2f2f2;

  border: 1px solid #000;
  border-radius: 2px;
}

.form p {
  margin-bottom: 0;
}

.form__close {
  cursor: pointer;
}

.form__input {
  border: 1px solid #000;
  width: 75%;

  border-radius: 2px;
}

.form__btn {
  margin: 0 auto;
}

.form__select {
  background: url("~@/assets/arrow.svg") right center no-repeat;
  background-size: 20px 20px;
  background-position-x: 98%;
}
</style>