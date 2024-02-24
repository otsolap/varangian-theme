import type { Schema, Attribute } from '@strapi/strapi';

export interface BlocksAccordion extends Schema.Component {
  collectionName: 'components_blocks_accordions';
  info: {
    displayName: 'Accordion';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    accordions: Attribute.Relation<
      'blocks.accordion',
      'oneToMany',
      'api::faq.faq'
    >;
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface BlocksArticleTextBlock extends Schema.Component {
  collectionName: 'components_partials_article_text_blocks';
  info: {
    displayName: 'articleText';
    description: '';
  };
  attributes: {
    text: Attribute.RichText;
  };
}

export interface BlocksBanner extends Schema.Component {
  collectionName: 'components_blocks_banner';
  info: {
    displayName: 'Banner';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText;
    image: Attribute.Media;
    button: Attribute.Component<'partials.button'>;
    selectTheme: Attribute.Enumeration<['primary', 'secondary', 'tertiary']>;
  };
}

export interface BlocksBlogs extends Schema.Component {
  collectionName: 'components_blocks_blogs';
  info: {
    displayName: 'blogs';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    selectTheme: Attribute.Enumeration<['primary', 'secondary']> &
      Attribute.DefaultTo<'primary'>;
    filter: Attribute.Enumeration<['latest', 'custom']> &
      Attribute.DefaultTo<'latest'>;
    blogs: Attribute.Relation<
      'blocks.blogs',
      'oneToMany',
      'api::article.article'
    >;
  };
}

export interface BlocksCards extends Schema.Component {
  collectionName: 'components_blocks_cards';
  info: {
    displayName: 'Cards';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    cards: Attribute.Component<'partials.card', true>;
  };
}

export interface BlocksFormEmbed extends Schema.Component {
  collectionName: 'components_util_form_embeds';
  info: {
    displayName: 'FormEmbed';
    description: '';
  };
  attributes: {
    form: Attribute.Relation<'blocks.form-embed', 'oneToOne', 'api::form.form'>;
  };
}

export interface BlocksHero extends Schema.Component {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'Hero';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    alignContent: Attribute.Enumeration<['left', 'right']> &
      Attribute.DefaultTo<'left'>;
    media: Attribute.Enumeration<['image', 'video']> &
      Attribute.DefaultTo<'image'>;
    mediaWidth: Attribute.Boolean;
    video: Attribute.String;
    autoplay: Attribute.Boolean & Attribute.DefaultTo<false>;
    buttons: Attribute.Component<'partials.button', true> &
      Attribute.SetMinMax<{
        max: 2;
      }>;
    image: Attribute.Media;
  };
}

export interface BlocksImageBlock extends Schema.Component {
  collectionName: 'components_block_image_blocks';
  info: {
    displayName: 'ImageBlock';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    caption: Attribute.String;
  };
}

export interface BlocksImageGallery extends Schema.Component {
  collectionName: 'components_blocks_image_galleries';
  info: {
    displayName: 'ImageGallery';
    description: '';
  };
  attributes: {
    images: Attribute.Media;
    title: Attribute.Text;
  };
}

export interface BlocksMediaMix extends Schema.Component {
  collectionName: 'components_blocks_media_mixes';
  info: {
    displayName: 'mediaMix';
    description: '';
  };
  attributes: {
    mediaMixItems: Attribute.Component<'partials.media-mix-item', true> &
      Attribute.SetMinMax<{
        min: 2;
        max: 2;
      }>;
  };
}

export interface BlocksQuote extends Schema.Component {
  collectionName: 'components_blocks_quotes';
  info: {
    displayName: 'Quote';
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface BlocksServices extends Schema.Component {
  collectionName: 'components_blocks_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    selectTheme: Attribute.Enumeration<['primary', 'secondary']>;
    services: Attribute.Relation<
      'blocks.services',
      'oneToMany',
      'api::service.service'
    >;
  };
}

export interface BlocksTextArea extends Schema.Component {
  collectionName: 'components_blocks_text_areas';
  info: {
    displayName: 'textArea';
    description: '';
  };
  attributes: {
    text: Attribute.RichText;
    selectTheme: Attribute.Enumeration<['primary', 'secondary', 'tertiary']>;
  };
}

export interface BlocksVideoEmbed extends Schema.Component {
  collectionName: 'components_block_video-embeds';
  info: {
    displayName: 'VideoEmbed';
    description: '';
  };
  attributes: {
    url: Attribute.Text;
  };
}

export interface FormInputsEmail extends Schema.Component {
  collectionName: 'components_form_inputs_emails';
  info: {
    displayName: 'email-field';
    description: '';
  };
  attributes: {
    email: Attribute.Email;
    placeholder: Attribute.String & Attribute.DefaultTo<'email@email.com'>;
  };
}

export interface FormInputsTextField extends Schema.Component {
  collectionName: 'components_form_inputs_text_fields';
  info: {
    displayName: 'text-field';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    placeholder: Attribute.String;
  };
}

export interface FormInputsTextareaField extends Schema.Component {
  collectionName: 'components_form_inputs_textarea_fields';
  info: {
    displayName: 'Textarea-field';
  };
  attributes: {
    textarea: Attribute.Text;
  };
}

export interface PartialsButton extends Schema.Component {
  collectionName: 'components_partials_buttons';
  info: {
    displayName: 'button';
    description: '';
  };
  attributes: {
    href: Attribute.Text;
    title: Attribute.String;
    isExternal: Attribute.Boolean;
    target: Attribute.Enumeration<['_blank']>;
    selectTheme: Attribute.Enumeration<
      ['primary', 'secondary', 'tertiary', 'transparent']
    > &
      Attribute.DefaultTo<'primary'>;
  };
}

export interface PartialsCard extends Schema.Component {
  collectionName: 'components_partials_cards';
  info: {
    displayName: 'Card';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media;
    description: Attribute.RichText;
  };
}

export interface PartialsLink extends Schema.Component {
  collectionName: 'components_partials_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    href: Attribute.Text;
    title: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
    target: Attribute.Enumeration<['_self', '_blank']> &
      Attribute.DefaultTo<'_self'>;
    selectTheme: Attribute.Enumeration<
      ['primary', 'secondary', 'tertiary', 'transparent']
    >;
  };
}

export interface PartialsMediaMixItem extends Schema.Component {
  collectionName: 'components_partials_media_mix_items';
  info: {
    displayName: 'mediaMixItem';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['markdown', 'image', 'video']> &
      Attribute.Required &
      Attribute.DefaultTo<'markdown'>;
    markdown: Attribute.RichText;
    image: Attribute.Media;
    video: Attribute.String;
  };
}

export interface UtilBlogAnchors extends Schema.Component {
  collectionName: 'components_util_blog_anchors';
  info: {
    displayName: 'blogAnchors';
    description: '';
  };
  attributes: {
    filter: Attribute.Enumeration<['latest', 'custom']>;
    blogs: Attribute.Relation<
      'util.blog-anchors',
      'oneToMany',
      'api::article.article'
    >;
  };
}

export interface UtilBlogSocialShare extends Schema.Component {
  collectionName: 'components_util_blog_social_shares';
  info: {
    displayName: 'BlogSocialShare';
  };
  attributes: {
    X: Attribute.Boolean;
    WhatsApp: Attribute.Boolean;
    Link: Attribute.Boolean;
    Email: Attribute.Boolean;
    LinkedIn: Attribute.Boolean;
    Facebook: Attribute.Boolean;
  };
}

export interface UtilFooterArticles extends Schema.Component {
  collectionName: 'components_util_footer_articles';
  info: {
    displayName: 'footerArticles';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    open: Attribute.Boolean;
    blogAnchors: Attribute.Component<'util.blog-anchors'>;
  };
}

export interface UtilFooterColumn extends Schema.Component {
  collectionName: 'components_partials_footer_columns';
  info: {
    displayName: 'footerColumn';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText;
    open: Attribute.Boolean & Attribute.DefaultTo<true>;
    links: Attribute.Component<'partials.link', true>;
    image: Attribute.Media;
  };
}

export interface UtilFooterSocialMedia extends Schema.Component {
  collectionName: 'components_util_footer_social_medias';
  info: {
    displayName: 'footerSocialMedia';
    description: '';
  };
  attributes: {
    socialMedia: Attribute.Component<'util.social-media-type', true>;
    title: Attribute.String;
    open: Attribute.Boolean;
  };
}

export interface UtilMenuItem extends Schema.Component {
  collectionName: 'components_util_menu_items';
  info: {
    displayName: 'menuItem';
    description: '';
  };
  attributes: {
    href: Attribute.Text & Attribute.Required;
    title: Attribute.String;
    icon: Attribute.Enumeration<['bullseye', 'node', 'cube', 'pen']>;
  };
}

export interface UtilSeo extends Schema.Component {
  collectionName: 'components_blocks_seos';
  info: {
    displayName: 'SEO';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
    preventIndexing: Attribute.Boolean & Attribute.DefaultTo<false>;
    keywords: Attribute.Text;
    imageBlock: Attribute.Component<'blocks.image-block'>;
    XTwitter: Attribute.String;
  };
}

export interface UtilSocialMediaType extends Schema.Component {
  collectionName: 'components_util_social_media_types';
  info: {
    displayName: 'contactDetails';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<
      [
        'Facebook',
        'Instagram',
        'X',
        'LinkedIn',
        'Whatsapp',
        'TikTok',
        'Telegram',
        'Pinterest',
        'Email',
        'Link'
      ]
    >;
    title: Attribute.String;
    url: Attribute.Text;
  };
}

export interface UtilSubFooter extends Schema.Component {
  collectionName: 'components_util_sub_footers';
  info: {
    displayName: 'subFooter';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    link: Attribute.Component<'partials.link'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.accordion': BlocksAccordion;
      'blocks.article-text-block': BlocksArticleTextBlock;
      'blocks.banner': BlocksBanner;
      'blocks.blogs': BlocksBlogs;
      'blocks.cards': BlocksCards;
      'blocks.form-embed': BlocksFormEmbed;
      'blocks.hero': BlocksHero;
      'blocks.image-block': BlocksImageBlock;
      'blocks.image-gallery': BlocksImageGallery;
      'blocks.media-mix': BlocksMediaMix;
      'blocks.quote': BlocksQuote;
      'blocks.services': BlocksServices;
      'blocks.text-area': BlocksTextArea;
      'blocks.video-embed': BlocksVideoEmbed;
      'form-inputs.email': FormInputsEmail;
      'form-inputs.text-field': FormInputsTextField;
      'form-inputs.textarea-field': FormInputsTextareaField;
      'partials.button': PartialsButton;
      'partials.card': PartialsCard;
      'partials.link': PartialsLink;
      'partials.media-mix-item': PartialsMediaMixItem;
      'util.blog-anchors': UtilBlogAnchors;
      'util.blog-social-share': UtilBlogSocialShare;
      'util.footer-articles': UtilFooterArticles;
      'util.footer-column': UtilFooterColumn;
      'util.footer-social-media': UtilFooterSocialMedia;
      'util.menu-item': UtilMenuItem;
      'util.seo': UtilSeo;
      'util.social-media-type': UtilSocialMediaType;
      'util.sub-footer': UtilSubFooter;
    }
  }
}
