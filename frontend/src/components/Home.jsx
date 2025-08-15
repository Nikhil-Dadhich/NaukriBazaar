import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  useGetAllJobs();
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
  if (user?.role === 'recruiter') {
    navigate('/admin/companies'); 
  }
  }, [navigate, user?.role]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home;
