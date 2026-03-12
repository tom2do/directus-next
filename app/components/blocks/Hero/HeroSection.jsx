import Image from 'next/image';
import Button from '@/app/components/ui/Button';

export default function HeroSection({ data }) {
    if (!data) return null;

    const {
        tagline,
        headline,
        description,
        image,
        layout,
        button_group
    } = data;

    const buttons = button_group?.buttons || [];


    const isImageLeft = layout === 'image_left';
    const isImageCenter = layout === 'image_center';
    const isImageRight = layout === 'image_right' || layout === null;
    const isBackgroundImage = layout === 'hero_background_image';


    const renderImage = ( layout ) => {
        if (!image) return null;
        let classes = "max-w-full h-auto object-cover w-full h-full";
        return (
            <div className={`flex-1 min-w-[300px] flex justify-center items-center ${isImageCenter ? 'order-first' : ''} ${isBackgroundImage ? 'absolute inset-0 z-0 w-full h-full' : ''}`}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image.id}`}
                    alt={image.title || image.filename_download || 'Hero Image'}
                    width={image.width || 600}
                    height={image.height || 400}
                    priority
                    className={`hero__image ${classes}`}
                />
            </div>
        );
    };

    return (
        <section className={`py-20 bg-slate-50 relative ${layout || ''}`}>
            {isBackgroundImage && image && renderImage(layout)}
            <div className={`container mx-auto px-5 flex items-center justify-between flex-wrap gap-8 ${
                isImageCenter ? 'flex-col text-center' : 'flex-row text-left'
            }`}>
                {isImageLeft && renderImage(layout)}

                <div className={`flex-1 relative min-w-[300px]  ${
                    isImageLeft ? 'md:ml-10' : (isImageRight ? 'md:mr-10' : '')
                }`}>
                    {tagline && <p className="text-lg text-slate-500 mb-2 font-medium uppercase tracking-wider">{tagline}</p>}
                    {headline && <h1 className="text-4xl md:text-5xl font-bold mb-5 text-slate-900 leading-tight">{headline}</h1>}
                    {description && <div className="text-xl leading-relaxed text-slate-600 mb-8" dangerouslySetInnerHTML={{__html: description}}></div>}

                    {buttons && (
                        <div className={`flex flex-wrap gap-3 ${isImageCenter ? 'justify-center' : ''}`}>
                            {buttons?.map((btn, idx) => {
                                const { label, url, target, variant } = btn;
                                return(<Button key={idx} variant={variant} target={target} href={url}>
                                    {label}
                                </Button>)
                            })}
                        </div>
                    )}
                </div>

                {(isImageRight || isImageCenter) && renderImage(layout)}
            </div>

        </section>
    );
}
