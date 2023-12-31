"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../button";
import { useClickAway } from "@/app/hooks/useClickAway";
import useDimensions from "react-cool-dimensions";

interface ModalProps {
  isOpen?: boolean;
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  children?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}
const Modal = ({
  isOpen,
  actionLabel,
  onClose,
  onSubmit,
  title,
  children,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  const header = useDimensions({ useBorderBoxSize: true });
  const container = useDimensions({ useBorderBoxSize: true });
  const modalRef = useClickAway(() => onClose());

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div
          ref={modalRef}
          className={`translate duration-300 h-full ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <div
            ref={children && container.observe}
            className="overflow-hidden mx-auto max-h-[95vh] max-w-[800px] translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <div
              ref={header.observe}
              className="flex items-center p-5 rounded-t justify-center relative border-b"
            >
              <button
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            <div
              className={`overflow-y-scroll ${
                children && `h-[${container.height - header.height}px]`
              }`}
            >
              <div className="relative p-6 flex-auto">{children}</div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4 w-full">
                  {secondaryActionLabel && secondaryAction && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
