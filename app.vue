<script setup>
const domainsText = ref("");
const domains = computed(() => {
  console.log(domainsText.value);
  return domainsText.value.split("\n") || [];
});

const sites = ref([
  { name: "history", rule: "dfw-web-rules", ip: "34.49.47.207" },
  { name: "history-api", rule: "dfw-web-api-rules", ip: "34.49.7.13" },
  { name: "language-api", rule: "language-api-rules", ip: "34.49.43.97" },
  {
    name: "domain-redirect-api",
    rule: "dfw-domain-redirect-api-rules",
    ip: "34.49.18.211",
  },
  { name: "refer", rule: "dfw-domain-redirect-api-rules", ip: "34.49.18.211" },
]);
const envs = ref([
  {
    name: "staging",
    label: "staging",
    prefix: "staging-",
    cmdResult: "",
    officeResult: "",
  },
  {
    name: "uat",
    label: "uat",
    prefix: "uat-",
    result: "",
    officeResult: "",
  },
  {
    name: "production",
    label: "production",
    prefix: "",
    result: "",
    officeResult: "",
  },
]);
const selectedEnvIndex = ref(0);
function generate() {
  let resultString = "";
  let applyString = "";
  const currentEnv = envs.value[selectedEnvIndex.value];
  console.log(`currentEnv: ${currentEnv}`);
  if (currentEnv) {
    domains.value.forEach((domain) => {
      sites.value.forEach((site) => {
        const template = `    - host: ${currentEnv.prefix}${site.name}.${domain}.com
      http: *${site.rule}
`;
        const applyTemplate = `${domain}.com ${currentEnv.prefix}${site.name}.${domain}.com ${site.ip}
`;
        resultString += template;
        applyString += applyTemplate;
      });
    });
    console.log(`selectedEnv: ${currentEnv.name} resultString:`);
    console.log(resultString);
    envs.value[selectedEnvIndex.value].cmdResult = resultString;
    console.log(`selectedEnv: ${currentEnv.name} applyString:`);
    console.log(applyString);
    envs.value[selectedEnvIndex.value].officeResult = applyString;
  }
}
</script>

<template>
  <div class="grid w-full h-full grid-col-2 p-4 gap-2">
    <div class="col-span-2">
      <h1 class="text-center text-2xl mb-4">Domain 對應產生</h1>
      <UTextarea
        v-model="domainsText"
        placeholder="一行一組 domain 按下 Enter 產生多組..."
        :rows="10"
      />
      <UTabs v-model="selectedEnvIndex" :items="envs" />
      <UFormGroup
        :label="site.name"
        :name="site.name"
        v-for="site in sites"
        :key="site"
      >
        <UInput v-model="site.ip" />
      </UFormGroup>
      <div class="mt-4 mx-auto w-full flex items-center justify-center">
        <UButton class="px-20" size="xl" @click="generate()">產生</UButton>
      </div>
    </div>
    <div>
      <h2>文件申請</h2>
      <pre
        class="border rounded w-full h-[50dvh] overflow-auto p-2"
        v-if="envs[selectedEnvIndex]"
        >{{ envs[selectedEnvIndex].officeResult }}</pre
      >
    </div>
    <div>
      <h2>ingress 設定</h2>
      <pre
        class="border rounded w-full h-[50dvh] overflow-auto p-2"
        v-if="envs[selectedEnvIndex]"
        >{{ envs[selectedEnvIndex].cmdResult }}</pre
      >
    </div>
  </div>
</template>
