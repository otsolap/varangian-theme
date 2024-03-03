import axios from 'axios'
import config from '@/utils/config'

  // Youtube url
  export const YouTubeGetID = (url) => {
      url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0]
    }
    
  // Paginate helper function
  export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    return items.slice(startIndex, startIndex + pageSize)
  }

  export function isNotEmpty(item) {
    if (Array.isArray(item)) {
        return item.length > 0;
    }

    if (item && typeof item === 'object') {
        return Object.keys(item).length > 0;
    }

    // For other data types, return false (or however you want to handle them)
    return false;
  }

 // Take the title and return it as a "slug".
 // used for creating non spaced IDs for elements
  export const createID = (title) => {
      return title.replace(/\s+/g, '-').toLowerCase();
  }

  
  // Get the url of the Strapi API based on the env variable or the default local one.
  export function getStrapiURL(path) {
    return `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL}${path}`
  }

  export function getStrapiMedia(url) {
    if (url == null) {
      return null
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith("http") || url.startsWith("//")) {
      return url
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${process.env.NEXT_PUBLIC_API_URL  || process.env.NEXT_PUBLIC_API_URL}${url}`
  }

  export async function fetchServicesBannerData() {
    try {
      const response = await axios.get(getStrapiURL(`/${config.global.API_SERVICE_BANNER_QUERY}`))

      if (!response.data) {
        throw new Error('Failed to fetch service banner data')
      }

      const serviceBannerData = response.data

      return { serviceBannerData }
    } catch (error) {
      console.error(error)
      return { serviceBannerData: null }
    }
  }

  export async function fetchSubscribeFormData() {
    try {
      const response = await axios.get(getStrapiURL(`/${config.global.API_SUBSCRIBE_FORM_QUERY}`))

      if (!response.data) {
        throw new Error('Failed to fetch service banner data')
      }

      const subscribeFormData = response.data

      return { subscribeFormData }
    } catch (error) {
      console.error(error)
      return { subscribeFormData: null }
    }
  }

  export async function fetchGlobalData() {
    try {
      const navigationPromise = axios.get(getStrapiURL(`/${config.global.API_NAVIGATION_QUERY}`));
      const footerPromise = axios.get(getStrapiURL(`/${config.global.API_FOOTER_QUERY}`));
      const baseSEOPromise = axios.get(getStrapiURL(`/${config.global.API_BASE_SEO_QUERY}`));
      const analyticsPromise = axios.get(getStrapiURL(`/${config.global.API_ANALYTICS_QUERY}`));

      let navigationResponse, footerResponse, baseSEOResponse, analyticsResponse;
      try {
        [navigationResponse, footerResponse, baseSEOResponse, analyticsResponse] = await Promise.all([navigationPromise, footerPromise, baseSEOPromise, analyticsPromise]);
      } catch (error) {
        console.error('Failed to fetch API data:', error);
      }

      const baseSEOData = baseSEOResponse?.data || null;
      const analyticsData = analyticsResponse?.data || null;
      const navigationData = navigationResponse?.data || null;
      const footerData = footerResponse?.data || null;


      const globalData = {
        baseSEO: baseSEOData,
        analytics: analyticsData,
        navigation: navigationData,
        footer: footerData
      };

      return globalData;
    } catch (error) {
      console.error('fetch Global Data error:', error);
      return null;
    }
  }

  export async function getAllPageSlugs() {
    const url = getStrapiURL(`/${config.global.API_PAGES_QUERY}`);
    try {
      const response = await axios.get(url);
      // Extract and split slugs into segments
      const slugs = response.data.data.map(item => {
        // Split the slug string into an array of segments
        const slugSegments = item.attributes.slug.split('/').filter(Boolean);
        return slugSegments;
      });
      return slugs;
    } catch (error) {
      console.error("Error fetching page slugs:", error);
      return [];
    }
  }
  
  
  export async function getPageData(slug) {
    let slugToReturn = '/'
    if (Array.isArray(slug) && slug.length > 0) {
      slugToReturn = slug.join('/')
      if (slug.length > 1) {
        slugToReturn = slugToReturn.replace(',', '/')
      }
    } else if (typeof slug === 'string' && slug.trim() !== '') {
      slugToReturn = slug
    }
    
    return {
      data: getStrapiURL(`/${config.global.API_PAGES_QUERY}?${config.global.API_CONTENT_QUERY}&filters[slug][$eq]=${slugToReturn}`),
      slug: slugToReturn,
    }
  }