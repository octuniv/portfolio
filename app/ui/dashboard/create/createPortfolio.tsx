"use client";

import { createPortfolio } from "@/app/lib/action";
import { Portfolio } from "@/app/lib/definition";
import { useActionState } from "react";
import PortfolioEditor from "../portfolioEditor";

export default function CreatePortfolio() {
  const initialPortfolio: Portfolio = {
    id: "",
    title: "",
    paragraphs: [],
  };
  const initialState = { message: "", errors: {} };
  const [state, formAction] = useActionState(createPortfolio, initialState);

  return (
    <PortfolioEditor
      portfolio={initialPortfolio}
      state={state}
      formAction={formAction}
    />
  );
}
