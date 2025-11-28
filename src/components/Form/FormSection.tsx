import React from "react";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  subtitle?: string;
}

export function FormSection({
  title,
  description,
  children,
  subtitle,
}: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {subtitle && (
          <h2 className="text-sm mt-8 font-semibold text-gray-900">
            {subtitle}
          </h2>
        )}
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
