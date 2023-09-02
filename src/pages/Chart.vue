<script setup lang="ts">
import { useRouter } from "vue-router";
import LineChart from "@/components/LineChart.vue";
import { Ref, onMounted, ref } from "vue";
import { ScheduleStatusDto } from "@/types/schedule.d";
import PieChart from "@/components/PieChart.vue";
import { useI18n } from "vue-i18n";
import BarChart from "@/components/BarChart.vue";

const { t } = useI18n();
const router = useRouter();
const scheduleId: string = router.currentRoute.value.params.scheduleId as string;
const data: Ref<ScheduleStatusDto> = ref(new ScheduleStatusDto());

onMounted(async () => {
  data.value = await ScheduleStatusDto.fromJSON(scheduleId);
});
</script>

<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <BarChart :data="data.golden_ikura_data" :title="t('CHART.DISTRIBUTION.DELIVER')" format="percent" />
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <PieChart :data="data.grade_point_data" :title="t('CHART.DISTRIBUTION.GRADE_POINT')" />
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <LineChart :data="data.clear_ratio" :title="t('CHART.RATIO.CLEAR')" />
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <BarChart :data="data.shifts_worked" :title="t('CHART.TOTAL.RESULTS')" :x="false" />
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-table density="compact">
        <thead>
          <tr>
            <th colspan="2" class="text-center">Top 1%</th>
            <th colspan="2" class="text-center">Top 5%</th>
            <th colspan="2" class="text-center">Top 20%</th>
            <th colspan="2" class="text-center">Top 50%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colspan="2" class="text-center">{{ data.top.top1 }}</th>
            <th colspan="2" class="text-center">{{ data.top.top5 }}</th>
            <th colspan="2" class="text-center">{{ data.top.top20 }}</th>
            <th colspan="2" class="text-center">{{ data.top.top50 }}</th>
          </tr>
        </tbody>
      </v-table>
    </v-col>
    <v-col cols="12">
      <v-table density="compact">
        <thead>
          <tr>
            <th rowspan="2"></th>
            <template v-for="waterLevel in [0, 1, 2]" :key="waterLevel">
              <th colspan="2" class="text-center">{{ t(`WATER_LEVEL.${waterLevel}`) }}</th>
            </template>
          </tr>
          <tr>
            <template v-for="waterLevel in [0, 1, 2]" :key="waterLevel">
              <th class="text-center">{{ t("DESCRIPTION.OCCURRENCE") }}</th>
              <th class="text-center">{{ t("DESCRIPTION.CLEAR_RATIO") }}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="(waves, index) in data.waves" :key="index">
            <tr>
              <th>{{ t(`EVENT_TYPE.${index}`) }}</th>
              <template v-for="index in [0, 1, 2]" :key="index">
                <td class="text-right">{{ waves.find((wave) => wave.water_level === index)?.occurrence || "-" }}</td>
                <td class="text-right">{{ waves.find((wave) => wave.water_level === index)?.clear_ratio || "-" }}</td>
              </template>
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
