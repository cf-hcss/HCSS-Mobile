import React from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, PrinterIcon } from '../components/icons.tsx';

const highSchoolContact = {
    name: 'High School (East)',
    address: '511 Main Street, Chicopee, MA 01020',
    phone: '(413) 593-9700',
    fax: '(413) 593-9701',
    email: 'info@hampdencharter.org',
};

const middleSchoolContact = {
    name: 'Middle School (West)',
    address: '20 Johnson Road, West Springfield, MA 01089',
    phone: '(413) 732-2200',
    fax: '(413) 732-2201',
    email: 'info-ms@hampdencharter.org',
};

const ContactCard: React.FC<{ contact: typeof highSchoolContact }> = ({ contact }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 text-left">
        <h3 className="text-xl font-bold text-brand-navy mb-4 border-b-2 border-brand-burgundy pb-2">{contact.name}</h3>
        <div className="space-y-4">
            <div className="flex items-start">
                <MapPinIcon className="h-6 w-6 mr-4 text-brand-burgundy flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{contact.address}</span>
            </div>
            <div className="flex items-start">
                <PhoneIcon className="h-6 w-6 mr-4 text-brand-burgundy flex-shrink-0 mt-0.5" />
                <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-gray-700 hover:text-brand-burgundy hover:underline">
                    {contact.phone}
                </a>
            </div>
            <div className="flex items-start">
                <PrinterIcon className="h-6 w-6 mr-4 text-brand-burgundy flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{contact.fax}</span>
            </div>
            <div className="flex items-start">
                <EnvelopeIcon className="h-6 w-6 mr-4 text-brand-burgundy flex-shrink-0 mt-0.5" />
                <a href={`mailto:${contact.email}`} className="text-gray-700 hover:text-brand-burgundy hover:underline">
                    {contact.email}
                </a>
            </div>
        </div>
    </div>
);


const ContactPage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-navy mb-2">Contact Us</h2>
            <p className="text-gray-600 mb-8">Get in touch with our school offices.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactCard contact={highSchoolContact} />
                <ContactCard contact={middleSchoolContact} />
            </div>
        </div>
    );
};

export default ContactPage;