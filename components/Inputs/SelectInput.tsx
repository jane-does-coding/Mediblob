"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface SelectInputProps {
	id: string;
	label: string;
	options: string[];
	disabled?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const SelectInput = ({
	id,
	label,
	options,
	disabled,
	required,
	register,
	errors,
}: SelectInputProps) => {
	return (
		<div className="w-full relative my-1">
			<select
				id={id}
				disabled={disabled}
				defaultValue=""
				{...register(id, { required })}
				className={`peer w-full p-3 pt-6 pl-4 font-light bg-neutral-100 border-2 border-neutral-400/75 text-black rounded-[2vh] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
          ${errors[id] ? "border-rose-400" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-neutral-900"}
        `}
			>
				<option value="" disabled>
					Select an option
				</option>
				{options.map((option) => {
					const [value, name] = option.split(":");
					return (
						<option key={value} value={value}>
							{name || value}
						</option>
					);
				})}
			</select>
			<label
				className={`absolute text-md duration-150 transform scale-75 -translate-y-4 top-5 left-4 z-10 origin-[0]
            ${errors[id] ? "text-rose-300 font-semibold" : "text-zinc-600"}
        `}
			>
				{label}
			</label>
		</div>
	);
};

export default SelectInput;
