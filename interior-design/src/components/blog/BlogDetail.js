import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import Button from '../common/Button';

// Import blog posts data
import { blogPosts, categories } from './blogData';

// Reading Progress Bar Component
const ReadingProgressBar = () => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const scrollHandler = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const scrollWidth = (scrollPosition / totalScroll) * 100;
      setWidth(scrollWidth);
    };
    
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);
  
  return <ProgressBar style={{ width: `${width}%` }} />;
};

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate fetching data from an API
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        // Find the post by ID
        const postId = parseInt(id);
        const foundPost = blogPosts.find(post => post.id === postId);
        
        if (foundPost) {
          setPost(foundPost);
          
          // Find related posts in the same category
          const related = blogPosts
            .filter(p => p.category === foundPost.category && p.id !== postId)
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  // Handle loading state
  if (loading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
        <p>Loading article...</p>
      </LoadingWrapper>
    );
  }
  
  // Handle error state
  if (error || !post) {
    return (
      <NotFoundWrapper
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="content">
          <div className="icon">
            <i className="fas fa-newspaper"></i>
          </div>
          <h1>Article Not Found</h1>
          <p>The blog post you're looking for doesn't exist or has been removed.</p>
          <Button as={Link} to="/blog" variant="primary">
            Back to Blog
          </Button>
        </div>
      </NotFoundWrapper>
    );
  }

  return (
    <BlogDetailWrapper
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 20 }}
    >
      <ReadingProgressBar />
      
      {/* Hero Section */}
      <HeroSection variants={fadeIn}>
        <div className="overlay"></div>
        <div className="content">
          <span className="category">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="meta">
            <div className="author">
              <i className="fas fa-user"></i> {post.author}
            </div>
            <div className="date">
              <i className="fas fa-calendar-alt"></i> {post.date}
            </div>
            <div className="read-time">
              <i className="fas fa-clock"></i> 5 min read
            </div>
          </div>
        </div>
      </HeroSection>

      <MainContent>
        <div className="container">
          <PostContent variants={fadeIn}>
            {/* Blog Featured Image */}
            <div className="featured-image">
              <img src={post.image} alt={post.title} />
            </div>
            
            {/* Article Text */}
            <div className="article-text">
              <p className="lead">
                Interior design is more than just creating visually appealing spaces—it's about enhancing the quality of life through thoughtfully designed environments that meet both functional and aesthetic needs.
              </p>
              
              <h2>The Essence of Good Design</h2>
              <p>
                Good design balances form and function, creating spaces that are not only beautiful but also practical and comfortable. It considers the unique needs and preferences of the people who will inhabit the space, ensuring that every element serves a purpose while contributing to the overall aesthetic.
              </p>
              <p>
                When approaching a new project, professional designers begin by understanding the client's lifestyle, needs, and aspirations. This discovery phase is crucial for creating spaces that truly reflect the personality and enhance the daily experience of those who live or work in them.
              </p>
              
              <BlockQuote>
                "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs
              </BlockQuote>
              
              <h2>Key Elements to Consider</h2>
              <p>
                Several fundamental elements come together to create a cohesive and impactful interior design:
              </p>
              
              <ul>
                <li>
                  <strong>Space Planning:</strong> The thoughtful arrangement of furniture and functional zones to optimize flow and usability.
                </li>
                <li>
                  <strong>Color Psychology:</strong> The strategic use of colors to influence mood and perception within a space.
                </li>
                <li>
                  <strong>Lighting Design:</strong> The layering of different light sources to create atmosphere and support various activities.
                </li>
                <li>
                  <strong>Material Selection:</strong> The careful choice of materials that contribute to both aesthetics and longevity.
                </li>
                <li>
                  <strong>Texture and Pattern:</strong> The incorporation of varied textures and patterns to add visual interest and depth.
                </li>
              </ul>
              
              <h2>Practical Applications</h2>
              <p>
                Understanding these principles allows homeowners to make more informed decisions about their spaces, whether working with a professional designer or tackling projects on their own. Small changes like adjusting furniture layout, introducing new lighting, or refreshing color schemes can have a significant impact on how a space feels and functions.
              </p>
              
              <p>
                For those considering a more comprehensive design project, working with a professional can help navigate the myriad choices and technical considerations involved, ensuring a cohesive and well-executed result that maximizes both enjoyment and value.
              </p>
              
              <ImageBlock>
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Interior design project" />
                <p className="caption">A thoughtfully designed living space balancing aesthetics and functionality.</p>
              </ImageBlock>
              
              <h2>Conclusion</h2>
              <p>
                Interior design is both an art and a science, requiring creativity, technical knowledge, and a deep understanding of human behavior and preferences. Whether you're refreshing a single room or renovating an entire home, approaching the process with intention and awareness of these fundamental principles will lead to more successful and satisfying results.
              </p>
              <p>
                Remember that good design is not about following trends but creating timeless spaces that improve quality of life and reflect the unique character of those who inhabit them.
              </p>
            </div>
            
            {/* Tags */}
            <Tags>
              <span className="label">Tags:</span>
              <div className="tag-list">
                <Link to="/blog?tag=design">Design</Link>
                <Link to="/blog?tag=interiors">Interiors</Link>
                <Link to="/blog?tag=tips">Tips</Link>
                <Link to={`/blog?category=${post.category.toLowerCase()}`}>{post.category}</Link>
              </div>
            </Tags>
            
            {/* Share */}
            <ShareSection>
              <span className="label">Share this article:</span>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Share on Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Share on Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" title="Share on Pinterest">
                  <i className="fab fa-pinterest-p"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="Share on LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="mailto:?subject=Check out this article&body=I thought you might find this interesting" title="Share via Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </ShareSection>
            
            {/* Author Bio */}
            <AuthorBio>
              <div className="avatar">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80" alt={post.author} />
              </div>
              <div className="bio-content">
                <h3>About {post.author}</h3>
                <p>Sarah is a certified interior designer with over 10 years of experience in residential and commercial design. She specializes in creating functional, beautiful spaces that reflect the personality and lifestyle of her clients. When not designing, Sarah enjoys traveling and photography.</p>
                <div className="social-links">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </AuthorBio>
            
            {/* Navigation */}
            <PostNavigation>
              <div className="prev">
                {post.id > 1 && (
                  <Link to={`/blog/${post.id - 1}`}>
                    <i className="fas fa-arrow-left"></i>
                    <span>Previous Article</span>
                  </Link>
                )}
              </div>
              <div className="all">
                <Link to="/blog">
                  <i className="fas fa-th-large"></i>
                  <span>All Articles</span>
                </Link>
              </div>
              <div className="next">
                {post.id < blogPosts.length && (
                  <Link to={`/blog/${post.id + 1}`}>
                    <span>Next Article</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                )}
              </div>
            </PostNavigation>
          </PostContent>
          
          <Sidebar variants={fadeIn}>
            <SidebarSection>
              <h3>Related Articles</h3>
              <RelatedPostsList>
                {relatedPosts.length > 0 ? (
                  relatedPosts.map(relatedPost => (
                    <RelatedPostItem key={relatedPost.id}>
                      <div className="image">
                        <img src={relatedPost.image} alt={relatedPost.title} />
                      </div>
                      <div className="content">
                        <h4>
                          <Link to={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                        </h4>
                        <span className="date">{relatedPost.date}</span>
                      </div>
                    </RelatedPostItem>
                  ))
                ) : (
                  <p className="no-related">No related articles found.</p>
                )}
              </RelatedPostsList>
            </SidebarSection>
            
            <SidebarSection>
              <h3>Categories</h3>
              <CategoryList>
                {categories.filter(c => c !== 'All').map((category, index) => (
                  <li key={index}>
                    <Link to={`/blog?category=${category}`}>
                      {category}
                    </Link>
                  </li>
                ))}
              </CategoryList>
            </SidebarSection>
            
            <SidebarCTA>
              <h3>Need Expert Advice?</h3>
              <p>Let our interior design specialists help you create the perfect space.</p>
              <Button as={Link} to="/contact">
                Book a Consultation
              </Button>
            </SidebarCTA>
            
            <NewsletterBox>
              <h3>Subscribe to Our Newsletter</h3>
              <p>Get the latest design tips and trends delivered to your inbox</p>
              <form>
                <input type="email" placeholder="Your email address" required />
                <button type="submit">
                  Subscribe <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </NewsletterBox>
          </Sidebar>
        </div>
      </MainContent>
      
      {/* Related Posts Section */}
      <RelatedPostsSection variants={fadeIn}>
        <div className="container">
          <h2>You May Also Like</h2>
          <RelatedGrid>
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map(relatedPost => (
                <BlogCard key={relatedPost.id} variants={fadeIn}>
                  <div className="image">
                    <img src={relatedPost.image} alt={relatedPost.title} />
                    <span className="category">{relatedPost.category}</span>
                  </div>
                  <div className="content">
                    <h3>
                      <Link to={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                    </h3>
                    <p>{relatedPost.excerpt}</p>
                    <div className="meta">
                      <span className="date">
                        <i className="fas fa-calendar-alt"></i> {relatedPost.date}
                      </span>
                    </div>
                    <Link to={`/blog/${relatedPost.id}`} className="read-more">
                      Read More <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </BlogCard>
              ))}
          </RelatedGrid>
          <ViewAllButton as={Link} to="/blog">
            View All Articles
          </ViewAllButton>
        </div>
      </RelatedPostsSection>
    </BlogDetailWrapper>
  );
};

const BlogDetailWrapper = styled(motion.div)`
  max-width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled(motion.div)`
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: ${props => props.background || 'url("https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80")'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
  }
  
  .content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 0 20px;
    max-width: 900px;
    
    .category {
      display: inline-block;
      background-color: var(--color-gold);
      color: white;
      padding: 6px 15px;
      border-radius: 30px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 20px;
    }
    
    h1 {
      font-size: 3.5rem;
      color: white;
      margin-bottom: 20px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    
    .meta {
      display: flex;
      justify-content: center;
      gap: 30px;
      color: white;
      font-size: 1rem;
      
      .author, .date, .read-time {
        display: flex;
        align-items: center;
        
        i {
          margin-right: 8px;
          color: var(--color-gold);
        }
      }
      
      @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
      }
    }
  }
  
  @media (max-width: 768px) {
    height: 50vh;
    
    .content {
      h1 {
        font-size: 2.2rem;
      }
    }
  }
`;

const MainContent = styled.section`
  padding: 80px 20px;
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 50px;
    
    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }
`;

const PostContent = styled(motion.article)`
  .featured-image {
    margin-bottom: 40px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    
    img {
      width: 100%;
      height: auto;
    }
  }
  
  .article-text {
    color: var(--color-text);
    line-height: 1.8;
    font-size: 1.1rem;
    
    p {
      margin-bottom: 25px;
    }
    
    p.lead {
      font-size: 1.3rem;
      color: var(--color-text-dark);
      font-weight: 500;
      line-height: 1.6;
    }
    
    h2 {
      font-size: 2rem;
      margin: 40px 0 20px;
      color: var(--color-text-dark);
    }
    
    ul {
      margin-bottom: 25px;
      padding-left: 20px;
      
      li {
        margin-bottom: 10px;
      }
    }
  }
`;

const BlockQuote = styled.blockquote`
  padding: 30px;
  margin: 30px 0;
  border-left: 5px solid var(--color-gold);
  background-color: var(--color-bg-light);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--color-text-dark);
`;

const ImageBlock = styled.div`
  margin: 30px 0;
  
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: var(--shadow-sm);
  }
  
  .caption {
    margin-top: 10px;
    font-size: 0.9rem;
    color: var(--color-text);
    text-align: center;
    font-style: italic;
  }
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0;
  padding-top: 20px;
  border-top: 1px solid #eee;
  
  .label {
    font-weight: 600;
    margin-right: 15px;
    color: var(--color-text-dark);
  }
  
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    a {
      background: #f5f5f5;
      padding: 5px 15px;
      border-radius: 30px;
      font-size: 0.9rem;
      color: var(--color-text);
      text-decoration: none;
      transition: var(--transition);
      
      &:hover {
        background: var(--color-gold);
        color: white;
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    
    .label {
      margin-bottom: 10px;
    }
  }
`;

const ShareSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  
  .label {
    font-weight: 600;
    margin-right: 15px;
    color: var(--color-text-dark);
  }
  
  .social-icons {
    display: flex;
    gap: 15px;
    
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f5f5f5;
      color: var(--color-text-dark);
      text-decoration: none;
      transition: var(--transition);
      
      &:hover {
        background: var(--color-gold);
        color: white;
        transform: translateY(-3px);
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    
    .label {
      margin-bottom: 10px;
    }
  }
`;

const AuthorBio = styled.div`
  display: flex;
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 40px;
  
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .bio-content {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      color: var(--color-text-dark);
    }
    
    p {
      color: var(--color-text);
      margin-bottom: 15px;
      line-height: 1.6;
    }
    
    .social-links {
      display: flex;
      gap: 15px;
      
      a {
        color: var(--color-text-dark);
        font-size: 1.2rem;
        transition: var(--transition);
        
        &:hover {
          color: var(--color-gold);
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    .bio-content {
      .social-links {
        justify-content: center;
      }
    }
  }
`;

const PostNavigation = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  margin-bottom: 60px;
  
  .prev, .next, .all {
    a {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--color-text-dark);
      font-weight: 600;
      transition: var(--transition);
      
      &:hover {
        color: var(--color-gold);
      }
    }
  }
  
  .next {
    text-align: right;
    
    a {
      justify-content: flex-end;
    }
  }
  
  .all {
    a {
      justify-content: center;
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
    
    .prev, .next, .all {
      a {
        justify-content: center;
      }
    }
  }
`;

const Sidebar = styled(motion.aside)`
`;

const SidebarSection = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 30px;
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: var(--color-text-dark);
    position: relative;
    padding-bottom: 10px;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background-color: var(--color-gold);
    }
  }
`;

const RelatedPostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  .no-related {
    color: var(--color-text);
    font-style: italic;
  }
`;

const RelatedPostItem = styled.article`
  display: flex;
  gap: 15px;
  
  .image {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  
  .content {
    h4 {
      font-size: 1rem;
      margin-bottom: 5px;
      line-height: 1.4;
      
      a {
        color: var(--color-text-dark);
        text-decoration: none;
        transition: var(--transition);
        
        &:hover {
          color: var(--color-gold);
        }
      }
    }
    
    .date {
      font-size: 0.8rem;
      color: var(--color-text);
    }
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  
  li {
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    a {
      display: block;
      padding: 12px 0;
      color: var(--color-text);
      text-decoration: none;
      transition: var(--transition);
      
      &:hover {
        color: var(--color-gold);
        padding-left: 5px;
      }
    }
  }
`;

const SidebarCTA = styled.div`
  background: var(--color-text-dark);
  padding: 30px;
  border-radius: 10px;
  color: white;
  text-align: center;
  margin-bottom: 30px;
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: white;
  }
  
  p {
    margin-bottom: 25px;
    opacity: 0.8;
  }
`;

const NewsletterBox = styled.div`
  background: var(--color-bg-light);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--color-text-dark);
  }
  
  p {
    margin-bottom: 20px;
    color: var(--color-text);
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    input {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #e1e1e1;
      border-radius: 5px;
      font-size: 1rem;
      font-family: inherit;
      
      &:focus {
        outline: none;
        border-color: var(--color-gold);
      }
    }
    
    button {
      background: var(--color-gold);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 5px;
      font-family: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      
      &:hover {
        background: var(--color-text-dark);
      }
    }
  }
`;

const RelatedPostsSection = styled(motion.section)`
  background: var(--color-bg-light);
  padding: 80px 20px;
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
    
    h2 {
      font-size: 2.5rem;
      margin-bottom: 50px;
      color: var(--color-text-dark);
    }
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(motion.article)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-5px);
    
    h3 a {
      color: var(--color-gold);
    }
    
    .read-more {
      color: var(--color-gold);
      
      i {
        transform: translateX(5px);
      }
    }
  }
  
  .image {
    position: relative;
    height: 220px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .category {
      position: absolute;
      bottom: 15px;
      left: 15px;
      background-color: var(--color-gold);
      color: white;
      padding: 5px 15px;
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }
  
  .content {
    padding: 25px;
    
    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      
      a {
        color: var(--color-text-dark);
        text-decoration: none;
        transition: var(--transition);
      }
    }
    
    p {
      color: var(--color-text);
      margin-bottom: 20px;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      color: var(--color-text);
      font-size: 0.8rem;
      
      .author, .date {
        display: flex;
        align-items: center;
        
        i {
          margin-right: 5px;
          color: var(--color-gold);
        }
      }
    }
    
    .read-more {
      color: var(--color-text-dark);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      display: inline-flex;
      align-items: center;
      transition: var(--transition);
      
      i {
        margin-left: 5px;
        transition: transform 0.3s ease;
      }
    }
  }
`;

const ViewAllButton = styled(Button)`
  margin: 0 auto;
`;

const NotFoundWrapper = styled(motion.div)`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .content {
    text-align: center;
    max-width: 600px;
    padding: 0 20px;
    
    .icon {
      font-size: 4rem;
      color: var(--color-gold);
      margin-bottom: 20px;
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: var(--color-text-dark);
    }
    
    p {
      color: var(--color-text);
      margin-bottom: 30px;
    }
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  gap: 20px;
  
  p {
    font-size: 1.2rem;
    color: var(--text-secondary);
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(var(--secondary-rgb), 0.3);
  border-radius: 50%;
  border-top-color: var(--secondary);
  animation: spin 1s ease infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: var(--secondary);
  z-index: 100;
  transition: width 0.1s ease-out;
`;

export default BlogDetail; 