import React from "react";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import {
  FiBarChart2,
  FiUsers,
  FiShoppingBag,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import DashboardHeaderComponent from "../../components/dashboard/dashboard-header-component";
import DashboardStatsComponent from "../../components/dashboard/dashboard-stats-component";
import ChatDashboardComponent from "../../components/dashboard/chat-dashboard-component";
import RecentDashboardComponent from "../../components/dashboard/recent-dashboard-component";
import UserProfileCardComponent from "../../components/dashboard/user-profile-card-component";
import QuickActionComponent from "../../components/dashboard/quick-action-component";
import HelpActionComponent from "../../components/dashboard/help-action-component";

const Dashboard = () => {

  /**
   * Current User
   */
  const { currentUser } = useSelector(
    (state) => state.getCurrentAuthenticatedUser
  );

  /**
   * Stats
   */
  const stats = [
    {
      title: "Total Sales",
      value: "$12,426",
      change: "+16%",
      icon: <FiBarChart2 className="h-6 w-6" />,
    },
    {
      title: "Active Users",
      value: "2,345",
      change: "+3.2%",
      icon: <FiUsers className="h-6 w-6" />,
    },
    {
      title: "AI Models",
      value: "24",
      change: "+2",
      icon: <FiShoppingBag className="h-6 w-6" />,
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      change: "+0.8%",
      icon: <FiBarChart2 className="h-6 w-6" />,
    },
  ];

  /**
   * Recent Activity
   */
  const recentActivity = [
    {
      user: "John Doe",
      action: "purchased AI Chatbot Pro",
      time: "2 minutes ago",
    },
    {
      user: "Sarah Kim",
      action: "subscribed to monthly plan",
      time: "1 hour ago",
    },
    { user: "Mike Johnson", action: "deployed new model", time: "3 hours ago" },
    {
      user: "Emily Chen",
      action: "left a review (5 stars)",
      time: "5 hours ago",
    },
  ];

  return (
    <AuthAppLayout>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
        {/* Dashboard header with user info */}
        <DashboardHeaderComponent currentUser={currentUser} />

        {/* Dashboard content */}
        <div className="px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Stats cards */}
          <DashboardStatsComponent stats={stats} />

          {/* Main content area */}
          <div className="lg:col-span-3 space-y-6">

            {/* Chart section */}
            <ChatDashboardComponent />

            {/* Recent activity */}
            <RecentDashboardComponent recentActivity={recentActivity}/>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">

            {/* User profile card */}
            <UserProfileCardComponent currentUser={currentUser}/>

            {/* Quick actions */}
            <QuickActionComponent />

            {/* Help section */}
            <HelpActionComponent />
            
          </div>
        </div>
      </div>
    </AuthAppLayout>
  );
};

export default Dashboard;
