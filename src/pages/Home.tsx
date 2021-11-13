import { useEffect, useState } from "react";
import history from "lib/history";
import { useParams } from "react-router-dom";
import validator from "validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "tailwindcss/tailwind.css";
import HostSelector from "components/HostSelector";
import OrganizationSelector from "components/OrganizationSelector";
import ProjectSelector from "components/ProjectSelector";
import ProjectView from "components/ProjectView";
import { genPath, hostState } from "lib/atoms";
import { getValue } from "lib/localStorage";
import Constants from "lib/constants";
import Slugs from "lib/slugs";

const Home = () => {
    //const setHost = useSetRecoilState(hostState);
    const currentHost = useRecoilValue(hostState);
    const [organization, setOrganization] = useState("");
    const slugs = useParams<Slugs>();

    // useEffect(() => {
    //     const hostHelper = async () => {
    //         // Read host from URL first
    //         if (slugs.host) {
    //             const host = decodeURIComponent(slugs.host);

    //             if (validator.isURL(host, { require_tld: false })) {
    //                 const queryHost = { name: host, id: "query-host", host: host, img: "" };
    //                 setHost(queryHost);
    //                 return;
    //             } else {
    //                 toast.error("Invalid host")
    //             }
    //         }

    //         // Read from browser's local storage
    //         const cachedHost = getValue(Constants.LOCALSTORAGE_HOST_KEY);
    //         if (cachedHost) {
    //             setHost(cachedHost);
    //         }
    //     };

    //     // Read organization and project from URL
    //     setOrganization(slugs.organization);
        
    //     hostHelper();
    // }, [slugs]);

    // TODO: Are these necessary?
    const onOrganizationChange = (newOrganization: string) => {
        history.replace(genPath(slugs, { organization: newOrganization }));
        setOrganization(newOrganization);
    };

    return (
        <div className="App-header mx-auto w-72 space-y-12 mt-4">
            <header className="App-header mx-auto w-72 space-y-12 mt-4">
                <h1 className="text-3xl">QuPath Edu Cloud</h1>
            </header>

            <HostSelector />
            
            {currentHost && (
                <>
                    <OrganizationSelector onOrganizationChange={onOrganizationChange} />
                    {organization && (
                        <ProjectSelector organizationId={organization} />
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
