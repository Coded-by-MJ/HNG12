import { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
const StoreContext = createContext(null);

const storedApp = JSON.parse(localStorage.getItem("app"));
const StoreProvider = ({ children }) => {
  const [app, setApp] = useState(
    storedApp || {
      user: {
        email: "",
        fullName: "",
        avatar: "",
        request: "",
        tickets: [],
      },
      steps: {
        title: "Ticket Selection",
        currentStep: 0,
        percent: 35,
      },
      ticketData: {
        ticketType: "REGULAR",
        ticketAmount: 1,
      },
    }
  );

  // ✅ Function to update user fields dynamically
  const updateUser = (key, value) => {
    setApp((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [key]: value,
      },
    }));
  };

  // ✅ Function to add a ticket
  const addTicket = (newTicket) => {
    setApp((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        tickets: [...prev.user.tickets, newTicket],
      },
    }));
  };

  // Function to update Steps

  const updateStepsData = (newStepsData) => {
    setApp((prev) => ({
      ...prev,
      steps: newStepsData,
    }));
  };

  //function to update ticketData
  const updateTicketData = (key, value) => {
    setApp((prev) => ({
      ...prev,
      ticketData: {
        ...prev.ticketData,
        [key]: value,
      },
    }));
  };

  //Reset Ticket And Steps Data
  const resetTicketAndStepsData = () => {
    setApp((prev) => ({
      ...prev,
      steps: {
        title: "Ticket Selection",
        currentStep: 0,
        percent: 35,
      },
      ticketData: {
        ticketType: "REGULAR",
        ticketAmount: 1,
      },
    }));
  };

  // Add Ticket to Stored App
  const addTicketToStore = () => {
    const id = nanoid();
    const ticket = {
      id,
      ...ticketData,
    };
    addTicket(ticket);
  };

  const { user, steps, ticketData } = app;

  useEffect(() => {
    localStorage.setItem("app", JSON.stringify(app));
  }, [app]);

  return (
    <StoreContext.Provider
      value={{
        user,
        steps,
        ticketData,
        updateUser,
        addTicket,
        updateStepsData,
        resetTicketAndStepsData,
        updateTicketData,
        addTicketToStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export default StoreProvider;
