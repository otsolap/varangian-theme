import Accordion from '@/components/blocks/Accordion';
import Banner from '@/components/blocks/Banner';
import BlogSection from '@/components/blocks/BlogSection';
import Cards from '@/components/blocks/Cards';
import FormEmbed from '@/components/blocks/FormEmbed';
import FooterColumn from '@/partials/navigation/FooterColumn';
import FooterArticles from '@/partials/navigation/FooterArticles';
import FooterSocialMedia from '@/partials/navigation/FooterSocialMedia';
import Hero from '@/components/blocks/Hero';
import ImageBlock from '@/components/blocks/ImageBlock';
import ImageGallery from '@/components/blocks/ImageGallery';
import MediaMix from '@/components/blocks/MediaMix';
import MenuItem from '@/partials/navigation/MenuItem';
import Textarea from '@/components/blocks/Textarea'
import VideoEmbed from '@/components/blocks/VideoEmbed';
import Quote from '@/components/blocks/Quote';

const getBlockComponent = ({ __component, ...rest }, index) => {
  let Block;

  switch (__component) {
    case 'blocks.accordion':
      Block = Accordion;
      break;
    case 'blocks.article-text-block':
      Block = Textarea;
      break;
    case 'blocks.embed':
      Block = Embed;
      break;
    case 'blocks.banner':
      Block = Banner;
      break;
    case 'blocks.blogs':
      Block = BlogSection;
      break;
    case 'blocks.cards':
      Block = Cards;
      break;
    case 'blocks.form-embed':
      Block = FormEmbed;
      break;
    case 'util.footer-column':
      Block = FooterColumn;
      break;
    case 'util.footer-social-media':
      Block = FooterSocialMedia;
      break;
    case 'util.footer-articles':
      Block = FooterArticles;
      break;
    case 'blocks.hero':
      Block = Hero;
      break;
    case 'blocks.image-block':
      Block = ImageBlock;
      break;
    case 'blocks.image-gallery':
      Block = ImageGallery;
      break;
    case 'blocks.media-mix':
      Block = MediaMix;
      break;
    case 'util.menu-item':
      Block = MenuItem;
      break;
    case 'blocks.text-area':
      Block = Textarea;
      break;
    case 'blocks.video-embed':
      Block = VideoEmbed;
      break;
    case 'blocks.quote':
      Block = Quote;
      break;
    default:
      console.error(`No component found for: ${__component}`)
      break;
  }

  return Block ? (
      <Block key={`index-${index}`} {...rest} />
   ) : null;
};

const Blocks = ({ blocks }) => {
  return (
      blocks.map(getBlockComponent)
    )
  ;
};

export default Blocks;