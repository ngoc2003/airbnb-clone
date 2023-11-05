"use client";

import React, { useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from ".";
import Heading from "../heading";
import TextField from "../textField";
import Button from "../button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRegister } from "@/app/utils/auth";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { mutate, isLoading } = useRegister(() => {
    registerModal.onClose();
    loginModal.onOpen();
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate(data);
  };

  const onToggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
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
          <div>Already have an account ?</div>
          <div
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline font-semibold"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Register"
      actionLabel="Continue"
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={registerModal.onClose}
      footer={footer}
    >
      <div className="flex flex-col gap-4">
        <Heading title="Welcome to Airbnb" subtitle="Create an account" />
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
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          hasValue={watch("name")}
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
export default RegisterModal;
