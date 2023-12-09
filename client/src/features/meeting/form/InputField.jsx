//External
import { Field, useField } from "formik";

export default function InputField({
  text,
  as,
  type,
  className,
  spanText,
  ...props
}) {
  const [field, meta] = useField(props);

  return (
    <div className={className}>
      <label htmlFor={props.id || props.name}>{text}</label>
      <Field {...field} {...props} as={as} type={type} className="form-input" />

      {/* If InputField is a range-slider: */}
      <span className="rangeValue">{spanText}</span>

      {/* Error Message: */}
      {meta.touched && meta.error ? (
        <p className={type === "range" ? "range-error" : "error"}>
          {meta.error}
        </p>
      ) : null}
      {props.incorrectCode && (
        <p className="error">Please enter the correct code.</p>
      )}
    </div>
  );
}
