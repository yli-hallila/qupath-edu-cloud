import { useState } from "react";
import { EduAnswer } from "types";

interface QuizProps {
    eduAnswers: EduAnswer[];
    handleShowQuiz: () => void;
}

function AnnotationQuiz({ eduAnswers, handleShowQuiz }: QuizProps) {
    const [currentChoice, setCurrentChoice] = useState<string | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);

    const choices = eduAnswers.map((answer) => answer.choice);
    const answers = eduAnswers.map((answer) => {
        if (answer.isAnswer) {
            return answer.choice;
        }
    });

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
                <p>All the right answers are: {answers}</p>
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

        if (answers.includes(currentChoice)) {
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
                    {choices.map((option, i) => (
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
