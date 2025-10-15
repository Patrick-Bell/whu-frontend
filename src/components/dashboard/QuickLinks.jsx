import { useState } from 'react';
import {  Link, Settings, Users2, Volleyball, ChartArea, Frame, ArrowLeft, ArrowRight } from 'lucide-react';


const QuickLinks = () => {

    const links = [
        { icon: Settings, label: 'Account', href: '/account' },
        { icon: Volleyball, label: 'Games', href: '/games' },
        { icon: Users2, label: 'Workers', href: '/workers' },
        { icon: Frame, label: 'Fixtures', href: '/fixtures' },
        { icon: ChartArea, label: 'Analytics', href: '/analytics' },
      ];


    return (

        <div className="border border-gray-200 p-4 rounded-lg">
        <div className="flex items-center">
              <Link size={20} />
              <p className="ml-2 font-bold text-md">Quick Links</p>
            </div>

            <div className="space-y-2 mt-4">
                {links.map((link, index) => {
                    const Icon = link.icon;
                    return (
                    <a
                        key={index}
                        href={link.href}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group w-full"
                    >
                        <Icon size={20} className="text-gray-600 transition-colors" />
                        <span className="ml-3 text-sm text-gray-700 transition-colors">
                        {link.label}
                        </span>
                        <div className='flex justify-end w-full'>
                            <ArrowRight size={18} />
                        </div>
                    </a>
                    );
                })}
                </div>
            </div>

    )
}

export default QuickLinks