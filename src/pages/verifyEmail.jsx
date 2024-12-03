import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Initialize useNavigate
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    if (!email) {
      setMessage("Missing verification information.");
      return;
    }

    // Call backend to verify the email without token
    fetch(`http://localhost:5000/api/verify-email?email=${email}`)
      .then(response => {
        if (!response.ok) {
          // If the response isn't OK (like 404 or 500), throw an error
          throw new Error("Email verification failed");
        }
        return response.json();
      })
      .then(data => {
        if (data.message === "Email verified successfully!") {
          setMessage("Email verified successfully!");
          setShowModal(true); // Show the modal
        } else {
          setMessage("Email verification failed.");
        }
      })
      .catch(error => {
        console.error("Error verifying email:", error);
        setMessage("Error occurred. Please try again.");
      });
  }, [location]);

  const closeModal = () => {
    setShowModal(false);
    navigate("/");  // Redirect to subscriber registration page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-4 bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="text-lg text-gray-700 mb-4">{message}</div>

        {/* Modal for success message */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
              <h2 className="text-2xl text-green-600 mb-4">Email Verified</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
