import React from 'react';
import { UserGroupIcon, DocumentTextIcon, ChartBarIcon } from '../components/icons.tsx';

interface StaffLink {
  title: string;
  subtitle: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const staffLinks: StaffLink[] = [
    {
        title: 'PowerSchool for Teachers',
        subtitle: 'Access the teacher portal.',
        href: 'https://hcss.powerschool.com/teachers',
        icon: UserGroupIcon,
        color: 'text-brand-burgundy',
    },
    {
        title: 'Faculty Intranet',
        subtitle: 'Internal resources and documents.',
        href: 'https://sites.google.com/a/hampdencharter.org/hcss-it-department-sample',
        icon: DocumentTextIcon,
        color: 'text-brand-burgundy',
    },
    {
        title: 'Education Pulse',
        subtitle: 'Platform for educational insights.',
        href: 'https://educationpulse.org/',
        icon: ChartBarIcon,
        color: 'text-brand-burgundy',
    },
];

const StaffLinkCard: React.FC<{ item: StaffLink }> = ({ item }) => (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-white rounded-xl shadow-md border border-gray-200/50 p-4 flex flex-col items-center justify-center space-y-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 h-full"
  >
    <div className={`p-2.5 rounded-full bg-slate-100`}>
      <item.icon className={`h-6 w-6 ${item.color} group-hover:animate-wiggle-fun`} />
    </div>
    <div className="text-center">
      <h3 className="text-base font-bold text-brand-navy leading-tight">
        {item.title}
      </h3>
      <p className="text-gray-500 text-xs">{item.subtitle}</p>
    </div>
  </a>
);

const StaffPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-brand-navy mb-2">HCSS Staff Resources</h2>
      <p className="text-gray-600 mb-8">Quick access to essential tools and platforms for HCSS staff.</p>
      
      <section>
        <div className="grid grid-cols-2 gap-4">
          {staffLinks.map((item) => (
            <StaffLinkCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default StaffPage;
