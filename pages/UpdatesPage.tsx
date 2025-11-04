
import React from 'react';
import { InstagramIcon, NewspaperIcon, CalendarIcon } from '../components/icons.tsx';

interface UpdateLink {
  title: string;
  subtitle: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const newsAndEventsLinks: UpdateLink[] = [
    {
        title: 'High School News',
        subtitle: 'Latest updates from the high school.',
        href: 'https://east.hampdencharter.org/category/school-life/',
        icon: NewspaperIcon,
        color: 'text-brand-burgundy',
    },
    {
        title: 'Middle School News',
        subtitle: 'Latest updates from the middle school.',
        href: 'https://west.hampdencharter.org/category/school-life/',
        icon: NewspaperIcon,
        color: 'text-brand-burgundy',
    },
    {
        title: 'High School Events',
        subtitle: 'View the high school activity calendar.',
        href: 'https://east.hampdencharter.org/activity-calendar/',
        icon: CalendarIcon,
        color: 'text-brand-burgundy',
    },
    {
        title: 'Middle School Events',
        subtitle: 'View the middle school activity calendar.',
        href: 'https://west.hampdencharter.org/activity-calendar/',
        icon: CalendarIcon,
        color: 'text-brand-burgundy',
    }
];

const socialLinks: UpdateLink[] = [
  {
    title: 'High School Instagram',
    subtitle: 'Follow @hampdencharter',
    href: 'https://www.instagram.com/hampdencharter',
    icon: InstagramIcon,
    color: 'text-brand-burgundy',
  },
  {
    title: 'Middle School Instagram',
    subtitle: 'Follow @hcss_ms',
    href: 'https://www.instagram.com/hcss_ms',
    icon: InstagramIcon,
    color: 'text-brand-burgundy',
  },
];


const UpdateCard: React.FC<{ item: UpdateLink }> = ({ item }) => (
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


const UpdatesPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-brand-navy mb-2">HCSS Updates</h2>
      <p className="text-gray-600 mb-8">Find the latest news, events, and social media updates.</p>
      
      <section className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">News & Events</h3>
        <div className="grid grid-cols-2 gap-4">
          {newsAndEventsLinks.map((item) => (
            <UpdateCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((item) => (
            <UpdateCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default UpdatesPage;
