import { Field, useField } from "formik";

export default function InputField({
  as,
  className,
  spanText,
  text,
  type,
  ...props
}) {
  const [field, meta] = useField(props);

  return (
    <div className={className}>
      <label htmlFor={props.id || props.name}>{text}</label>
      <Field as={as} className="form-input" {...field} {...props} type={type} />

      {/* If InputField is a range-slider: */}
      <span className="rangeValue">{spanText}</span>

      {/* Error Message: */}
      {meta.touched && meta.error ? (
        <p className={type === "range" ? "range-error" : "error"}>
          {meta.error}
        </p>
      ) : null}
      {props.incorrectcode && (
        <p className="error">Please enter the correct code.</p>
      )}
    </div>
  );
}
