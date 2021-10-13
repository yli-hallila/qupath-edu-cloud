import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { fetchHosts } from "../lib/api";
import { hostState } from "../lib/atoms";
import { Host } from "../types";

function HostSelector() {
    const [hosts, setHosts] = useState<Host[]>([]);
    const setHost = useSetRecoilState(hostState);
    const [error, setError] = useState<Error | null>(null);

    const onHostChange = (hostId: string) => {
        const newHost = hosts.find((host: Host) => host.id === hostId);
        if (newHost) {
            setHost(newHost);
        }
    };

    useEffect(() => {
        const apiHelper = async () => {
            try {
                const result = await fetchHosts();
                setHosts(result);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e);
                }
            }
        };

        apiHelper();
    }, []);

    if (error) {
        return <>"Error with HostSelector"</>;
    }

    return (
        <div id="HostSelector">
            <p className="text-xl">Select host</p>

            <select name="host" onChange={(e) => onHostChange(e.target.value)}>
                <option>Select ...</option>

                {hosts.map((host: Host) => (
                    <option value={host.id} key={host.id}>
                        {host.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default HostSelector;
