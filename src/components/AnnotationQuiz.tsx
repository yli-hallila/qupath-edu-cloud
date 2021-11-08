import { useState } from "react";
import { Annotation } from "types";

interface QuizProps {
    annotation: Annotation;
    handleShowQuiz: () => void;
}

function AnnotationQuiz({ annotation, handleShowQuiz }: QuizProps) {
    const mockAnswers = ["Choice #2"]; // annotation.answer?
    const mockChoices = ["Choice #1", "Choice #2", "Choice #3"]; // annotation.choices?

    const [currentChoice, setCurrentChoice] = useState<string | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);

    const result = () => {
        if (correctAnswer === null) {
            return currentChoice ? (
                <button className="button3d mr-4" onClick={() => onSubmitAnswer()}>
                    OK
                </button>
            ) : (
                <button className="button mr-4" disabled>
                    OK
                </button>
            );
        }

        if (correctAnswer) {
            return (
                <>
                    <p>Correct answer!</p>;
                    <button className="button3d mr-4" onClick={() => handleShowQuiz()}>
                        OK
                    </button>
                </>
            );
        }

        return (
            <>
                <p>Wrong answer!</p>
                <p>All the right answers are: {mockAnswers}</p>
                <button className="button3d mr-4" onClick={() => handleShowQuiz()}>
                    OK
                </button>
            </>
        );
    };

    const onSubmitAnswer = () => {
        if (!currentChoice) {
            setCorrectAnswer(null);
            return;
        }

        if (mockAnswers.includes(currentChoice)) {
            setCorrectAnswer(true);
        } else {
            setCorrectAnswer(false);
        }
    };

    return (
        <div className="mt-8">
            <form>
                <select
                    className="form-select w-full mb-4"
                    name="Answer"
                    onChange={(e) => setCurrentChoice(e.target.value)}
                >
                    <option></option>
                    {mockChoices.map((option, i) => (
                        <option key={i}>{option}</option>
                    ))}
                </select>
            </form>
            {result()}

            {correctAnswer === null && (
                <button className="button3d mr-4" onClick={() => handleShowQuiz()}>
                    Cancel
                </button>
            )}
        </div>
    );
}

export default AnnotationQuiz;
