//External
import { useField } from "formik";

export default function Select({ label, className, ...props }) {
	const [field, meta] = useField(props);

	return (
		<div className={className}>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select {...field} {...props} className="rating-select" />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</div>
	);
}
