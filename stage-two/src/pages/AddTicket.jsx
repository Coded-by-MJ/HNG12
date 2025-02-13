import ProgressBar from "../components/ProgressBar";
import { useStore } from "../provider/storeContext";
import TicketSelectionCard from "../components/TicketSelectionCard";
import AttendeeDetailsCard from "../components/AttendeeDetailsCard";
import TicketReadyCard from "../components/TicketReadyCard";

function AddTicket() {
  const { steps } = useStore();
  const { title, currentStep, percent } = steps;
  const stepsArray = [
    <TicketSelectionCard key="ticket-selection" />,
    <AttendeeDetailsCard key="attendee-details" />,
    <TicketReadyCard key="ticket-ready" />,
  ];
  return (
    <section className="page addTicket-section">
      <div>
        <div className="page-header">
          <h1>{title}</h1>
          <span>{currentStep + 1}/3</span>
        </div>
        <ProgressBar percent={percent} />
      </div>
      {stepsArray[currentStep]}
    </section>
  );
}
export default AddTicket;
