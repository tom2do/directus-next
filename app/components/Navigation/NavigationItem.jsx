import Link from 'next/link';
import {resolveItemUrl} from "@/lib/utils";
import {NavigationMenuTrigger, NavigationMenuItem, NavigationMenuContent, NavigationMenuLink} from "@/components/ui/navigation-menu";
import InlineSVG from "@/app/components/ui/InlineSVG";
import './Navigation.css'


const NavigationItem = ({ item }) => {

    if (item.type === 'group') {
        return (
            <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm!">
                    {item.icon && (
                        <InlineSVG 
                            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.icon.id}`} 

                        />
                    )}
                    {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="md:absolute">
                    <ul className="grid w-[200px]">
                            {item.children.map((child, index) => (
                                <NavigationItem key={index} item={child}/>
                            ))}
                    </ul>
                </NavigationMenuContent>

            </NavigationMenuItem>
        );
    }

    return (


                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link
                            href={resolveItemUrl(item)}
                            target={item.target === '_blank' ? '_blank' : undefined}
                            rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                            className="flex items-center flex-row"
                        >
                            {item.icon && (
                                <InlineSVG 
                                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.icon.id}`} 
                                />
                            )}
                            {item.title}
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>


    );
}



export default NavigationItem