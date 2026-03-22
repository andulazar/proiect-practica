import { Link , usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, FileText, Globe } from 'lucide-react';
//import { index } from '@/actions/App/Http/Controllers/UserController';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';




const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
        const { auth } = usePage<{ 
                auth: { 
                    user: { permissions?: string[] } | null 
                } 
            }>().props;    
        const userPermissions = auth.user?.permissions || [];

    
    const mainNavItems: NavItem[] = [
        {       
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {       
            title: 'View Public Site',
            href: '/',
            icon: Globe,
        },
    ];
    

    
    if (userPermissions.includes('manage users')) {
        mainNavItems.push({       
            title: 'Users',
            href: '/users',
            icon: LayoutGrid,
        });
    }

    if (userPermissions.includes('view categories')) {
        mainNavItems.push({       
            title: 'Categories',
            href: '/categories',
            icon: Folder,
        });
    }

    if (userPermissions.includes('manage roles')) {
        mainNavItems.push({       
            title: 'Roles & Permissions',
            href: '/roles',
            icon: LayoutGrid,
        });
    }

    if (userPermissions.includes('view posts')) {
        mainNavItems.push({       
            title: 'Posts',
            href: '/posts',
            icon: FileText, 
        });
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
