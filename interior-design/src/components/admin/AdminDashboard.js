import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import API functions
import { getContacts } from '../../services/api';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await getContacts();
        
        if (response.success) {
          setContacts(response.data);
          setError(null);
        } else {
          setError('Failed to fetch contacts');
        }
      } catch (err) {
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <DashboardContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <DashboardHeader>
        <DashboardTitle>Admin Dashboard</DashboardTitle>
        <DashboardSubtitle>Welcome to Akmal Interior Design Admin Panel</DashboardSubtitle>
      </DashboardHeader>

      <StatsContainer>
        <StatCard>
          <StatValue>{contacts.length}</StatValue>
          <StatLabel>Total Contacts</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{contacts.filter(c => !c.contacted).length}</StatValue>
          <StatLabel>New Inquiries</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{contacts.filter(c => c.contacted).length}</StatValue>
          <StatLabel>Contacted</StatLabel>
        </StatCard>
      </StatsContainer>

      <ContactsSection>
        <SectionTitle>Recent Contact Requests</SectionTitle>
        
        {loading ? (
          <LoadingMessage>Loading contact requests...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : contacts.length === 0 ? (
          <EmptyMessage>No contact requests found.</EmptyMessage>
        ) : (
          <ContactsTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {contacts.slice(0, 5).map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td>
                    <ContactStatus $status={contact.contacted ? 'contacted' : 'new'}>
                      {contact.contacted ? 'Contacted' : 'New'}
                    </ContactStatus>
                  </td>
                </tr>
              ))}
            </tbody>
          </ContactsTable>
        )}
        
        {!loading && !error && contacts.length > 5 && (
          <ViewAllButton>View All Contacts</ViewAllButton>
        )}
      </ContactsSection>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled(motion.div)`
  padding: 24px;
  
  @media (min-width: 768px) {
    padding: 32px;
  }
`;

const DashboardHeader = styled.div`
  margin-bottom: 32px;
`;

const DashboardTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
  
  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const DashboardSubtitle = styled.p`
  font-size: 14px;
  color: var(--text-tertiary);
  margin: 0;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
  
  @media (min-width: 768px) {
    gap: 24px;
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--primary);
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
`;

const ContactsSection = styled.section`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--text-primary);
`;

const ContactsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    font-weight: 600;
    color: var(--text-secondary);
    font-size: 14px;
  }
  
  td {
    font-size: 14px;
    color: var(--text-primary);
  }
  
  tbody tr:hover {
    background-color: #f9f9f9;
  }
`;

const ContactStatus = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.$status === 'contacted' ? '#e8f5e9' : '#fff8e1'};
  color: ${props => props.$status === 'contacted' ? '#388e3c' : '#f57c00'};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 32px;
  color: var(--text-tertiary);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 32px;
  color: #e53935;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 32px;
  color: var(--text-tertiary);
`;

const ViewAllButton = styled.button`
  display: block;
  margin: 24px auto 0;
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid var(--primary);
  border-radius: 4px;
  color: var(--primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary);
    color: white;
  }
`;

export default AdminDashboard; 