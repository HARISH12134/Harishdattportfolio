import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e7f6fb86/health", (c) => {
  return c.json({ status: "ok" });
});

// Submit contact form
app.post("/make-server-e7f6fb86/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Generate unique ID for this contact submission
    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Store contact submission
    await kv.set(submissionId, {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    });

    console.log(`Contact form submitted: ${submissionId} from ${email}`);

    return c.json({ 
      success: true, 
      message: "Thank you for reaching out! I'll get back to you soon.",
      submissionId 
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return c.json({ error: "Failed to submit contact form", details: String(error) }, 500);
  }
});

// Get all contact submissions (for admin view)
app.get("/make-server-e7f6fb86/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix("contact_");
    
    // Sort by timestamp (newest first)
    const sortedContacts = contacts.sort((a, b) => {
      const timeA = new Date(a.value.timestamp).getTime();
      const timeB = new Date(b.value.timestamp).getTime();
      return timeB - timeA;
    });

    return c.json({ 
      success: true, 
      contacts: sortedContacts,
      count: sortedContacts.length 
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return c.json({ error: "Failed to fetch contacts", details: String(error) }, 500);
  }
});

// Track project views
app.post("/make-server-e7f6fb86/projects/:projectId/view", async (c) => {
  try {
    const projectId = c.req.param("projectId");
    const viewKey = `project_views_${projectId}`;
    
    // Get current view count
    const currentData = await kv.get(viewKey);
    const currentCount = currentData?.count || 0;
    
    // Increment view count
    await kv.set(viewKey, {
      count: currentCount + 1,
      lastViewed: new Date().toISOString(),
      projectId,
    });

    console.log(`Project ${projectId} viewed. Total views: ${currentCount + 1}`);

    return c.json({ 
      success: true, 
      views: currentCount + 1,
      projectId 
    });
  } catch (error) {
    console.error("Error tracking project view:", error);
    return c.json({ error: "Failed to track view", details: String(error) }, 500);
  }
});

// Get project analytics
app.get("/make-server-e7f6fb86/projects/analytics", async (c) => {
  try {
    const projectViews = await kv.getByPrefix("project_views_");
    
    const analytics = projectViews.map(item => ({
      projectId: item.value.projectId,
      views: item.value.count,
      lastViewed: item.value.lastViewed,
    }));

    // Calculate total views
    const totalViews = analytics.reduce((sum, item) => sum + item.views, 0);

    return c.json({ 
      success: true, 
      analytics,
      totalViews,
      projectCount: analytics.length 
    });
  } catch (error) {
    console.error("Error fetching project analytics:", error);
    return c.json({ error: "Failed to fetch analytics", details: String(error) }, 500);
  }
});

// Track page visits
app.post("/make-server-e7f6fb86/visit", async (c) => {
  try {
    const body = await c.req.json();
    const { page, referrer, userAgent } = body;

    const visitKey = `visit_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    await kv.set(visitKey, {
      page: page || '/',
      referrer: referrer || 'direct',
      userAgent: userAgent || 'unknown',
      timestamp: new Date().toISOString(),
    });

    // Update total visitor count
    const statsKey = 'portfolio_stats';
    const stats = await kv.get(statsKey);
    const currentVisits = stats?.totalVisits || 0;
    
    await kv.set(statsKey, {
      totalVisits: currentVisits + 1,
      lastVisit: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      totalVisits: currentVisits + 1 
    });
  } catch (error) {
    console.error("Error tracking visit:", error);
    return c.json({ error: "Failed to track visit", details: String(error) }, 500);
  }
});

// Get portfolio statistics
app.get("/make-server-e7f6fb86/stats", async (c) => {
  try {
    const stats = await kv.get('portfolio_stats');
    const projectViews = await kv.getByPrefix("project_views_");
    const contacts = await kv.getByPrefix("contact_");
    
    const totalProjectViews = projectViews.reduce((sum, item) => sum + (item.value.count || 0), 0);

    return c.json({ 
      success: true, 
      stats: {
        totalVisits: stats?.totalVisits || 0,
        totalProjectViews,
        totalContacts: contacts.length,
        lastVisit: stats?.lastVisit || null,
      }
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return c.json({ error: "Failed to fetch stats", details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);