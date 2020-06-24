<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// 解析token
import jwt_decode from "jwt-decode";
export default {
  name: "app",
  components: {},
  created() {
    if (localStorage.leToken) {
      const decode = jwt_decode(localStorage.leToken);
      // token 储存到vuex中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);
    }
  },
  computed: {},
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  position: relative;
}

</style>
