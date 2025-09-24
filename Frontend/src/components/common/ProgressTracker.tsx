import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function ProgressTracker({ steps, currentStep, className }: ProgressTrackerProps) {
  return (
    <div className={cn("w-full bg-card border border-border rounded-lg p-6 shadow-soft", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300",
                    {
                      "bg-success text-success-foreground shadow-card": isCompleted,
                      "bg-primary text-primary-foreground shadow-elevated ring-4 ring-primary/20": isCurrent,
                      "bg-muted text-muted-foreground": isUpcoming,
                    }
                  )}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>
                
                {/* Step title */}
                <div className="mt-3 text-center">
                  <p className={cn(
                    "text-sm font-medium",
                    {
                      "text-success": isCompleted,
                      "text-primary": isCurrent,
                      "text-muted-foreground": isUpcoming,
                    }
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1 max-w-20">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <motion.div
                  className={cn(
                    "h-1 w-16 lg:w-24 mx-4 rounded-full transition-all duration-500",
                    {
                      "bg-success": index < currentStep,
                      "bg-muted": index >= currentStep,
                    }
                  )}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: index < currentStep ? 1 : 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}