import { BrowserRouter, Route, Routes } from "react-router-dom";

import './styles/Content.css';
import Home from "./Page/Home";
import Auth from "./User/Auth";
// import Home from "./User/Home";
import EventPage from "./Page/Event";

import EventRouter from "./Organizer/EventRouter";
import OrganizerRouter from "./Organizer/OrganizerRouter";
import Ticket from "./User/Ticket";
import TicketDetail from "./User/TicketDetail";
import Stream from "./Stream";
import BoothRouter from "./Booth/BoothRouter";
import Checkin from "./User/Checkin";
import CreateEvent from "./User/CreateEvent";
import Payment from "./Page/Payment";
import Club from "./Page/Club";
import NewsRead from "./Page/NewsRead";

export default function App () {
	return (
		<BrowserRouter>
			<Auth />
			<EventRouter />
			<OrganizerRouter />
			<BoothRouter />

			<Routes>
				<Route path="/" Component={Home} />
				<Route path="/club" Component={Club} />
				<Route path="/news/:slug" Component={NewsRead} />

				<Route path="/buat-event" Component={CreateEvent} />
				<Route path="/tickets" Component={Ticket} />
				<Route path="/ticket/:orderID" Component={TicketDetail} />
				<Route path="/event/:slug" Component={EventPage} />
				<Route path="/payment" Component={Payment} />

				<Route path="/checkin/:encodedEventID" Component={Checkin} />

				<Route path="/stream/:slug" Component={Stream} />
			</Routes>
		</BrowserRouter>
	)
}