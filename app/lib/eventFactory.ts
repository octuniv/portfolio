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

export const InitState = (values: string[]) => {
  return useState(
    values.map((v, i) => {
      return { value: v, key: makeKey(i) };
    })
  );
};

export const AddClick =
  (values: Input, setter: Setter) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setter([...values, { value: "", key: makeKey(values.length) }]);
  };

export const RemoveClick =
  (setter: Setter) =>
  (index: number) =>
  (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setter((oldValues) => oldValues.filter((_, i) => i !== index));
  };

export const InputBlur =
  <T extends HTMLTextAreaElement | HTMLInputElement>(
    values: Input,
    setter: Setter
  ) =>
  (index: number) =>
  (event: FocusEvent<T>) => {
    event.preventDefault();
    const { value: target } = event.target;
    const nextCt = [...values];
    nextCt[index]["value"] = target;
    setter(nextCt);
  };
