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
        <Button type="submit" variant="primary" onClick={handleSubmit}>
          Predict
        </Button>
      </Flex>
    </form>
  );
}

export default GermanCreditForm;