import React, { useEffect, useState } from "react";
import Annotations from "./Annotations";
import Slides from "./Slides";
import Viewer from "./Viewer";

function ProjectView({ project, OnProjectChange }) {
    const [projectData, setProjectData] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const [slide, setSlide] = useState(null);
    const [error, setError] = useState(null);

    const OnSlideChange = (newSlide) => {
        for (let image of Array.from(projectData.images)) {
            if (image.serverBuilder.uri === newSlide) {
                if (image.annotations == null) {
                    setAnnotations([]);
                } else {
                    setAnnotations(JSON.parse(image.annotations));
                }

                break;
            }
        }

        setSlide(new URL(newSlide).pathname.substr(1));
    };

    useEffect(() => {
        fetch("http://yli-hallila.fi:7777/api/v0/projects/" + project)
            .then((res) => res.json())
            .then(
                (result) => {
                    setProjectData(result);
                },
                (error) => {
                    setError(error);
                }
            );
    }, [project]);

    if (error) {
        return "Error with ProjectView";
    }

    return (
        <main className="flex flex-wrap flex-grow p-4 h-full">
            <div className="w-1/4 border">
                <a className="p-4 italic cursor-pointer" onClick={() => OnProjectChange(null)}>
                    &lt; return to projects
                </a>

                <Slides slides={projectData?.images} OnSlideChange={OnSlideChange} />
                <Annotations annotations={annotations} />
            </div>
            <div className="w-3/4 border">
                <Viewer slide={slide} annotations={annotations} />
            </div>
        </main>
    );
}

export default ProjectView;
