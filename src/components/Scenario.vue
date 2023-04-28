<script setup lang="ts">
import { CoopStageURL, CoopStageLazyURL } from '@/constants/stage'
import { CoopWeaponURL } from '@/constants/weapon'
import { useRouter } from 'vue-router';
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { ScenarioDto } from '@/types/scenario.d';
const router = useRouter()
const { t } = useI18n()
const props = defineProps({
  scenario: {
    type: ScenarioDto as PropType<ScenarioDto>,
    required: true
  }
})
</script>

<template>
  <v-card>
    <v-row no-gutters align="center">
      <v-col sm="6">
        <v-img :lazy-src="CoopStageLazyURL(props.scenario.schedule.stageId)"
          :src="CoopStageURL(props.scenario.schedule.stageId)" :aspect-ratio="20 / 9" :cover="true"></v-img>
      </v-col>
      <v-col sm="6" align="center">
        <div class="d-flex ma-1">
          <v-img v-for="(weaponId, index) in props.scenario.schedule.weaponList" :key="index"
            :src="CoopWeaponURL(weaponId)" :width="32"></v-img>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {}
</style>
