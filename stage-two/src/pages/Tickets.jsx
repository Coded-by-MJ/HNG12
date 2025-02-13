import ProgressBar from "../components/ProgressBar";
import { useStore } from "../provider/storeContext";

function Tickets() {
  const { user } = useStore();
  const ticketCount = user.tickets.length;

  return (
    <section className="page all-tickets-section">
      <div>
        <div className="page-header">
          <h1>All Your Tickets</h1>
          <span>Total: {ticketCount}</span>
        </div>
        <ProgressBar percent={ticketCount < 1 ? 0 : 100} />
      </div>
      {ticketCount < 1 ? (
        <h2 style={{ margin: "10px", color: "#fafafa", fontSize: "1.2rem" }}>
          You have no tickets at the moment
        </h2>
      ) : (
        <div className="all-tickets-list">
          {user.tickets.map((ticket) => {
            const refId = ticket.id.slice(0, 6);

            return (
              <div key={refId} className="ticket-info">
                <div className="item">
                  <span>Ticket ID:</span>
                  <p>#{refId}</p>
                </div>
                <div className="item">
                  <span>Event:</span>
                  <p>Techember Fest &quot;25</p>
                </div>
                <div className="item">
                  <span>Ticket Type:</span>
                  <p>{ticket.ticketType}</p>
                </div>
                <div className="item">
                  <span>Number of Tickets:</span>
                  <p>{ticket.ticketAmount}</p>
                </div>
                <div className="item"></div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
export default Tickets;
