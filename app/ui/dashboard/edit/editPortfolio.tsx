"use client";

import { updatePortfolio } from "@/app/lib/action";
import { Portfolio } from "@/app/lib/definition";
import { useActionState } from "react";
import PortfolioEditor from "../portfolioEditor";

export default function EditPortfolio({ portfolio }: { portfolio: Portfolio }) {
  const initialState = { message: "", errors: {} };
  const updatePortfolioWithId = updatePortfolio.bind(null, portfolio.id);
  const [state, formAction] = useActionState(
    updatePortfolioWithId,
    initialState
  );

  return (
    <PortfolioEditor
      portfolio={portfolio}
      state={state}
      formAction={formAction}
    />
  );
}
