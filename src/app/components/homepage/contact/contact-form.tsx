"use client";

import { isValidEmail } from "@/utils/check-email";
import axios, { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

/* ------------------------------------------------------------------ */
/* 1️⃣  Local state types                                              */
/* ------------------------------------------------------------------ */
interface UserInput {
  name: string;
  email: string;
  message: string;
}

interface ErrorState {
  email: boolean;
  required: boolean;
}

/* ------------------------------------------------------------------ */
/* 2️⃣  Component                                                      */
/* ------------------------------------------------------------------ */
const ContactForm: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState<ErrorState>({
    email: false,
    required: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  /* --------- field‑level helpers --------- */
  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError((prev) => ({ ...prev, required: false }));
    }
  };

  /* --------- submit handler --------- */
  const handleSendMail = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    /* basic validation */
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError((prev) => ({ ...prev, required: true }));
      return;
    }
    if (error.email) return;
    setError((prev) => ({ ...prev, required: false }));

    /* send */
    try {
      setIsLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL as string}/api/contact`,
        userInput
      );

      toast.success("Message sent successfully!");
      setUserInput({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      toast.error(axiosErr.response?.data?.message ?? "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* 3️⃣  UI                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <div>
      <p className="mb-5 text-xl font-medium uppercase text-[#16f2b3]">
        Contact with me
      </p>

      <form
        onSubmit={handleSendMail}
        className="max-w-3xl rounded-lg border border-[#464c6a] p-3 text-white lg:p-5"
      >
        <p className="text-sm text-[#d3d8e8]">
          If you have any questions or concerns, please don&apos;t hesitate to
          contact me.
        </p>

        {/* Name */}
        <div className="mt-6 flex flex-col gap-2">
          <label className="text-base">Your Name:</label>
          <input
            className="w-full rounded-md border border-[#353a52] bg-[#10172d] px-3 py-2 transition-all duration-300 ring-0 outline-0 focus:border-[#16f2b3]"
            type="text"
            maxLength={100}
            required
            value={userInput.name}
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, name: e.target.value }))
            }
            onBlur={checkRequired}
          />
        </div>

        {/* Email */}
        <div className="mt-4 flex flex-col gap-2">
          <label className="text-base">Your Email:</label>
          <input
            className="w-full rounded-md border border-[#353a52] bg-[#10172d] px-3 py-2 transition-all duration-300 ring-0 outline-0 focus:border-[#16f2b3]"
            type="email"
            maxLength={100}
            required
            value={userInput.email}
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, email: e.target.value }))
            }
            onBlur={() => {
              checkRequired();
              setError((prev) => ({
                ...prev,
                email: !isValidEmail(userInput.email),
              }));
            }}
          />
          {error.email && (
            <p className="text-sm text-red-400">
              Please provide a valid email!
            </p>
          )}
        </div>

        {/* Message */}
        <div className="mt-4 flex flex-col gap-2">
          <label className="text-base">Your Message:</label>
          <textarea
            className="w-full rounded-md border border-[#353a52] bg-[#10172d] px-3 py-2 transition-all duration-300 ring-0 outline-0 focus:border-[#16f2b3]"
            maxLength={500}
            rows={4}
            required
            value={userInput.message}
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, message: e.target.value }))
            }
            onBlur={checkRequired}
          />
        </div>

        {/* Errors & Submit */}
        <div className="mt-6 flex flex-col items-center gap-3">
          {error.required && (
            <p className="text-sm text-red-400">All fields are required!</p>
          )}

          <button
            type="submit"
            className="flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-all duration-200 ease-out hover:gap-3 md:px-12 md:py-3 md:text-sm md:font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Sending Message...</span>
            ) : (
              <>
                Send Message
                <TbMailForward size={20} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
