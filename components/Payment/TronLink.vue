<script setup lang="ts">
const tron = ref();

const getTokenWeb = async () => {
  // @ts-ignore
  if (!window.tronLink) {
    throw new Error("请安装TronLink");
  }

  // @ts-ignore
  if (window.tronLink.ready) {
    // @ts-ignore
    tron.value = window.tronLink.tronWeb;
    return;
  }

  // @ts-ignore
  const res = await window.tronLink.request({
    method: "tron_requestAccounts",
    params: {
      websiteIcon: "",
      websiteName: "AXUM中文网",
    },
  });

  //   if (res.code !== 200) {
  //     throw new Error("获取tronLink账号失败");
  //   }

  // @ts-ignore
  tron.value = window.tronLink.tronWeb;
};

onMounted(() => {
  getTokenWeb()
    .then()
    .catch((e) => {
      window.alert(e);
    });
});
</script>

<template></template>
