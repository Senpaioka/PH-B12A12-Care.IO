"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { caregiverApplicationData } from "@/actions/server/caregiverManager";


const SKILLS = [
  "Personal Hygiene",
  "Mobility Support",
  "Medication Reminder",
  "Meal Preparation",
  "Housekeeping",
  "Companionship",
  "Dementia Care",
  "First Aid / CPR",
];

const ROLES = [
  "Elder Care",
  "Child Care",
  "Disability Care",
  "Post-surgery Care",
];

export default function CaregiverCandidateForm() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  const nextStep = async () => {
    const valid = await trigger([
      "fullName",
      "displayName",
      "photoURL",
      "date_of_birth",
      "gender",
      "nationality",
      "idNumber",
      "address",
      "country",
    ]);
    if (valid) setStep(2);
  };

  const onSubmit = async(data) => {
    const result = await caregiverApplicationData(data);
    // send to server
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            Caregiver Application – Step {step} of 2
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* STEP 1 – PERSONAL INFO */}
            {step === 1 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Full Name</label>
                    <input
                      className="input input-bordered w-full"
                      {...register("fullName", { required: true })}
                    />
                    {errors.fullName && <p className="text-error">Required</p>}
                  </div>

                  <div>
                    <label className="label">Display Name</label>
                    <input
                      className="input input-bordered w-full"
                      {...register("displayName", { required: true })}
                    />
                  </div>

                  <div>
                    <label className="label">Professional Photo URL</label>
                    <input
                      className="input input-bordered w-full"
                      {...register("photoURL", { required: true })}
                    />
                  </div>

                  <div>
                    <label className="label">Date of Birth</label>
                    <input
                      type="date"
                      className="input input-bordered w-full"
                      {...register("date_of_birth", { required: true })}
                    />
                  </div>

                  <div>
                    <label className="label">Gender</label>
                    <select
                      className="select select-bordered w-full"
                      {...register("gender", { required: true })}
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Nationality</label>
                    <input
                      className="input input-bordered w-full"
                      {...register("nationality", { required: true })}
                    />
                  </div>

                  <div>
                    <label className="label">ID Number</label>
                    <input
                      className="input input-bordered w-full"
                      {...register("idNumber", { required: true })}
                    />
                  </div>

                  <div>
                    <label className="label">Current Country</label>
                    <input
                      className="input input-bordered w-full"
                      {...register("country", { required: true })}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Current Address</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    {...register("address", { required: true })}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={nextStep}
                >
                  Next
                </button>
              </>
            )}

            {/* STEP 2 – CONTACT & PROFESSIONAL INFO */}
            {step === 2 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      {...register("email", { required: true })}
                    />
                  </div>

                  <div>
                    <label className="label">Phone</label>
                    <input
                      className="input input-bordered w-full"
                      {...register("phone", { required: true })}
                    />
                  </div>

                  <div>
                    <label className="label">Years of Experience</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      {...register("experience", { required: true })}
                    />
                  </div>

                  <div>
                    <label className="label">Employment Type</label>
                    <select
                      className="select select-bordered w-full"
                      {...register("employmentType", { required: true })}
                    >
                      <option value="">Select</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>On-demand</option>
                      <option>Live-in</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Service Charge</label>
                    <input
                      className="input input-bordered w-full"
                      placeholder="e.g. 500 / hour"
                      {...register("charge", { required: true })}
                    />
                  </div>

                  <div>
                    <label className="label">Languages</label>
                    <input
                      className="input input-bordered w-full"
                      {...register("languages", { required: true })}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Caregiving Roles</label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {ROLES.map((role) => (
                      <label key={role} className="flex gap-2">
                        <input
                          type="checkbox"
                          value={role}
                          {...register("roles")}
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">Skills</label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {SKILLS.map((skill) => (
                      <label key={skill} className="flex gap-2">
                        <input
                          type="checkbox"
                          value={skill}
                          {...register("skills")}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">Certifications & Training</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    {...register("certifications")}
                  />
                </div>

                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    {...register("terms", { required: true })}
                  />
                  I accept the Terms of Service and Privacy Policy
                </label>
                {errors.terms && (
                  <p className="text-error">You must accept the terms</p>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Application
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
