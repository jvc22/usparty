import Link from "next/link";
import { ArrowRight } from "phosphor-react";

interface SidebarItemProps {
    title: string;
    url: string;
}

export function SidebarItem({ title, url }: SidebarItemProps) {
    return (
        <div className="w-full tap focus:bg-slate-300">
            <Link href={`/${url}`} className="text-gray-100 text-md focus:text-[#00B37E] flex gap-2 items-center">
                {title}
                <ArrowRight />
            </Link>
        </div>
    )
}