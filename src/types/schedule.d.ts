import { Expose, Transform, Type, plainToInstance } from "class-transformer";

import "reflect-metadata";
import Big from "big.js";
import dayjs from "dayjs";

import { Status } from "@/types/status.d";

export enum ScheduleType {
  REGULAR = "REGULAR",
  BIG_RUN = "BIG_RUN",
  SCENARIO = "SCENARIO",
  TEAM_CONTEST = "TEAM_CONTEST",
}

class TopBorder {
  top1: number;
  top5: number;
  top20: number;
  top50: number;
}

export class ScheduleDto {
  bossId: number | null;
  endTime: string;
  scheduleId: string;
  stageId: number;
  startTime: string;
  weaponList: number[];
}

class Distribution {
  @Expose()
  @Transform((param) => Number(Big(param.value).toString()))
  golden_ikura_num_std;

  @Expose()
  @Transform((param) => Number(Big(param.value).toString()))
  golden_ikura_num_avg;

  @Expose()
  @Transform((param) => Number(Big(param.value).toString()))
  ikura_num_std;

  @Expose()
  @Transform((param) => Number(Big(param.value).toString()))
  ikura_num_avg;
}

class GoldenIkuraNum {
  @Expose({ name: "golden_ikura_num" })
  readonly golden_ikura_num: number;

  @Expose({ name: "count" })
  readonly count: number;
}

class GradePoint {
  @Expose()
  readonly grade_point: number;

  @Expose()
  readonly grade_id: number;

  @Expose()
  readonly count: number;
}

class CoopWave {
  @Expose()
  water_level: number;

  @Expose()
  event_type: number;

  @Expose()
  occurrence: number;

  @Expose()
  is_clear: number;

  get clear_ratio(): number {
    return Number(
      Big(this.is_clear / this.occurrence)
        .mul(100)
        .round(3)
        .toString(),
    );
  }
}

export class ScheduleStatusDto {
  static async fromJSON(scheduleId: string): Promise<ScheduleStatusDto> {
    return plainToInstance(ScheduleStatusDto, import(`@/resources/analytics/${scheduleId}.json`), {
      excludeExtraneousValues: true,
    });
  }

  @Expose({ name: "status" })
  @Type(() => Status)
  readonly status: Status[] = [];

  @Expose({ name: "distribution" })
  @Type(() => Distribution)
  readonly distribution: Distribution;

  @Expose({ name: "golden_ikura_num" })
  @Type(() => GoldenIkuraNum)
  readonly golden_ikura_num: GoldenIkuraNum[] = [];

  @Expose()
  @Type(() => GradePoint)
  readonly grade_point: GradePoint[] = [];

  @Expose()
  @Type(() => CoopWave)
  readonly waves: CoopWave[][] = [];

  private nd(mean: number, std_dev: number): number[] {
    const golden_ikura_num: number[] = this.golden_ikura_num.map((data) => data.golden_ikura_num);
    const dist: number[] = golden_ikura_num.map((value) => {
      const x: number = 1 / (std_dev * Math.sqrt(2 * Math.PI));
      const y: number = Math.pow(value - mean, 2);
      const z: number = Math.pow(std_dev, 2) * 2;
      return x * Math.exp(-y / z) * 5;
    });
    return dist;
  }

  get top(): TopBorder {
    const mean: number = this.distribution?.golden_ikura_num_avg ?? 0;
    const std_dev: number = this.distribution?.golden_ikura_num_std ?? 1;
    return {
      top1: Big(2.332 * std_dev + mean).round(0),
      top20: Big(0.842 * std_dev + mean).round(0),
      top5: Big(1.645 * std_dev + mean).round(0),
      top50: Big(0 * std_dev + mean).round(0),
    };
  }

  get shifts_worked(): object {
    const dataset: Status[] = this.status.sort((a, b) => dayjs(a.play_time).unix() - dayjs(b.shifts_worked).unix());
    return {
      datasets: [
        {
          backgroundColor: "#f87979",
          barPercentage: 1,
          borderRadius: 4,
          data: this.status.map((status) => status.shifts_worked),
          label: "Shifts Worked",
        },
      ],
      labels: dataset.map((status) => {
        return `${dayjs(status.play_time).format("MM/DD HH:mm")} ~ ${dayjs(status.play_time).add(30, "minutes").format("MM/DD HH:mm")}`;
      }),
    };
  }

  get golden_ikura_data(): object {
    const dataset: GoldenIkuraNum[] = this.golden_ikura_num.sort((a, b) => a.golden_ikura_num - b.golden_ikura_num);
    const players: number = dataset.reduce((a, b) => a + b.count, 0);
    const mean: number = this.distribution?.golden_ikura_num_avg ?? 0;
    const std_dev: number = this.distribution?.golden_ikura_num_std ?? 1;
    return {
      datasets: [
        {
          backgroundColor: "#F5FFFA",
          borderColor: "#F8F8FF88",
          borderWidth: 2,
          data: this.nd(mean, std_dev),
          fill: false,
          label: "Normal Distribution",
          order: 0,
          pointRadius: 0,
          tension: 0.4,
          type: "line",
        },
        {
          backgroundColor: "#F87979",
          barPercentage: 1,
          borderRadius: 4,
          data: this.golden_ikura_num.map((data) => data.count / players),
          label: "Users",
          order: 1,
        },
      ],
      labels: this.golden_ikura_num.map((data) => data.golden_ikura_num),
    };
  }

  get clear_ratio(): object {
    const dataset: Status[] = this.status.sort((a, b) => dayjs(a.play_time).unix() - dayjs(b.play_time).unix());
    return {
      datasets: [
        {
          backgroundColor: "#9B4F96",
          borderColor: "#9B4F9688",
          data: dataset.map((status) => status.clear_ratio(0)),
          label: "0+",
        },
        {
          backgroundColor: "#FE5F55",
          borderColor: "#FE5F5588",
          data: dataset.map((status) => status.clear_ratio(1)),
          hidden: true,
          label: "200+",
        },
        {
          backgroundColor: "#34AADC",
          borderColor: "#34AADC88",
          data: dataset.map((status) => status.clear_ratio(2)),
          hidden: true,
          label: "400+",
        },
        {
          backgroundColor: "#F4D03F",
          borderColor: "#F4D03F88",
          data: dataset.map((status) => status.clear_ratio(3)),
          hidden: true,
          label: "600+",
        },
      ],
      labels: dataset.map((status) => {
        return `${dayjs(status.play_time).format("MM/DD HH:mm")} ~ ${dayjs(status.play_time).add(30, "minutes").format("MM/DD HH:mm")}`;
      }),
    };
  }

  get grade_point_data(): object {
    const dataset: GradePoint[] = this.grade_point.filter((item) => item.grade_id === 8).sort((a, b) => a.grade_point - b.grade_point);
    const players: number = dataset.reduce((a, b) => a + b.count, 0);
    return {
      datasets: [
        {
          backgroundColor: ["#9B4F96", "#FE5F55", "#34AADC", "#F4D03F", "#D8E698", "#F87979"],
          data: dataset.map((data) => data.count / players),
        },
      ],
      labels: ["0~200", "200~400", "400~600", "600~800", "800~999", "999"],
    };
  }
}
