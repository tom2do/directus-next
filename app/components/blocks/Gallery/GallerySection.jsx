"use client";

import Image from 'next/image';
import './Gallery.css'

export default function GallerySection(data) {
    const { tagline, headline, items } = data.data;
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <section className="gallery-section">
            <div className="container">
                {tagline && <p className="tagline">{tagline}</p>}
                {headline && <h2>{headline}</h2>}

                <div className="gallery-grid">
                    {items.map((item, index) => (
                        <div className="gallery-item" key={index}>
                            {item.directus_file?.id && (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.directus_file.id}`}
                                    alt={item.directus_file.filename_download || 'Gallery image'}
                                    width={400}
                                    height={300}
                                    className="gallery-image"
                                    unoptimized={false}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
