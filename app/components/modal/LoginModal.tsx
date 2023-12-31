"use client";

import React, { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from ".";
import Heading from "../heading";
import TextField from "../textField";
import { toast } from "react-hot-toast";
import Button from "../button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Login success");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const footer = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex justify-center items-center gap-2">
          <div>First time using Airbnb?</div>
          <div
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline font-semibold"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Login"
      actionLabel="Continue"
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={loginModal.onClose}
      footer={footer}
    >
      <div className="flex flex-col gap-4">
        <Heading title="Welcome back" subtitle="Login to your account!" />
        <TextField
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          hasValue={watch("email")}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          hasValue={watch("password")}
        />
      </div>
    </Modal>
  );
};
export default LoginModal;
