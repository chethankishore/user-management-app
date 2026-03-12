import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function AddUser() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onUserCreate = async (newUser) => {

    setLoading(true);
    setServerError(null);

    try {
      const res = await fetch("https://user-management-app-gules-theta.vercel.app/user-api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // navigate after success
      navigate("/userlist");

    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit(onUserCreate)}
        className="flex flex-col gap-4 w-80 bg-amber-400"
      >

        <h1 className="text-xl font-bold">Add User</h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="border p-2"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="border p-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* DOB */}
        <input
          type="date"
          {...register("dateOfBirth", { required: "DOB is required" })}
          className="border p-2"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500">{errors.dateOfBirth.message}</p>
        )}

        {/* Mobile */}
        <input
          type="number"
          placeholder="Mobile Number"
          {...register("mobileNumber")}
          className="border p-2"
        />

        {serverError && (
          <p className="text-red-600 font-semibold">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Creating..." : "Submit"}
        </button>

      </form>
    </div>
  );
}

export default AddUser;