import { Big } from "big.js";
import { Transform } from "class-transformer";

class ScenarioScheduleDto {
  stageId: number;
  weaponList: number[];
}

class ScenarioWaveDto {
  eventType: number;
  waterLevel: number;
  goldenIkuraNum: number;
}

export class ScenarioDto {
  ikuraNum: number;
  goldenIkuraNum: number;
  @Transform((param) => Number(new Big(param.value).mul(100).toString()))
  dangerRate: number;
  stageId: number;
  scenarioCode: string;
  nightLess: boolean;
  schedule: ScenarioScheduleDto;
  waves: ScenarioWaveDto[];
}
