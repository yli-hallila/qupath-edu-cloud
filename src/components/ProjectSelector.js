import React, { useEffect, useState } from "react";

function ProjectSelector({ organization, OnProjectChange }) {
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setSubjects([]);

        fetch("https://yli-hallila.fi:3000/http://csc.yli-hallila.fi:7777/api/v0/workspaces")
            .then(res => res.json())
            .then(
                (result) => {
                    var projects = []

                    result.forEach(element => {
                        if (element.owner.id === organization) {
                            projects = projects.concat(element.projects);
                            //setSubjects(element.projects);
                        }
                    });

                    console.log(projects);

                    setSubjects(projects);
                },
                (error) => {
                    setSubjects([]);
                    setError(error);
                }
            );
        
    }, [ organization ]);

    if (error) {
        return "Error with ProjectSelector";
    }

    if (subjects.length === 0) {
        return "No subjects";
    }

    return (
        <div className="ProjectSelector">
            {subjects.map(project => (
                <li>
                    <a class="cursor-pointer" onClick={() => OnProjectChange(project.id)}>{project.name}</a>
                </li>
            ))}
        </div>
    );
};

export default ProjectSelector;
