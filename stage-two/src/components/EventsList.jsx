import { NavButton } from "./Buttons";

function EventsList() {
  return (
    <div className="events-list">
      <div className="event-card">
        <div className="event-card-content">
          <h2>Techember Fest &quot;25</h2>
          <p>
            Join us for an unforgettable experience at Techember Fest &quot;25!
            Secure your spot now.
          </p>
          <p>📍 Lagos, Nigeria || March 15, 2025 | 7:00 PM</p>
        </div>

        <NavButton
          link={"/add-ticket"}
          linkText={"Buy Ticket"}
          className={"event-card-btn"}
        />
      </div>
    </div>
  );
}
export default EventsList;
