"use client";
import MyToast from "@/components/ui/MyToast";
import { ERRORPARA } from "@/constant/style";
import { loginadmin } from "@/services/auth.service";
import loginSchema, { loginSchemaType } from "@/validations/zod/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function page() {
  const { control, formState, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: loginSchemaType) {
    const res = await loginadmin(data);
    if (res.success) {
      toast.success(`Login Successs`);
    } else {
      toast.error(res.message);
    }
  }
  return (
    <div className="flex items-center justify-center w-full h-screen px-4">
      <MyToast />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col max-w-96 shadow-sm rounded  p-4 border-2 border-gray-100"
      >
        <h2 className="text-4xl font-medium text-gray-900">Admin Panel</h2>
        <p className="mt-4 text-base text-gray-500/90">
          Please enter email and password to access.
        </p>
        <div className="mt-10">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <input
                placeholder="Please enter your email"
                className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-black/60  outline-none px-3 py-3 w-full"
                type="email"
                required
                value={value}
                onChange={onChange}
              />
            )}
          />
          <p className={ERRORPARA}>{formState.errors.email?.message}</p>
        </div>

        <div className="mt-6">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <input
                placeholder="Please enter your password"
                className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-black/60 outline-none px-3 py-3 w-full"
                required
                type="password"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <p className={ERRORPARA}>{formState.errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="mt-8 py-3 w-full cursor-pointer rounded-md bg-black text-white transition hover:bg-black/70"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default page;
