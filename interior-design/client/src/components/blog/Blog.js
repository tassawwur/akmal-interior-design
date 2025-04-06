import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textReveal } from '../../utils/animations';
import Button from '../common/Button';

// Import data from blog data file
import { blogPosts, categories } from './blogData';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Filter posts based on selected category and search term
    const filtered = blogPosts.filter(post => {
      // Filter by category
      const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
      
      // Filter by search term
      const searchMatch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      return categoryMatch && (searchTerm === '' || searchMatch);
    });
    
    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <BlogWrapper
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Hero Section */}
      <HeroSection variants={fadeIn}>
        <div className="overlay"></div>
        <div className="content">
          <motion.h1 variants={textReveal}>Interior Design Blog</motion.h1>
          <motion.p variants={textReveal}>
            Explore our collection of articles on interior design trends, tips, and inspiration
          </motion.p>
        </div>
      </HeroSection>
      
      {/* Featured Posts */}
      <FeaturedSection variants={fadeIn}>
        <div className="container">
          <SectionTitle>Featured Articles</SectionTitle>
          
          <FeaturedGrid>
            {blogPosts
              .filter(post => post.featured)
              .map(post => (
                <FeaturedPost key={post.id} variants={fadeIn}>
                  <div className="image">
                    <img src={post.image} alt={post.title} />
                    <div className="overlay">
                      <Link to={`/blog/${post.id}`} className="read-btn">
                        Read Article
                      </Link>
                    </div>
                    <span className="category">{post.category}</span>
                  </div>
                  <div className="content">
                    <h2>
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p>{post.excerpt}</p>
                    <div className="meta">
                      <span className="date">
                        <i className="fas fa-calendar-alt"></i> {post.date}
                      </span>
                      <span className="author">
                        <i className="fas fa-user"></i> {post.author}
                      </span>
                    </div>
                  </div>
                </FeaturedPost>
              ))}
          </FeaturedGrid>
        </div>
      </FeaturedSection>
      
      {/* Blog Content */}
      <BlogContent>
        <div className="container">
          <MainContent>
            {/* Blog Header */}
            <BlogHeader variants={fadeIn}>
              <div className="search-bar">
                <i className="fas fa-search"></i>
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <CategoryTabs>
                {categories.map((category, index) => (
                  <CategoryButton 
                    key={index}
                    active={selectedCategory === category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </CategoryButton>
                ))}
              </CategoryTabs>
            </BlogHeader>
            
            {/* Blog Posts Grid */}
            {filteredPosts.length > 0 ? (
              <PostsGrid variants={staggerContainer}>
                {filteredPosts.map(post => (
                  <BlogCard key={post.id} variants={fadeIn}>
                    <div className="image">
                      <Link to={`/blog/${post.id}`}>
                        <img src={post.image} alt={post.title} />
                      </Link>
                      <span className="category">{post.category}</span>
                    </div>
                    <div className="content">
                      <h3>
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p>{post.excerpt}</p>
                      <div className="meta">
                        <span className="date">
                          <i className="fas fa-calendar-alt"></i> {post.date}
                        </span>
                        <span className="author">
                          <i className="fas fa-user"></i> {post.author}
                        </span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="read-more">
                        Read More <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </BlogCard>
                ))}
              </PostsGrid>
            ) : (
              <NoResults variants={fadeIn}>
                <div className="icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>No Articles Found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
                <Button onClick={() => {
                  setSelectedCategory('All');
                  setSearchTerm('');
                }}>
                  View All Articles
                </Button>
              </NoResults>
            )}
          </MainContent>
          
          <Sidebar variants={fadeIn}>
            {/* Popular Categories */}
            <SidebarSection>
              <h3>Popular Categories</h3>
              <CategoryLinks>
                {categories.map((category, index) => (
                  category !== 'All' && (
                    <li key={index}>
                      <button 
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </button>
                    </li>
                  )
                ))}
              </CategoryLinks>
            </SidebarSection>
            
            {/* Recent Posts */}
            <SidebarSection>
              <h3>Recent Posts</h3>
              <RecentPostsList>
                {blogPosts.slice(0, 4).map(post => (
                  <RecentPost key={post.id}>
                    <div className="image">
                      <Link to={`/blog/${post.id}`}>
                        <img src={post.image} alt={post.title} />
                      </Link>
                    </div>
                    <div className="content">
                      <h4>
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h4>
                      <span className="date">{post.date}</span>
                    </div>
                  </RecentPost>
                ))}
              </RecentPostsList>
            </SidebarSection>
            
            {/* Newsletter */}
            <SidebarSection className="newsletter">
              <h3>Subscribe to Our Newsletter</h3>
              <p>Get the latest design tips and trends delivered to your inbox</p>
              <SubscribeForm>
                <input type="email" placeholder="Your email address" required />
                <button type="submit">
                  Subscribe <i className="fas fa-paper-plane"></i>
                </button>
              </SubscribeForm>
            </SidebarSection>
            
            {/* CTA */}
            <SidebarCTA>
              <h3>Need Expert Advice?</h3>
              <p>Let our interior design specialists help you create the perfect space.</p>
              <Button as={Link} to="/contact">
                Book a Consultation
              </Button>
            </SidebarCTA>
          </Sidebar>
        </div>
      </BlogContent>
    </BlogWrapper>
  );
};

const BlogWrapper = styled(motion.div)`
  max-width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled(motion.div)`
  position: relative;
  height: 50vh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
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
    max-width: 800px;
    padding: 0 20px;
    
    h1 {
      font-size: 3.5rem;
      color: white;
      margin-bottom: 20px;
      font-weight: 700;
    }
    
    p {
      font-size: 1.2rem;
      color: white;
      opacity: 0.9;
    }
  }
  
  @media (max-width: 768px) {
    .content {
      h1 {
        font-size: 2.5rem;
      }
      
      p {
        font-size: 1rem;
      }
    }
  }
`;

const FeaturedSection = styled(motion.section)`
  padding: 80px 20px;
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--color-text-dark);
  margin-bottom: 50px;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--color-gold);
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedPost = styled(motion.article)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-5px);
    
    .image {
      img {
        transform: scale(1.05);
      }
      
      .overlay {
        opacity: 1;
      }
    }
    
    h2 a {
      color: var(--color-gold);
    }
  }
  
  .image {
    position: relative;
    height: 250px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      
      .read-btn {
        background: var(--color-gold);
        color: white;
        padding: 10px 20px;
        border-radius: 30px;
        text-decoration: none;
        font-weight: 600;
        transform: translateY(20px);
        transition: transform 0.3s ease;
      }
      
      &:hover .read-btn {
        transform: translateY(0);
      }
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
      z-index: 3;
    }
  }
  
  .content {
    padding: 25px;
    
    h2 {
      font-size: 1.5rem;
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
      
      @media (max-width: 576px) {
        flex-direction: column;
        gap: 5px;
      }
    }
  }
`;

const BlogContent = styled.section`
  padding: 50px 20px 80px;
  background-color: var(--color-bg-light);
  
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

const MainContent = styled.div``;

const BlogHeader = styled(motion.div)`
  margin-bottom: 40px;
  
  .search-bar {
    position: relative;
    margin-bottom: 30px;
    
    i {
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
      color: var(--color-text);
    }
    
    input {
      width: 100%;
      padding: 15px 15px 15px 45px;
      border: 1px solid #e1e1e1;
      border-radius: 5px;
      font-size: 1rem;
      font-family: inherit;
      
      &:focus {
        outline: none;
        border-color: var(--color-gold);
      }
    }
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? 'var(--color-gold)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--color-text)'};
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: ${props => props.active ? 'var(--color-gold)' : '#f0f0f0'};
  }
`;

const PostsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
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
      
      @media (max-width: 576px) {
        flex-direction: column;
        gap: 5px;
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

const NoResults = styled(motion.div)`
  text-align: center;
  padding: 50px 20px;
  background: white;
  border-radius: 10px;
  
  .icon {
    font-size: 3rem;
    color: var(--color-gold);
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 1.5rem;
    color: var(--color-text-dark);
    margin-bottom: 15px;
  }
  
  p {
    color: var(--color-text);
    margin-bottom: 25px;
  }
`;

const Sidebar = styled(motion.aside)``;

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
  
  &.newsletter {
    background: var(--color-bg-light);
    text-align: center;
    
    h3:after {
      left: 50%;
      transform: translateX(-50%);
    }
    
    p {
      margin-bottom: 20px;
    }
  }
`;

const CategoryLinks = styled.ul`
  list-style: none;
  
  li {
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    button {
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

const RecentPostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RecentPost = styled.article`
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

const SubscribeForm = styled.form`
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
`;

const SidebarCTA = styled.div`
  background: var(--color-text-dark);
  padding: 30px;
  border-radius: 10px;
  color: white;
  text-align: center;
  
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

export default Blog; 