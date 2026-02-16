import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "../config/api";

interface Feedback {
  id: number;
  project_name: string;
  status: string;
  popup_count: number;
}

interface UseFeedbackApprovalNotificationReturn {
  isOpen: boolean;
  onClose: () => void;
  feedbackId: number | null;
  projectName: string | null;
}



export const useFeedbackApprovalNotification = (
  userId: string | null
): UseFeedbackApprovalNotificationReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  // This ref persists across re-renders but resets on full page refresh
  const hasAttemptedShow = useRef(false);

  // Fetch feedbacks on user change (login/logout)
  useEffect(() => {
    if (!userId) {
      setFeedbacks([]);
      setLoading(false);
      hasAttemptedShow.current = false; // Reset on logout
      return;
    }

    setLoading(true);

    axios
      .get(`${API_BASE_URL}user-feedback/`)
      .then((response) => {
        const approved = response.data.filter((f: any) => f.status === 'approved');
        setFeedbacks(approved);
      })
      .catch((error) => {
        console.error('Failed to fetch feedbacks:', error);
        setFeedbacks([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  // Try to show popup only once per page load
  useEffect(() => {
    if (loading || feedbacks.length === 0 || hasAttemptedShow.current) return;

    const eligible = feedbacks.find((f) => f.popup_count < 3);

    if (eligible) {
      hasAttemptedShow.current = true; // Block future attempts this page load

      setCurrentFeedback(eligible);
      setIsOpen(true);

      axios
        .post(`${API_BASE_URL}feedback/${eligible.id}/increment-popup/`)
        .then((res) => {
          console.log(`Popup shown! Count: ${res.data.new_count}`);
          setFeedbacks((prev) =>
            prev.map((f) =>
              f.id === eligible.id ? { ...f, popup_count: res.data.new_count } : f
            )
          );
        })
        .catch((err) => {
          console.error('Increment failed:', err);
        });
    }
  }, [feedbacks, loading]);

  const onClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onClose,
    feedbackId: currentFeedback?.id ?? null,
    projectName: currentFeedback?.project_name ?? null,
  };
};