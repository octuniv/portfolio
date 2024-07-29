"use client";

import {
  Dispatch,
  MouseEvent,
  FocusEvent,
  SetStateAction,
  useState,
} from "react";
import { makeKey } from "./util";

type Input = {
  value: string;
  key: string;
}[];

type Setter = Dispatch<SetStateAction<Input>>;

export const makeInitState = (values: string[]) => {
  return useState(
    values.map((v, i) => {
      return { value: v, key: makeKey(i) };
    })
  );
};

export const makeAddClick =
  (values: Input, setter: Setter) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setter([...values, { value: "", key: makeKey(values.length) }]);
  };

export const makeRemoveClick =
  (setter: Setter) =>
  (index: number) =>
  (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setter((oldValues) => oldValues.filter((_, i) => i !== index));
  };

export const makeInputBlur =
  (values: Input, setter: Setter) =>
  (index: number) =>
  (event: FocusEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { value: target } = event.target;
    const nextCt = [...values];
    nextCt[index]["value"] = target;
    setter(nextCt);
  };
