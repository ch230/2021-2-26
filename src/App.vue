<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });
  },
  methods: {}
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
body {
  font-size: 14px;
  background-color: #fbf9fe;
  list-style: none;
}
select {
  appearance: none;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari 和 Chrome */
}
html,
body {
  min-height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
}

#app {
  min-height: 100%;
  height: 100%;
  width: 100%;
  list-style: none;
  .loading-box {
    height: 100%;
    width: 100%;
  }
}
* {
  list-style: none;
}
</style>
