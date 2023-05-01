<script setup lang="ts">
import { useRouter } from 'vue-router';
import LineChart from '@/components/LineChart.vue';
import { Ref, onMounted, ref } from 'vue';
import { ScheduleStatusDto } from '@/types/schedule.d';
import { Status } from '@/types/status.d';
import { plainToInstance } from 'class-transformer';
import BarChart from '@/components/BarChart.vue';
import GradePoint from '@/components/GradePoint.vue';
import PieChart from '@/components/PieChart.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const router = useRouter()
const scheduleId: string = router.currentRoute.value.params.scheduleId as string
const data: Ref<ScheduleStatusDto> = ref(new ScheduleStatusDto())
onMounted(async () => {
  data.value = await ScheduleStatusDto.fromJSON(scheduleId)
})
</script>

<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <BarChart v-if="data.golden_ikura_num.length !== 0" :chartdata="data.golden_ikura_data" title="納品数分布" />
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <PieChart v-if="data.grade_point.length !== 0" :data="data.grade_point_data" title="評価ポイント分布" />
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <!-- <GradePoint v-if="data.status.length !== 0" :data="data" /> -->
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <!-- <LineChart v-if="data.status.length !== 0" :data="data" /> -->
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <!-- <BarChart v-if="data.status.length !== 0" :chartdata="data.shifts_worked" title="Results" /> -->
      </v-card>
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
                <td class="text-right">{{ (waves.find((wave) => wave.water_level === index)?.occurrence || '-') }}</td>
                <td class="text-right">{{ (waves.find((wave) => wave.water_level === index)?.clear_ratio || '-') }}
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
