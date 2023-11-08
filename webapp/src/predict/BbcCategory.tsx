import React, { useState } from "react";
import Service from "../services";
import Button from "../widgets/button";
import Flex from "../widgets/flex";
import Multiline from "../widgets/multiline";

type ArticleData = {
    text: string
}

// the component
const BbcArticleCategoryForm = () => {
    const [isRunning, setRunning] = useState(false);
    const [predictedValue, setPredictedValue] = useState<number | null>(null);
    const [formData, setFormData] = useState<ArticleData>({
        text: ''
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        event.preventDefault();
        setRunning(true);
    
        Service.predict({
          model: "bbc",
          ...formData
        }).then((response) => {
            console.log(response);
          const { y_pred } = response as any;
          setPredictedValue(y_pred[0]);
        }).finally(() => {
          setRunning(false);
        });
      }; 

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const fieldName = event.target.name as keyof ArticleData;
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
        <Multiline
          name="text"
          label="Text"
          rows={5}
          value={formData.text}
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
    </form >
  );
};

export default BbcArticleCategoryForm;