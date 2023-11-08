import React from "react";
import Tabs from "../widgets/tabs";
import BikeShare from "./BikeShare";
import GermanCredit from "./GermanCredit";
import HeartDisease from "./HeartDisease";
import SmsSpamForm from "./SmsSpam";
import WineQuality from "./WineQuality";
import BbcArticleCategoryForm from "./BbcCategory";

/*
Models and parameters:
- model: heart-disease parameters: ['age', 'sex', 'cp', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'thal']
- model: sms-spam parameters: ['text']
- model: german-credit parameters: ['Checking.Account', 'Duration', 'Credit.Hist', 'Purpose', 'Credit.Amount', 'Saving.Account', 'Employmnet', 'Disposable.Income','Personal.Status', 'Other.Debtors', 'Present.Residence', 'Property','Age', 'Other.Loans', 'Housing', 'Existing.Credits', 'Job','Number.Liable', 'Telephone', 'Foreign.Worker']
- model: wine-quality parameters: ['fixed.acidity', 'volatile.acidity', 'citric.acid', 'residual.sugar', 'chlorides', 'free.sulfur.dioxide', 'total.sulfur.dioxide', 'density', 'pH', 'sulphates', 'alcohol']
- model: bikeshare parameters: ['season','mnth','hr','holiday','weekday','workingday','weathersit','temp','atemp','hum','windspeed']
- model: bbc parameters: ['text']
}
*/

// component to render a title and Tabs component instance
const Home: React.FC = () => {
  const onClick = () => {
    console.log("Predict");
  };
  return (
    <div className="flex-column m-auto max-width p-xsmall-left p-xsmall-right">
      <header className="flex-row secondary-1 font-size-xxlarge">
        <p onClick={onClick}>Predict</p>
      </header>
      <div className="flex-row justify-center font-size-medium">
        { /* render a Tabs component for each model */}
        <Tabs
          tabs={[
            {
              title: "Heart Disease",
              children: <HeartDisease />,
            },
            {
              title: "SMS Spam",
              children: <SmsSpamForm />,
            },
            {
              title: "German Credit",
              children: <GermanCredit />,
            },
            {
              title: "Wine Quality",
              children: <WineQuality />,
            },
            {
              title: "Bike Share",
              children: <BikeShare />,
            },
            {
              title: "BBC Article Category",
              children: <BbcArticleCategoryForm />,
            },
          ]}
          className="m-xsmall-top"
        />
      </div>
    </div>
  );
};

export default Home;