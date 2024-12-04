import React, { useState } from "react";

const SubscriberRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantDesignation: "",
    applicantAddress: "",
    applicantCity: "",
    applicantState: "",
    applicantCountry: "",
    applicantMobile: "",
    applicantEmail: "",
    organizationName: "",
    organizationAddress: "",
    organizationCity: "",
    organizationState: "",
    organizationCountry: "",
    organizationContactNumber: "",
    organizationEmail: "",
    conferenceTitle: "",
    conferenceDiscipline: "",
    conferenceCountry: "",
    conferenceEmail: "",
    authorizedSignatory: "",
  });

  const API_URL = import.meta.env.VITE_SUBSCRIBER_REGISTRATION_URL;

  // Validate Form
  const validateForm = () => {
    for (let key in formData) {
      if (!formData[key]) {
        alert(`${key} is required.`);
        return false;
      }
    }
    return true;
  };

  // Handle Form Data Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Subscriber created:", data.subscriber);

        // Show success modal
        setIsModalOpen(true);

        // Clear form
        setFormData({
          applicantName: "",
          applicantDesignation: "",
          applicantAddress: "",
          applicantCity: "",
          applicantState: "",
          applicantCountry: "",
          applicantMobile: "",
          applicantEmail: "",
          organizationName: "",
          organizationAddress: "",
          organizationCity: "",
          organizationState: "",
          organizationCountry: "",
          organizationContactNumber: "",
          organizationEmail: "",
          conferenceTitle: "",
          conferenceDiscipline: "",
          conferenceCountry: "",
          conferenceEmail: "",
          authorizedSignatory: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        alert(`Failed to create subscriber: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting the data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-full h-full border border-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded bg-slate-50 max-w-5xl mt-5">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center text-4xl mb-4">
              <u>Subscriber Registration Form</u>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Applicant Section */}
              <section>
                <h2 className="text-lg font-semibold text-gray-700">Applicant</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ["Name", "applicantName"],
                    ["Designation", "applicantDesignation"],
                    ["Address", "applicantAddress"],
                    ["City", "applicantCity"],
                    ["State", "applicantState"],
                    ["Country", "applicantCountry"],
                    ["Mobile", "applicantMobile"],
                    ["Email", "applicantEmail"],
                  ].map(([label, name]) => (
                    <div key={name} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600">
                        {label}
                      </label>
                      <input
                        type={name.includes("Email") ? "email" : "text"}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Organization Section */}
              <section>
                <h2 className="text-lg font-semibold text-gray-700">Organization</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ["Name", "organizationName"],
                    ["Address", "organizationAddress"],
                    ["City", "organizationCity"],
                    ["State", "organizationState"],
                    ["Country", "organizationCountry"],
                    ["Contact Number", "organizationContactNumber"],
                    ["Email", "organizationEmail"],
                  ].map(([label, name]) => (
                    <div key={name} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600">
                        {label}
                      </label>
                      <input
                        type={name.includes("Email") ? "email" : "text"}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </section>

                {/* Conference Section */}
                <section>
                <h2 className="text-lg font-semibold text-gray-700">Conference</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ["Title of the Conference", "conferenceTitle"],
                    ["Discipline", "conferenceDiscipline"],
                    ["Country", "conferenceCountry"],
                  ].map(([label, name]) => (
                    <div key={name} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600">
                        {label}
                      </label>
                      <input
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Official Correspondence Email
                    </label>
                    <input
                      type="email"
                      name="conferenceEmail"
                      value={formData.conferenceEmail}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Authorized Signatory
                    </label>
                    <input
                      type="text"
                      name="authorizedSignatory"
                      value={formData.authorizedSignatory}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <button
                type="submit"
                className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700`}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Your subscriber registration was successful</h2>
            <p>A verification mail send to your official mail address. Please check and verify by clicking on 'Verify Email'.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriberRegistration;
