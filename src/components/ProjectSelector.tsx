import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { fetchWorkspaces } from "../lib/api";
import { hostState } from "../lib/atoms";
import { Subject, Workspace } from "../types";

interface ProjectSelectorProps {
    organizationId: string;
    onProjectChange: (newProject: string) => void;
}

function ProjectSelector({ organizationId, onProjectChange }: ProjectSelectorProps) {
    const host = useRecoilValue(hostState);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!host) {
            setError(new Error("No project selected"));
            return;
        }
        const apiHelper = async () => {
            try {
                const result = await fetchWorkspaces();
                result.forEach((workspace: Workspace) => {
                    if (workspace.owner.id === organizationId) {
                        setSubjects(workspace.subjects);
                    }
                });
            } catch (e) {
                setSubjects([]);
                if (e instanceof Error) {
                    setError(e);
                }
            }
        };

        apiHelper();
    }, [organizationId]);

    if (error) {
        return <>"Error with ProjectSelector"</>;
    }

    if (subjects.length === 0) {
        return <>"No subjects"</>;
    }

    return (
        <div className="ProjectSelector">
            {subjects.map((subject) => (
                <span key={subject.id}>
                    <p className="text-xl underline">{subject.name}</p>
                    <ul>
                        {subject.projects.map((project) => (
                            <li key={project.id}>
                                <a className="cursor-pointer" onClick={() => onProjectChange(project.id)}>
                                    {project.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </span>
            ))}
        </div>
    );
}

export default ProjectSelector;
