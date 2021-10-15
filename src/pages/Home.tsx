import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "tailwindcss/tailwind.css";
import validator from "validator";
import HostSelector from "../components/HostSelector";
import OrganizationSelector from "../components/OrganizationSelector";
import ProjectSelector from "../components/ProjectSelector";
import ProjectView from "../components/ProjectView";
import { hostState } from "../lib/atoms";
import { getValue, setValue } from "../lib/localStorage";

const Home = () => {
    const setHost = useSetRecoilState(hostState);
    const currentHost = useRecoilValue(hostState);
    const [organization, setOrganization] = useState("");
    const [projectId, setProjectId] = useState("");
    const query = useLocation().search;

    useEffect(() => {
        const hostHelper = async () => {
            // Read URL query first
            if (query) {
                const queryUrl = new URLSearchParams(query).get("host");

                if (queryUrl && validator.isURL(queryUrl)) {
                    const queryHost = { name: queryUrl, id: "query-host", host: queryUrl, img: "" };
                    setHost(queryHost);
                    setValue("qupath_host", queryHost);
                }
            }

            // Read from browser's locale storage
            const cachedHost = getValue("qupath_host");
            if (cachedHost) {
                setHost(cachedHost);
            }
        };

        hostHelper();
    }, []);

    const onOrganizationChange = (newOrganization: string) => {
        setOrganization(newOrganization);
    };

    const onProjectChange = (newProjectId: string) => {
        setProjectId(newProjectId);
    };

    return (
        <>
            {projectId ? (
                <ProjectView projectId={projectId} onProjectChange={onProjectChange} />
            ) : (
                <div className="App-header mx-auto w-72 space-y-12 mt-4">
                    <header className="App-header mx-auto w-72 space-y-12 mt-4">
                        <h1 className="text-3xl">QuPath Edu Cloud</h1>
                    </header>
                    <HostSelector />
                    {currentHost ? (
                        <>
                            <OrganizationSelector onOrganizationChange={onOrganizationChange} />
                            <ProjectSelector organizationId={organization} onProjectChange={onProjectChange} />
                        </>
                    ) : null}
                </div>
            )}
        </>
    );
};

export default Home;
