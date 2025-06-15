import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import './Team.css';

const Team = () => {
  const leadershipTeam = [
    {
      name: 'Akmal',
      role: 'Principal Designer and Founder',
      image: '/images/team/akmal.jpg',
      bio: 'The most Enthusiastic and Mr. Perfectionist, leading our team with vision and precision.',
      social: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      name: 'Zohaib Jutt',
      role: 'Senior Interior Designer',
      image: '/images/team/zohaib.jpg',
      bio: 'The Calmest man Alive, bringing balance and expertise to every project.',
      social: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      name: 'Tasawwur Hussain',
      role: 'Creative Director',
      image: '/images/team/tasawwur.jpg',
      bio: 'The Most Creative Person, pushing boundaries in design innovation.',
      social: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    }
  ];

  const specialists = [
    {
      name: 'Ali I',
      role: 'Project Manager',
      image: '/images/team/ali1.jpg',
      bio: 'Ensuring seamless project execution and client satisfaction.',
      social: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      name: 'Ch Husnain Akbar',
      role: 'Junior Designer',
      image: '/images/team/husnain.jpg',
      bio: 'Bringing fresh perspectives and innovative ideas to our designs.',
      social: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      name: 'Ali II',
      role: 'Technical Designer',
      image: '/images/team/ali2.jpg',
      bio: 'Mastering the technical aspects of interior design.',
      social: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      name: 'Mian Amjad',
      role: 'Textile & Materials Specialist',
      image: '/images/team/amjad.jpg',
      bio: 'Expert in selecting the perfect materials and textiles for each project.',
      social: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <TeamSection>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Our Team</h2>
          <p>Meet the talented individuals behind AKMAL.</p>
        </motion.div>

        <TeamGrid>
          <div className="leadership-team">
            <h3>Leadership Team</h3>
            <div className="team-members">
              {leadershipTeam.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="team-member"
                >
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <p className="role">{member.role}</p>
                    <p className="bio">{member.bio}</p>
                    <div className="social-links">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                          <i className={`fab fa-${platform}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="specialists">
            <h3>Our Specialists</h3>
            <div className="team-members">
              {specialists.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="team-member"
                >
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <p className="role">{member.role}</p>
                    <p className="bio">{member.bio}</p>
                    <div className="social-links">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                          <i className={`fab fa-${platform}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TeamGrid>
      </div>
    </TeamSection>
  );
};

const TeamSection = styled.section`
  padding: 6rem 0;
  background-color: #f9f9f9;
`;

const TeamGrid = styled.div`
  margin-top: 3rem;
  
  .leadership-team, .specialists {
    margin-bottom: 4rem;
  }
  
  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .team-members {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .team-member {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
  }
  
  .member-image img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  .member-info {
    padding: 1.5rem;
    
    h4 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .role {
      color: #666;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    
    .bio {
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      
      a {
        color: #333;
        font-size: 1.25rem;
        
        &:hover {
          color: var(--primary);
        }
      }
    }
  }
`;

export default Team; 