'use client';

import * as React from 'react';
import { FormWrapper, FormButton, FormTextarea } from '@/components/forms/FormWrapper';

/**
 * Approval Actions Component (Skeleton)
 *
 * Component for approving/rejecting workflow items
 * Full implementation will be connected to backend mutations
 *
 * Features (TBD):
 * - Approve action
 * - Reject action with optional comment
 * - Approval history
 *
 * Usage (Future):
 * <ApprovalAction
 *   workflowId="123"
 *   onApprove={handleApprove}
 *   onReject={handleReject}
 * />
 */

interface ApprovalActionProps {
  workflowId: string;
  currentStatus: 'pending' | 'approved' | 'rejected';
  canApprove: boolean;
  isLoading?: boolean;
  onApprove: () => Promise<void>;
  onReject: (comment: string) => Promise<void>;
  onCommentAdd?: (comment: string) => Promise<void>;
}

export const ApprovalAction: React.FC<ApprovalActionProps> = ({
  workflowId,
  currentStatus,
  canApprove,
  isLoading = false,
  onApprove,
  onReject,
  onCommentAdd,
}) => {
  const [isRejecting, setIsRejecting] = React.useState(false);
  const [rejectionComment, setRejectionComment] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!canApprove || currentStatus !== 'pending') {
    return null;
  }

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await onApprove();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionComment.trim()) {
      alert('Please provide a comment for rejection');
      return;
    }
    setIsSubmitting(true);
    try {
      await onReject(rejectionComment);
      setIsRejecting(false);
      setRejectionComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Workflow Action
      </h3>

      {isRejecting ? (
        <FormWrapper>
          <FormTextarea
            label="Rejection Comment (Required)"
            placeholder="Please explain why you are rejecting this workflow..."
            value={rejectionComment}
            onChange={(e) => setRejectionComment(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <FormButton
              type="button"
              variant="danger"
              onClick={handleReject}
              disabled={isSubmitting || !rejectionComment.trim()}
            >
              {isSubmitting ? 'Submitting...' : 'Reject'}
            </FormButton>
            <FormButton
              type="button"
              variant="secondary"
              onClick={() => {
                setIsRejecting(false);
                setRejectionComment('');
              }}
              disabled={isSubmitting}
            >
              Cancel
            </FormButton>
          </div>
        </FormWrapper>
      ) : (
        <div className="flex gap-2">
          <FormButton
            type="button"
            variant="primary"
            onClick={handleApprove}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Approving...' : 'Approve'}
          </FormButton>
          <FormButton
            type="button"
            variant="danger"
            onClick={() => setIsRejecting(true)}
            disabled={isSubmitting}
          >
            Reject
          </FormButton>
        </div>
      )}
    </div>
  );
};
