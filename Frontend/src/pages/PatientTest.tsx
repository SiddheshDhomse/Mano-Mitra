import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { TestCard } from "@/components/common/TestCard";
import { ProgressTracker } from "@/components/common/ProgressTracker";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mic, Volume2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


const animalImages = [
  { src: "/assets/Animals/Lion.jpg", name: "Lion" },
  { src: "/assets/Animals/Tiger.jpg", name: "Tiger" },
  { src: "/assets/Animals/Elephant.jpg", name: "Elephant" },
  { src: "/assets/Animals/Giraffe.jpg", name: "Giraffe" },
  { src: "/assets/Animals/Zebra.jpg", name: "Zebra" },
  { src: "/assets/Animals/Leopard.png", name: "Leopard" },
  { src: "/assets/Animals/Rhinoceros.jpg", name: "Rhinoceros" },
  { src: "/assets/Animals/Hippopotamus.jpg", name: "Hippopotamus" },
  { src: "/assets/Animals/Panda.jpg", name: "Panda" },
  { src: "/assets/Animals/Kangaroo.png", name: "Kangaroo" },
  { src: "/assets/Animals/Bear.jpg", name: "Bear" },
  { src: "/assets/Animals/Fox.jpg", name: "Fox" },
  { src: "/assets/Animals/Deer.jpg", name: "Deer" },
  { src: "/assets/Animals/Camel.jpg", name: "Camel" },
  { src: "/assets/Animals/Horse.jpg", name: "Horse" },
  { src: "/assets/Animals/Monkey.jpg", name: "Monkey" },
  { src: "/assets/Animals/Donkey.jpg", name: "Donkey" },
  { src: "/assets/Animals/Cow.jpg", name: "Cow" },
  { src: "/assets/Animals/Goat.jpg", name: "Goat" },
  { src: "/assets/Animals/Sheep.jpg", name: "Sheep" },
  { src: "/assets/Animals/Hen.jpg", name: "Hen" },
  { src: "/assets/Animals/Duck.jpg", name: "Duck" },
];



function getRandomAnimals() {
  const shuffled = [...animalImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

const testSteps = [
  {
    id: "animal-guess",
    title: "Animal Guess Test",
    description: "Guess the animal shown in the picture"
  },

  {
    id: "repetition",
    title: "Sentence Repetition",
    description: "Repeat phrases"
  },
  {
    id: "fluency",
    title: "Verbal Fluency",
    description: "Word generation"
  },
  {
    id: "memory",
    title: "Memory Recall",
    description: "Remember words"
  },
  {
    id: "abstraction",
    title: "Abstraction",
    description: "Abstract thinking"
  }
];

// Add more sentences for repetition
const repetitionSentences = [
  "The quick brown fox jumps over the lazy dog.",
  "She sells seashells by the seashore.",
  "The early bird catches the worm.",
  "A watched pot never boils.",
  "Actions speak louder than words.",
  "Every cloud has a silver lining.",
  "Better late than never.",
  "Birds of a feather flock together.",
  "A picture is worth a thousand words.",
  "When in Rome, do as the Romans do.",
  "The pen is mightier than the sword.",
  "No pain, no gain.",
  "Beauty is in the eye of the beholder.",
  "Beggars can't be choosers.",
  "Don't count your chickens before they hatch.",
  "Don't put all your eggs in one basket.",
  "Good things come to those who wait.",
  "Honesty is the best policy.",
  "Laughter is the best medicine.",
  "Practice makes perfect."
];

const testContent = {
  "animal-guess": {
    title: "Animal Guess Test",
    instruction: "Look at each animal picture and type your guess. You will get 1 mark for each correct answer.",
    images: getRandomAnimals()
  },
  naming: {
    title: "Object Naming Test",
    instruction: "Look at the images below and say the name of each object. You can use the voice button to record your response or type your answer.",
    images: [
      { id: 1, name: "Apple", description: "A red fruit" },
      { id: 2, name: "Clock", description: "Shows time with hands" },
      { id: 3, name: "Bicycle", description: "Two-wheeled vehicle" }
    ]
  },
  repetition: {
    title: "Sentence Repetition",
    instruction: "Listen carefully to the sentence and repeat it exactly as you heard it. Click the play button to hear the sentence, then use the voice button to record your response.",
    sentences: repetitionSentences
  },
  fluency: {
    title: "Verbal Fluency Test",
    instruction: "You have 60 seconds to name as many animals as you can. Click the voice button when you're ready to start. Speak clearly and try to name different animals.",
    timeLimit: 60
  },
  memory: {
    title: "Memory Recall Test",
    instruction: "Try to remember these three words. You will be asked to recall them later in the test.",
    words: ["APPLE", "SUNSHINE", "DOORWAY"]
  },
  abstraction: {
    title: "Abstraction Test",
    instruction: "Tell me how these two things are alike or what they have in common.",
    pairs: [
      { item1: "Orange", item2: "Banana" },
      { item1: "Train", item2: "Bicycle" }
    ]
  }
};

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function ErrorModal({ open, message, onClose }: { open: boolean, message: string, onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <div className="mb-4 text-lg font-semibold text-red-600">{message}</div>
        <Button variant="default" onClick={onClose}>OK</Button>
      </div>
    </div>
  );
}

export default function PatientTest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const [animalTestImages] = useState(getRandomAnimals());
  const [animalIndex, setAnimalIndex] = useState(0);
  const [animalGuesses, setAnimalGuesses] = useState<string[]>(["", "", ""]);
  const [animalAnswered, setAnimalAnswered] = useState<boolean[]>([false, false, false]); // Track answered
  const [animalInput, setAnimalInput] = useState("");
  const [animalScore, setAnimalScore] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const navigate = useNavigate();

  const currentTestId = testSteps[currentStep]?.id;
  const currentTest = testContent[currentTestId as keyof typeof testContent];

  // Helper to check if test is allowed
  const isTestAllowed = () => localStorage.getItem("testTaken") !== "true";

  // Prevent retaking the test
  useEffect(() => {
    if (!isTestAllowed()) {
      setModalMsg("You have already taken the test. You cannot retake it.");
      setModalOpen(true);
    }
  }, [currentStep]); // Also check on step change

  // Prevent re-answering animal questions
  useEffect(() => {

  }, [animalIndex, currentStep, animalAnswered]);

  // If all animal questions are answered, move to next test automatically
  useEffect(() => {
    // If all animal questions are answered, move to next test automatically
    if (
      currentTestId === "animal-guess" &&
      animalAnswered.every(ans => ans)
    ) {
      setTimeout(() => {
        setResponses({ ...responses, animalScore, animalGuesses });
        setAnimalIndex(0);
        setCurrentStep(currentStep + 1);
      }, 700); // slight delay for UX, adjust as needed
    }
    // eslint-disable-next-line
  }, [animalAnswered, currentTestId]);

  // On test completion, set flag
  const handleNext = () => {
    if (currentTestId === "animal-guess") {
      setResponses({ ...responses, animalScore, animalGuesses });
      setAnimalIndex(0);
    }
    if (currentStep < testSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("testTaken", "true");
      navigate("/test-results");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Voice input handler for animal guess
  const handleVoiceInput = () => {
    if (!isTestAllowed()) {
      setModalMsg("You have already taken the test. You cannot retake it.");
      setModalOpen(true);
      return;
    }
    if (!SpeechRecognition) {
      setModalMsg("Speech recognition is not supported in this browser.");
      setModalOpen(true);
      return;
    }
    setIsRecording(true);
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setAnimalInput(transcript); // Set the recognized text in the input box
      setIsRecording(false);
    };

    recognition.onerror = (event: any) => {
      setIsRecording(false);
      setModalMsg("Voice recognition error: " + event.error);
      setModalOpen(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
      // Optionally, you can prompt the user to try again if aborted
    };
  };

  const [repetitionIndex] = useState(() => Math.floor(Math.random() * repetitionSentences.length));
  const [repetitionUserText, setRepetitionUserText] = useState("");
  const [repetitionRecorded, setRepetitionRecorded] = useState(false);

  // Get the current sentence for repetition
  const repetitionSentence = testContent.repetition.sentences[repetitionIndex];

  // For playing the sentence out loud or repeating instructions
  const handlePlayAudio = () => {
    if (currentTestId === "repetition") {
      // Play the random sentence
      const utterance = new window.SpeechSynthesisUtterance(repetitionSentence);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else if (currentTest?.instruction) {
      // Play the instructions for other tests
      const utterance = new window.SpeechSynthesisUtterance(currentTest.instruction);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  // For recording and converting user's repetition to text
  const handleRepetitionVoiceInput = () => {
    if (!SpeechRecognition) {
      setModalMsg("Speech recognition is not supported in this browser.");
      setModalOpen(true);
      return;
    }
    setIsRecording(true);
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRepetitionUserText(transcript);
      setRepetitionRecorded(true);

      // Compare and log result
      const original = repetitionSentence.trim().toLowerCase();
      const user = transcript.trim().toLowerCase();
      const similarity = compareSentences(original, user);
      // Log comparison result to console as percentage
      console.log("Original:", repetitionSentence);
      console.log("User:", transcript);
      console.log("Similarity:", Math.round(similarity * 100) + "%");
    };

    recognition.onerror = (event: any) => {
      setIsRecording(false);
      setModalMsg("Voice recognition error: " + event.error);
      setModalOpen(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  // Simple similarity function (Jaccard index for demo)
  function compareSentences(a: string, b: string) {
    if (!a || !b) return 0;
    const setA = new Set(a.split(" "));
    const setB = new Set(b.split(" "));
    const intersection = new Set([...setA].filter((x) => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return union.size === 0 ? 0 : (intersection.size / union.size);
  }

  // Handle input for current animal
  const handleAnimalInputChange = (value: string) => {
    setAnimalInput(value);
  };

  // Handle submitting guess for current animal
  const handleAnimalGuessSubmit = () => {
    if (!isTestAllowed()) {
      setModalMsg("You have already taken the test. You cannot retake it.");
      setModalOpen(true);
      return;
    }
    if (animalAnswered[animalIndex]) {
      setModalMsg("This question has already been answered and cannot be reattempted.");
      setModalOpen(true);
      return;
    }
    const correctName = animalTestImages[animalIndex].name.toLowerCase();
    const guess = animalInput.trim().toLowerCase();
    const newGuesses = [...animalGuesses];
    const newAnswered = [...animalAnswered];
    newGuesses[animalIndex] = animalInput;
    newAnswered[animalIndex] = true;
    setAnimalGuesses(newGuesses);
    setAnimalAnswered(newAnswered);

    if (guess === correctName) {
      setAnimalScore(animalScore + 1);
    }

    setAnimalInput("");
    if (animalIndex < 2) {
      setAnimalIndex(animalIndex + 1);
    }
  };

  // 8. Render animal guess test
const renderTestContent = () => {
  switch (currentTestId) {
    case "animal-guess":
      return (
        <div className="flex flex-col items-center space-y-6">
          <img
            src={animalTestImages[animalIndex].src}
            alt={`Animal ${animalIndex + 1}`}
            className="rounded-lg max-h-64 max-w-xs w-full bg-white object-contain mx-auto border"
          />
          <input
            type="text"
            placeholder="Your guess"
            value={animalInput}
            onChange={e => handleAnimalInputChange(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            disabled={animalIndex > 2}
          />
          <Button
            variant="default"
            size="lg"
            onClick={handleAnimalGuessSubmit}
            disabled={animalInput === "" || animalIndex > 2}
          >
            Submit Guess
          </Button>
          <div className="text-center mt-2 text-muted-foreground">
            Animal {animalIndex + 1} of 3
          </div>
          {animalIndex > 2 && (
            <div className="text-center mt-4">
              <Button variant="default" size="lg" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}
        </div>
      );

    case "naming":
      const namingTest = currentTest as typeof testContent.naming;
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {namingTest.images?.map((image, index) => (
            <div key={image.id} className="text-center space-y-3">
              <div className="bg-muted rounded-lg h-32 flex items-center justify-center text-muted-foreground">
                <span className="text-lg">{image.description}</span>
              </div>
              <p className="text-body font-medium">Item {index + 1}</p>
            </div>
          ))}
        </div>
      );

    case "repetition":
      return (
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Button
              variant="default"
              size="lg"
              onClick={handleRepetitionVoiceInput}
              disabled={isRecording || repetitionRecorded}
            >
              <Mic className="mr-2" />
              {isRecording ? "Recording..." : "Record Your Repetition"}
            </Button>
            {repetitionRecorded && (
              <div className="text-muted-foreground text-sm">
                Your response has been recorded.
              </div>
            )}
          </div>
        </div>
      );

    case "fluency":
      return (
        <div className="text-center space-y-6">
          <div className="bg-accent/10 p-8 rounded-lg">
            <div className="text-6xl font-bold text-accent mb-4">
              {isRecording ? "🎤" : "60"}
            </div>
            <p className="text-body-large text-foreground">
              {isRecording ? "Recording... Name animals!" : "Seconds to name animals"}
            </p>
          </div>
        </div>
      );

    case "memory":
      const memoryTest = currentTest as typeof testContent.memory;
      return (
        <div className="text-center space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {memoryTest.words?.map((word, index) => (
              <div key={index} className="bg-primary/10 p-6 rounded-lg">
                <span className="text-2xl font-bold text-primary">{word}</span>
              </div>
            ))}
          </div>
          <p className="text-body text-muted-foreground">
            Take a moment to remember these words. You'll be asked about them later.
          </p>
        </div>
      );

    case "abstraction":
      const abstractionTest = currentTest as typeof testContent.abstraction;
      return (
        <div className="space-y-6">
          {abstractionTest.pairs?.map((pair, index) => (
            <div key={index} className="bg-muted/50 p-6 rounded-lg">
              <div className="flex items-center justify-center gap-6">
                <span className="text-xl font-semibold bg-primary/10 px-4 py-2 rounded">
                  {pair.item1}
                </span>
                <span className="text-2xl text-muted-foreground">&</span>
                <span className="text-xl font-semibold bg-primary/10 px-4 py-2 rounded">
                  {pair.item2}
                </span>
              </div>
              <p className="text-center mt-4 text-muted-foreground">
                How are these two things alike?
              </p>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ErrorModal open={modalOpen} message={modalMsg} onClose={() => {
        setModalOpen(false);
        // If test is already taken, redirect or block further actions
        if (modalMsg.includes("already taken")) {
          navigate("/"); // or any other page you want
        }
      }} />
      {/* Only render test if modal is not open or not for already taken */}
      {!(modalOpen && modalMsg.includes("already taken")) && (
        <div className="container mx-auto px-4 py-8">
          {/* Progress Tracker */}
          <ProgressTracker
            steps={testSteps}
            currentStep={currentStep}
            className="mb-8"
          />

          {/* Test Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <TestCard
              title={currentTest?.title || ""}
              instruction={currentTest?.instruction || ""}
              onVoiceInput={handleVoiceInput}
              onPlayAudio={handlePlayAudio}
              isRecording={isRecording}
              hasAudio={currentTestId === "repetition"}
              hideMicButton={currentTestId === "repetition"} // <-- Hide default mic for repetition

            >
              {renderTestContent()}
            </TestCard>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-body text-muted-foreground">
                {currentStep + 1} of {testSteps.length}
              </span>
            </div>

            <Button
              variant="default"
              size="lg"
              onClick={handleNext}
            >
              {currentStep === testSteps.length - 1 ? "Complete Test" : "Next"}
              <ArrowRight className="ml-2" />
            </Button>
          </div>

          {/* Exit option */}
          <div className="text-center mt-8">
            <Button variant="ghost" asChild>
              <Link to="/">Exit Test</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
