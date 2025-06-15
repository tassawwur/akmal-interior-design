import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Clients = () => {
  const clients = [
    {
      name: 'HBL',
      logo: '/images/clients/hbl.png',
      category: 'Banking',
      testimonial: 'AKMAL. transformed our corporate office space with exceptional attention to detail and professionalism.',
      author: 'HBL Management'
    },
    {
      name: 'UBL',
      logo: '/images/clients/ubl.png',
      category: 'Banking',
      testimonial: 'Their expertise in creating functional and elegant banking spaces is unmatched.',
      author: 'UBL Management'
    },
    {
      name: 'Avari Hotel',
      logo: '/images/clients/avari.png',
      category: 'Hospitality',
      testimonial: 'AKMAL. brought luxury and comfort together in our hotel renovations.',
      author: 'Avari Hotel Management'
    },
    {
      name: 'PC Hotel',
      logo: '/images/clients/pc.png',
      category: 'Hospitality',
      testimonial: 'Their attention to detail and commitment to excellence is truly remarkable.',
      author: 'PC Hotel Management'
    },
    {
      name: 'Mayo Hospital',
      logo: '/images/clients/mayo.png',
      category: 'Healthcare',
      testimonial: 'They created a healing environment that benefits both patients and staff.',
      author: 'Mayo Hospital Administration'
    },
    {
      name: 'EON Holdings',
      logo: '/images/clients/eon.png',
      category: 'Real Estate',
      testimonial: 'AKMAL. has been instrumental in setting new standards for luxury real estate interiors.',
      author: 'EON Holdings Management'
    }
  ];

  return (
    <ClientsSection>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Our Clients</h2>
          <p>Trusted by leading organizations across Pakistan</p>
        </motion.div>

        <ClientsGrid>
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="client-card"
            >
              <div className="client-logo">
                <img src={client.logo} alt={client.name} />
              </div>
              <div className="client-info">
                <h3>{client.name}</h3>
                <p className="category">{client.category}</p>
                <p className="testimonial">{client.testimonial}</p>
                <p className="author">- {client.author}</p>
              </div>
            </motion.div>
          ))}
        </ClientsGrid>
      </div>
    </ClientsSection>
  );
};

const ClientsSection = styled.section`
  padding: 6rem 0;
  background-color: var(--background-light);
`;

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

export default Clients; 