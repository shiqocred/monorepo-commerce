"use client";

import { Button } from "@repo/ui/components/button";
import React from "react";
import { useLogout } from "./(auth)/login/_api/use-logout";

export const Client = () => {
  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate();
  };
  return (
    <div>
      <Button onClick={handleLogout}>logout</Button>
    </div>
  );
};
