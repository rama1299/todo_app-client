// components/CommentSection.js
import { useState, useEffect } from "react";
import React from "react";
import { getTaskDetail } from "@/modules/fetchTask";
import { addComment, deleteComment } from "@/modules/fetchComment";

const CommentSection = ( {id} ) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [refetchData, setRefetchData] = useState(false)

  // Fungsi untuk mengambil data komentar dari API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchData = async () => {
        const response = await getTaskDetail(id);
        setComments(response.TaskComments)
      };
  
      fetchData();
    }
  }, [refetchData]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Fungsi untuk mengirim komentar ke API
  const postComment = async () => {
    const data = {
        taskId: id,
        commentText: newComment
    }

    try {
      const response = await addComment(data)
      setComments([...comments, { id: response.id, commentText: newComment }]);
      setNewComment("");
      setRefetchData(!refetchData)
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await deleteComment(commentId)
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="sm:px-6 w-full">
  <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 shadow-md">
    <div className="sm:flex items-center justify-between">
      <div className="flex items-center">
        <div className="py-2 px-8 text-2xl">
          <p className=" font-medium text-2xl">Comment</p>      
        </div>
      </div>
      <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          className="w-full mr-2 px-3 py-2 border rounded border-gray-400 focus:outline-none focus:border-indigo-600"
          required
        />
      <svg onClick={postComment} className="text-indigo-600 h-8 w-9 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>

    </div>
    <div className="mt-7 overflow-x-auto">
      {comments.length > 0 ? (
        <table className="w-full whitespace-nowrap">
          <tbody>
            {comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <tr
                  tabIndex={0}
                  className="focus:outline-none h-16 border-2 border-gray-100 rounded"
                >

                  <td>
                    <div className="flex items-center pl-5 justify-between">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2 hover:text-blue-600">
                        {comment.commentText}
                      </p>
                      <svg onClick={() => handleDelete(comment.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="hover:text-gray-600 cursor-pointer mr-2 w-5 h-5 text-gray-200">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
              </svg>
                    </div>
                  </td>
                </tr>
                <tr className="h-3"></tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Comment not found</p>
      )}
    </div>
  </div>
</div>
  );
};

export default CommentSection;
