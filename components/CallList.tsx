// @ts-nocheck
'use client'
import { useGetCalls } from '@/hooks/useGetCall';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'recordings':
        return 'No Recordings';
      case 'upcoming':
        return 'No Upcoming Calls';
      default:
        return '';
    }
  };

  // Corrected useEffect to ensure recordings are fetched
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()));
        const newRecordings = callData
          .filter(call => call.recordings.length > 0)
          .flatMap(call => call.recordings);
        setRecordings(newRecordings);
      } catch (error) {
        toast({ title: 'Try again later' });
      }
    };

    if (type === 'recordings') fetchRecordings();
  }, [type, callRecordings, toast]);

  const calls = getCalls();
  const NoCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => {
        const id = (meeting as Call).id || (meeting as CallRecording).filename;
        const description = (meeting as Call).state?.custom.description || (meeting as CallRecording).filename || 'Personal Meeting';
        const startDate = (meeting as Call).state?.startsAt || (meeting as CallRecording).start_time;
        const formattedDate = new Date(startDate).toLocaleString();

        return (
          <MeetingCard
            key={id}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                  ? '/icons/upcoming.svg'
                  : 'icons/recordings.svg'
            }
            title={description.substring(0, 26)}
            date={formattedDate}
            isPreviousMeeting={type === 'ended'}
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            handleClick={type === 'recordings' ? () => router.push(`${(meeting as CallRecording).url}`) : () => router.push(`/meeting/${(meeting as Call).id}`)}
            link={type === 'recordings' ? (meeting as CallRecording).url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
          />
        );
      }) : (
        <h1>{NoCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
