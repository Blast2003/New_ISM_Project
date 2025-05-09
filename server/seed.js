// seed.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";
// import { Course } from "./models/course.model.js";
// import { Lecture } from "./models/lecture.model.js";
// import { CourseProgress } from "./models/courseProgress.js";
// import { CoursePurchase } from "./models/coursePurchase.model.js";

async function seed() {
  await mongoose.connect(
    "mongodb+srv://root:root@books-store-mern.xxruv7w.mongodb.net/IT_KMS?retryWrites=true&w=majority&appName=Books-Store-MERN"
  );

  //–– Users ––//
  const rawUsers = [
    {
      _id: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c0"),
      name: "John Smith",
      email: "john.smith@example.com",
      password: "changeme123",
      role: "student",
      enrolledCourses: [],
      photoUrl:
        "https://res.cloudinary.com/dqgdjmyrs/image/upload/v1738749944/o0kuma8cvklsombutc8q.jpg",
      createdAt: new Date("2024-08-01T09:15:00Z"),
      updatedAt: new Date("2024-08-01T09:15:00Z"),
    },
    {
      _id: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c1"),
      name: "Dr. Michael Chen",
      email: "michael-chen@example.com",
      password: "changeme123",
      role: "instructor",
      enrolledCourses: [],
      photoUrl:
        "https://res.cloudinary.com/dqgdjmyrs/image/upload/v1724142786/atrvyo6k4spa8q3fxx7v.jpg",
      createdAt: new Date("2024-08-01T09:15:00Z"),
      updatedAt: new Date("2024-08-01T09:15:00Z"),
    },
    {
      _id: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c2"),
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      password: "changeme123",
      role: "instructor",
      enrolledCourses: [],
      photoUrl:
        "https://res.cloudinary.com/dqgdjmyrs/image/upload/v1724124769/dizlohblxkluqtrdbhyu.jpg",
      createdAt: new Date("2024-11-15T14:30:00Z"),
      updatedAt: new Date("2024-11-15T14:30:00Z"),
    },
  ];

  // hash passwords before inserting
  const users = await Promise.all(
    rawUsers.map(async (u) => {
      const hash = await bcrypt.hash(u.password, 10);
      return { ...u, password: hash };
    })
  );

  await User.deleteMany({});
  await User.insertMany(users);

  // //–– Courses ––//
  // const courseDocs = [
  //   {
  //     _id: new mongoose.Types.ObjectId("64a2f1e2d3c4b5a6f7e8d9d0"),
  //     courseTitle: "Advanced Network Security",
  //     subTitle: "Master essential concepts of network security protocols",
  //     description:
  //       "This comprehensive course covers advanced network security concepts and implementation strategies. You’ll learn how to configure enterprise‑grade firewalls, deploy VPNs, perform audits, and handle incident response.",
  //     category: "Network & Security",
  //     courseLevel: "Advance",
  //     coursePrice: 29,
  //     courseThumbnail:
  //       "https://dnsnetworks.com/_next/image?url=https%3A%2F%2Fblog.dnsnetworks.com%2Fwp-content%2Fuploads%2F2023%2F09%2Fbenefits-of-network-security-services-ottawa-managed-IT-services.png&w=3840&q=75",
  //     enrolledStudents: [ new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c0")],
  //     lectures: [],    // will fill after lecture creation
  //     creator: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c2"),
  //     isPublished: true,
  //     createdAt: new Date("2025-01-15T10:00:00Z"),
  //     updatedAt: new Date("2025-03-20T14:30:00Z"),
  //   },
  //   {
  //     _id: new mongoose.Types.ObjectId("64a2f1e2d3c4b5a6f7e8d9d1"),
  //     courseTitle: "Cloud Architecture Fundamentals",
  //     subTitle: "Design scalable, secure, cost‑effective cloud solutions",
  //     description:
  //       "Learn cloud computing models, IaC, high availability, security/compliance, and cost optimization with hands‑on labs.",
  //     category: "Servers & Other IT",
  //     courseLevel: "Medium",
  //     coursePrice: 29,
  //     courseThumbnail:
  //       "https://miro.medium.com/v2/resize:fit:933/1*BmnhE-Z5m-lu1_r9H9JS9A.png",
  //     enrolledStudents: [new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c0")],
  //     lectures: [],
  //     creator: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c1"),
  //     isPublished: true,
  //     createdAt: new Date("2025-01-15T10:00:00Z"),
  //     updatedAt: new Date("2025-03-20T14:30:00Z"),
  //   },
  //   {
  //     _id: new mongoose.Types.ObjectId("64a2f1e2d3c4b5a6f7e8d9d2"),
  //     courseTitle: "Cybersecurity Best Practices",
  //     subTitle: "Defend against real‑world attacks",
  //     description:
  //       "Identify and mitigate phishing, malware, ransomware; secure endpoints; implement strong auth; conduct audits; apply encryption best practices.",
  //     category: "Network & Security",
  //     courseLevel: "Medium",
  //     coursePrice: 29,
  //     courseThumbnail:
  //       "https://firewall.firm.in/wp-content/uploads/2020/08/Cybersecurity-Best-Practices-for-Small-Businesses.jpg",
  //     enrolledStudents: [new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c0")],
  //     lectures: [],
  //     creator: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c2"),
  //     isPublished: true,
  //     createdAt: new Date("2025-01-15T10:00:00Z"),
  //     updatedAt: new Date("2025-03-20T14:30:00Z"),
  //   },
  //   {
  //     _id: new mongoose.Types.ObjectId("64a2f1e2d3c4b5a6f7e8d9d3"),
  //     courseTitle: "Data Center Management",
  //     subTitle: "Operate physical & virtual data centers",
  //     description:
  //       "Design infrastructure, implement cooling/power, manage servers/storage/networking, and use monitoring/disaster‑recovery tools.",
  //     category: "Servers & Other IT",
  //     courseLevel: "Medium",
  //     coursePrice: 29,
  //     courseThumbnail:
  //       "https://www.corporatevision-news.com/wp-content/uploads/2022/02/Data-Centre.jpg",
  //     enrolledStudents: [new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c0")],
  //     lectures: [],
  //     creator: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c1"),
  //     isPublished: true,
  //     createdAt: new Date("2025-01-15T10:00:00Z"),
  //     updatedAt: new Date("2025-03-20T14:30:00Z"),
  //   },
  //   {
  //     _id: new mongoose.Types.ObjectId("64a2f1e2d3c4b5a6f7e8d9d4"),
  //     courseTitle: "Complete Guide to Modern Development",
  //     subTitle: "Front‑end & back‑end workflows",
  //     description:
  //       "Covers HTML/CSS/JS, frameworks, CI/CD, deployment strategies, and modern toolchains with projects.",
  //     category: "Servers & Other IT",
  //     courseLevel: "Beginner",
  //     coursePrice: 49,
  //     courseThumbnail:
  //       "https://img-c.udemycdn.com/course/480x270/6314561_a452_3.jpg",
  //     enrolledStudents: [new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c0")],
  //     lectures: [],
  //     creator: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c1"),
  //     isPublished: true,
  //     createdAt: new Date("2025-04-22T12:00:00Z"),
  //     updatedAt: new Date("2025-04-22T12:00:00Z"),
  //   },
  //   {
  //     _id: new mongoose.Types.ObjectId("64a2f1e2d3c4b5a6f7e8d9d5"),
  //     courseTitle: "Code Examples Repository",
  //     subTitle: "Practical code solutions",
  //     description:
  //       "A curated, searchable repo of code snippets in multiple languages for common programming tasks.",
  //     category: "Servers & Other IT",
  //     courseLevel: "Beginner",
  //     coursePrice: 29,
  //     courseThumbnail:
  //       "https://repository-images.githubusercontent.com/427843760/9305a492-4243-4e02-b8eb-ace047dc57b1",
  //     enrolledStudents: [new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c0")],
  //     lectures: [],
  //     creator: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c2"),
  //     isPublished: true,
  //     createdAt: new Date("2025-04-22T12:00:00Z"),
  //     updatedAt: new Date("2025-04-22T12:00:00Z"),
  //   },
  //   {
  //     _id: new mongoose.Types.ObjectId("64a2f1e2d3c4b5a6f7e8d9d6"),
  //     courseTitle: "Advanced Techniques Workshop",
  //     subTitle: "Design patterns & best practices",
  //     description:
  //       "Deep dive into advanced programming techniques, live coding, Q&A, and maintainable architecture patterns.",
  //     category: "Servers & Other IT",
  //     courseLevel: "Advance",
  //     coursePrice: 79,
  //     courseThumbnail:
  //       "https://www.springboard.com/blog/wp-content/uploads/2022/11/14-best-computer-programming-courses-to-upskill-your-career.jpg",
  //     enrolledStudents: [new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c0")],
  //     lectures: [],
  //     creator: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c2"),
  //     isPublished: true,
  //     createdAt: new Date("2025-04-22T12:00:00Z"),
  //     updatedAt: new Date("2025-04-22T12:00:00Z"),
  //   },
  // ];
  // await Course.deleteMany({});
  // await Course.insertMany(courseDocs);

  // //–– Lectures ––//
  // // build lectures in-memory with courseRef
  // const lectures = [];
  // courseDocs.forEach((c) => {
  //   for (let i = 1; i <= 3; i++) {
  //     lectures.push({
  //       _id: new mongoose.Types.ObjectId(),
  //       lectureTitle: `${c.courseTitle} – Lecture ${i}`,
  //       videoUrl: c.courseThumbnail + `?lecture=${i}`,
  //       publicId: `lec_${c._id.toString().slice(-4)}_${i}`,
  //       isPreviewFree: i === 1,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       courseRef: c._id,    // in-memory only
  //     });
  //   }
  // });
  // await Lecture.deleteMany({});
  // await Lecture.insertMany(lectures);

  // //–– Build course→lecture map from original array ––//
  // const lecMap = lectures.reduce((acc, lec) => {
  //   const key = lec.courseRef.toString();
  //   (acc[key] = acc[key] || []).push(lec._id);
  //   return acc;
  // }, {});

  // //–– Patch courses with lecture IDs ––//
  // for (const c of courseDocs) {
  //   await Course.updateOne(
  //     { _id: c._id },
  //     { $set: { lectures: lecMap[c._id.toString()] } }
  //   );
  // }

  // //–– CourseProgress ––//
  // const progressDocs = courseDocs.map((c) => {
  //   const lectureIds = lecMap[c._id.toString()];
  //   return {
  //     userId: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c0"),
  //     courseId: c._id,
  //     completed: c.courseTitle.includes("Cloud"),
  //     lectureProgress: lectureIds.map((lid, idx) => ({
  //       lectureId: lid,
  //       viewed: idx === 0 || c.courseTitle.includes("Cloud"),
  //     })),
  //   };
  // });
  // await CourseProgress.deleteMany({});
  // await CourseProgress.insertMany(progressDocs);

  // //–– CoursePurchase ––//
  // const purchaseDocs = courseDocs.map((c) => ({
  //   _id: new mongoose.Types.ObjectId(),
  //   courseId: c._id,
  //   userId: new mongoose.Types.ObjectId("64a1f1e2d3c4b5a6f7e8d9c0"),
  //   amount: c.coursePrice,
  //   status: "completed",
  //   paymentId: `pay_${c._id.toString().slice(-6)}`,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // }));
  // await CoursePurchase.deleteMany({});
  // await CoursePurchase.insertMany(purchaseDocs);

  console.log("🌱 Seeding complete!");
  mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});