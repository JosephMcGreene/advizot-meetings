//External
import { Field, useField } from "formik";

export default function InputField({ label, as, type, className, ...props }) {
	const [field, meta] = useField(props);

	return (
		<div className={className}>
			<label htmlFor={props.id || props.name}>{label}</label>
			<Field {...field} {...props} as={as} type={type}></Field>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</div>
	);
}
