import { ReactNode } from "react";

export interface FormInterface {
  onSubmit: any;
  children: ReactNode;
}

export interface InputInterface {
  name: string;
  type: string;
  className: string;
  id: string;
  placeholder?: string;
  max?: string;
  value: string;
  onBlur: any;
  onChange: any;
}

export interface LabelInterface {
  labelName: string;
  htmlFor: string;
}

export interface SelectInterface {
  name: string;
  className: string;
  id: string;
  value: string;
  onBlur: any;
  onChange: any;
  defaultOption: string;
  defaultValue: string;
  options: string[];
}

export interface ButtonInterface {
  className: string;
  type: "submit" | "reset" | "button";
  onClick?: any;
  children: ReactNode;
}
