import { useContext } from "react";
import { ThemeContext } from "../../../App";
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
<<<<<<< HEAD
  const [field, meta] = useField(props);

  return (
    <div className={className}>
=======
  const isDark = useContext(ThemeContext);
  const [field, meta] = useField(props);

  return (
    <div className={isDark ? `${className} dark` : className}>
>>>>>>> 3a35c2a (Add more dark styles)
      <label htmlFor={props.id || props.name}>{text}</label>
      <Field {...field} {...props} as={as} type={type} />

      {/* If InputField is a range-slider: */}
      <span className="rangeValue">{spanText}</span>

      {/* Error Message: */}
      {meta.touched && meta.error ? (
<<<<<<< HEAD
        <p className={type === "range" ? "range-error" : "error"}>
          {meta.error}
        </p>
      ) : null}
      {props.incorrectCode && (
        <p className="error">Please enter the correct code.</p>
      )}
=======
        <span className={type === "range" ? "range-error" : "error"}>
          {meta.error}
        </span>
      ) : null}
>>>>>>> 3a35c2a (Add more dark styles)
    </div>
  );
}
