import React from "react";
import { CheckCircle2 } from "lucide-react";

// Define types for props
type SidebarProps = {
  steps: { id: string; title: string; completed: boolean }[];
  activeStep: string;
  setActiveStep: (stepId: string) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  steps,
  activeStep,
  setActiveStep,
}) => (
  <div className="w-64 border-r pr-8">
    <div className="space-y-4">
      {steps.map((step) => (
        <div
          key={step.id}
          onClick={() => setActiveStep(step.id)}
          className={`flex items-center p-3 rounded-lg ${
            activeStep === step.id
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {step.completed && (
            <CheckCircle2 className="w-5 h-5 text-teal-400 mr-2" />
          )}
          <span>{step.title}</span>
        </div>
      ))}
    </div>
  </div>
);
