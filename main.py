import requests
import json

if __name__=="__main__":
  with open("src/resources/scheduleIds.json", mode="r") as f:
    schedule_ids = json.load(f)
    for schedule_id in schedule_ids:
      try:
        url: str = f"http://localhost:8080/v3/schedules/{schedule_id['scheduleId']}"
        response = requests.get(url)
        if response.status_code != 200:
          print(response.status_code)
        else:
          with open(f"src/resources/schedules/{schedule_id['scheduleId']}.json", mode="w") as f:
            json.dump(response.json(), f)
      except Exception as e:
        break
