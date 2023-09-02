<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const hash: string = import.meta.env.VITE_APP_GIT_COMMIT_HASH.slice(0, 16);
const date: string = import.meta.env.VITE_APP_GIT_COMMIT_DATE;
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>{{ t("VITE_APP.VERSION") }}</v-card-title>
        <v-card-subtitle>
          {{ hash }}
        </v-card-subtitle>
        <v-card-text>{{ t("VITE_APP.LAST_UPDATE_AT") }}: {{ date }}</v-card-text>
        <v-card-text>
          <v-img src="https://github.com/SalmonStats3/salmonstats-dev/actions/workflows/schedules-build.yml/badge.svg" width="160"></v-img>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <Update />
    </v-col>
  </v-row>
</template>
