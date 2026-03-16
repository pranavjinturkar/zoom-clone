import MeetingTypeList from '@/components/MeetingTypeList';
import HomeHero from '@/components/HomeHero';

const Home = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <HomeHero />

      <MeetingTypeList />

    </section>
  )
}

export default Home
