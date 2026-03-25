/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function loadEnvFile(fileName) {
    const filePath = path.resolve(process.cwd(), fileName);
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, "utf8");
    for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;

        const eq = line.indexOf("=");
        if (eq <= 0) continue;

        const key = line.slice(0, eq).trim();
        const value = line.slice(eq + 1).trim().replace(/^['\"]|['\"]$/g, "");
        if (!process.env[key]) process.env[key] = value;
    }
}

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === ".png") return "image/png";
    if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
    if (ext === ".webp") return "image/webp";
    return "application/octet-stream";
}

// Source data captured from the final static portfolio implementation before Supabase migration.
const legacyProjects = [
    {
        title: "FotosFolio",
        description:
            "Portfolio platform for photographers and visual artists to showcase high-quality images, manage galleries, and share work with clients.",
        tags: ["React", "Next.js", "Cloud Storage"],
        liveUrl: "https://fotosfolio.com/",
        githubUrl: null,
        imageFile: "src/assets/portfolio/fotosfolio.png",
        featured: true,
    },
    {
        title: "Sawari Expert",
        description:
            "Ride-hailing and transport management platform providing seamless booking, driver tracking, and customer support for urban commuters.",
        tags: ["React", "Node.js", "Google Maps API"],
        liveUrl: "https://sawariexpert.com/",
        githubUrl: null,
        imageFile: "src/assets/portfolio/sawari.png",
        featured: true,
    },
    {
        title: "Kumari Bank",
        description:
            "Official website for Kumari Bank Limited, featuring secure banking services, account management, and financial tools.",
        tags: ["React", "Banking API", "Security"],
        liveUrl: "https://www.kumaribank.com/en/personal-banking",
        githubUrl: null,
        imageFile: "src/assets/portfolio/kumari.png",
        featured: true,
    },
    {
        title: "Abroad Institute",
        description:
            "Educational consultancy platform helping students pursue studies abroad with course finder and application tracking.",
        tags: ["React", "Node.js", "MongoDB"],
        liveUrl: "http://abroadinst.com",
        githubUrl: null,
        imageFile: "src/assets/portfolio/abroadInstitute.png",
        featured: true,
    },
    {
        title: "Pacific Regional Bank",
        description:
            "Digital banking platform for Pacific Regional Bank offering online account opening and transaction services.",
        tags: ["React", "FinTech", "Secure Auth"],
        liveUrl: "https://pacificbank.peacenepal.com",
        githubUrl: null,
        imageFile: "src/assets/portfolio/pacific.png",
        featured: true,
    },
    {
        title: "Wealth Pandit",
        description:
            "Financial advisory and wealth management platform for personalized investment strategies.",
        tags: ["React", "Charts.js", "Finance"],
        liveUrl: "https://uat.wealthpandit.com",
        githubUrl: null,
        imageFile: "src/assets/portfolio/wealthPandit.png",
        featured: true,
    },
    {
        title: "Youtube Clone",
        description:
            "A functional clone of YouTube built with React, featuring video playback, search, and channel pages.",
        tags: ["React", "YouTube API", "Material UI"],
        liveUrl: "https://p-youtube-clone.netlify.app",
        githubUrl: null,
        imageFile: "src/assets/portfolio/youtube_clone.png",
        featured: false,
    },
    {
        title: "E-nimto",
        description: "Digital invitation platform for events and celebrations.",
        tags: ["React", "Firebase", "Social"],
        liveUrl: "https://enimto.com/en",
        githubUrl: null,
        imageFile: "src/assets/portfolio/enimto.png",
        featured: false,
    },
];

const legacyTestimonials = [
    {
        name: "Nirgun Subedi",
        role: "CTO",
        company: "Blueneon Technology",
        content:
            "Prashant delivered reliable and scalable frontend solutions using React, Next.js, and TypeScript during his time at Blueneon Technology. His work on Fotosfolio and our service-management platform reduced load times, improved UI quality, and helped us ship features faster. He works independently, communicates clearly, and consistently meets technical expectations.",
        avatarFile: "src/assets/testimonials/nirgun.png",
        rating: 5,
        active: true,
    },
    {
        name: "Bibek Timilsina",
        role: "Flutter & Backend Developer",
        company: "International/Foreign Company",
        content:
            "I've collaborated with Prashant on multiple frontend-backend integrations, and he consistently delivered clean, maintainable code. His understanding of APIs, frontend performance, and TypeScript helped our cross-platform features work smoothly. Easy to coordinate with, detail-oriented, and dependable on delivery timelines.",
        avatarFile: "src/assets/testimonials/bibek.jpg",
        rating: 5,
        active: true,
    },
    {
        name: "Aayush Shrestha",
        role: "Backend Developer",
        company: "Blueneon Technology",
        content:
            "Prashant was efficient and precise in implementing UI features that aligned smoothly with our backend systems. He understands API logic well, catches edge-cases early, and ensures the frontend remains stable and optimized. His collaboration and communication made integration work straightforward.",
        avatarFile: "src/assets/testimonials/ayush.png",
        rating: 5,
        active: true,
    },
    {
        name: "Mritunjay Sukla",
        role: "QA Engineer",
        company: "-",
        content:
            "I've worked with Prashant on several projects where his frontend delivery ensured a smooth and predictable QA process. His stable React and TypeScript implementations were consistent and easy to test, significantly reducing regression issues and enhancing overall release quality. He communicates clearly, responds promptly to feedback, and collaborates effectively during debugging and validation.",
        avatarFile: "src/assets/testimonials/shukla.png",
        rating: 5,
        active: true,
    },
];

const legacyTimeline = [
    {
        year: "Jan 2025 - Sept 2025",
        title: "Mid-level Developer",
        company: "Blueneontech",
        description:
            "Built Fotosfolio platform with Next.js and TypeScript. Implemented galleries with lazy loading and Cloudinary integration, achieving 45% faster load times. Developed vehicle service booking system with real-time calendar and dashboard.",
        type: "work",
    },
    {
        year: "Jan 2024 - Dec 2024",
        title: "Junior Developer",
        company: "Peace Nepal",
        description:
            "Developed KYC forms for ADBL and Pacific Regional Bank using React, Formik, and Context API. Led CIVI app development with location mapping (Leaflet) and Firebase storage. Implemented secure API integrations with Yup and Zod validation.",
        type: "work",
    },
    {
        year: "Mar 2023 - Nov 2023",
        title: "Junior Developer",
        company: "Lancemeup",
        description:
            "Worked on WealthPandit and multiple client projects. Built advanced calendar component with CSS Grid, date-fns, and Google Calendar sync. Optimized frontend performance with incremental updates.",
        type: "work",
    },
    {
        year: "Dec 2022 - Mar 2023",
        title: "Frontend Intern",
        company: "Lancemeup",
        description:
            "Built responsive WealthPandit website using React Query for optimized data fetching. Contributed to TickTicketing platform with performance fixes and feature enhancements.",
        type: "work",
    },
];

const legacySkills = [
    {
        name: "Core Technologies",
        category: "Frontend",
        proficiency: 95,
        description:
            "React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3",
    },
    {
        name: "Data Flow",
        category: "State Management",
        proficiency: 90,
        description: "Redux, Context API, Zustand, React Query",
    },
    {
        name: "UI Frameworks",
        category: "Styling",
        proficiency: 90,
        description:
            "Tailwind CSS, SCSS, ShadCN, Mantine UI, Material UI, Styled Components",
    },
    {
        name: "Full Stack",
        category: "Backend & DB",
        proficiency: 82,
        description:
            "Node.js, PostgreSQL, MongoDB, MySQL, Prisma, NestJS, Firebase",
    },
    {
        name: "DevOps",
        category: "Cloud & Tools",
        proficiency: 80,
        description:
            "Git, GitHub, Docker, CI/CD, Postman, Swagger, AWS, Vercel, Netlify",
    },
];

const legacyServices = [
    {
        icon: "Code",
        title: "Web Development",
        description:
            "Building fast, scalable, and secure web applications using modern technologies like React, Next.js, and Node.js.",
    },
    {
        icon: "Palette",
        title: "UI/UX Design",
        description:
            "Creating intuitive and visually appealing user interfaces that provide seamless user experiences across all devices.",
    },
    {
        icon: "Smartphone",
        title: "Mobile First",
        description:
            "Ensuring your website looks and functions perfectly on smartphones and tablets with responsive design principles.",
    },
    {
        icon: "Zap",
        title: "Performance Optimization",
        description:
            "Optimizing applications for maximum speed and efficiency to improve user retention and SEO rankings.",
    },
    {
        icon: "Globe",
        title: "SEO Services",
        description:
            "Implementing best practices to improve your website's visibility and ranking on search engines.",
    },
    {
        icon: "Search",
        title: "Technical Consultation",
        description:
            "Providing expert advice on technology stack selection, architecture design, and development best practices.",
    },
];

async function uploadImageIfExists(supabase, localFile, targetPrefix) {
    if (!localFile) return null;

    const absPath = path.resolve(process.cwd(), localFile);
    if (!fs.existsSync(absPath)) return null;

    const fileBuffer = fs.readFileSync(absPath);
    const fileName = path.basename(localFile);
    const remotePath = `${targetPrefix}/${Date.now()}-${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(remotePath, fileBuffer, {
            contentType: getContentType(localFile),
            upsert: true,
        });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("portfolio").getPublicUrl(remotePath);
    return data.publicUrl;
}

async function deleteAll(supabase, table) {
    const { error } = await supabase.from(table).delete().not("id", "is", null);
    if (error) throw error;
}

async function seed() {
    loadEnvFile(".env.local");
    loadEnvFile(".env");

    const url = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
    const serviceRoleKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
        throw new Error(
            "Missing Supabase env vars. Set SUPABASE_URL/REACT_APP_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
        );
    }

    const supabase = createClient(url, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    });

    console.log("Seeding CMS data to Supabase...");

    await Promise.all([
        deleteAll(supabase, "projects"),
        deleteAll(supabase, "testimonials"),
        deleteAll(supabase, "timeline"),
        deleteAll(supabase, "skills"),
        deleteAll(supabase, "services"),
    ]);

    const projectsPayload = [];
    for (let i = 0; i < legacyProjects.length; i += 1) {
        const project = legacyProjects[i];
        const imageUrl = await uploadImageIfExists(supabase, project.imageFile, "projects");

        projectsPayload.push({
            title: project.title,
            description: project.description,
            tags: project.tags,
            live_url: project.liveUrl,
            github_url: project.githubUrl,
            image_url: imageUrl,
            featured: Boolean(project.featured),
            display_order: i,
        });
    }

    const { error: projectsError } = await supabase
        .from("projects")
        .insert(projectsPayload);
    if (projectsError) throw projectsError;
    console.log(`Seeded projects: ${projectsPayload.length}`);

    const testimonialsPayload = [];
    for (let i = 0; i < legacyTestimonials.length; i += 1) {
        const testimonial = legacyTestimonials[i];
        const avatarUrl = await uploadImageIfExists(
            supabase,
            testimonial.avatarFile,
            "testimonials"
        );

        testimonialsPayload.push({
            name: testimonial.name,
            role: testimonial.role,
            company: testimonial.company,
            avatar_url: avatarUrl,
            content: testimonial.content,
            rating: testimonial.rating || 5,
            display_order: i,
            active: testimonial.active !== false,
        });
    }

    const { error: testimonialsError } = await supabase
        .from("testimonials")
        .insert(testimonialsPayload);
    if (testimonialsError) throw testimonialsError;
    console.log(`Seeded testimonials: ${testimonialsPayload.length}`);

    const timelinePayload = legacyTimeline.map((item, index) => ({
        year: item.year,
        title: item.title,
        company: item.company,
        description: item.description,
        type: item.type || "work",
        display_order: index,
    }));

    const { error: timelineError } = await supabase
        .from("timeline")
        .insert(timelinePayload);
    if (timelineError) throw timelineError;
    console.log(`Seeded timeline entries: ${timelinePayload.length}`);

    const skillsPayload = legacySkills.map((skill, index) => ({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency || 80,
        description: skill.description,
        display_order: index,
    }));

    const { error: skillsError } = await supabase.from("skills").insert(skillsPayload);
    if (skillsError) throw skillsError;
    console.log(`Seeded skills: ${skillsPayload.length}`);

    const servicesPayload = legacyServices.map((service, index) => ({
        title: service.title,
        description: service.description,
        icon: service.icon,
        display_order: index,
    }));

    const { error: servicesError } = await supabase
        .from("services")
        .insert(servicesPayload);
    if (servicesError) throw servicesError;
    console.log(`Seeded services: ${servicesPayload.length}`);

    console.log("Seed complete.");
    console.log("One-time script: you can delete scripts/seed.js after confirming data.");
}

seed().catch((error) => {
    console.error("Seed failed:", error.message || error);
    process.exit(1);
});
