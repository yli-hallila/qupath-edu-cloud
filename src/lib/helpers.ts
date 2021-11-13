import { toast } from "react-toastify";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { Host } from "types";
import validator from "validator";
import { hostState, organizationState } from "./atoms";
import Constants from "./constants";
import { getValue } from "./localStorage";
import Slugs from "./slugs";

export function parseHost(
    slugs: Slugs,
    setHost: SetterOrUpdater<Host | null>,
    setOrganization: SetterOrUpdater<string | null>): void {
    
        // Read host from URL first
        if (slugs.host) {
            const host = decodeURIComponent(slugs.host);

            if (validator.isURL(host, { require_tld: false })) {
                const queryHost = { name: host, id: "query-host", host: host, img: "" };
                setHost(queryHost);
                return;
            } else {
                toast.error("Invalid host")
            }
        }

        console.log("Inside parseHost()");

        // Read from browser's local storage
        const cachedHost = getValue(Constants.LOCALSTORAGE_HOST_KEY);
        if (cachedHost) {
            setHost(cachedHost);
        }

    // Read organization and project from URL
    setOrganization(slugs.organization);
}