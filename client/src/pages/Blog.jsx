import React, { useEffect, useState } from "react";
import Navbar from "../component/NavBar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import moment from "moment";
import Footer from "../component/Footer";
import Loader from "../component/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();

  const { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("api/blog/comments", { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(`/api/blog/add-comment`, {
        blogId: id,
        name,
        content,
      });

      if (data.success) {
        // wait 3 seconds before showing toast + clearing form
        setTimeout(() => {
          toast.success(
            `Thank you ${name}, your comment has been added for review`
          );
          setName("");
          setContent("");
          fetchComments();
          setIsSubmitting(false); // allow new submit after delay
        }, 3000);
      } else {
        toast.error(data.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative min-h-screen bg-gray-50">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute top-0 left-0 w-full h-64 -z-10 opacity-30 object-cover"
      />
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-primary font-medium text-sm uppercase tracking-wide">
            Published on {moment(data.createdAt).format("MMMM Do YYYY")}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2 mb-4 leading-tight">
            {data.title}
          </h1>
          <h2 className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto line-clamp-2">
            {data.subTitle}
          </h2>
          <div className="flex justify-center items-center gap-2">
            <p className="text-sm text-gray-500">By</p>
            <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Kratin Aggarwal
            </p>
          </div>
        </div>

        <div className="mt-10">
          <img
            src={data.image}
            alt=""
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
          <div className="rich-text max-w-3xl mx-auto mt-8 prose prose-lg text-gray-700">
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Comments ({comments.length})
          </h3>
          <div className="space-y-6">
            {comments.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={assets.user_icon} alt="" className="w-8 h-8" />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {moment(item.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 ml-12">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Add Your Comment
          </h3>
          <form
            onSubmit={addComment}
            className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Your Comment"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-32 resize-none"
              required
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg transition-colors duration-200 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark text-white"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Comment"}
            </button>
          </form>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-xl font-semibold text-gray-800 mb-6">
            Share this Article
          </p>
          <div className="flex justify-center gap-6">
            <img
              src={assets.twitter_icon_1}
              width={40}
              height={40}
              alt="Twitter"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
            <img
              src={assets.facebook_icon_1}
              width={40}
              height={40}
              alt="Facebook"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
            <img
              src={assets.whatsapp_icon_1}
              width={40}
              height={40}
              alt="WhatsApp"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default Blog;
