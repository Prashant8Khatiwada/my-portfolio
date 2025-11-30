import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "prashantkhatiwada554@gmail.com",
      link: "mailto:prashantkhatiwada554@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kathmandu, Nepal",
      link: null,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977 9762713987",
      link: "tel:+9779762713987",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Intro */}
          <div>
            <motion.h3
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Let's Work Together
            </motion.h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have a project in mind or just want to chat? I'm always open to
              discussing new opportunities, creative ideas, or partnerships.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const Component = info.link ? motion.a : motion.div;
              return (
                <Component
                  key={index}
                  href={info.link || undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="group relative flex items-center gap-4 p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {info.label}
                    </p>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Component>
              );
            })}
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Glassmorphic background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl blur-xl -z-10" />

            <div className="relative p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-2xl">
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative mb-6"
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-4 text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Your Name
                </label>
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative mb-6"
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-4 text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Email Address
                </label>
              </motion.div>

              {/* Message Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative mb-6"
              >
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                  placeholder=" "
                  maxLength={500}
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-4 text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Your Message
                </label>
                <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">
                  {formData.message.length}/500
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full group overflow-hidden px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-green-500 font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-500 font-medium">
                      Failed to send message. Please try again or email me
                      directly.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
