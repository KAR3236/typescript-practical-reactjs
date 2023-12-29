import {
  ButtonInterface,
  FormInterface,
  InputInterface,
  LabelInterface,
  SelectInterface,
} from "../Services/commonInterface";

export function Form({ onSubmit, children }: Readonly<FormInterface>) {
  return <form onSubmit={onSubmit}> {children} </form>;
}

export function Input({
  name,
  type,
  className,
  id,
  placeholder,
  max,
  value,
  onBlur,
  onChange,
}: Readonly<InputInterface>) {
  return (
    <input
      name={name}
      type={type}
      className={className}
      id={id}
      placeholder={placeholder}
      max={max}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}

export function Label({ labelName, htmlFor }: Readonly<LabelInterface>) {
  return <label htmlFor={htmlFor}>{labelName}</label>;
}

export function Select({
  name,
  className,
  id,
  value,
  onBlur,
  onChange,
  defaultOption,
  defaultValue,
  options,
}: Readonly<SelectInterface>) {
  return (
    <select
      name={name}
      className={className}
      id={id}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    >
      {defaultOption && (
        <option value={defaultValue} disabled hidden>
          {defaultOption}
        </option>
      )}
      {options.map((option: any, index: number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

}

export function Button({
  className,
  type,
  onClick,
  children,
}: Readonly<ButtonInterface>) {
  return (
    <button onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
}
