import { useState } from "react";
import Service from "../services";
import Button from "../widgets/button";
import Flex from "../widgets/flex";
import Input from "../widgets/input";

const sampleData = {
    "season": 1,
    "mnth": 1,
    "hr": 1,
    "holiday": 0,
    "weekday": 1,
    "workingday": 1,
    "weathersit": 1,
    "temp": 0.24,
    "atemp": 0.28,
    "hum": 0.81,
    "windspeed": 0.0
}

// Write a type of BikeData that matches the sample data above.
type BikeShareData = {
    season: number;
    mnth: number;
    hr: number;
    holiday: number;
    weekday: number;
    workingday: number;
    weathersit: number;
    temp: number;
    atemp: number;
    hum: number;
    windspeed: number;
}

// create a component called BikeShareForm that returns a form the BikeShareData
const BikeShareForm = () => {
  const [isRunning, setRunning] = useState(false);
  const [predictedValue, setPredictedValue] = useState<number | null>(null);
  const [formData, setFormData] = useState<BikeShareData>(sampleData);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault();
    setRunning(true);

    Service.predict({
      model: "bikeshare",
      ...formData
    }).then((response) => {
      const { y_pred } = response as any;
      setPredictedValue(y_pred[0]);
    }).finally(() => {
      setRunning(false);
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof BikeShareData;
    const value = event.target.value;
    setPredictedValue(null);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <form>
      <Flex className="" flexDirection="column" rowGap="6px">
        <Input
          type="number"
          name="season"
          label="Season (1:springer, 2:summer, 3:fall, 4:winter)"
          min={1}
          max={4}
          value={formData.season}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="mnth"
          label="Month (1 to 12)"
          min={1}
          max={12}
          value={formData.mnth}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="hr"
          label="Hour (0 to 23)"
          min={0}
          max={23}
          value={formData.hr}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="holiday"
          label="Holiday (0 or 1)"
          min={0}
          max={1}
          value={formData.holiday}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="weekday"
          label="Weekday (0 to 6)"
          min={0}
          max={6}
          value={formData.weekday}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="workingday"
          label="Working Day (holiday is 1, otherwise is 0)"
          min={0}
          max={1}
          value={formData.workingday}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="weathersit"
          label="Weather Situation (1: Clear, 2: Mist + Cloudy, Mist 3: Light Snow, Light Rain, 4: Heavy Rain + Ice Pallets)"
          min={1}
          max={4}
          value={formData.weathersit}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="temp"
          label="Temperature (Normalized in Celsius)"
          step="0.01"
          min={0}
          max={1}
          value={formData.temp}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="atemp"
          label="Feels Like Temperature (Normalized in Celsius)"
          step="0.01"
          min={0}
          max={1}
          value={formData.atemp}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="hum"
          label="Humidity (Normalized, divided to 100)"
          step="0.01"
          min={0}
          max={1}
          value={formData.hum}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="windspeed"
          label="Wind Speed (Normalized, divided to 67)"
          step="0.01"
          min={0}
          max={1}
          value={formData.windspeed}
          onChange={handleChange}
        />
        <Button type="submit" variant="primary" onClick={handleSubmit} busy={isRunning}>
          Predict
        </Button>
        </Flex>
        {predictedValue != null && <Flex className="m-small" flexDirection="column" rowGap="6px">
        <div className="text-lg font-bold">Predicted Value</div>
        <div className="text-2xl">{predictedValue}</div>
      </Flex>}
    </form>
  );
}

export default BikeShareForm;