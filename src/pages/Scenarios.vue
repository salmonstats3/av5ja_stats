<script setup lang="ts">
import json from "@/resources/schedules/private_scenario.json";
import { plainToInstance } from "class-transformer";
import { ScenarioDto } from "@/types/scenario.d";
import Scenario from "@/components/Scenario.vue";
import { useRouter } from "vue-router";
import { Ref, ref, watch, onMounted } from "vue";
const router = useRouter();
const page: Ref<number> = ref(1);
const data: ScenarioDto[] = json
  .map((scenario: any) => plainToInstance(ScenarioDto, scenario))
  .sort((a: ScenarioDto, b: ScenarioDto) => b.goldenIkuraNum - a.goldenIkuraNum);
const scenarios: Ref<ScenarioDto[]> = ref([]);
const length: number = Math.ceil(data.length / 24);

onMounted(() => {
  const p: number = parseInt(router.currentRoute.value.query.p as string, 10);
  if (!isNaN(p)) {
    scenarios.value = data.slice((p - 1) * 24, p * 24);
    page.value = p;
  } else {
    scenarios.value = data.slice(0, 24);
    page.value = 1;
  }
});

watch(page, (newValue) => {
  scenarios.value = data.slice((newValue - 1) * 24, newValue * 24);
  router.push({ query: { p: newValue } });
});
</script>

<template>
  <v-pagination :length="length" v-model="page"></v-pagination>
  <v-row v-if="scenarios.length !== 0">
    <v-col cols="12" sm="6" md="4" lg="4" xl="4" v-for="(scenario, index) in scenarios" :key="index">
      <Scenario :scenario="scenario" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.v-col-xxl,
.v-col-xxl-auto,
.v-col-xxl-12,
.v-col-xxl-11,
.v-col-xxl-10,
.v-col-xxl-9,
.v-col-xxl-8,
.v-col-xxl-7,
.v-col-xxl-6,
.v-col-xxl-5,
.v-col-xxl-4,
.v-col-xxl-3,
.v-col-xxl-2,
.v-col-xxl-1,
.v-col-xl,
.v-col-xl-auto,
.v-col-xl-12,
.v-col-xl-11,
.v-col-xl-10,
.v-col-xl-9,
.v-col-xl-8,
.v-col-xl-7,
.v-col-xl-6,
.v-col-xl-5,
.v-col-xl-4,
.v-col-xl-3,
.v-col-xl-2,
.v-col-xl-1,
.v-col-lg,
.v-col-lg-auto,
.v-col-lg-12,
.v-col-lg-11,
.v-col-lg-10,
.v-col-lg-9,
.v-col-lg-8,
.v-col-lg-7,
.v-col-lg-6,
.v-col-lg-5,
.v-col-lg-4,
.v-col-lg-3,
.v-col-lg-2,
.v-col-lg-1,
.v-col-md,
.v-col-md-auto,
.v-col-md-12,
.v-col-md-11,
.v-col-md-10,
.v-col-md-9,
.v-col-md-8,
.v-col-md-7,
.v-col-md-6,
.v-col-md-5,
.v-col-md-4,
.v-col-md-3,
.v-col-md-2,
.v-col-md-1,
.v-col-sm,
.v-col-sm-auto,
.v-col-sm-12,
.v-col-sm-11,
.v-col-sm-10,
.v-col-sm-9,
.v-col-sm-8,
.v-col-sm-7,
.v-col-sm-6,
.v-col-sm-5,
.v-col-sm-4,
.v-col-sm-3,
.v-col-sm-2,
.v-col-sm-1,
.v-col,
.v-col-auto,
.v-col-12,
.v-col-11,
.v-col-10,
.v-col-9,
.v-col-8,
.v-col-7,
.v-col-6,
.v-col-5,
.v-col-4,
.v-col-3,
.v-col-2,
.v-col-1 {
  width: 100%;
  padding: 6px;
}
</style>
