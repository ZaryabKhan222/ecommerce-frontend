import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Zaryab */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-xl font-semibold mb-4">About Me</h4>
          <p className="text-sm text-gray-300">
            I'm Zaryab Anwar, a Computer Science graduate from NUML University,
            passionate about building scalable MERN stack applications and
            exploring Artificial Intelligence.
          </p>
        </motion.div>

        {/* Contact Me */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-xl font-semibold mb-4">Contact Me</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> 0306-5313692
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> zaryabanwar222@gmail.com
            </p>
          </div>
        </motion.div>

        {/* Make Money / Queries */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h4 className="text-xl font-semibold mb-4">Queries</h4>
          <p className="text-sm text-gray-300">
            For general questions, collaboration, or freelance opportunities,
            feel free to reach out via email or LinkedIn.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="text-xl font-semibold mb-4">Follow Me</h4>
          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <a
              href="https://www.linkedin.com/in/zaryab-anwar-758053293"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href="https://www.instagram.com/callmezk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-400 transition"
            >
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <a
              href="mailto:zaryabanwar222@gmail.com"
              className="flex items-center gap-2 hover:text-green-400 transition"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </motion.div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} Zaryab Anwar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
