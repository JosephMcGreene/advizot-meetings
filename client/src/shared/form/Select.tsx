import { useField } from "formik";

type Props = {
  className: string;
  options: object;
  text: string;
};

export default function Select({ className, options, text, ...props }: Props) {
  const [field, meta] = useField(props);

  return (
    <div className={className}>
      <label htmlFor={props.id || props.name}>{text}</label>
      <select {...field} {...props} className="rating-select" />

      {/* Form Error: */}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}
