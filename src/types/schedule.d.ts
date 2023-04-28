import dayjs from 'dayjs';

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
      labels: this.status.map((status) => dayjs(status.play_time).toString()),
      datasets: [
        {
          label: 'Shifts Worked',
          barPercentage: 0.8,
          borderRadius: 4,
          backgroundColor: '#f87979',
          data: this.status.map((status) => status.shifts_worked),
        },
      ],
    };
  }

  get clear_ratio() {
    return {
      labels: this.status.map((status) => dayjs(status.play_time).toString()),
      datasets: [
        {
          label: 'Wave 1',
          backgroundColor: '#FFB6C1',
          borderColor: '#FFB6C188',
          data: this.status.map((status) => status.failure_ratio(0)),
        },
        {
          label: 'Wave 2',
          backgroundColor: '#ADD8E6',
          borderColor: '#ADD8E688',
          data: this.status.map((status) => status.failure_ratio(1)),
        },
        {
          label: 'Wave 3',
          backgroundColor: '#FFD700',
          borderColor: '#FFD70088',
          data: this.status.map((status) => status.failure_ratio(2)),
        },
      ],
    };
  }

  get grade_point() {
    return {
      labels: this.status.map((status) => dayjs(status.play_time).toString()),
      datasets: [
        {
          label: 'Grade Point',
          backgroundColor: '#D8E698',
          borderColor: '#D8E69888',
          data: this.status.map((status) => status.grade_point),
        },
      ],
    };
  }
}
