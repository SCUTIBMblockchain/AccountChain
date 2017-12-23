<template id="loginView">
    <div>
        <front-view></front-view>
        <div class="main">
          <div class="w">
            <login-form-view></login-form-view>
          </div>
        </div>
        
    </div>
</template>

<script>
import frontView from "./front.vue";
import loginFormView from "./loginFormView.vue";
export default {
  components: {
    frontView,
    loginFormView
  },
  mounted: function() {},
  methods: {}
};
</script>
<style>
@import "./loginStyle.css";
</style>