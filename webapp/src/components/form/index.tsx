import React, { useState } from "react";
import Button from "../../widgets/button";
import Input from "../../widgets/input";



interface FormProps {
  onFormSubmit: (age: string, gender: string, chestPain: string, bloodPressure: string) => void;
}


const Form: React.FC<FormProps> = ({ onFormSubmit }) => {
  const [age, setAge] = useState("0");
  // const [gender, setGender] = useState("male");
  const [chestPain, setChestPain] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");

  return (
    <form>
    <Input
      label="Age"
      name="Age"
      type="number"
      value={age}
      onChange={(e) => setAge(e.target.value)}
    />
    <label>Gender</label>
    {/*}
    <Select
      value={gender}
      onChange={(e) => setGender(e.target.value)}
    />
  */}
    <Input
      label="Chest Pain"
      name="Chest_Pain"
      type="text"
      value={chestPain}
      onChange={(e) => setChestPain(e.target.value)}
    />
    <Input
      label="Resting Blood Pressure"
      name="Resting_Blood_Pressure"
      type="number"
      value={bloodPressure}
      onChange={(e) => setBloodPressure(e.target.value)}
    />
    <Button variant="primary" type="button">
      Predict
    </Button>
  </form>
  );
};
export default Form;
