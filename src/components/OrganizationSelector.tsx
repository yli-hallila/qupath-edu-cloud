import React, { useEffect, useState } from "react";
import { Organization } from "../types";

interface ProjectSelectorProps {
    onOrganizationChange: (newProject: string) => void;
}

function OrganizationSelector({ onOrganizationChange }: ProjectSelectorProps) {
    const [organizations, setOrganizations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://yli-hallila.fi:7777/api/v0/organizations")
            .then((res) => res.json())
            .then(
                (result) => {
                    setOrganizations(result);
                },
                (error) => {
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <>"Error with OrganizationSelector"</>;
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
