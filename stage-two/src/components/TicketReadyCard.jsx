import ticketImage from "../assets/ticket-bg.svg";
import { useStore } from "../provider/storeContext";
import { ActionButton } from "./Buttons";
import { useNavigate } from "react-router";
function TicketReadyCard() {
  const { user, ticketData, resetTicketAndStepsData } = useStore();
  const navigate = useNavigate();

  return (
    <article className="steps-card ticket-ready-section">
      <div>
        <h1>Your Ticket is Booked!</h1>
        <p>Check your email for a copy or you can download</p>
      </div>

      <figure className="ticket-container">
        <img src={ticketImage} alt="ticket" />
        <div className="ticket-details">
          <div className="ticket-details-header">
            <h2>Techember Fest ”25</h2>
            <p>📍 04 Rumens road, Ikoyi, Lagos</p>
            <p>📅 March 15, 2025 | 7:00 PM</p>
          </div>

          <img
            src={user.avatar}
            alt={user.fullName}
            className="ticket-avatar"
          />

          <div className="ticket-info">
            <div className="item">
              <span>Full Name:</span>
              <p>{user.fullName}</p>
            </div>
            <div className="item">
              <span>Email Address:</span>
              <p>{user.email}</p>
            </div>
            <div className="item">
              <span>Ticket Type:</span>
              <p>{ticketData.ticketType}</p>
            </div>
            <div className="item">
              <span>Number of Tickets:</span>
              <p>{ticketData.ticketAmount}</p>
            </div>
            <div className="item">
              <span>Special Request:</span>
              <p>{user.request}</p>
            </div>
          </div>
        </div>
      </figure>

      <div className="action-button-wrapper">
        <ActionButton
          className={"secondary"}
          text="Book Another Ticket"
          onClick={() => {
            resetTicketAndStepsData();
            navigate("/");
          }}
        />
        <ActionButton
          className="primary"
          text="View All Tickets"
          onClick={() => {
            resetTicketAndStepsData();
            navigate("/my-tickets");
          }}
        />
      </div>
    </article>
  );
}

export default TicketReadyCard;
