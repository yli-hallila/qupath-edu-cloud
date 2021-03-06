import { fetchHosts, isValidHost } from "lib/api";
import { hostState } from "lib/atoms";
import Constants from "lib/constants";
import { setValue } from "lib/localStorage";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loading-icons";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "styles/Buttons.css";
import { Host } from "types";
import validator from "validator";

interface Selection {
    private: boolean;
    host: Host | null;
}

function HostSelector() {
    const [hosts, setHosts] = useState<Host[]>([]);
    const defaultHost = { private: false, host: null };
    const [selection, setSelection] = useState<Selection>(defaultHost);
    const [urlError, setUrlError] = useState(false);
    const setHost = useSetRecoilState(hostState);
    const currentHost = useRecoilValue(hostState);
    const [waiting, setWaiting] = useState<boolean>(false);

    const onPublicHostChange = (hostId: string) => {
        const newHost = hosts.find((host: Host) => host.id === hostId);
        if (newHost) {
            setSelection({ private: false, host: newHost });
        } else {
            setSelection(defaultHost);
        }
    };

    const onPrivateHostChange = (url: string) => {
        if (url.length === 0) {
            setUrlError(false);
            setSelection(defaultHost);
        } else if (validator.isURL(url)) {
            setUrlError(false);
            setSelection({ private: true, host: { id: "custom-host", name: "Custom host", host: url, img: "" } });
        } else {
            setUrlError(true);
            setSelection({ ...defaultHost, private: true });
        }
    };

    const onSave = async () => {
        setWaiting(true);
        const valid = selection.host ? await isValidHost(selection.host.host) : false;
        if (valid) {
            setHost(selection.host);
            setValue(Constants.LOCALSTORAGE_HOST_KEY, selection.host);
        } else {
            toast.error("Please check your internet connection and that you're connecting to the correct server.");
        }

        setWaiting(false);
    };

    useEffect(() => {
        const apiHelper = async () => {
            try {
                const result = await fetchHosts();
                setHosts(result);
            } catch (e) {
                if (e instanceof Error) {
                    toast.error(e.message);
                }
            }
        };

        apiHelper();
    }, []);

    if (hosts.length === 0) {
        return <p>Unexpected error with HostSelector</p>;
    }

    return (
        <div id="HostSelector">
            {currentHost ? (
                <div className="flex">
                    <div
                        className="button-like w-full m-1 text-center"
                    >
                        {currentHost.name}
                    </div>
                    <button
                        className="button-red m-1"
                        onClick={() => {
                            setHost(null);
                            setValue(Constants.LOCALSTORAGE_HOST_KEY, null);
                        }}
                    >
                        x
                    </button>
                </div>
            ) : (
                <>
                    <p className="text-xl">Choose a host</p>
                    <select
                        className="w-full"
                        disabled={selection.private}
                        name="host"
                        onChange={(e) => onPublicHostChange(e.target.value)}
                        value={selection.private ? "" : selection.host ? selection.host.id : ""}
                    >
                        <option>Select a public host</option>

                        {hosts.map((host: Host) => (
                            <option value={host.id} key={host.id}>
                                {host.name}
                            </option>
                        ))}
                    </select>

                    <p className="text-xl text-center font-bold my-4">OR</p>

                    <form>
                        <input
                            type="text"
                            placeholder="Enter private a host"
                            onChange={(e) => onPrivateHostChange(e.target.value)}
                            className="w-full"
                        />
                    </form>

                    <p className={urlError ? "visible" : "invisible"}>Not a valid URL.</p>

                    <button
                        className="button w-full"
                        type="button"
                        disabled={waiting || !selection.host || (!selection.private && !selection.host && !urlError)}
                        onClick={() => onSave()}
                    >
                        Save preferences
                        {waiting && <ThreeDots className="m-auto" stroke="white" speed={2} />}
                    </button>
                </>
            )}
        </div>
    );
}

export default HostSelector;
