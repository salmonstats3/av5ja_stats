import { Expose, Transform } from "class-transformer";
import dayjs from "dayjs";

export class Status {
  @Expose({ name: "play_time" })
  @Transform((param) => dayjs(param.value).toDate())
  readonly play_time: Date;

  @Expose({ name: "grade_point" })
  readonly grade_point: number;

  @Expose({ name: "shifts_worked" })
  readonly shifts_worked: number;

  @Expose({ name: "failure_wave" })
  readonly failure_wave: number[];

  @Expose({ name: "is_clear_by_rate" })
  readonly is_clear: number[];

  @Expose({ name: "is_failure_by_rate" })
  readonly is_failure: number[];

  @Expose({ name: "avg_golden_ikura_num" })
  readonly avg_golden_ikura_num: number;

  @Expose({ name: "max_golden_ikura_num" })
  readonly max_golden_ikura_num: number;

  clear_ratio(index: number): number {
    return this.is_clear[index] / (this.is_clear[index] + this.is_failure[index]);
  }

  failure_ratio(index: number): number {
    return (this.shifts_worked - this.failure_wave.slice(0, index + 1).reduce((a, b) => a + b, 0)) / this.shifts_worked;
  }
}
