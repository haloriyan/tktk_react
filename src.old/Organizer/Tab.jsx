import React from "react";
import { useParams } from "react-router-dom";

const OrganizerTab = ({page}) => {
    const { org_username } = useParams();

    return (
        <div className="flex row wrap item-center">
            <a href={`/organizer/${org_username}`} className={`OrganizerTab text primary rounded mr-2 p-1 pl-3 pr-3 ${page === 'events' ? 'bg-primary transparent bold' : ''}`}>
                Events
            </a>
            <a href={`/organizer/${org_username}/profile`} className={`OrganizerTab text primary rounded mr-2 p-1 pl-3 pr-3 ${page === 'profile' ? 'bg-primary transparent bold' : ''}`}>
                Profile
            </a>
            <a href={`/organizer/${org_username}/team`} className={`OrganizerTab text primary rounded mr-2 p-1 pl-3 pr-3 ${page === 'team' ? 'bg-primary transparent bold' : ''}`}>
                Team
            </a>
            <a href={`/organizer/${org_username}/billing`} className={`OrganizerTab text primary rounded mr-2 p-1 pl-3 pr-3 ${page === 'billing' ? 'bg-primary transparent bold' : ''}`}>
                Billing
            </a>
        </div>
    )
}

export default OrganizerTab;