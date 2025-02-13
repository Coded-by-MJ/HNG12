import EventsList from "../components/EventsList";
import ProgressBar from "../components/ProgressBar";

function Events() {
  return (
    <section className="page events-section">
      <div>
        <div className="page-header">
          <h1>All Events</h1>
          <span>1/1</span>
        </div>
        <ProgressBar percent={50} />
      </div>

      <EventsList />
    </section>
  );
}
export default Events;
