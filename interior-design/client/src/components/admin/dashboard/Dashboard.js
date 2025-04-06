import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEye, FaFileAlt, FaUserFriends, FaComments, FaChartLine, FaImages, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

// Import API services
import { getDashboardStats, getRecentActivity } from '../../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisits: 0,
    totalBlogs: 0,
    totalProjects: 0,
    totalInquiries: 0,
    visitsByMonth: [],
    inquiriesBySource: {},
    latestActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would fetch actual data from the API
        const statsResponse = await getDashboardStats();
        const activityResponse = await getRecentActivity();
        
        if (statsResponse.success && activityResponse.success) {
          setStats({
            ...statsResponse.data,
            latestActivity: activityResponse.data
          });
        } else {
          throw new Error('Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Dashboard data error:', error);
        setError('Failed to load dashboard data. Please try again later.');
        
        // Fallback to dummy data for demo purposes
        setStats({
          totalVisits: 8432,
          totalBlogs: 24,
          totalProjects: 38,
          totalInquiries: 149,
          visitsByMonth: [
            { month: 'Jan', visits: 450 },
            { month: 'Feb', visits: 520 },
            { month: 'Mar', visits: 600 },
            { month: 'Apr', visits: 580 },
            { month: 'May', visits: 670 },
            { month: 'Jun', visits: 750 },
            { month: 'Jul', visits: 820 },
            { month: 'Aug', visits: 900 },
            { month: 'Sep', visits: 950 },
            { month: 'Oct', visits: 1050 },
            { month: 'Nov', visits: 1150 },
            { month: 'Dec', visits: 992 }
          ],
          inquiriesBySource: {
            'Contact Form': 65,
            'Social Media': 20,
            'Email': 12,
            'Phone': 3
          },
          latestActivity: [
            { id: 1, type: 'blog', message: 'New blog post published', status: 'published', date: '2023-11-15T09:30:00Z', user: 'Admin' },
            { id: 2, type: 'contact', message: 'New contact form submission', status: 'new', date: '2023-11-14T14:15:00Z', user: 'System' },
            { id: 3, type: 'project', message: 'Project "Luxury Villa Interior" updated', status: 'updated', date: '2023-11-14T11:45:00Z', user: 'Admin' },
            { id: 4, type: 'testimonial', message: 'New testimonial approved', status: 'approved', date: '2023-11-13T16:20:00Z', user: 'Admin' },
            { id: 5, type: 'service', message: 'Service "Custom Furniture Design" added', status: 'added', date: '2023-11-12T10:10:00Z', user: 'Admin' }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Format data for charts
  const visitsChartData = {
    labels: stats.visitsByMonth.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Visits',
        data: stats.visitsByMonth.map(item => item.visits),
        borderColor: '#1A1A1A',
        backgroundColor: 'rgba(26, 26, 26, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };
  
  const inquiriesChartData = {
    labels: Object.keys(stats.inquiriesBySource),
    datasets: [
      {
        data: Object.values(stats.inquiriesBySource),
        backgroundColor: [
          '#1A1A1A',
          '#DCA867',
          '#555555',
          '#888888'
        ],
        borderWidth: 0
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };
  
  const doughnutOptions = {
    ...chartOptions,
    cutout: '70%'
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get icon for activity based on type
  const getActivityIcon = (activity) => {
    switch (activity.type) {
      case 'blog':
        return <FaFileAlt />;
      case 'contact':
        return <FaUserFriends />;
      case 'project':
        return <FaImages />;
      case 'testimonial':
        return <FaComments />;
      case 'service':
        return <FaChartLine />;
      default:
        return <FaEye />;
    }
  };
  
  // Get status icon and color based on status
  const getStatusIndicator = (status) => {
    switch (status) {
      case 'published':
      case 'approved':
      case 'completed':
        return <StatusIndicator color="#2ecc71"><FaCheckCircle /></StatusIndicator>;
      case 'new':
      case 'added':
        return <StatusIndicator color="#3498db"><FaCheckCircle /></StatusIndicator>;
      case 'pending':
        return <StatusIndicator color="#f39c12"><FaExclamationCircle /></StatusIndicator>;
      case 'rejected':
      case 'failed':
        return <StatusIndicator color="#e74c3c"><FaExclamationCircle /></StatusIndicator>;
      default:
        return <StatusIndicator color="#95a5a6"><FaCheckCircle /></StatusIndicator>;
    }
  };
  
  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Loading dashboard data...</LoadingText>
      </LoadingContainer>
    );
  }
  
  return (
    <DashboardContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <DashboardHeader>
        <PageTitle>Dashboard</PageTitle>
        <PageDescription>Overview of your website's performance and recent activity</PageDescription>
      </DashboardHeader>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      <StatsGrid>
        <StatCard 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <StatIcon>
            <FaEye />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalVisits.toLocaleString()}</StatValue>
            <StatLabel>Total Visits</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StatIcon>
            <FaFileAlt />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalBlogs}</StatValue>
            <StatLabel>Blog Posts</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <StatIcon>
            <FaImages />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalProjects}</StatValue>
            <StatLabel>Projects</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <StatIcon>
            <FaUserFriends />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalInquiries}</StatValue>
            <StatLabel>Inquiries</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>
      
      <WidgetGrid>
        <VisitsChartWidget>
          <WidgetHeader>
            <WidgetTitle>Website Traffic</WidgetTitle>
            <WidgetSubtitle>Monthly visits over the last year</WidgetSubtitle>
          </WidgetHeader>
          <ChartContainer>
            <Line data={visitsChartData} options={chartOptions} />
          </ChartContainer>
        </VisitsChartWidget>
        
        <InquiriesChartWidget>
          <WidgetHeader>
            <WidgetTitle>Inquiry Sources</WidgetTitle>
            <WidgetSubtitle>How clients are reaching you</WidgetSubtitle>
          </WidgetHeader>
          <DoughnutContainer>
            <Doughnut data={inquiriesChartData} options={doughnutOptions} />
          </DoughnutContainer>
        </InquiriesChartWidget>
      </WidgetGrid>
      
      <RecentActivityWidget>
        <WidgetHeader>
          <WidgetTitle>Recent Activity</WidgetTitle>
          <ViewAllLink to="/admin/activity">View All</ViewAllLink>
        </WidgetHeader>
        
        <ActivityList>
          {stats.latestActivity.map((activity) => (
            <ActivityItem key={activity.id}>
              <ActivityIconWrapper>
                {getActivityIcon(activity)}
              </ActivityIconWrapper>
              <ActivityContent>
                <ActivityMessage>{activity.message}</ActivityMessage>
                <ActivityMeta>
                  <ActivityUser>{activity.user}</ActivityUser>
                  <ActivityTime>{formatDate(activity.date)}</ActivityTime>
                </ActivityMeta>
              </ActivityContent>
              {getStatusIndicator(activity.status)}
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivityWidget>
      
      <ActionButtonsContainer>
        <ActionButton to="/admin/blogs/create">Create Blog Post</ActionButton>
        <ActionButton to="/admin/projects/create">Add New Project</ActionButton>
        <ActionButton to="/admin/contacts">View Inquiries</ActionButton>
      </ActionButtonsContainer>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled(motion.div)`
  padding: 20px;
  
  @media (min-width: 768px) {
    padding: 30px;
  }
`;

const DashboardHeader = styled.div`
  margin-bottom: 30px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  margin: 0 0 10px;
  color: var(--text-primary);
`;

const PageDescription = styled.p`
  font-size: 16px;
  color: var(--text-tertiary);
  margin: 0;
`;

const ErrorMessage = styled.div`
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: rgba(220, 168, 103, 0.1);
  color: var(--secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 15px;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: var(--text-tertiary);
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;
  
  @media (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const VisitsChartWidget = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
`;

const InquiriesChartWidget = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
`;

const WidgetHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WidgetTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  color: var(--text-primary);
`;

const WidgetSubtitle = styled.p`
  font-size: 13px;
  color: var(--text-tertiary);
  margin: 5px 0 0;
`;

const ChartContainer = styled.div`
  height: 300px;
`;

const DoughnutContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecentActivityWidget = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;
`;

const ViewAllLink = styled(Link)`
  font-size: 14px;
  color: var(--secondary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 6px;
  background-color: #f9f9f9;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ActivityIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(26, 26, 26, 0.1);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-right: 15px;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityMessage = styled.div`
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 5px;
`;

const ActivityMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 12px;
  color: var(--text-tertiary);
`;

const ActivityUser = styled.span`
  font-weight: 500;
`;

const ActivityTime = styled.span``;

const StatusIndicator = styled.div`
  color: ${props => props.color};
  font-size: 18px;
  margin-left: 10px;
`;

const ActionButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ActionButton = styled(Link)`
  display: block;
  background-color: var(--primary);
  color: white;
  padding: 14px 20px;
  text-align: center;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #000;
    transform: translateY(-2px);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--secondary);
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: var(--text-secondary);
`;

export default Dashboard; 