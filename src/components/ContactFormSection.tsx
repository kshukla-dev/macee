import React from 'react';
import { ContactCard, ContactCardProps } from './ContactCard';

export interface ContactFormSectionProps extends ContactCardProps {
  id?: string;
  sectionClassName?: string;
  containerClassName?: string;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  id = 'contact-section',
  sectionClassName = '',
  containerClassName = 'max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 w-full',
  title = 'Get in contact with us',
  ...cardProps
}) => {
  return (
    <section id={id} className={`py-16 sm:py-24 bg-white border-t border-gray-100 ${sectionClassName}`}>
      <div className={containerClassName}>
        <ContactCard title={title} {...cardProps} />
      </div>
    </section>
  );
};

export { ContactCard };
