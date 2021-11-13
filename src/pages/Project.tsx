import ProjectView from "components/ProjectView";
import { hostState, organizationState } from "lib/atoms";
import { parseHost } from "lib/helpers";
import Slugs from "lib/slugs";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";

const Project = () => {
    const [host, setHost] = useRecoilState(hostState);
    const [organization, setOrganization] = useRecoilState(organizationState);
    const slugs = useParams<Slugs>();

    useEffect(() => {
        parseHost(slugs, setHost, setOrganization);
    }, []);

    console.log("inside Project()")
    console.log(host);

    return (
        <>
        {console.log("Rendering")}
        <ProjectView organizationId={organization}
                     projectId={slugs.project} />
        </>
    );
};

export default Project;
