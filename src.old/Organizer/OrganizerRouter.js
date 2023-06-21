import { Route, Routes } from "react-router-dom";
import OrganizerBilling from "./Billing";
import OrganizerCreate from "./Create";
import OrganizerHome from "./Home";
import OrganizerProfile from "./Profile";
import OrganizerTeam from "./Team";
import SwitchOrganizer from "./Switch";
import OrganizerPage from "./Page";
import OrganizerPost from "./Post";

const OrganizerRouter = () => {
    return (
        <Routes>
            <Route path="/organizer/:org_username/events" Component={OrganizerHome} />
            <Route path="/organizer/:org_username/profile" Component={OrganizerProfile} />
            <Route path="/organizer/:org_username/team" Component={OrganizerTeam} />
            <Route path="/organizer/:org_username/billing" Component={OrganizerBilling} />
            <Route path="/organizer/:org_username/post" Component={OrganizerPost} />
            <Route path="/organizer/create" Component={OrganizerCreate} />
            <Route path="/organizer/switch" Component={SwitchOrganizer} />
            <Route path="/o/:org_username" Component={OrganizerPage} />
        </Routes>
    )
}

export default OrganizerRouter;