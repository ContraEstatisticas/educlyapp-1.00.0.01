import { Navigate } from "react-router-dom";

// Redirect old routes to unified hub
const AssistantChat = () => {
  return <Navigate to="/assistentes" replace />;
};

export default AssistantChat;
