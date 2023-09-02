<script setup lang="ts">
import json from "@/resources/schedules/private_scenario.json";
import { plainToInstance } from "class-transformer";
import { ScenarioDto } from "@/types/scenario.d";
import { useRouter } from "vue-router";
import { Ref, ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const router = useRouter();
const scenarios: ScenarioDto[] = json.map((scenario: any) => plainToInstance(ScenarioDto, scenario));
const scenario: Ref<ScenarioDto | undefined> = ref();
const columns: Ref<number> = ref(0);
const { t } = useI18n();
onMounted(() => {
  const scenarioCode: string = router.currentRoute.value.params.scenarioCode as string;
  scenario.value = scenarios.find((scenario: ScenarioDto) => scenario.scenarioCode === scenarioCode);
  columns.value = (() => {
    if (scenario.value === undefined) return 0;
    if (scenario.value.waves.length === 1) return 12;
    if (scenario.value.waves.length === 2) return 6;
    if (scenario.value.waves.length === 3) return 4;
    if (scenario.value.waves.length === 4) return 3;
    return 0;
  })();
});
</script>

<template>
  <v-row v-if="scenario !== undefined">
    <v-col cols="12">
      <v-card variant="outlined">
        <v-card-title>シナリオコード</v-card-title>
        <v-card-subtitle>{{ scenario.scenarioCode }}</v-card-subtitle>
      </v-card>
    </v-col>
    <v-col cols="12" :sm="columns" v-for="(wave, index) in scenario.waves" :key="index">
      <v-card variant="outlined" :color="index === 3 ? 'success' : undefined">
        <v-card-title class="text-h6">{{ t(`WATER_LEVEL.${wave.waterLevel}`) }} {{ t(`EVENT_TYPE.${wave.eventType}`) }}</v-card-title>
        <v-card-subtitle>{{ wave.goldenIkuraNum ?? "-" }}</v-card-subtitle>
      </v-card>
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
