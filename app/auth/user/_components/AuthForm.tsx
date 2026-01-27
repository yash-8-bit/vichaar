"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema, { loginSchemaType } from "@/validations/zod/login";
import MyInput from "@/components/ui/MyInput";
import MyButton from "@/components/ui/MyButton";
import { ERRORPARA } from "@/constant/style";
import { loginuser, registeruser } from "@/services/auth.service";
import MyToast from "@/components/ui/MyToast";
import toast from "react-hot-toast";
import registerSchema, {
  registerSchemaType,
} from "@/validations/zod/register.user";

const EmailController = ({ control }: { control: any }) => {
  return (
    <Controller
      control={control}
      name="email"
      render={({ field: { onChange, value } }) => (
        <MyInput
          label="Email Address"
          type="email"
          required
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

const PasswordController = ({ control }: { control: any }) => {
  return (
    <Controller
      control={control}
      name="password"
      render={({ field: { onChange, value } }) => (
        <MyInput
          label="Password"
          type="password"
          value={value}
          required
          onChange={onChange}
        />
      )}
    />
  );
};
function AuthForm({ type }: { type: "login" | "register" }) {
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    control: control_,
    handleSubmit: handleSubmit_,
    formState: formState_,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: loginSchemaType | registerSchemaType) {
    const res =
      type === "login"
        ? await loginuser(data)
        : await registeruser(data as registerSchemaType);
    if (res.success) {
      toast.success(`${type === "login" ? "Login" : "Register"} Successs`);
    } else {
      toast.error(res.message);
    }
  }
  return (
    <form
      onSubmit={
        type === "login" ? handleSubmit(onSubmit) : handleSubmit_(onSubmit)
      }
    >
      <MyToast />
      {type === "register" && (
        <div className="mt-4">
          <Controller
            control={control_}
            name={"first_name"}
            render={({ field: { onChange, value } }) => (
              <MyInput
                label="Name"
                type="text"
                required
                value={value}
                onChange={onChange}
              />
            )}
          />
          <p className={ERRORPARA}>{formState_.errors.first_name?.message}</p>
        </div>
      )}
      <div className="mt-4">
        <EmailController control={type === "login" ? control : control_} />
        <p className={ERRORPARA}>
          {(type === "login" ? formState : formState_).errors.email?.message}
        </p>
      </div>
      <div className="mt-4">
        <PasswordController control={type === "login" ? control : control_} />
        <p className={ERRORPARA}>
          {(type === "login" ? formState : formState_).errors.password?.message}
        </p>
      </div>
      <div className="mt-8">
        <MyButton label={"Submit"} type="submit" />
      </div>
    </form>
  );
}

export default AuthForm;
