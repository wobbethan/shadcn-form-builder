import { Input } from "@/components/ui/input";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { LabelGroup } from "../../../../../temp-src/components/form-builder/sidebar/groups/label-group";
import { GridGroup } from "../../../../../temp-src/components/form-builder/sidebar/groups/grid-group";
import { ValidationGroup } from "../../../../../temp-src/components/form-builder/sidebar/groups/validation-group";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { usePaymentInputs } from "react-payment-inputs";
import images, { type CardImages } from "react-payment-inputs/images";
import { useEffect, useState } from "react";
import { CalendarIcon, CreditCardIcon, LockIcon } from "lucide-react";

export function FormCreditCard(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const componentId = component.id;
  const IconStrokeWidth = component.getField(
    "properties.style.iconStrokeWidth"
  );
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();

  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditCard({ ...creditCard, cardNumber: e.target.value });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let expiryDate = e.target.value;
    let expiryMonth = expiryDate.split("/")[0].trim();
    let expiryYear = expiryDate.split("/")[1].trim();
    setCreditCard({
      ...creditCard,
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
    });
  };

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditCard({ ...creditCard, cvv: e.target.value });
  };

  useEffect(() => {
    if (
      creditCard.cardNumber === "" ||
      creditCard.expiryMonth === "" ||
      creditCard.expiryYear === "" ||
      creditCard.cvv === ""
    ) {
      form.setError(componentId, {
        message: "This field is required",
      });
    } else {
      form.setValue(componentId, JSON.stringify(creditCard));
      form.clearErrors(componentId);
    }
  }, [creditCard, component, form]);

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {/* First row: Card number (full width) */}
      <div className="relative w-full">
        <Input
          key={`${component.id}-card-number`}
          {...getCardNumberProps({
            onChange: handleCardNumberChange,
          })}
          className="pe-9"
        />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 end-0 pe-3">
          {meta.cardType ? (
            <svg
              className="overflow-hidden rounded-sm"
              {...getCardImageProps({
                images: images as unknown as CardImages,
              })}
              width={20}
            />
          ) : (
            <CreditCardIcon className="size-4" strokeWidth={IconStrokeWidth} />
          )}
        </div>
      </div>

      {/* Second row: Expiry date and CVV (side by side) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative w-full">
          <Input
            key={`${component.id}-expiry`}
            className="pe-9"
            {...getExpiryDateProps({
              onChange: handleExpiryDateChange,
            })}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 end-0 pe-3">
            <CalendarIcon className="size-4" strokeWidth={IconStrokeWidth} />
          </div>
        </div>

        <div className="relative w-full">
          <Input
            key={`${component.id}-cvc`}
            className="pe-9"
            {...getCVCProps({
              onChange: handleCVCChange,
            })}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 end-0 pe-3">
            <LockIcon className="size-4" strokeWidth={IconStrokeWidth} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const CreditCardDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  label: (
    <LabelGroup
      whitelist={["label", "labelPosition", "labelAlign", "showLabel"]}
    />
  ),
  input: null,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
