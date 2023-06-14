import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Administrator'];
  const roles = ['Seasonal Worker', 'Hiring Manager', 'Administrator'];
  const applicationName = 'WorkBuddies';
  const tenantName = 'organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As an Administrator, I want to create an organization so that I can manage my agricultural company's hiring process.

2. As an Administrator, I want to invite Hiring Managers to join my organization so that they can manage the hiring process for seasonal workers.

3. As a Hiring Manager, I want to create job postings for seasonal work positions so that I can attract potential seasonal workers.

4. As a Hiring Manager, I want to view and edit job postings so that I can keep the information up-to-date and accurate.

5. As a Seasonal Worker, I want to create a profile so that I can apply for job postings and showcase my skills and experience.

6. As a Seasonal Worker, I want to search and filter job postings so that I can find suitable work opportunities.

7. As a Seasonal Worker, I want to apply for job postings so that I can express my interest in working for the agricultural company.

8. As a Hiring Manager, I want to view the profiles of Seasonal Workers who have applied for job postings so that I can evaluate their suitability for the position.

9. As a Hiring Manager, I want to accept or reject Seasonal Worker applications so that I can manage the hiring process effectively.

10. As a Seasonal Worker, I want to view the status of my job applications so that I can stay informed about my job prospects.

11. As a Hiring Manager, I want to negotiate work times, payment, transportation, and other important factors with Seasonal Workers so that we can reach a mutual agreement.

12. As a Seasonal Worker, I want to negotiate work times, payment, transportation, and other important factors with Hiring Managers so that I can ensure my needs are met.

13. As an Administrator, I want to view and manage the overall hiring process for my organization so that I can ensure it is running smoothly and efficiently.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
