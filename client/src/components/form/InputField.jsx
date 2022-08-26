//External
import { Field, useField } from "formik";

export default function InputField({
	text,
	as,
	type,
	className,
	placeholder,
	spanText,
	...props
}) {
	const [field, meta] = useField(props);

	return (
		<div className={className}>
			<label htmlFor={props.id || props.name}>{text}</label>
			<Field
				{...field}
				{...props}
				as={as}
				type={type}
				placeholder={placeholder}
			/>

			{/* If InputField is a range-slider: */}
			<span className="rangeValue">{spanText}</span>

			{/* Error Message: */}
			{meta.touched && meta.error ? (
				<span className={type === "range" ? "range-error" : "error"}>
					{meta.error}
				</span>
			) : null}
		</div>
	);
}
