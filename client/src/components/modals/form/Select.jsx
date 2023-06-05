import { useField } from "formik";

export default function Select({ text, className, options, ...props }) {
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
