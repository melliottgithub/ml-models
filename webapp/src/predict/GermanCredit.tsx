import React, { useState } from "react";
import Service from "../services";
import Button from "../widgets/button";
import Flex from "../widgets/flex";
import Input from "../widgets/input";

type GermanCredit = {
  Checking_Account: string;
  Duration: number;
  Credit_Hist: string;
  Purpose: string;
  Credit_Amount: number;
  Saving_Account: string;
  Employmnet: string;
  Disposable_Income: number;
  Personal_Status: string;
  Other_Debtors: string;
  Present_Residence: number;
  Property: string;
  Age: number;
  Other_Loans: string;
  Housing: string;
  Existing_Credits: number;
  Job: string;
  Number_Liable: number;
  Telephone: string;
  Foreign_Worker: string;
};

const GermanCreditForm = () => {
  const [isRunning, setRunning] = useState(false);
  const [predictedValue, setPredictedValue] = useState<number | null>(null);
  const [formData, setFormData] = useState<GermanCredit>({
    Checking_Account: "A11",
    Duration: 6,
    Credit_Hist: 'A34',
    Purpose: 'A43',
    Credit_Amount: 1169,
    Saving_Account: 'A65',
    Employmnet: 'A75',
    Disposable_Income: 4,
    Personal_Status: 'A93',
    Other_Debtors: 'A101',
    Present_Residence: 4,
    Property: 'A121',
    Age: 67,
    Other_Loans: 'A143',
    Housing: 'A152',
    Existing_Credits: 2,
    Job: 'A173',
    Number_Liable: 1,
    Telephone: 'A192',
    Foreign_Worker: 'A201',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault();
    console.log(formData);
    // replace _ with . in keys
    const parameters: Record<string, string | number> = {};
    Object.entries(formData).forEach(([key, value]) => {
      parameters[key.replace("_", ".")] = value;
    });
    console.log(parameters);
    Service.predict({
      model: "german-credit",
      ...parameters
    }).then((response) => {
      const { y_pred } = response as any;
      setPredictedValue(y_pred[0]);
    }).finally(() => {
      setRunning(false);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof GermanCredit;
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex className="" flexDirection="column" rowGap="6px">
        <Input
          type="text"
          name="Checking_Account"
          label="Checking Account"
          value={formData.Checking_Account}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Duration"
          label="Duration"
          value={formData.Duration}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Credit_Hist"
          label="Credit History"
          value={formData.Credit_Hist}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Purpose"
          label="Purpose"
          value={formData.Purpose}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Credit_Amount"
          label="Credit Amount"
          value={formData.Credit_Amount}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Saving_Account"
          label="Saving Account"
          value={formData.Saving_Account}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Employmnet"
          label="Employment"
          value={formData.Employmnet}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Disposable_Income"
          label="Disposable Income"
          value={formData.Disposable_Income}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Personal_Status"
          label="Personal Status"
          value={formData.Personal_Status}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Other_Debtors"
          label="Other Debtors"
          value={formData.Other_Debtors}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Present_Residence"
          label="Present Residence"
          value={formData.Present_Residence}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Property"
          label="Property"
          value={formData.Property}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Age"
          label="Age"
          value={formData.Age}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Other_Loans"
          label="Other Loans"
          value={formData.Other_Loans}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Housing"
          label="Housing"
          value={formData.Housing}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Existing_Credits"
          label="Existing Credits"
          value={formData.Existing_Credits}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Job"
          label="Job"
          value={formData.Job}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Number_Liable"
          label="Number Liable"
          value={formData.Number_Liable}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Telephone"
          label="Telephone"
          value={formData.Telephone}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Foreign_Worker"
          label="Foreign Worker"
          value={formData.Foreign_Worker}
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

export default GermanCreditForm;