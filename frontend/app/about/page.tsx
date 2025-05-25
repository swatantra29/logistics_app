import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package2, Shield, TrendingUp, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
        <p className="text-muted-foreground">Learn more about our logistics management system.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Streamlining logistics operations for businesses of all sizes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our logistics database management system was designed with a clear mission: to simplify inventory
              tracking, optimize stock management, and provide real-time insights for businesses. We believe that
              efficient logistics is the backbone of any successful operation, and our platform is built to support that
              vision.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>From concept to comprehensive solution</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Founded in 2020, our company emerged from the challenges faced by businesses during global supply chain
              disruptions. What started as an internal tool for tracking inventory has evolved into a full-featured
              logistics management platform trusted by companies worldwide to manage their critical inventory data.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
          <CardDescription>What makes our logistics DBMS stand out</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Package2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Real-time Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your inventory levels in real-time with automatic updates and alerts.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="rounded-full bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Advanced Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Gain insights with comprehensive reporting and visualization tools.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Multi-user Access</h3>
              <p className="text-sm text-muted-foreground">
                Collaborate with team members with role-based permissions and access controls.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Secure Database</h3>
              <p className="text-sm text-muted-foreground">
                Your data is protected with enterprise-grade security and regular backups.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Technology</CardTitle>
          <CardDescription>Built with modern, reliable technologies</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Our platform is built using cutting-edge technologies to ensure reliability, performance, and scalability:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>React and TypeScript for a responsive, type-safe frontend</li>
            <li>Next.js for optimized server-side rendering and routing</li>
            <li>MySQL database for robust data storage and retrieval</li>
            <li>RESTful API architecture for seamless integration</li>
            <li>Responsive design for access across all devices</li>
            <li>Dark and light mode support for user preference</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Team</CardTitle>
          <CardDescription>Meet the visionaries behind our logistics platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary">ST</span>
              </div>
              <h3 className="text-xl font-bold">Swatantra Tiwari</h3>
              <p className="text-primary font-medium mb-2">Chief Executive Officer</p>
              <p className="text-muted-foreground mb-4">
                A visionary leader with over 15 years of experience in logistics and supply chain management.
                Swatantra's innovative approach has revolutionized how businesses handle inventory tracking and
                management. His passion for efficiency and data-driven decision making is the foundation of our
                platform.
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:swatantratiwari29@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email Swatantra Tiwari"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
                <a
                  href="https://com.example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn profile of Swatantra Tiwari"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary">SS</span>
              </div>
              <h3 className="text-xl font-bold">Sanket Singh</h3>
              <p className="text-primary font-medium mb-2">Chief Financial Officer</p>
              <p className="text-muted-foreground mb-4">
                With a background in financial technology and logistics optimization, Sanket brings a unique perspective
                to our financial strategy. His expertise in cost analysis and resource allocation has helped countless
                businesses maximize their inventory ROI. Sanket's forward-thinking approach ensures our platform remains
                both powerful and cost-effective.
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:sanketsingh832@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email Sanket Singh"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
                <a
                  href="https://com.example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn profile of Sanket Singh"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
