import PropTypes from "prop-types";
import { ActionButton } from "./Buttons";
import { useNavigate } from "react-router";
import { useStore } from "../provider/storeContext";

function TicketSelectionCard() {
  const navigate = useNavigate();

  const { updateStepsData, ticketData, updateTicketData } = useStore();
  const { ticketAmount, ticketType } = ticketData;
  const ticketTypes = [
    {
      name: "REGULAR",
      fee: "Free",
    },
    {
      name: "VIP",
      fee: "$150",
    },
    {
      name: "VIPP",
      fee: "$200",
    },
  ];

  return (
    <article className="steps-card">
      <div className="event-banner">
        <h2>Techember Fest &quot;25</h2>
        <p>
          Join us for an unforgettable experience at Techember Fest &quot;25!
          Secure your spot now.
        </p>
        <p>📍 Lagos, Nigeria || March 15, 2025 | 7:00 PM</p>
      </div>

      <div className="line-bar"></div>

      <div>
        <label htmlFor={ticketTypes[0].name}>Select Ticket Type:</label>
        <div className="ticket-type-wrapper">
          {ticketTypes.map((ticket) => {
            return (
              <label
                key={ticket.name}
                className="ticket-type-box"
                htmlFor={ticket.name}
              >
                <input
                  type={"checkbox"}
                  id={ticket.name}
                  required={true}
                  style={{
                    display: "none",
                  }}
                  name="ticketType"
                  onChange={() => updateTicketData("ticketType", ticket.name)}
                  checked={ticketType === ticket.name}
                />
                <span>{ticket.fee}</span>
                <span>{ticket.name} ACCESS</span>
                <span>20/52</span>
              </label>
            );
          })}
        </div>
      </div>
      <div className="ticket-amount-wrapper">
        <label htmlFor="ticketAmount">Number of Tickets:</label>
        <select
          required={true}
          name="ticketAmount"
          id="ticketAmount"
          defaultValue={ticketAmount}
          onChange={(e) => {
            const newAmount = Number(e.target.value);
            updateTicketData("ticketAmount", newAmount);
          }}
        >
          {Array.from({ length: ticketAmount + 5 }, (_, i) => {
            const amount = i + 1;
            return (
              <option key={amount} value={amount}>
                {amount}
              </option>
            );
          })}
        </select>
      </div>
      <div className="action-button-wrapper">
        <ActionButton
          className={"secondary"}
          text="Cancel"
          onClick={() => navigate("/")}
        />
        <ActionButton
          className={"primary"}
          text="Next"
          onClick={() => {
            updateStepsData({
              title: "Attendee Details",
              currentStep: 1,
              percent: 65,
            });
          }}
        />
      </div>
    </article>
  );
}

TicketSelectionCard.propTypes = {
  ticketData: PropTypes.shape({
    ticketAmount: PropTypes.number.isRequired, // number
    ticketType: PropTypes.string.isRequired, // string
  }).isRequired,

  updateTicketData: PropTypes.func.isRequired, // function
};

export default TicketSelectionCard;
