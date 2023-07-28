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

export async function fetchGlobalData() {
  try {
    const navigationPromise = axios.get(getStrapiURL(`/${config.global.API_NAVIGATION_QUERY}`));
    const footerPromise = axios.get(getStrapiURL(`/${config.global.API_FOOTER_QUERY}`));

    let navigationResponse, footerResponse;
    try {
      [navigationResponse, footerResponse] = await Promise.all([navigationPromise, footerPromise]);
    } catch (error) {
      console.error('Failed to fetch API data:', error);
    }

    const navigationData = navigationResponse?.data || null;
    const footerData = footerResponse?.data || null;

    const globalData = {
      navigation: navigationData,
      footer: footerData
    };

    return globalData;
  } catch (error) {
    console.error('fetch Global Data error:', error);
    return null;
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
  
  const apiUrl = `/api/pages?slug=${slugToReturn}${config.global.API_CONTENT_QUERY}`
  
  return {
    data: getStrapiURL(apiUrl),
    slug: slugToReturn,
  }
}