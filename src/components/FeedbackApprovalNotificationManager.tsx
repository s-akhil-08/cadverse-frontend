import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import FeedbackApprovalPopup from './FeedbackApprovalPopup';
import { useFeedbackApprovalNotification } from '../hooks/useFeedbackApprovalNotification';

const FeedbackApprovalNotificationManager: React.FC = () => {
  const { user } = useAuth();

  const { isOpen, onClose, feedbackId, projectName } =
    useFeedbackApprovalNotification(user?.id?.toString() || null); // id is string

  return (
    <FeedbackApprovalPopup
      isOpen={isOpen}
      onClose={onClose}
      projectName={projectName || ''}
      feedbackId={feedbackId || 0}
    />
  );
};

export default FeedbackApprovalNotificationManager;