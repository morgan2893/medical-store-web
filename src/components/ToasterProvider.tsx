import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToasterProvider = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToasterProvider;
