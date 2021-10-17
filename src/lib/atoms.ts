import { atom } from "recoil";
import { Host } from "types";
import Slugs from "./slugs";
import { generatePath } from "react-router";

export const hostState = atom({
    key: "hostState",
    default: null as Host | null,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function genPath(slugs: Slugs, newSlugs: any): string {
    let path = "/";

    if (slugs.host) {
        path = path.concat("host/:host/");
    }

    if ((slugs.organization && newSlugs.organization !== null) || newSlugs.organization) {
        path = path.concat(":organization/");
    }

    if ((slugs.project && newSlugs.project !== null) || newSlugs.project) {
        path = path.concat(":project/");
    }

    if ((slugs.slide && newSlugs.slide !== null) || newSlugs.slide) {
        path = path.concat(":slide/");
    }

    console.log(path);

    return generatePath(path, {
        host: slugs.host || newSlugs.host,
        organization: newSlugs.organization || slugs.organization,
        project: newSlugs.project || slugs.project,
        slide: newSlugs.slide || slugs.slide
    });
}