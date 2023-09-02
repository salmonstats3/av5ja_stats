<script setup lang="ts">
import { CoopStageURL, CoopStageLazyURL } from "@/constants/stage";
import { CoopWeaponURL } from "@/constants/weapon";
import { useRouter } from "vue-router";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";
import { ScenarioDto } from "@/types/scenario.d";
const router = useRouter();
const { t } = useI18n();

const props = defineProps({
  scenario: {
    type: ScenarioDto as PropType<ScenarioDto>,
    required: true,
  },
});

function next(code: string): void {
  router.push(`/scenario/${code}`);
}
</script>

<template>
  <v-card @click="next(props.scenario.scenarioCode)">
    <v-row no-gutters align="center">
      <v-col sm="6">
        <v-img
          :lazy-src="CoopStageLazyURL(props.scenario.schedule.stageId)"
          :src="CoopStageURL(props.scenario.schedule.stageId)"
          :aspect-ratio="20 / 9"
          :cover="true"
        >
          <v-row class="scenario">
            <v-col cols="6">
              <v-label class="scenario danger-rate">{{ scenario.dangerRate }}%</v-label>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col>
                  <v-label class="scenario golden-ikura-num">{{ scenario.goldenIkuraNum }}</v-label>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-img>
      </v-col>
      <v-col sm="6" align="center">
        <div class="d-flex ma-1">
          <v-img v-for="(weaponId, index) in props.scenario.schedule.weaponList" :key="index" :src="CoopWeaponURL(weaponId)" :width="32">
          </v-img>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.scenario {
  :last-child {
    text-align: right;
  }

  &.danger-rate {
    padding: 0 4%;
    font-weight: 600;
    background: black;
    opacity: 1;
  }

  .golden-ikura-num {
    text-align: left;
    padding: 0 4%;
    font-weight: 600;
    background: black;
    opacity: 1;
    color: yellow;

    &::before {
      content: "x";
    }
  }

  .ikura-num {
    padding: 0 4%;
    font-weight: 600;
    background: black;
    opacity: 1;

    color: red;

    &::before {
      content: "x";
    }
  }
}
</style>
