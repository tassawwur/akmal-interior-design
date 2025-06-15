/**
 * Image optimization utility for Akmal Interior Design
 * This utility helps optimize images for better performance
 */

/**
 * Get responsive image URL with appropriate size based on viewport
 * @param {string} baseUrl - Base URL of the image
 * @param {object} options - Options for image optimization
 * @param {number} options.width - Desired width of the image
 * @param {number} options.quality - Quality of the image (1-100)
 * @param {string} options.format - Format of the image (webp, jpeg, png)
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (baseUrl, options = {}) => {
  // Default options
  const defaults = {
    width: 800,
    quality: 80,
    format: 'webp'
  };
  
  // Merge defaults with provided options
  const settings = { ...defaults, ...options };
  
  // Handle local images (from public folder)
  if (baseUrl.startsWith('/')) {
    return baseUrl; // No optimization for local images yet
  }
  
  // Handle external images (using imgix, cloudinary or similar service)
  if (baseUrl.includes('unsplash.com')) {
    // For Unsplash images
    const urlObj = new URL(baseUrl);
    urlObj.searchParams.set('w', settings.width);
    urlObj.searchParams.set('q', settings.quality);
    urlObj.searchParams.set('fm', settings.format);
    urlObj.searchParams.set('auto', 'compress');
    return urlObj.toString();
  }
  
  if (baseUrl.includes('cloudinary.com')) {
    // For Cloudinary images
    return baseUrl.replace(
      '/upload/',
      `/upload/c_scale,w_${settings.width},q_${settings.quality}/${settings.format}/`
    );
  }
  
  // For other image sources, pass through
  return baseUrl;
};

/**
 * Generates a responsive srcSet for modern browsers
 * @param {string} baseUrl - Base URL of the image
 * @param {object} options - Options for srcSet generation
 * @param {number[]} options.widths - Array of widths for srcSet
 * @param {number} options.quality - Quality of the images
 * @param {string} options.format - Format of the images
 * @returns {string} - srcSet attribute value
 */
export const generateSrcSet = (baseUrl, options = {}) => {
  // Default options
  const defaults = {
    widths: [320, 480, 640, 768, 1024, 1366, 1600],
    quality: 80,
    format: 'webp'
  };
  
  // Merge defaults with provided options
  const settings = { ...defaults, ...options };
  
  // Generate srcSet string
  return settings.widths
    .map(width => {
      const url = getOptimizedImageUrl(baseUrl, {
        width,
        quality: settings.quality,
        format: settings.format
      });
      return `${url} ${width}w`;
    })
    .join(', ');
};

/**
 * Create an Image component with lazy loading, responsive sizing, and blur-up
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {string} props.className - CSS class name
 * @returns {Object} - React component props
 */
export const getImageProps = ({ src, alt = '', width, height, className = '' }) => {
  return {
    src,
    alt,
    width,
    height,
    loading: 'lazy', // Native lazy loading
    decoding: 'async', // Async decode to avoid blocking the main thread
    srcSet: generateSrcSet(src),
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    className,
    style: {
      maxWidth: '100%',
      height: 'auto',
      display: 'block'
    }
  };
};

/**
 * Create a background image with blurred placeholder
 * @param {string} url - Image URL
 * @param {number} quality - Image quality
 * @returns {Object} - CSS properties
 */
export const getBackgroundImageProps = (url, quality = 80) => {
  const optimizedUrl = getOptimizedImageUrl(url, { quality });
  
  return {
    backgroundImage: `url(${optimizedUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };
}; 