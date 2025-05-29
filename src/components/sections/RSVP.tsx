"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPaperPlane, FaCheck, FaTimes } from "react-icons/fa";
import { getBackgroundColor } from "@/lib/utils";

interface RSVPProps {
  rsvp: {
    title: string;
    subtitle: string;
    deadline: string;
    form: {
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      attending: {
        label: string;
        options: {
          yes: string;
          no: string;
        };
      };
      guests: {
        label: string;
        placeholder: string;
      };
      dietary: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
      submit: string;
    };
    confirmation: {
      success: string;
      error: string;
    };
    backgroundColor: string;
  };
  guestName?: string;
}

export default function RSVP({ rsvp }: RSVPProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: "1",
    dietary: "",
    message: "",
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Animation for section title
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation for form
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setErrorMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll just console log the data and show success
      console.log("RSVP Form Data:", formData);

      // Show success message
      setSubmitSuccess(true);

      // Reset form after success (optional)
      setFormData({
        name: "",
        email: "",
        attending: "yes",
        guests: "1",
        dietary: "",
        message: "",
      });
    } catch (error) {
      console.error("RSVP submission error:", error);
      setSubmitSuccess(false);
      setErrorMessage(rsvp.confirmation.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const backgroundColor = getBackgroundColor(rsvp.backgroundColor);

  return (
    <section id="rsvp" className="py-16 md:py-24" style={{ backgroundColor }}>
      <div className="container-custom max-w-4xl">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif mb-2">{rsvp.title}</h2>
          <p className="text-primary-700 max-w-2xl mx-auto">{rsvp.subtitle}</p>
          <p className="text-primary-600 mt-2 font-medium">{rsvp.deadline}</p>
        </motion.div>

        {/* Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {submitSuccess === true ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <FaCheck size={24} />
                </div>
                <h3 className="font-serif text-2xl mb-4">Thank You!</h3>
                <p className="text-primary-600">{rsvp.confirmation.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name -*/}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-primary-700 font-medium mb-2"
                  >
                    {rsvp.form.name.label}*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={rsvp.form.name.placeholder}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-primary-700 font-medium mb-2"
                  >
                    {rsvp.form.email.label}*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={rsvp.form.email.placeholder}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Attending */}
                <div>
                  <label className="block text-primary-700 font-medium mb-2">
                    {rsvp.form.attending.label}*
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={formData.attending === "yes"}
                        onChange={handleChange}
                        className="mr-2 text-accent focus:ring-accent"
                      />
                      {rsvp.form.attending.options.yes}
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={formData.attending === "no"}
                        onChange={handleChange}
                        className="mr-2 text-accent focus:ring-accent"
                      />
                      {rsvp.form.attending.options.no}
                    </label>
                  </div>
                </div>

                {/* Number of Guests (only show if attending) */}
                {formData.attending === "yes" && (
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-primary-700 font-medium mb-2"
                    >
                      {rsvp.form.guests.label}*
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Dietary Restrictions (only show if attending) */}
                {formData.attending === "yes" && (
                  <div>
                    <label
                      htmlFor="dietary"
                      className="block text-primary-700 font-medium mb-2"
                    >
                      {rsvp.form.dietary.label}
                    </label>
                    <input
                      type="text"
                      id="dietary"
                      name="dietary"
                      value={formData.dietary}
                      onChange={handleChange}
                      placeholder={rsvp.form.dietary.placeholder}
                      className="w-full px-4 py-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-primary-700 font-medium mb-2"
                  >
                    {rsvp.form.message.label}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={rsvp.form.message.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Error message */}
                {submitSuccess === false && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-md flex items-start">
                    <FaTimes className="mr-2 mt-1 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-3 bg-accent text-white rounded-md font-medium transition-all duration-300 ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-accent-dark"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        {rsvp.form.submit}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
