import React, { ComponentProps, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/ui/components/input-group";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Button } from "@repo/ui/components/button";

export const InputPassword = ({
  withIcon = false,
  ...props
}: ComponentProps<typeof InputGroupInput> & { withIcon?: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        type={isVisible ? "text" : "password"}
        placeholder="••••••••"
      />
      {withIcon && (
        <InputGroupAddon>
          <LockKeyhole />
        </InputGroupAddon>
      )}
      <InputGroupAddon align={"inline-end"}>
        <Button
          tabIndex={-1}
          size="icon"
          variant="ghost"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};
