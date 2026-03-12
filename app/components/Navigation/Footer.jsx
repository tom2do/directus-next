import client from "@/lib/directus";
import {readItems} from '@directus/sdk';


const Footer = async ({navigation}) => {

    const globals = await client.request(
        readItems('globals', {
            fields: ['title']
        })
    );


    return(
        <footer className="site-footer bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <nav className="footer-nav mb-4">
                    <ul className="flex flex-wrap justify-center gap-4">
                        {navigation[0].items.map((item) => (
                            <li key={item.id}>
                                <a href={item.url} className="hover:underline">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <p className="text-center text-sm">&copy; {new Date().getFullYear()} {globals?.title ?? 'GROW agency'}. Alle Rechte vorbehalten.</p>
            </div>
        </footer>
    )
}

export default Footer