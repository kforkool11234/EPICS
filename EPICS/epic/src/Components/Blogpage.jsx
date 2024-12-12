import React, { useEffect } from 'react';
import './BlogPage.css';
import { FaArrowAltCircleRight } from "react-icons/fa";

const BlogPage = () => {
  useEffect(() => {
    const blogPosts = document.querySelectorAll('.blog-post');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Trigger animation
          }
        });
      },
      { threshold: 0.5 }
    );

    blogPosts.forEach((post) => observer.observe(post));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="blog-container">
      <div className="blog-post">
        <h2>Benefits of Regular Exercise</h2>
        <img
          src="https://media.istockphoto.com/id/1285313098/photo/portrait-from-pushkar-faces-of-pushkar.jpg?s=612x612&w=0&k=20&c=G2YV4T5A6OYAfRquEUVmWVwesadidOdEqROiVfwJhao="
          alt="Exercise Benefits"
          width="200px"
          className="imga"
        />
        <p>
          In today’s fast-paced world, maintaining a regular exercise routine can often feel like a daunting task. However, the benefits of regular exercise extend far beyond just physical appearance; they encompass mental, emotional, and overall well-being.
        </p>
        <a
          href="https://blog.mygov.in/the-benefits-of-regular-exercise-finding-the-right-routine-for-you/"
          className="read-more"
          target="blank"
        >
          <FaArrowAltCircleRight />
        </a>
      </div>

      <div className="blog-post">
        <h2>स्वामित्व योजना का विश्लेषण</h2>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD0LKvSHLLvfMH-3nVsFBuZeCLpGr3umvgEg&s"
          alt="SWAMITVA Scheme"
          className="imga"
        />
        <p>
          भारत में, निपटान और रिकॉर्ड के लिए ग्रामीण भूमि का सर्वेक्षण दशकों पहले किया गया और पूरा किया गया और इसके अलावा, अधिकांश राज्यों में गांवों के आबादी क्षेत्र का सर्वेक्षण/मानचित्रण नहीं किया गया था।
        </p>
        <a
          href="https://edutinker.com/education-schemes-for-india-in-schools-an-overview/"
          className="read-more"
          width="200px"
          target="blank"
        >
          <FaArrowAltCircleRight />
        </a>
      </div>

      <div className="blog-post">
        <h2>The Pradhan Mantri Garib Kalyan Yojana</h2>
        <img
          src="https://pbs.twimg.com/profile_images/766217782115565568/I6GCj1N4_400x400.jpg"
          alt="PMGKY"
          className="imga"
          width="200px"
        />
        <p>
          Package is a comprehensive relief package of Rs 1.70 Lakh Crore Yojana for the poor to help them fight the battle against Corona Virus. This was announced in March 2020, to reach out to the poorest of the poor.
        </p>
        <a
          href="https://www.india.gov.in/spotlight/pradhan-mantri-garib-kalyan-package-pmgkp"
          className="read-more"
          target="blank"
        >
          <FaArrowAltCircleRight />
        </a>
      </div>
    </div>
  );
};

export default BlogPage;
