import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import OrganizationSelector from "./components/OrganizationSelector";
import ProjectSelector from "./components/ProjectSelector";
import ProjectView from "./components/ProjectView";

const App = () => {
    const [project, setProject] = useState(null);
    const [organization, setOrganization] = useState(null);

    const OnOrganizationChange = (newOrganization) => {
        setOrganization(newOrganization);
    };

    const OnProjectChange = (newProject) => {
        setProject(newProject);
    };

    return (
        <div className="App" className="mx-auto font-mono h-screen">
            <div className="bg-blue-500 p-2">
                <p className="text-white font-bold text-lg text-center">
                    For the complete experience download QuPath Edu{" "}
                    <a href="#" className="underline">
                        here
                    </a>
                </p>
            </div>

            {project !== null ? (
                <ProjectView project={project} OnProjectChange={OnProjectChange} />
            ) : (
                <header className="App-header mx-auto w-64 space-y-12 mt-4">
                    <h1 className="text-xl">QuPath Edu Viewer</h1>
                    <OrganizationSelector OnOrganizationChange={OnOrganizationChange} />
                    <ProjectSelector organization={organization} OnProjectChange={OnProjectChange} />
                </header>
            )}
        </div>
    );
};

export default App;
