import requests
import os
import json
from dotenv import load_dotenv
from datetime import datetime,timedelta,timezone

load_dotenv(verbose=True)

if __name__=="__main__":
  base_url: str = os.environ.get("VITE_APP_BASE_API_URL")
  # 二週間前からカウントする
  start_time: datetime = datetime.now(timezone.utc) - timedelta(days=14)
  schedules = requests.get(f"{base_url}/v3/schedules").json()
  schedules = list(filter(lambda x: datetime.fromisoformat(x["startTime"]) >= start_time, schedules))
  for (index, schedule) in enumerate(schedules):
    try:
      url: str = f"{base_url}/v3/schedules/{schedule['scheduleId']}"
      response = requests.get(url)
      if response.status_code != 200:
        print(response.status_code)
      else:
        print(f"{schedule['scheduleId']} is success.")
        with open(f"src/resources/schedules/{schedule['scheduleId']}.json", mode="w") as f:
          json.dump(response.json(), f)
    except Exception as e:
      break
