import { Route, Routes } from "react-router-dom";
import EventOverview from "./Event/Overview";
import EventRundown from "./Event/Rundown";
import EventSession from "./Event/Session";
import EventTicket from "./Event/Ticket";
import EventSpeaker from "./Event/Speaker";
import EventSponsor from "./Event/Sponsor";
import EventDiscount from "./Event/Discount";
import EventQR from "./Event/QR";
import EventCreate from "./Event/Create";
import EventBoothCategory from "./Event/BoothCategory";
import EventBooth from "./Event/Booth";
import EventCertificate from "./Event/Certificate";
import EventParticipant from "./Event/Participant";

const EventRouter = () => {
    return (
        <Routes>
            <Route path="/organizer/:org_username/create-event" Component={EventCreate} />
            <Route path="/organizer/:org_username/event/:slug" Component={EventOverview} />
            <Route path="/organizer/:org_username/event/:slug/rundown" Component={EventRundown} />
            <Route path="/organizer/:org_username/event/:slug/session" Component={EventSession} />
            <Route path="/organizer/:org_username/event/:slug/sponsor" Component={EventSponsor} />
            <Route path="/organizer/:org_username/event/:slug/speaker" Component={EventSpeaker} />
            <Route path="/organizer/:org_username/event/:slug/certificate" Component={EventCertificate} />
            <Route path="/organizer/:org_username/event/:slug/ticket" Component={EventTicket} />
            <Route path="/organizer/:org_username/event/:slug/discount" Component={EventDiscount} />
            <Route path="/organizer/:org_username/event/:slug/qr-event" Component={EventQR} />
            <Route path="/organizer/:org_username/event/:slug/booth-category" Component={EventBoothCategory} />
            <Route path="/organizer/:org_username/event/:slug/booth" Component={EventBooth} />
            <Route path="/organizer/:org_username/event/:slug/participant" Component={EventParticipant} />
        </Routes>
    )
}

export default EventRouter;