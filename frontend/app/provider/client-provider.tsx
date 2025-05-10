"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import React, { PropsWithChildren } from "react";

function ClientProvider({ children }: PropsWithChildren) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default ClientProvider;
