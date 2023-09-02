<script setup lang="ts">
import Schedules from "@/components/Schedules.vue";
import json from "@/resources/schedules/team_contest.json";
import { ScheduleDto } from "@/types/schedule.d";
import { plainToInstance } from "class-transformer";
import dayjs from "dayjs";

const schedules: ScheduleDto[] = json
  .map((schedule) => plainToInstance(ScheduleDto, schedule))
  .sort((a, b) => dayjs(b.startTime).unix() - dayjs(a.startTime).unix());
</script>

<template>
  <Schedules :schedules="schedules" />
</template>
