import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { fetchOrganizations } from "../lib/api";
import { hostState } from "../lib/atoms";
import { Organization } from "../types";

interface OrganizationSelectorProps {
    onOrganizationChange: (newProject: string) => void;
}

function OrganizationSelector({ onOrganizationChange }: OrganizationSelectorProps) {
    const host = useRecoilValue(hostState);
    const [organizations, setOrganizations] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!host) {
            setError("No host selected");
            return;
        }

        const apiHelper = async () => {
            try {
                const result = await fetchOrganizations();
                setOrganizations(result);
                setError(null);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            }
        };

        apiHelper();
    }, [host]);

    if (error) {
        return <p>{error}</p>;
    }

    if (organizations.length === 0) {
        return <p>Select a host</p>;
    }

    return (
        <div id="OrganizationSelector">
            <p className="text-xl">Select organization</p>

            <select name="organization" onChange={(e) => onOrganizationChange(e.target.value)}>
                <option>Select ...</option>

                {organizations.map((organization: Organization) => (
                    <option value={organization.id} key={organization.id}>
                        {organization.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default OrganizationSelector;
