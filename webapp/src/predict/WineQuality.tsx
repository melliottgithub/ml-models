import { useState } from "react";
import Service from "../services";
import Button from "../widgets/button";
import Flex from "../widgets/flex";
import Input from "../widgets/input";

type WineData = {
    fixed_acidity: number;
    volatile_acidity: number;
    citric_acid: number;
    residual_sugar: number;
    chlorides: number;
    free_sulfur_dioxide: number;
    total_sulfur_dioxide: number;
    density: number;
    pH: number;
    sulphates: number;
    alcohol: number;
};


const WineQualityForm = () => {
  const [isRunning, setRunning] = useState(false);
  const [predictedValue, setPredictedValue] = useState<number | null>(null);
  const [formData, setFormData] = useState<WineData>({
    fixed_acidity: 7.4,
    volatile_acidity: 0.7,
    citric_acid: 0.0,
    residual_sugar: 1.9,
    chlorides: 0.076,
    free_sulfur_dioxide: 11.0,
    total_sulfur_dioxide: 34.0,
    density: 0.9978,
    pH: 3.51,
    sulphates: 0.56,
    alcohol: 9.4,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault();
    setRunning(true);

    // replace _ with . in keys
    const parameters: Record<string, string | number> = {};
    Object.entries(formData).forEach(([key, value]) => {
      parameters[key.replace("_", ".")] = value;
    });

    Service.predict({
      model: "wine-quality",
      ...parameters
    }).then((response) => {
      const { y_pred } = response as any;
      setPredictedValue(y_pred[0]);
    }).finally(() => {
      setRunning(false);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof WineData;
    const value = event.target.value;
    setPredictedValue(null);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex className="" flexDirection="column" rowGap="6px">
        <Input
          type="number"
          name="fixed_acidity"
          label="Fixed Acidity"
          value={formData.fixed_acidity}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="volatile_acidity"
          label="Volatile Acidity"
          value={formData.volatile_acidity}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="citric_acid"
          label="Citric Acid"
          step="0.01"
          min={0}
          max={1}
          value={formData.citric_acid}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="residual_sugar"
          label="Residual Sugar"
          value={formData.residual_sugar}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="chlorides"
          label="Chlorides"
          step="0.01"
          min={0}
          max={1}
          value={formData.chlorides}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="free_sulfur_dioxide"
          label="Free Sulfur Dioxide"
          value={formData.free_sulfur_dioxide}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="total_sulfur_dioxide"
          label="Total Sulfur Dioxide"
          value={formData.total_sulfur_dioxide}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="density"
          label="Density"
          value={formData.density}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="pH"
          label="pH"
          value={formData.pH}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="sulphates"
          label="Sulphates"
          value={formData.sulphates}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="alcohol"
          label="Alcohol"
          value={formData.alcohol}
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

export default WineQualityForm;