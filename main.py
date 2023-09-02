import requests
import os
import json
from dotenv import load_dotenv
from datetime import datetime,timedelta,timezone
from enum import Enum
load_dotenv(verbose=True)

class Mode(Enum):
  REGULAR = "REGULAR"
  LIMITED = "LIMITED"
  SCENARIO = "PRIVATE_SCENARIO"

class Rule(Enum):
  REGULAR = "REGULAR"
  BIG_RUN = "BIG_RUN"
  TEAM_CONTEST = "TEAM_CONTEST"

class Type(Enum):
  REGULAR = "REGULAR"
  BIG_RUN = "BIG_RUN"
  TEAM_CONTEST = "TEAM_CONTEST"
  SCENARIO = "PRIVATE_SCENARIO"

  def mode(self) -> Mode:
    if self == Type.REGULAR:
      return Mode.REGULAR
    if self == Type.BIG_RUN:
      return Mode.REGULAR
    if self == Type.TEAM_CONTEST:
      return Mode.LIMITED
    if self == Type.SCENARIO:
      return Mode.SCENARIO

  def rule(self) -> Rule:
    if self == Type.REGULAR:
      return Rule.REGULAR
    if self == Type.BIG_RUN:
      return Rule.BIG_RUN
    if self == Type.TEAM_CONTEST:
      return Rule.TEAM_CONTEST
    if self == Type.SCENARIO:
      return Rule.REGULAR

  def path(self) -> str:
    if self == Type.REGULAR:
      return "regular"
    if self == Type.BIG_RUN:
      return "big_run" 
    if self == Type.TEAM_CONTEST:
      return "team_contest" 
    if self == Type.SCENARIO:
      return "private_scenario" 

if __name__=="__main__":
  base_url: str = os.environ.get("VITE_APP_BASE_API_URL")
  environment: str = os.environ.get("VITE_APP_ENVIRONMENT")
  print("API_URL", base_url, "Environment", environment)

  print("Downloading Schedules...")
  for type in [Type.REGULAR, Type.BIG_RUN, Type.TEAM_CONTEST, Type.SCENARIO]:
    # スケジュールを取得
    schedules = requests.get(f"{base_url}/v3/schedules?mode={type.mode().value}&rule={type.rule().value}").json()
    with open(f"src/resources/schedules/{type.path()}.json", mode="w") as f:
      json.dump(schedules, f)

    # シナリオ以外は統計データを計算する 
    print("Downloading Analytics...")
    if type != Type.SCENARIO:
      if environment == "production":
        start_time: datetime = datetime.now(timezone.utc) - timedelta(days=7)
      else:
        start_time: datetime = datetime.now(timezone.utc) - timedelta(days=14)
      schedules = list(filter(lambda x: datetime.fromisoformat(x["startTime"]) >= start_time, schedules))
      for schedule in schedules:
        print("Downloading Schedules Analytics...")
        try:
          url: str = f"{base_url}/v3/schedules/{schedule['scheduleId']}"
          response = requests.get(url)
          if response.status_code != 200:
            print(response.status_code)
          else:
            print(f"{schedule['scheduleId']} is success.")
            with open(f"src/resources/analytics/{schedule['scheduleId']}.json", mode="w") as f:
              json.dump(response.json(), f)
        except Exception as e:
          print(e)
          break
