import { useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/sidebar';
import Timeline from '../components/timeline';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard';
  });

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 mx-auto max-w-screen-lg justify-between">
        <Timeline />
        <SideBar />
      </div>
    </div>
  );
}
