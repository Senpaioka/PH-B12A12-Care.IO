"use client";

import { useForm } from "react-hook-form";
import {createUser} from "@/actions/server/userManager";
import Swal from 'sweetalert2';
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function RegisterPage() {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  
  const onSubmit = async (data) => {
    try {
      const result = await createUser(data);

      if (result.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Successful.",
          showConfirmButton: false,
          timer: 1500
        });
        router.push('/login');
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: result.error.message,
        });
        router.push('/login');
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  
  const onGoogleLogin = async() => {
    await signIn("google", {callbackUrl})
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-center justify-center text-2xl">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Username */}
            <div className="form-control flex flex-col gap-1">
              <label className="label p-0">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Your username"
                className="input input-bordered w-full"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
              />
              {errors.username && (
                <p className="text-error text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-control flex flex-col gap-1">
              <label className="label p-0">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div className="form-control flex flex-col gap-1">
              <label className="label p-0">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full"
                {...register("photoURL")}
              />
              {errors.photoURL && (
                <p className="text-error text-sm mt-1">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

            {/* Password */}
           <div className="form-control flex flex-col gap-1">
                <label className="label p-0">
                    <span className="label-text">Password</span>
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full"
                    {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                        message:
                        "Password must contain at least 1 uppercase and 1 lowercase letter",
                    },
                    })}
                />

                {errors.password && (
                    <p className="text-error text-sm mt-1">
                    {errors.password.message}
                    </p>
                )}
            </div>


            {/* Submit */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Register"}
              </button>
            </div>
          </form>

          {/* divider  */}
          <div className="divider">Or</div>

          {/* Google */}
            <button onClick={() => onGoogleLogin()} className="btn bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Continue with Google
            </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="link link-primary">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
