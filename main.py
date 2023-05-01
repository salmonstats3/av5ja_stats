import requests
import json

if __name__=="__main__":
  with open("src/resources/schedules.json", mode="r") as f:
    schedules = json.load(f)
    for (index, schedule) in enumerate(schedules):
      try:
        url: str = f"http://localhost:8080/v3/schedules/{schedule['scheduleId']}"
        response = requests.get(url)
        if response.status_code != 200:
          print(response.status_code)
        else:
          print(f"\r{index+1}/{len(schedules)}", end='')
          with open(f"src/resources/schedules/{schedule['scheduleId']}.json", mode="w") as f:
            json.dump(response.json(), f)
      except Exception as e:
        break
