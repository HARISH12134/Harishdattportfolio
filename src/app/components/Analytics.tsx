import { motion } from 'motion/react';
import { Eye, Users, Mail, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface PortfolioStats {
  totalVisits: number;
  totalProjectViews: number;
  totalContacts: number;
  lastVisit: string | null;
}

interface ProjectAnalytics {
  projectId: string;
  views: number;
  lastViewed: string;
}

export function Analytics() {
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [projectAnalytics, setProjectAnalytics] = useState<ProjectAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch overall stats
      const statsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e7f6fb86/stats`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      const statsData = await statsResponse.json();
      
      // Fetch project analytics
      const analyticsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e7f6fb86/projects/analytics`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      const analyticsData = await analyticsResponse.json();

      if (statsData.success) {
        setStats(statsData.stats);
      }

      if (analyticsData.success) {
        setProjectAnalytics(analyticsData.analytics);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-white to-cyan-300 bg-clip-text text-transparent">
            Portfolio Analytics
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-cyan-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Total Visits</h3>
            <p className="text-4xl font-bold text-white">{stats?.totalVisits || 0}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-purple-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Project Views</h3>
            <p className="text-4xl font-bold text-white">{stats?.totalProjectViews || 0}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Mail className="w-8 h-8 text-blue-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Contact Messages</h3>
            <p className="text-4xl font-bold text-white">{stats?.totalContacts || 0}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Last Visit</h3>
            <p className="text-lg font-medium text-white">
              {stats?.lastVisit 
                ? new Date(stats.lastVisit).toLocaleDateString()
                : 'N/A'}
            </p>
          </motion.div>
        </div>

        {/* Project Analytics */}
        {projectAnalytics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Project Performance</h3>
            <div className="space-y-4">
              {projectAnalytics.map((project, index) => (
                <motion.div
                  key={project.projectId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div>
                    <h4 className="text-white font-medium capitalize">
                      {project.projectId.replace(/_/g, ' ')}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Last viewed: {new Date(project.lastViewed).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-cyan-400" />
                    <span className="text-2xl font-bold text-white">{project.views}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Refresh Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <button
            onClick={fetchAnalytics}
            className="glass-button px-8 py-3 font-semibold"
          >
            Refresh Analytics
          </button>
        </motion.div>
      </div>
    </section>
  );
}
