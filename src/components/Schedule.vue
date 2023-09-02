<script setup lang="ts">
import { CoopStageURL, CoopStageLazyURL } from "@/constants/stage";
import { CoopWeaponURL } from "@/constants/weapon";
import { useRouter } from "vue-router";
import { ScheduleDto } from "@/types/schedule.d";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";
const router = useRouter();
const { t } = useI18n();
const props = defineProps({
  schedule: {
    type: ScheduleDto as PropType<ScheduleDto>,
    required: true,
  },
});

function next(scheduleId: string): void {
  router.push(`/schedules/${scheduleId}`);
}
</script>

<template>
  <v-card @click="next(props.schedule.scheduleId)">
    <v-row no-gutters align="center">
      <v-col sm="6">
        <v-img
          :v-once="true"
          :lazy-src="CoopStageLazyURL(props.schedule.stageId)"
          :src="CoopStageURL(props.schedule.stageId)"
          :aspect-ratio="20 / 9"
          :cover="true"
        ></v-img>
      </v-col>
      <v-col sm="6" align="center">
        <div class="d-flex ma-1">
          <v-img
            v-once
            v-for="(weaponId, index) in props.schedule.weaponList"
            :key="index"
            :src="CoopWeaponURL(weaponId)"
            :width="32"
          ></v-img>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
}
</style>
