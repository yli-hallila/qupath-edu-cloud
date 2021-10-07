import React, { useEffect, useState } from "react";
import Slides from "./Slides";
import Annotations from "./Annotations";
import Viewer from "./Viewer";

function ProjectView({ project, OnProjectChange }) {
    const [ projectData, setProjectData ] = useState(null);
    const [ annotations, setAnnotations ] = useState([]);
    const [ slide, setSlide ] = useState(null);
    const [ error, setError ] = useState(null);

    const JSZip = require("jszip");

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
        fetch("https://yli-hallila.fi:3000/http://csc.yli-hallila.fi:7777/api/v0/projects/" + project)
            .then(res => res.blob())
            .then(
            (result) => {
                JSZip.loadAsync(result)
                    .then(function(zip) {
                        zip.folder(project).file("project.qpproj").async("string").then(function(str) {
                            console.log(JSON.parse(str));
                            setProjectData(JSON.parse(str));
                        });
                    });

                //setProjectData(null);
            },
            (error) => {
                setError(error);
            }
        )
    }, [ project ]);

    if (error) {
        return "Error with ProjectView";
    }

    return (
        <main class="flex flex-wrap flex-grow p-4 h-full">
            <div class="w-1/4 border">
                <a class="p-4 italic cursor-pointer" onClick={() => OnProjectChange(null)}>&lt; return to projects</a>

                <Slides slides={projectData?.images} OnSlideChange={OnSlideChange} />
                <Annotations annotations={annotations} />
            </div>
            <div class="w-3/4 border">
                <Viewer slide={slide} annotations={annotations} />
            </div>
        </main>
    )
};

export default ProjectView;
