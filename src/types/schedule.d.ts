import dayjs from "dayjs";

import { Status } from "@/types/status.d";

export class ScheduleDto {
  bossId: number | null;
  endTime: string;
  scheduleId: string;
  stageId: number;
  startTime: string;
  weaponList: number[];
}

export class ScheduleStatusDto {
  constructor(status: Status[]) {
    this.status = status.sort((a: Status, b: Status) => dayjs(a.play_time).unix() - dayjs(b.play_time).unix()).slice(0, 80);
  }

  readonly status: Status[];

  get shifts_worked() {
    return {
      datasets: [
        {
          backgroundColor: "#f87979",
          barPercentage: 0.8,
          borderRadius: 4,
          data: this.status.map((status) => status.shifts_worked),
          label: "Shifts Worked",
        },
      ],
      labels: this.status.map((status) => dayjs(status.play_time).toString()),
    };
  }

  get clear_ratio() {
    return {
      datasets: [
        {
          backgroundColor: "#9B4F96",
          borderColor: "#9B4F9688",
          data: this.status.map((status) => status.clear_ratio(1)),
          label: "0+",
        },
        {
          backgroundColor: "#FE5F55",
          borderColor: "#FE5F5588",
          data: this.status.map((status) => status.clear_ratio(2)),
          hidden: true,
          label: "200+",
        },
        {
          backgroundColor: "#34AADC",
          borderColor: "#34AADC88",
          data: this.status.map((status) => status.clear_ratio(3)),
          hidden: true,
          label: "400+",
        },
        {
          backgroundColor: "#F4D03F",
          borderColor: "#F4D03F88",
          data: this.status.map((status) => status.clear_ratio(4)),
          hidden: true,
          label: "600+",
        },
        {
          backgroundColor: "#C0392B",
          borderColor: "#C0392B88",
          data: this.status.map((status) => status.clear_ratio(5)),
          hidden: true,
          label: "800+",
        },
      ],
      labels: this.status.map((status) => dayjs(status.play_time).toString()),
    };
  }

  get grade_point() {
    return {
      datasets: [
        {
          backgroundColor: "#D8E698",
          borderColor: "#D8E69888",
          data: this.status.map((status) => status.grade_point),
          label: "Grade Point",
        },
      ],
      labels: this.status.map((status) => dayjs(status.play_time).toString()),
    };
  }
}
