import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { fetchProjectData } from "lib/api";
import "styles/Tabs.css";
import { ProjectData } from "types";
import Annotations from "./Annotations";
import Slides from "./Slides";
import Viewer from "./Viewer";
import history from "lib/history";
import Slugs from "lib/slugs";
import { genPath } from "lib/atoms";

interface ProjectViewProps {
    organizationId: string | null;
    projectId: string;
}

function ProjectView({ organizationId, projectId }: ProjectViewProps) {
    const [projectData, setProjectData] = useState<ProjectData | null>(null);
    const [annotations, setAnnotations] = useState([]);
    const [slide, setSlide] = useState("");
    const slugs = useParams<Slugs>();

    const onSlideChange = (newSlide: string) => {
        if (projectData) {
            for (const image of Array.from(projectData.images)) {
                if (image.serverBuilder.uri === newSlide) {
                    if (image.annotations == null) {
                        setAnnotations([]);
                    } else {
                        setAnnotations(JSON.parse(image.annotations));
                    }

                    break;
                }
            }

            const slideId = new URL(newSlide).pathname.substr(1);

            //history.push(`/${organizationId}/${projectId}/${slideId}`);
            setSlide(slideId);
        }
    };

    useEffect(() => {
        const apiHelper = async () => {
            try {
                const result = await fetchProjectData(projectId);
                setProjectData(result);
            } catch (e) {
                setProjectData(null);
                if (e instanceof Error) {
                    toast.error(e.message);
                }
            }
        };

        apiHelper();
    }, [projectId]);

    useEffect(() => {
        setSlide(slugs.slide);
    }, [ slugs ]);

    return (
        <main className="flex flex-wrap flex-grow p-4 h-full">
            {projectData && (
                <>
                    <div className="w-1/4 border">
                        <Link 
                            to={genPath(slugs, { project: null, slide: null })}
                            replace={true}
                        >
                            &lt; return to projects
                        </Link>

                        <Tabs>
                            <TabList>
                                <Tab>Slides</Tab>
                                <Tab>Annotations</Tab>
                            </TabList>

                            <TabPanel>
                                <Slides images={projectData.images} onSlideChange={onSlideChange} />
                            </TabPanel>
                            <TabPanel>
                                <Annotations annotations={annotations} />
                            </TabPanel>
                        </Tabs>
                    </div>

                    <div className="w-3/4 border">
                        <Viewer slideId={slide} annotations={annotations} />
                    </div>
                </>
            )}
        </main>
    );
}

export default ProjectView;
