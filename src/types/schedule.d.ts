import dayjs from "dayjs";

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
    this.status = status.slice(0, 80);
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
          backgroundColor: "#FFB6C1",
          borderColor: "#FFB6C188",
          data: this.status.map((status) => status.failure_ratio(0)),
          label: "Wave 1",
        },
        {
          backgroundColor: "#ADD8E6",
          borderColor: "#ADD8E688",
          data: this.status.map((status) => status.failure_ratio(1)),
          label: "Wave 2",
        },
        {
          backgroundColor: "#FFD700",
          borderColor: "#FFD70088",
          data: this.status.map((status) => status.failure_ratio(2)),
          label: "Wave 3",
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
