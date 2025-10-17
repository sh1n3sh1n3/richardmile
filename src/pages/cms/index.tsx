import { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import CMSLayout from 'src/layouts/cms/CMSLayout';
import IndexPageManager from 'src/components/cms/IndexPageManager';
import FriendsPageManager from 'src/components/cms/FriendsPageManager';
import CollectionsPageManager from 'src/components/cms/CollectionsPageManager';
import FriendsHeroManager from 'src/components/cms/FriendsHeroManager';
import IntroductionManager from 'src/components/cms/IntroductionManager';
import ProductionItemsManager from 'src/components/cms/ProductionItemsManager';
import { FriendsHeroProvider } from 'src/contexts/FriendsHeroContext';
import LogoManager from 'src/components/cms/LogoManager';
import { PageHead } from 'src/components/head';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cms-tabpanel-${index}`}
      aria-labelledby={`cms-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

CMSPage.getLayout = (page: React.ReactElement) => <CMSLayout>{page}</CMSLayout>;

export default function CMSPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <FriendsHeroProvider>
      <PageHead title="CMS" />

      <Typography variant="h4" gutterBottom>
        Content Management System
      </Typography>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'rgba(255, 255, 255, 0.12)',
          mb: 3,
          '& .MuiTabs-root': {
            minHeight: 64,
          },
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'white',
              height: 2,
              borderRadius: '2px 2px 0 0',
              transition: 'all 0.3s ease-in-out',
            },
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              minHeight: 64,
              transition: 'all 0.2s ease-in-out',
              borderRadius: '8px 8px 0 0',
              mx: 0.5,
              '&.Mui-selected': {
                color: 'white',
                fontWeight: 500,
              },
              '&:hover': {
                color: 'white',
                opacity: 0.8,
              },
            },
          }}
        >
          <Tab label="Index Page" />
          <Tab label="Friends & Partners" />
          <Tab label="Friends Hero" />
          <Tab label="Collections" />
          <Tab label="Introduction" />
          <Tab label="Production Items" />
          <Tab label="Logo" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <IndexPageManager />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <FriendsPageManager />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <FriendsHeroManager />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <CollectionsPageManager />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <IntroductionManager />
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <ProductionItemsManager />
      </TabPanel>

      <TabPanel value={tabValue} index={6}>
        <LogoManager />
      </TabPanel>
    </FriendsHeroProvider>
  );
}
