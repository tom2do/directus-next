import HeroSection from "@/app/components/blocks/Hero/HeroSection";
import RichTextSection from "@/app/components/blocks/RichText/RichTextSection";
import GallerySection from "@/app/components/blocks/Gallery/GallerySection";
import PricingSection from "@/app/components/blocks/Pricing/PricingSection";
import FormSection from "@/app/components/blocks/Forms/FormSection";
import Posts from "@/app/components/blocks/Posts/Posts";

const BlockItems = ({ blocks }) => {

    return(
        <>
            {blocks.map(block => {
            switch (block.collection) {
                case 'block_heroelement':
                    return <HeroSection key={block.id} data={block.item} />;
                case 'block_richtext':
                    return <RichTextSection key={block.id} data={block.item} />;
                case 'block_gallery':
                    return <GallerySection key={block.id} data={block.item} />;
                case 'block_pricing':
                    return <PricingSection key={block.id} data={block.item} />;
                case 'block_form':
                    return <FormSection key={block.id} data={block.item} />;
                case 'block_posts':
                    return <Posts key={block.id} data={block.item} />;
                default:
                    return null;
            }
        })}
        </>
    )
}

export default BlockItems