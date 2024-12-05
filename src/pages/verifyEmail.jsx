import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false); // Track email verification status

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    if (!email) {
      setMessage("Missing verification information.");
      return;
    }

    // const apiUrl = import.meta.env.VITE_SUBSCRIBER_REGISTRATION_URL;
    const apiUrl = "https://subscriber-registration-backend-1.onrender.com";

    if (!apiUrl) {
      console.error("API URL is not defined.");
      setMessage("Internal error occurred. Please contact support.");
      return;
    }

    setLoading(true);

    fetch(`${apiUrl}/api/verify-email?email=${encodeURIComponent(email)}`)
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          throw new Error("Email verification failed");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "Email verified successfully!") {
          setMessage("Email verified successfully!");
          setEmailVerified(true); // Set email as verified
          setShowModal(true);
        } else {
          setMessage("Email verification failed.");
        }
      })
      .catch((error) => {
        console.error("Error verifying email:", error);
        setLoading(false);
        setMessage("Already Verified.");
      });
  }, [location]);

  const closeModal = () => {
    setShowModal(false);
    if (emailVerified) {
      // Only redirect if email is successfully verified
      // window.location.href = "https://cms-alpha-sand.vercel.app/"; // Redirect to the external URL
      window.location.href = "about:blank"; // Or your custom URL
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center p-4 bg-white rounded-lg shadow-lg w-full max-w-md">
        {loading ? (
          <div className="text-gray-700 text-lg">Verifying email...</div>
        ) : (
          <div className="text-gray-700 text-lg mb-4">{message}</div>
        )}

        {/* Modal for success message */}
        {showModal && (
          <div className="flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
              <h2 id="modal-title" className="text-2xl text-black mb-4">
                {message}
              </h2>
              <p id="modal-description" className="text-gray-600 mb-6">
                The link to your Conference Management Software will be mailed
                to you shortly.
              </p>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md transition"
                onClick={closeModal}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
