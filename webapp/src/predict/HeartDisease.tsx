import { useState } from "react";
import Service from "../services";
import Button from "../widgets/button";
import Flex from "../widgets/flex";
import Input from "../widgets/input";
/*
Hear dease inputs fields:
['age', 'sex', 'cp', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'thal']
*/

/*
sample CSV input data:
age,sex,cp,trestbps,chol,cigs,years,fbs,famhist,restecg,thalach,exang,thal,num
63,1,1,145,233,50,20,1,1,2,150,0,6,0
67,1,4,120,229,20,35,0,1,2,129,1,7,1
*/

// write a type of input fields
type HeartDiseaseData = {
  age: number;
  sex: number;
  cp: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  thal: number;
}

const sampleData: HeartDiseaseData = {
  age: 63,
  sex: 1,
  cp: 1,
  chol: 233,
  fbs: 1,
  restecg: 2,
  thalach: 150,
  exang: 0,
  thal: 6,
}

const HeartDiseaseForm = () => {
  const [isRunning, setRunning] = useState(false);
  const [predictedValue, setPredictedValue] = useState<number | null>(null);
  const [formData, setFormData] = useState<HeartDiseaseData>(sampleData);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault();
    setRunning(true);

    Service.predict({
      model: "heart-disease",
      ...formData
    }).then((response) => {
      const { y_pred } = response as any;
      setPredictedValue(y_pred[0]);
    }).finally(() => {
      setRunning(false);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof HeartDiseaseData;
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
          name="age"
          label="Age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />
        <Input
          name="sex"
          label="Sex"
          type="number"
          value={formData.sex}
          onChange={handleChange}
        />
        <Input
          name="cp"
          label="Chest Pain"
          type="number"
          value={formData.cp}
          onChange={handleChange}
        />
        <Input
          name="chol"
          label="Cholesterol"
          type="number"
          value={formData.chol}
          onChange={handleChange}
        />
        <Input

          name="fbs"
          label="Fasting Blood Sugar"
          type="number"
          value={formData.fbs}
          onChange={handleChange}
        />
        <Input
          name="restecg"
          label="Resting Electrocardiographic"
          type="number"
          value={formData.restecg}
          onChange={handleChange}
        />
        <Input

          name="thalach"
          label="Maximum Heart Rate Achieved"
          type="number"
          value={formData.thalach}
          onChange={handleChange}
        />
        <Input
          name="exang"
          label="Exercise Induced Angina"
          type="number"
          value={formData.exang}
          onChange={handleChange}
        />
        <Input
          name="thal"
          label="Thal"
          type="number"
          value={formData.thal}
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

export default HeartDiseaseForm;