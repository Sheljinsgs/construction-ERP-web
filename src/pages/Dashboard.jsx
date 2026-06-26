import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import KPICard from '../components/KPICard';
import AlertCard from '../components/AlertCard';
import AttendanceTrendChart from '../components/AttendanceTrendChart';
import ExpenseTrendChart from '../components/ExpenseTrendChart';
import LabourCostChart from '../components/LabourCostChart';
import ProjectStatusTable from '../components/ProjectStatusTable';
import PendingApprovals from '../components/PendingApprovals';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';
import InventoryAlerts from '../components/InventoryAlerts';
import MaterialTrendChart from '../components/MaterialTrendChart';
import PayrollSummary from '../components/PayrollSummary';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('erp_user') || '{"name":"Jennifer Cole","role":"Company Administrator","avatar":"JC","company":"Classy Group"}');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [dateFilter, setDateFilter] = useState('Today');

  return (
    <div className="erp-layout">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} user={user} navigate={navigate} />

      <div className="erp-main">
        <TopBar user={user} />

        <div className="erp-content">
          {/* Page header */}
          <div className="page-header">
            <div>
              <div className="page-breadcrumb">
                <span className="breadcrumb-home">🏠</span>
                <span className="breadcrumb-sep">›</span>
                <span>Company Dashboard</span>
              </div>
              <h1 className="page-title">Operations Overview</h1>
              <p className="page-subtitle">
                Live visibility across projects, workforce, financials and operations — HQ Dashboard
              </p>
            </div>
            <div className="date-filter-group">
              {['Today','Week','Month','All'].map(d => (
                <button
                  key={d}
                  className={`date-filter-btn${dateFilter === d ? ' active' : ''}`}
                  onClick={() => setDateFilter(d)}
                >
                  {d}
                </button>
              ))}
              <button className="export-btn">⬇ Export</button>
            </div>
          </div>

          {/* KPI Row */}
          <div className="kpi-row">
            <KPICard icon="📁" label="ACTIVE PROJECTS" value="12" sub="4 In final phase" color="blue" change="+2" />
            <KPICard icon="📍" label="ACTIVE SITES" value="8" sub="Single Review" color="teal" change="+1" />
            <KPICard icon="👷" label="WORKFORCE TODAY" value="322" sub="342 / 360 Signed In" color="orange" change="-18" highlight />
            <KPICard icon="⏳" label="PENDING APPROVALS" value="49" sub="Across Depts" color="red" change="+5" />
          </div>

          {/* Alert Row */}
          <div className="alert-row">
            <AlertCard
              icon="💰" label="MONTHLY EXPENSES"
              value="$284K" sub="-$30.5K vs last month"
              tag="-8.6%" tagColor="green"
            />
            <AlertCard
              icon="⚠️" label="FUNCTION ALERTS"
              value="7" sub="4 critical, 3 moderate"
              tag="Critical" tagColor="orange"
            />
            <AlertCard
              icon="🧾" label="VENDOR PAYMENTS DUE"
              value="$48.5K" sub="Due within 7 days"
              tag="4Info" tagColor="blue"
            />
            <AlertCard
              icon="✅" label="PAYROLL STATUS"
              value="Processed" sub="Oct 2025 estimates"
              tag="Done" tagColor="green"
            />
          </div>

          {/* Charts Row 1 */}
          <div className="charts-row">
            <div className="chart-card chart-card--md">
              <div className="chart-header">
                <div>
                  <div className="chart-title">Attendance Trend</div>
                  <div className="chart-sub">21 Day Average</div>
                </div>
                <div className="chart-badge orange">91.6%</div>
              </div>
              <AttendanceTrendChart />
            </div>

            <div className="chart-card chart-card--md">
              <div className="chart-header">
                <div>
                  <div className="chart-title">Monthly Expense Trend</div>
                  <div className="chart-sub">From: Oct 2025</div>
                </div>
                <div className="chart-badge blue">$290K</div>
              </div>
              <ExpenseTrendChart />
            </div>

            <div className="chart-card chart-card--sm">
              <div className="chart-header">
                <div className="chart-title">Labour Cost by Category</div>
              </div>
              <LabourCostChart />
            </div>
          </div>

          {/* Content Row */}
          <div className="content-row">
            {/* Left column */}
            <div className="content-left">
              <ProjectStatusTable />
              <QuickActions />
              <div className="bottom-charts-row">
                <div className="chart-card" style={{flex:1}}>
                  <div className="chart-header">
                    <div>
                      <div className="chart-title">Material Consumption Trend</div>
                      <div className="chart-sub">Top 5 materials – rolling bi-weekly</div>
                    </div>
                    <button className="view-link">View Report ↗</button>
                  </div>
                  <MaterialTrendChart />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="content-right">
              <PendingApprovals />
              <RecentActivity />
              <InventoryAlerts />
              <PayrollSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
