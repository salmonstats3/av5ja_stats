<script setup lang="ts">
import Schedules from "@/components/Schedules.vue";
import json from "@/resources/schedules.json";
import { ScheduleDto } from "@/types/schedule.d";
import { plainToInstance } from "class-transformer";

const schedules: ScheduleDto[] = json.map((schedule) => plainToInstance(ScheduleDto, schedule));
</script>

<template>
  <Schedules :schedules="schedules" />
</template>
