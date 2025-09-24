import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Volume2, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface TestCardProps {
  title: string;
  instruction: string;
  children?: React.ReactNode;
  onVoiceInput?: () => void;
  onPlayAudio?: () => void;
  onRetry?: () => void;
  isRecording?: boolean;
  hasAudio?: boolean;
  className?: string;
  hideMicButton?: boolean; // <-- Add this prop
}

export function TestCard({
  title,
  instruction,
  children,
  onVoiceInput,
  onPlayAudio,
  onRetry,
  isRecording = false,
  hasAudio = false,
  className,
  hideMicButton = false, // <-- Default to false
}: TestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="shadow-card border-2 hover:shadow-elevated transition-all duration-300">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-heading text-foreground">{title}</CardTitle>
          
          {/* Audio instruction button */}
          {hasAudio && (
            <Button
              variant="secondary"
              size="lg"
              onClick={onPlayAudio}
              className="mx-auto"
            >
              <Volume2 className="mr-2" />
              Listen to Instructions
            </Button>
          )}
          
          <p className="text-body text-muted-foreground leading-relaxed">{instruction}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {children}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Only show mic button if not hidden */}
            {onVoiceInput && !hideMicButton && (
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="lg"
                onClick={onVoiceInput}
                className="flex-1 sm:flex-none"
              >
                <Mic className="mr-2" />
                {isRecording ? "Stop Recording" : "Voice Response"}
              </Button>
            )}

            {onRetry && (
              <Button variant="outline" size="lg" onClick={onRetry}>
                <RotateCcw className="mr-2" />
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
