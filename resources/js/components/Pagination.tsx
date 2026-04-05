import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
}

export default function Pagination({ links }: PaginationProps) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center items-center mt-8 mb-10 gap-2 p-4 bg-gray-800 rounded-lg border border-gray-600">
            {links.map((link, index) => {
                if (link.url === null) {
                    return (
                        <span 
                            key={index}
                            className="px-4 py-2 text-sm text-gray-500 bg-gray-700 border border-gray-600 rounded-md cursor-not-allowed"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-4 py-2 text-sm font-bold border rounded-md transition-all ${
                            link.active
                                ? 'bg-blue-500 text-white border-blue-400 scale-110 shadow-lg'
                                : 'bg-white text-gray-900 border-gray-300 hover:bg-blue-100'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}