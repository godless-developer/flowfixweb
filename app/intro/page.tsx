"use client";
import { useState } from "react";

import IntroOne from "./IntroOne";
import IntroTwo from "./IntroTwo";
import IntroThree from "./IntroThree";

export default function MultiStep() {
  const [step, setStep] = useState(1);

  function handleNext() {
    setStep((prev) => (prev < 3 ? prev + 1 : prev));
  }

  function handleSkip() {
    setStep((prev) => (prev < 3 ? prev + 1 : prev));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url(/shadow.png)] bg-no-repeat bg-center bg-cover">
      {step === 1 && <IntroOne onNext={handleNext} onSkip={handleSkip} />}
      {step === 2 && <IntroTwo onNext={handleNext} onSkip={handleSkip} />}
      {step === 3 && <IntroThree onNext={handleNext} onSkip={handleSkip} />}
    </div>
  );
}
