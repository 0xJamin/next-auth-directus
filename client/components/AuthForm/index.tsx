import Link from "next/link";
import { FormEvent, useState } from "react";

interface Data {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}
interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (data: Data) => void;
  linkText: string;
  linkDescription: string;
  linkHref: string;
  isFullForm?: boolean;
}

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  linkText,
  linkHref,
  linkDescription,
  isFullForm = true,
}: AuthFormProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className=" md:w-[500px] w-full">
      <h1 className="capitalize text-lg font-medium my-4">{title}</h1>
      {isFullForm && (
        <>
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border border-indigo-500 rounded-md w-full my-5"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border border-indigo-500 rounded-md w-full my-5"
          />
        </>
      )}
      <input
        type="email"
        placeholder="Email Address"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        className="py-2 px-4 border border-indigo-500 rounded-md w-full my-5"
      />
      <input
        type="password"
        placeholder="Enter your Password"
        name="password"
        value={formData.password}
        required
        onChange={handleInputChange}
        className="py-2 px-4 border border-indigo-500 rounded-md w-full my-5"
      />
      <button className="bg-indigo-600 text-white py-3 px-6 w-full rounded-md">
        {buttonText}
      </button>
      <p className="mt-4">
        {linkDescription}
        <Link
          className="text-indigo-500 underline ml-2 "
          href={linkHref}
        >
          {linkText}
        </Link>
      </p>
    </form>
  );
}
