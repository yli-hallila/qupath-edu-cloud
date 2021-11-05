import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Annotation } from "types";

interface AnnotationProps {
    annotation: Annotation;
}

function AnnotationPopup({ annotation }: AnnotationProps) {
    // TODO: remove these
    const mockDescription = "Description";
    const mockAnswer = "Choice #2";
    const mockAnswer2 = undefined;
    const mockChoices = ["Choice #1", "Choice #2", "Choice #3"];

    const handleShowAnswer = (annotation: Annotation) => {
        console.log(annotation.geometry.type);
    };

    const handleShowQuiz = (annotation: Annotation) => {
        console.log(mockChoices);
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
            contentStyle={{ width: 400 }}
        >
            <div className="px-4">
                {mockAnswer ? (
                    <>
                        <button className="button3d mr-4" onClick={() => handleShowAnswer(annotation)}>
                            Show quiz
                        </button>
                        <button className="button3d" onClick={() => handleShowQuiz(annotation)}>
                            Show answer
                        </button>
                    </>
                ) : (
                    <>
                        <button className="button" disabled>
                            No answer defined
                        </button>
                        <p>{mockDescription}</p>
                    </>
                )}
            </div>
        </Popup>
    );
}

export default AnnotationPopup;
