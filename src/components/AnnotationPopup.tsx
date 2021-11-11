import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Annotation } from "types";
import AnnotationQuiz from "./AnnotationQuiz";

interface AnnotationProps {
    annotation: Annotation;
}

function AnnotationPopup({ annotation }: AnnotationProps) {
    const eduAnswers = Array.isArray(annotation.properties.metadata.EDU_ANSWER)
        ? annotation.properties.metadata.EDU_ANSWER
        : null;
    const annotationDescription = annotation.properties.metadata.ANNOTATION_DESCRIPTION;

    const [answerVisible, setAnswerVisible] = useState(false);
    const [quizVisible, setQuizVisible] = useState(false);

    const handleShowAnswer = () => {
        setQuizVisible(false);
        setAnswerVisible(!answerVisible);
    };

    const handleShowQuiz = () => {
        setAnswerVisible(false);
        setQuizVisible(!quizVisible);
    };

    return (
        <Popup
            trigger={
                <button>
                    {annotation.geometry.type}
                    {annotation.properties.name && `: ${annotation.properties.name}`}
                </button>
            }
            position="right center"
            arrowStyle={{ color: "#ddd" }}
            contentStyle={{ width: 325, height: 200, backgroundColor: "#ddd" }}
        >
            <div className="p-4">
                {quizVisible && eduAnswers ? (
                    <AnnotationQuiz eduAnswers={eduAnswers} handleShowQuiz={handleShowQuiz} />
                ) : (
                    <>
                        {eduAnswers && eduAnswers.length > 0 ? (
                            <>
                                <button className="button3d mr-4 w-28" onClick={() => handleShowQuiz()}>
                                    Show quiz
                                </button>
                                <button className="button3d w-36" onClick={() => handleShowAnswer()}>
                                    {answerVisible ? "Hide" : "Show"} answer
                                </button>
                                {answerVisible && <p className="pt-4">{annotationDescription}</p>}
                            </>
                        ) : (
                            <>
                                <button className="button" disabled>
                                    No answer defined
                                </button>
                                <p>{annotationDescription}</p>
                            </>
                        )}
                    </>
                )}
            </div>
        </Popup>
    );
}

export default AnnotationPopup;
