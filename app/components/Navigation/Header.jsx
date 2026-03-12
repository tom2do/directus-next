"use client";

import Link from 'next/link';
import NavigationItem from './NavigationItem';
import {NavigationMenu, NavigationMenuList} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Button from "@/app/components/ui/Button";

export default function Header({ navigation }) {
    // Find the Main Navigation set by title

    navigation = navigation[0]
    const image = navigation['nav_logo'] || {};

    return (
        <header className="site-header bg-black">
            <div className="container">
                <div className="logo">
                    <Link href={navigation['nav_link'] ?? '/'} className="logo-text">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image.id}`}
                            alt={image.title || image.filename_download || 'Hero Image'}
                            width={image.width || 600}
                            height={image.height || 400}
                            priority
                            className="max-w-full h-auto object-cover w-full h-full"
                        />
                    </Link>
                </div>

                <div className={"flex gap-4 items-center justify-end w-full"}>
                    <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                    {navigation['items'].map((item, index) => (
                        <NavigationItem key={item.id || index} item={item} />
                    ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="navigation--ctas flex gap-4 items-center justify-end">
                    {navigation.buttons.map((button, idx) => {
                        if (!button.button_link) return null;
                        return (
                            <Button
                                key={idx}
                                href={button.button_link}
                                variant={button.button_style || 'primary'}
                                className={"text-sm!"}
                            >{button.button_label}</Button>

                        );
                    })}
                </div>
                </div>
            </div>

            <style jsx>{`
        .site-header {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
            color: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
        }

        .logo-text {
          color: #3182ce;
          text-decoration: none;
        }

        .main-nav {
            display: flex;
            align-items: center;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 20px;
        }

        .main-nav a {
          color: #4a5568;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          transition: color 0.3s;
        }

        .main-nav a:hover {
          color: #3182ce;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            height: auto;
            padding: 20px;
          }

          .logo {
            margin-bottom: 20px;
          }

        }
      `}</style>
        </header>
    );
}


