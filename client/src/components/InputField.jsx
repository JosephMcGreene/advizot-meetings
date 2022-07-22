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
			<Field {...field} {...props} as={as} type={type} />

			{/* Field Error: */}
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}

			{/* If InputField is a range-slider: */}
			<span className="rangeValue" style={props.style}>
				{spanText}
			</span>
		</div>
	);
}
