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
  @Transform((param) => parseFloat(param.value))
  dangerRate: number;
  stageId: number;
  scenarioCode: string | null;
  nightLess: boolean;
  schedule: ScenarioScheduleDto;
  waves: ScenarioWaveDto[];
}
