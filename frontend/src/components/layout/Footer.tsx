import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const team = [
    {
      name: "Kritika Benjwal",
      github: "https://github.com/kritikabenjwal",
      linkedin: "https://linkedin.com/in/kritikabenjwal",
      email: "kritika.benjwal@example.com",
    },
    {
      name: "Rishika Agrawal",
      github: "https://github.com/rishikaagrawal",
      linkedin: "https://linkedin.com/in/rishikaagrawal",
      email: "rishika.agrawal@example.com",
    },
    {
      name: "Varun Narayan Jain",
      github: "https://github.com/varunnarayanjain",
      linkedin: "https://linkedin.com/in/varunnarayanjain",
      email: "varun.jain@example.com",
    },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-black text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500"></div>

      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">EWS</span>
              </div>
              <h3 className="text-xl font-bold">EduAlert</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Empowering educators with data-driven insights to reduce student
              dropout rates.
            </p>
            <p className="text-orange-400 font-semibold">
              Manipal University Jaipur
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#workflow"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Workflow
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-400">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Manipal University Jaipur</li>
              <li>Dehmi Kalan, Jaipur</li>
              <li>Rajasthan, India</li>
              <li className="mt-4">
                <a
                  href="mailto:info@muj.ac.in"
                  className="hover:text-orange-400 transition-colors"
                >
                  info@muj.ac.in
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-400">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="border-t border-gray-800 pt-12 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Made with{" "}
            <span className="text-orange-500">❤</span> by
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <h4 className="text-xl font-bold text-white mb-4 text-center">
                  {member.name}
                </h4>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 bg-gray-700 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EduAlert. All rights
              reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built for Emerging Trends & Technologies Course
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}