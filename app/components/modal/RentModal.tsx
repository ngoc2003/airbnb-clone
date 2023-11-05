"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from ".";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../heading";
import { getCategoryList } from "@/app/stores/categories";
import CategoryInput from "../textField/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextField from "../textField";
import CountrySelect from "../textField/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../textField/Counter";
import ImageUpload from "../textField/ImageUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomEditor from "../editor";
import { useCreateListing } from "@/app/utils/listings";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const rentModal = useRentModal();
  const { CATEGORIES } = getCategoryList();

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return "";
    }
    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleBackStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleNextStep = () => {
    if (
      (step === STEPS.CATEGORY && !category) ||
      (step === STEPS.LOCATION && !location) ||
      (step === STEPS.IMAGES && !imageSrc) ||
      (step === STEPS.DESCRIPTION &&
        (!getValues("title") || !getValues("description")))
    ) {
      return setIsError(true);
    }
    setIsError(false);
    setStep((prev) => prev + 1);
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../map/index"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const { mutate, isLoading } = useCreateListing(() => {
    router.refresh();
    reset();
    setStep(STEPS.CATEGORY);
    rentModal.onClose();
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return handleNextStep();
    }

    mutate(data);
  };

  const handleSetDescription = useCallback(
    (val: string) => {
      setValue("description", val);
    },
    [setValue]
  );

  useEffect(() => {
    if (isError) {
      toast.error("You must fill or select all field!");
    }
  }, [isError]);

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home"
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={step === STEPS.CATEGORY ? undefined : handleBackStep}
      secondaryActionLabel={secondaryActionLabel}
    >
      <>
        {step === STEPS.LOCATION && (
          <div className="flex flex-col gap-8">
            <Heading
              title="Where is your place located?"
              subtitle="Help guests find you!"
            />
            <CountrySelect
              value={location}
              onChange={(value) => setCustomValue("location", value)}
            />
            <Map center={location?.latlng} />
          </div>
        )}

        {step === STEPS.INFO && (
          <div className="flex flex-col gap-8">
            <Heading
              title="Share some basics about your place"
              subtitle="What amenitis do you have?"
            />
            <Counter
              onChange={(value) => setCustomValue("guestCount", value)}
              value={guestCount}
              title="Guests"
              subtitle="How many guests do you allow?"
            />
            <hr />
            <Counter
              onChange={(value) => setCustomValue("roomCount", value)}
              value={roomCount}
              title="Rooms"
              subtitle="How many rooms do you have?"
            />
            <hr />
            <Counter
              onChange={(value) => setCustomValue("bathroomCount", value)}
              value={bathroomCount}
              title="Bathrooms"
              subtitle="How many bathrooms do you have?"
            />
          </div>
        )}

        {step === STEPS.IMAGES && (
          <div className="flex flex-col gap-8">
            <Heading
              title="Add a photo of your place"
              subtitle="Show guests what your place looks like!"
            />
            <ImageUpload
              onChange={(value) => setCustomValue("imageSrc", value)}
              value={imageSrc}
            />
          </div>
        )}

        {step === STEPS.DESCRIPTION && (
          <div className="flex flex-col gap-8">
            <Heading
              title="How would you describe your place?"
              subtitle="Short and sweet works best!"
            />
            <TextField
              id="title"
              label="Title"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              hasValue={watch("title")}
            />
            <hr />
            <CustomEditor handleSetDescription={handleSetDescription} />
          </div>
        )}

        {step === STEPS.PRICE && (
          <div className="flex flex-col gap-8">
            <Heading
              title="Now, set your price"
              subtitle="How much do you charge per night?"
            />
            <TextField
              id="price"
              label="Price"
              formatPrice
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              hasValue={watch("price")}
            />
          </div>
        )}

        {step === STEPS.CATEGORY && (
          <div className="flex flex-col gap-8">
            <Heading
              title="Which of these best describes your places? "
              subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
              {CATEGORIES.map((item) => (
                <div key={item.label} className="col-span-1">
                  <CategoryInput
                    onClick={(category) => setCustomValue("category", category)}
                    selected={category === item.label}
                    label={item.label}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    </Modal>
  );
};

export default RentModal;
